/* Resilience Crew Lab: small dependency-free browser service layer.
   Local mode is a SAME-BROWSER demo, not remote multiplayer or authentication. */
const randomId = () => globalThis.crypto?.randomUUID?.() || `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const cleanJSON = (value, max = 16000) => {
  const raw = JSON.stringify(value);
  if (!raw || raw.length > max) throw new Error('Payload exceeds size limit.');
  return JSON.parse(raw);
};
const fail = (code, message) => Object.assign(new Error(message), {code});

export function createServices(config = {}) {
  const url = String(config.supabaseUrl || '').replace(/\/$/, '');
  const key = String(config.supabaseAnonKey || config.anonKey || '');
  const cloud = Boolean(url && key);
  if (cloud && !/^https:\/\/[a-z\d.-]+(?::\d+)?$/i.test(url)) throw fail('CONFIG', 'Supabase URL must use HTTPS.');
  if (/^sb_secret_/.test(key)) throw fail('CONFIG', 'Use only a public publishable/anon key.');
  if (key.split('.').length === 3) {
    try { if (JSON.parse(atob(key.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).role === 'service_role') throw fail('CONFIG', 'Never expose a service_role key.'); }
    catch (e) { if (e.code === 'CONFIG') throw e; }
  }
  const channelMode = cloud ? 'cloud' : 'local';
  const clientId = randomId();
  const listeners = new Set();
  const emit = (message) => { for (const fn of listeners) { try { fn({...message, channelMode}); } catch(e) { console.error('Crew subscriber failed', e); } } };
  const storageKey = `crew-session-v1:${url}`;
  let session = null, room = null, members = [], channel = null, pollTimer = null, destroyed = false;
  let cursor = 0, revision = -1, polling = false, refreshing = null, tick = 0;
  let pendingJoin = null;
  const storage = config.persistSession === true && cloud;
  if (storage) { try { session = JSON.parse(sessionStorage.getItem(storageKey) || 'null'); } catch(_) {} }
  else if (cloud) { try {sessionStorage.removeItem(storageKey);} catch(_) {} }
  const storeSession = (value) => {
    session = value ? {access_token:value.access_token, refresh_token:value.refresh_token, expires_at:value.expires_at || Math.floor(Date.now()/1000) + (value.expires_in || 3600), user:value.user} : null;
    try { if (!session) sessionStorage.removeItem(storageKey); else if (storage) sessionStorage.setItem(storageKey, JSON.stringify(session)); } catch(_) {}
    emit({type:'auth', user:session?.user || null});
  };
  async function http(path, {method='GET', body, auth=true, headers={}} = {}) {
    if (destroyed) throw fail('CLOSED','Service closed.');
    if (!cloud) throw fail('BACKEND_REQUIRED','Configure a backend to use membership. Local demo does not save personal details.');
    if (auth) await ensureSession();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(url + path, {method, signal:controller.signal, headers:{apikey:key, ...(auth ? {Authorization:`Bearer ${session.access_token}`} : {}), 'Content-Type':'application/json', ...headers}, ...(body === undefined ? {} : {body:JSON.stringify(body)})});
      const raw = await response.text();
      let data; try {data = raw ? JSON.parse(raw) : null;} catch(_) {data = null;}
      if (!response.ok) throw fail(data?.error_code || data?.code || String(response.status), data?.msg || data?.message || data?.error_description || `Service returned ${response.status}.`);
      return data;
    } catch(e) {
      if (e.name === 'AbortError') throw fail('TIMEOUT','Request timed out. Please retry.');
      throw e;
    } finally {clearTimeout(timeout);}
  }
  async function ensureSession() {
    if (!session?.access_token) throw fail('SIGN_IN_REQUIRED','Sign in with your email code first.');
    if (session.expires_at > Math.floor(Date.now()/1000) + 45) return;
    if (!refreshing) refreshing = http('/auth/v1/token?grant_type=refresh_token', {method:'POST', auth:false, body:{refresh_token:session.refresh_token}})
      .then(storeSession).catch(e=>{storeSession(null); throw e;}).finally(()=>{refreshing=null;});
    await refreshing;
  }
  const rpc = (name, args={}) => http(`/rest/v1/rpc/${name}`, {method:'POST', body:args});
  const broadcast = (type, data={}) => channel?.postMessage({type, sender:clientId, ...data});
  const announceMembers = () => { emit({type:'members',members:[...members]}); broadcast('members',{roomId:room?.id,members:[...members]}); };
  if (!cloud && typeof BroadcastChannel !== 'undefined') {
    channel = new BroadcastChannel('resilience-crew-demo-v1');
    channel.onmessage = ({data:m}) => {
      if (!m || m.sender === clientId) return;
      if (m.type === 'probe' && room?.owner_id === clientId && room.code === m.code) {
        if (members.length >= 16) return;
        if (!members.some(x=>x.user_id===m.sender)) members.push({user_id:m.sender,role:'member'});
        broadcast('welcome',{target:m.sender,room,members}); announceMembers(); return;
      }
      if (m.type === 'welcome' && m.target === clientId && pendingJoin && m.room?.code === pendingJoin.code) {
        room = cleanJSON(m.room); members = cleanJSON(m.members); pendingJoin.resolve({...room}); pendingJoin=null;
        emit({type:'room',room:{...room},isHost:false}); emit({type:'state',state:room.state || {},revision:room.revision || 0}); emit({type:'members',members}); return;
      }
      if (!room || m.roomId !== room.id) return;
      if (m.type === 'event') emit({type:'event',event:m.event});
      if (m.type === 'state' && m.sender === room.owner_id) {room.state=m.state; room.revision=m.revision; emit({type:'state',state:m.state,revision:m.revision});}
      if (m.type === 'members' && m.sender === room.owner_id) {members=m.members;emit({type:'members',members});}
      if (m.type === 'leave' && room.owner_id === clientId) {members=members.filter(x=>x.user_id!==m.sender);announceMembers();}
      if (m.type === 'close' && m.sender === room.owner_id) {room=null;members=[];emit({type:'room',room:null,isHost:false});}
    };
  }
  async function poll() {
    if (!cloud || !room || polling || destroyed) return;
    polling = true;
    const roomId = room.id;
    try {
      const [rows, events] = await Promise.all([
        http(`/rest/v1/crew_rooms?id=eq.${encodeURIComponent(roomId)}&select=*`),
        http(`/rest/v1/crew_events?room_id=eq.${encodeURIComponent(roomId)}&id=gt.${cursor}&order=id.asc&limit=100`)
      ]);
      if (room?.id !== roomId) return;
      if (!rows?.length) {room=null;clearInterval(pollTimer);emit({type:'room',room:null,isHost:false});return;}
      room=rows[0];
      if (room.revision !== revision) {revision=room.revision;emit({type:'state',state:room.state,revision});}
      for (const event of events || []) {cursor=Math.max(cursor, Number(event.id));emit({type:'event',event});}
      if (tick++ % 5 === 0) {members=await http(`/rest/v1/crew_members?room_id=eq.${encodeURIComponent(roomId)}&select=user_id,role,joined_at`); if(room?.id === roomId)emit({type:'members',members});}
    } catch(e) {emit({type:'error',error:e.message,code:e.code});}
    finally {polling=false;}
  }
  async function attachRoom(value) {
    room=Array.isArray(value)?value[0]:value;
    if (!room?.id) throw fail('ROOM','Room could not be created or joined.');
    // Joining starts from the current state; old control commands must not replay.
    const latest=await http(`/rest/v1/crew_events?room_id=eq.${encodeURIComponent(room.id)}&select=id&order=id.desc&limit=1`);
    cursor=Number(latest?.[0]?.id)||0; revision=-1; tick=0;
    emit({type:'room',room:{...room},isHost:room.owner_id===session?.user?.id});
    clearInterval(pollTimer);
    pollTimer=setInterval(poll, Math.max(2000, Number(config.pollMs)||2000));
    void poll(); return {...room};
  }
  async function leaveRoom() {
    if (!room) return;
    const old=room;
    if (cloud) await rpc('crew_leave_room',{p_room:room.id});
    else broadcast(room.owner_id===clientId?'close':'leave',{roomId:room.id});
    if (room?.id===old.id) {room=null;members=[];clearInterval(pollTimer);emit({type:'room',room:null,isHost:false});}
  }
  const api = {
    channelMode,
    clientId,
    get room(){return room?{...room}:null;},
    get isHost(){return Boolean(room && room.owner_id===(cloud?session?.user?.id:clientId));},
    async sendOtp(email, options={}) {
      const clean=String(email||'').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) throw fail('EMAIL','Enter a valid email.');
      await http('/auth/v1/otp',{method:'POST',auth:false,body:{email:clean,create_user:config.allowSignUp!==false,...(options.captchaToken?{gotrue_meta_security:{captcha_token:options.captchaToken}}:{})}});
      return {sent:true};
    },
    async verifyOtp(email, token) { const data=await http('/auth/v1/verify',{method:'POST',auth:false,body:{email:String(email).trim(),token:String(token).trim(),type:'email'}});storeSession(data);return data.user; },
    async getUser() {if(!cloud||!session)return null;try {const user=await http('/auth/v1/user');session.user=user;return user;}catch(e){if(['401','bad_jwt','refresh_token_not_found'].includes(e.code))storeSession(null);throw e;}},
    async getProfile() {
      if(!cloud||!session)return null;
      const user=await api.getUser();if(!user)return null;
      const rows=await http(`/rest/v1/crew_profiles?user_id=eq.${encodeURIComponent(user.id)}&select=user_id,display_name,phone,created_at&limit=1`);
      return rows?.[0]||null;
    },
    async saveProfile({displayName,phone=''}) {
      const user=await api.getUser();if(!user)throw fail('SIGN_IN_REQUIRED','Sign in first.');
      const name=String(displayName||'').trim().slice(0,80);if(!name)throw fail('NAME','Enter a display name.');
      const cleanPhone=String(phone||'').trim();if(cleanPhone && !/^[+()\d .-]{6,32}$/.test(cleanPhone))throw fail('PHONE','Enter a valid phone or leave it blank.');
      const rows=await http('/rest/v1/crew_profiles?on_conflict=user_id',{method:'POST',body:{user_id:user.id,display_name:name,phone:cleanPhone||null},headers:{Prefer:'resolution=merge-duplicates,return=representation'}});
      return rows?.[0];
    },
    async signOut() {try {await leaveRoom();}catch(_){}try{if(cloud&&session)await http('/auth/v1/logout?scope=local',{method:'POST'});}finally{storeSession(null);room=null;clearInterval(pollTimer);}},
    async createRoom(name='Crew practice') {
      await leaveRoom();
      if (cloud) return attachRoom(await rpc('crew_create_room',{p_name:String(name).slice(0,80)}));
      room={id:randomId(),code:randomId().replace(/-/g,'').slice(0,12).toUpperCase(),name:String(name).slice(0,80),owner_id:clientId,state:{},revision:0};
      members=[{user_id:clientId,role:'host'}];emit({type:'room',room:{...room},isHost:true});emit({type:'members',members});return {...room};
    },
    async joinRoom(code) {
      const normalized=String(code).replace(/\s/g,'').toUpperCase();
      if(!/^[A-Z0-9]{6,16}$/.test(normalized))throw fail('CODE','Enter the room code.');
      await leaveRoom();
      if(cloud)return attachRoom(await rpc('crew_join_room',{p_code:normalized}));
      if(!channel)throw fail('UNSUPPORTED','This browser does not support the local multi-tab demo.');
      if(pendingJoin)throw fail('BUSY','Already joining.');
      return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pendingJoin=null;reject(fail('ROOM_NOT_FOUND','Open the host in another tab of the SAME browser and origin. Keep that tab open.'));},2200);pendingJoin={code:normalized,resolve:value=>{clearTimeout(timer);resolve(value);}};broadcast('probe',{code:normalized});});
    },
    leaveRoom,
    async sendEvent(payload) {
      if(!room)throw fail('ROOM_REQUIRED','Create or join a room first.');
      const value=cleanJSON(payload,4000);
      if(cloud){const rows=await http('/rest/v1/crew_events',{method:'POST',body:{room_id:room.id,actor_id:session.user.id,payload:value},headers:{Prefer:'return=representation'}});return rows[0];}
      const event={id:randomId(),room_id:room.id,actor_id:clientId,payload:value,created_at:new Date().toISOString()};broadcast('event',{roomId:room.id,event});emit({type:'event',event});return event;
    },
    async publishState(state) {
      if(!api.isHost)throw fail('HOST_ONLY','Only the host can publish the shared simulation state.');
      const value=cleanJSON(state);
      if(cloud){const rows=await http(`/rest/v1/crew_rooms?id=eq.${encodeURIComponent(room.id)}`,{method:'PATCH',body:{state:value},headers:{Prefer:'return=representation'}});if(!rows?.length)throw fail('HOST_ONLY','State was not accepted.');room=rows[0];return;}
      room.state=value;room.revision++;broadcast('state',{roomId:room.id,state:value,revision:room.revision});emit({type:'state',state:value,revision:room.revision});
    },
    subscribe(callback){listeners.add(callback);return ()=>listeners.delete(callback);},
    destroy(){if(!cloud&&room)broadcast(api.isHost?'close':'leave',{roomId:room.id});destroyed=true;clearInterval(pollTimer);channel?.close();listeners.clear();}
  };
  // Optional grouping for callers who prefer services.auth.sendOtp(...).
  api.auth={sendOtp:api.sendOtp,verifyOtp:api.verifyOtp,signOut:api.signOut,getUser:api.getUser,getProfile:api.getProfile,saveProfile:api.saveProfile};
  return api;
}
