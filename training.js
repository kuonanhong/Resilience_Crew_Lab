/* Public, fictional civilian crew-training sandbox. Geometry is original procedural
 * artwork. No real installations, tactical planning, weapons, or targeting data.
 * Units approximate metres and seconds; this is an educational game, not a certified
 * vehicle flight/dynamics model. Three.js is redistributed under its MIT licence. */
import * as THREE from './vendor/three.module.js';

export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
export const wrapAngle = (v) => Math.atan2(Math.sin(v), Math.cos(v));
export function scoreRun(checkpoints, collisions, elapsed, inspected = 0) {
  return Math.round(clamp(checkpoints * 12 + Math.max(0, 20 - collisions * 4)
    + Math.max(0, 15 - Math.max(0, elapsed - 120) / 24) + Math.min(5, inspected), 0, 100));
}
const ROUTES = {
  air: [[-26, 11, 18], [-3, 14, -12], [23, 16, -41], [0, 12, -69], [-31, 10, -44]],
  land: [[-38, 1, 22], [-44, 1, -6], [-32, 1, -36], [-52, 1, -65], [-63, 1, -31]],
  sea: [[32, .8, 23], [49, .8, -5], [29, .8, -34], [53, .8, -63], [77, .8, -29]],
};
const HOMES = { air: [-26, 9, 48], land: [-38, 1, 48], sea: [32, .8, 48] };
const SETTINGS = {
  basic: { speed: 9, acceleration: 8, drag: 2.3, turn: 1.15, gate: 6.5, drain: .023 },
  advanced: { speed: 15, acceleration: 10, drag: 1.45, turn: 1.4, gate: 5, drain: .035 },
  expert: { speed: 21, acceleration: 13, drag: 1.0, turn: 1.65, gate: 4, drain: .047 },
};

export function createTrainer(canvas, { onTelemetry = () => {}, onEvent = () => {}, onComplete = () => {} } = {}) {
  const lowPower = (navigator.deviceMemory && navigator.deviceMemory <= 4)
    || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, lowPower ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.13;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#9acbd4');
  scene.fog = new THREE.Fog('#9acbd4', 95, 300);
  const camera = new THREE.PerspectiveCamera(58, 1, .1, 600);
  const hemisphere = new THREE.HemisphereLight('#eaf9ff', '#54714d', 2.25);
  scene.add(hemisphere);
  const sunlight = new THREE.DirectionalLight('#fff1d6', 3.1);
  sunlight.position.set(-60, 95, 35); scene.add(sunlight);
  const mats = {}, geos = new Set(), textures = new Set();
  function material(name, color, extra = {}) {
    if (!mats[name]) mats[name] = new THREE.MeshStandardMaterial({ color, roughness: .85, ...extra });
    return mats[name];
  }
  function mesh(geometry, mat, x = 0, y = 0, z = 0, parent = scene) {
    geos.add(geometry); const obj = new THREE.Mesh(geometry, mat);
    obj.position.set(x, y, z); parent.add(obj); return obj;
  }
  function box(x, y, z, w, h, d, mat, parent) { return mesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, parent); }
  const ground = material('ground', '#708e6c');
  const sand = material('sand', '#d8c6a1');
  const waterMat = material('water', '#238e9d', { metalness: .18, roughness: .33 });
  box(0, -1, -20, 650, 2, 650, waterMat);
  box(-91, -1.0, -25, 172, 2.1, 290, sand);
  box(-95, -.45, -25, 172, 1.8, 290, ground);
  // A thin shallow-water strip makes the coast legible from all cameras.
  box(0, .025, -25, 8, .035, 290, material('shallows', '#56b5b3'));
  const roadMat = material('road', '#667375');
  const pathPoints = [[-38, 48], ...ROUTES.land.map(p => [p[0], p[2]]), [-72, 0], [-62, 33], [-38, 48]];
  for (let i = 1; i < pathPoints.length; i++) {
    const a = pathPoints[i - 1], b = pathPoints[i], dx = b[0] - a[0], dz = b[1] - a[1];
    const segment = box((a[0] + b[0]) / 2, .5, (a[1] + b[1]) / 2, 8, .12, Math.hypot(dx, dz) + 3, roadMat);
    segment.rotation.y = Math.atan2(dx, dz);
    for (let q = .12; q < 1; q += .26) {
      const mark = box(a[0] + dx * q, .575, a[1] + dz * q, .16, .025, 1.8, material('roadpaint', '#d8e5d7'));
      mark.rotation.y = segment.rotation.y;
    }
  }
  // Harbor: jetty, civilian operations hut, apron and landing pad.
  box(-2, .1, 51, 27, 1.3, 8, material('dock', '#e5dec5'));
  box(6, .4, 34, 6, 1.5, 39, mats.dock);
  box(-26, .48, 48, 16, .14, 16, material('pad', '#424f55'));
  const padRing = mesh(new THREE.TorusGeometry(5.8, .15, 5, 40), material('padmark', '#eed795'), -26, .59, 48);
  padRing.rotation.x = -Math.PI / 2;
  for (const hx of [-28, -24]) box(hx, .6, 48, .5, .025, 4, mats.padmark);
  box(-26, .6, 48, 4.4, .025, .5, mats.padmark);
  const structures = [];
  function building(x, z, w, h, d, color) {
    box(x, .5 + h / 2, z, w, h, d, material('building-' + color, color));
    box(x, h + .75, z, w + 1, .5, d + 1, material('roof', '#485862'));
    box(x, h * .56, z + d / 2 + .015, w * .68, h * .25, .08, material('window', '#9de8e3', { metalness: .3, roughness: .2 }));
    structures.push({ x, z, r: Math.max(w, d) * .58, height: h + 1 });
  }
  building(-70, 56, 17, 7, 12, '#c6c5b3');
  building(-13, -24, 10, 5, 12, '#e4dfd0');
  building(-80, -52, 13, 8, 15, '#a8bcb6');
  box(-14, 6.8, -24, 1, 3, 1, material('mast', '#344b58'));
  const beacon = mesh(new THREE.SphereGeometry(.6, 8, 5), material('beacon', '#efbf55', { emissive: '#af692b', emissiveIntensity: .7 }), -14, 8.5, -24);
  // Seeded scenery, one draw call per tree component; no image/network dependencies.
  let seed = 7126;
  function rnd() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
  function instances(geometry, mat, placements) {
    geos.add(geometry); const obj = new THREE.InstancedMesh(geometry, mat, placements.length);
    const dummy = new THREE.Object3D();
    placements.forEach((p, i) => { dummy.position.set(p.x, p.y, p.z); dummy.scale.set(p.s, p.s, p.s); dummy.rotation.set(0, p.rot || 0, 0); dummy.updateMatrix(); obj.setMatrixAt(i, dummy.matrix); });
    scene.add(obj); return obj;
  }
  const treePlaces = [];
  for (let i = 0; i < (lowPower ? 62 : 110); i++) {
    const x = -160 + rnd() * 144, z = -120 + rnd() * 220;
    if (Math.abs(x + 38) < 13 && z > 8) continue;
    if (pathPoints.some(p => Math.hypot(x - p[0], z - p[1]) < 11)) continue;
    if (structures.some(p => Math.hypot(x - p.x, z - p.z) < p.r + 5)) continue;
    treePlaces.push({ x, y: 2.4, z, s: .7 + rnd() * .8 });
  }
  instances(new THREE.CylinderGeometry(.25, .38, 4, 5), material('trunk', '#6d7255'), treePlaces);
  instances(new THREE.ConeGeometry(2.4, 6.3, 7), material('leaves', '#3c7263'), treePlaces.map(p => ({ ...p, y: 4.4 * p.s })));
  const rocks = [];
  for (let i = 0; i < 27; i++) rocks.push({ x: -7 - rnd() * 4, y: .2, z: -135 + i * 10, s: .5 + rnd() * .9, rot: rnd() * 6 });
  instances(new THREE.DodecahedronGeometry(1.5, 0), material('rock', '#a5b5ad'), rocks);
  for (let i = 0; i < 13; i++) {
    const mountain = mesh(new THREE.ConeGeometry(24 + rnd() * 20, 25 + rnd() * 43, 5), material('mountain', '#6a9184'), -125 + i * 21, 13, -175 - rnd() * 32);
    mountain.rotation.y = rnd() * 6;
  }
  const cloudPoints = [];
  for (let i = 0; i < 18; i++) cloudPoints.push({ x: -130 + rnd() * 310, y: 55 + rnd() * 30, z: -190 + rnd() * 240, s: 3 + rnd() * 3 });
  const clouds = instances(new THREE.SphereGeometry(1, 8, 5), material('cloud', '#ecf1eb'), cloudPoints);
  clouds.scale.set(3.3, .65, 1.1);
  const waveGeo = new THREE.BufferGeometry(), waveCoords = [];
  for (let i = 0; i < 65; i++) {
    const x = 12 + rnd() * 190, z = -180 + rnd() * 260;
    waveCoords.push(x, .035, z, x + 3 + rnd() * 7, .035, z);
  }
  waveGeo.setAttribute('position', new THREE.Float32BufferAttribute(waveCoords, 3)); geos.add(waveGeo);
  const waves = new THREE.LineSegments(waveGeo, new THREE.LineBasicMaterial({ color: '#b9e4dc', transparent: true, opacity: .28 })); scene.add(waves);

  const vehicle = new THREE.Group(); scene.add(vehicle);
  const drone = new THREE.Group(), car = new THREE.Group(), boat = new THREE.Group();
  vehicle.add(drone, car, boat);
  const white = material('vehicle-white', '#e8eadd', { metalness: .2, roughness: .5 });
  const dark = material('vehicle-dark', '#243c46', { metalness: .25, roughness: .5 });
  const orange = material('vehicle-orange', '#ffb65a', { metalness: .1, roughness: .55 });
  box(0, 0, 0, 1.4, .5, 2, white, drone);
  box(0, -.38, -.82, .5, .4, .5, dark, drone);
  const rotors = [];
  for (const x of [-1.5, 1.5]) for (const z of [-1.25, 1.25]) {
    const arm = box(x / 2, 0, z / 2, Math.hypot(x, z), .17, .2, dark, drone); arm.rotation.y = -Math.atan2(z, x);
    mesh(new THREE.CylinderGeometry(.18, .2, .3, 8), dark, x, .17, z, drone);
    const rotor = box(x, .34, z, 1.7, .03, .12, dark, drone); rotors.push(rotor);
    mesh(new THREE.SphereGeometry(.1, 7, 4), x < 0 ? orange : material('greenLED', '#5fe4bb', { emissive: '#3ab18b' }), x, .08, z, drone);
  }
  box(0, .25, 0, 1.75, .7, 2.8, white, car);
  box(0, .83, -.3, 1.45, .65, 1.15, dark, car);
  box(0, 1.3, -.15, .65, .22, .6, orange, car);
  const wheels = [];
  for (const x of [-.95, .95]) for (const z of [-.9, .9]) {
    const wheel = mesh(new THREE.CylinderGeometry(.43, .43, .3, 12), dark, x, -.1, z, car);
    wheel.rotation.z = Math.PI / 2; wheels.push(wheel);
  }
  const hull = mesh(new THREE.ConeGeometry(1.5, 5, 4), orange, 0, .12, 0, boat);
  hull.rotation.set(-Math.PI / 2, 0, Math.PI / 4); hull.scale.set(1, 1, .5);
  box(0, .55, .1, 1.6, .35, 3.2, white, boat);
  box(0, 1, .3, 1, .65, 1.2, dark, boat);
  box(0, 1.6, .6, .09, .75, .09, dark, boat);
  box(0, 1.97, .6, .8, .15, .2, white, boat);
  const wake = mesh(new THREE.PlaneGeometry(2, 8), new THREE.MeshBasicMaterial({ color: '#ecfff9', transparent: true, opacity: .25, depthWrite: false }), 0, -.74, 4.6, boat);
  wake.rotation.x = -Math.PI / 2;

  const markerGroup = new THREE.Group(); scene.add(markerGroup);
  const gateMats = [], gates = [];
  const gateGeo = new THREE.TorusGeometry(4.2, .16, 6, 36); geos.add(gateGeo);
  const lineMaterial = new THREE.LineBasicMaterial({ color: '#c9ffce', transparent: true, opacity: .55 });
  const guideGeometry = new THREE.BufferGeometry(); geos.add(guideGeometry);
  guideGeometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3));
  const guide = new THREE.Line(guideGeometry, lineMaterial); scene.add(guide);
  for (let i = 0; i < 5; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: i === 0 ? '#ffdc89' : '#b7ece3', transparent: true, opacity: .8 }); gateMats.push(mat);
    const gate = new THREE.Group(); markerGroup.add(gate);
    const ring = mesh(gateGeo, mat, 0, 0, 0, gate);
    const tagCanvas = document.createElement('canvas'); tagCanvas.width = 64; tagCanvas.height = 64;
    const ctx = tagCanvas.getContext('2d'); ctx.fillStyle = '#122b38'; ctx.beginPath(); ctx.arc(32, 32, 27, 0, Math.PI * 2); ctx.fill(); ctx.font = 'bold 35px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#f2e5be'; ctx.fillText(String(i + 1), 32, 34);
    const tex = new THREE.CanvasTexture(tagCanvas); textures.add(tex);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: true })); sprite.position.y = 5.4; sprite.scale.set(2.4, 2.4, 1); gate.add(sprite);
    gates.push({ group: gate, ring, tag: sprite });
  }
  let mode = 'air', difficulty = 'basic', weather = 'clear', cameraMode = 'chase', assistance = true;
  let running = false, completed = false, returning = false, destroyed = false;
  let velocity = new THREE.Vector3(), position = new THREE.Vector3(...HOMES.air), yaw = 0;
  let elapsed = 0, battery = 100, progress = 0, collisions = 0, inspected = 0, briefed = false, lastInspected = -1;
  let lastCollision = -10, lastUnsafe = -10, lastTime = 0, lastRender = 0, emitTimer = 0, raf = 0;
  let inputs = { forward: 0, turn: 0, strafe: 0, lift: 0 };
  const cameraTarget = new THREE.Vector3(), cameraDesired = new THREE.Vector3();
  const forward = new THREE.Vector3(), right = new THREE.Vector3(), desiredVelocity = new THREE.Vector3(), aim = new THREE.Vector3();
  const scratch = new THREE.Vector3();
  function emit(type, params = {}) { onEvent({ type, code: type, ...params }); }
  function targetPoint() { return new THREE.Vector3(...(returning ? HOMES[mode] : ROUTES[mode][Math.min(progress, 4)])); }
  function distanceToTarget() { const t = targetPoint(); if (mode !== 'air') t.y = position.y; return position.distanceTo(t); }
  function telemetry() {
    return { mode, difficulty, weather, camera: cameraMode, assistance, running, completed, returning, lowPower: !!lowPower,
      speed: Math.round(velocity.length() * 10) / 10, altitude: Math.round(Math.max(0, position.y) * 10) / 10,
      battery: Math.round(battery * 10) / 10, progress, total: 5, checkpoints: 5, nextCheckpoint: Math.min(5, progress + 1),
      score: scoreRun(progress, collisions, elapsed, inspected), safety: Math.max(0, 100 - collisions * 20),
      elapsed: Math.round(elapsed), collisions, inspections: inspected, briefed, distance: Math.round(distanceToTarget()),
      heading: ((yaw * 180 / Math.PI) % 360 + 360) % 360,
      position: { x: Math.round(position.x * 10) / 10, y: Math.round(position.y * 10) / 10, z: Math.round(position.z * 10) / 10 } };
  }
  function updateGates() {
    ROUTES[mode].forEach((p, i) => {
      gates[i].group.position.set(p[0], mode === 'air' ? p[1] : 3.3, p[2]);
      gates[i].ring.scale.setScalar(mode === 'air' ? 1 : .75);
      gates[i].group.visible = i >= progress;
      gateMats[i].color.set(i === progress ? '#ffcc6c' : '#b7ece3');
      gateMats[i].opacity = i === progress ? .98 : .33;
      const prev = i === 0 ? HOMES[mode] : ROUTES[mode][i - 1];
      gates[i].group.rotation.y = Math.atan2(p[0] - prev[0], p[2] - prev[2]);
    });
    guide.visible = assistance && !completed;
  }
  function applyCamera(snap = false, dt = .016) {
    forward.set(Math.sin(yaw), 0, -Math.cos(yaw));
    const zoom = cameraMode === 'fpv' ? 0 : cameraMode === 'close' ? 7 : 20;
    if (cameraMode === 'fpv') {
      cameraDesired.copy(position).addScaledVector(forward, mode === 'air' ? 1.7 : 2.8); cameraDesired.y += mode === 'air' ? .18 : 1.35;
      cameraTarget.copy(cameraDesired).addScaledVector(forward, 20); cameraTarget.y -= mode === 'air' ? .7 : .2;
    } else {
      cameraDesired.copy(position).addScaledVector(forward, -zoom); cameraDesired.y += cameraMode === 'close' ? 4 : 11;
      cameraTarget.copy(position).addScaledVector(forward, cameraMode === 'close' ? 5 : 8); cameraTarget.y += .7;
    }
    camera.position.lerp(cameraDesired, snap ? 1 : 1 - Math.exp(-dt * 5));
    camera.lookAt(cameraTarget); vehicle.visible = cameraMode !== 'fpv';
  }
  function resize() {
    const rect = canvas.getBoundingClientRect(), w = Math.max(1, Math.round(rect.width)), h = Math.max(1, Math.round(rect.height));
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
  function collision(kind) {
    velocity.multiplyScalar(-.18);
    if (elapsed - lastCollision > 1.5) { collisions++; lastCollision = elapsed; emit('collision', { kind }); }
  }
  function reset() {
    running = false; completed = false; returning = false; elapsed = 0; battery = 100; progress = 0; collisions = 0; inspected = 0; briefed = false; lastInspected = -1; lastCollision = -10; lastUnsafe = -10;
    position.set(...HOMES[mode]); velocity.set(0, 0, 0); yaw = 0;
    inputs = { forward: 0, turn: 0, strafe: 0, lift: 0 };
    drone.visible = mode === 'air'; car.visible = mode === 'land'; boat.visible = mode === 'sea';
    drone.rotation.set(0, 0, 0); boat.rotation.set(0, 0, 0); vehicle.position.copy(position); vehicle.rotation.y = 0;
    updateGates(); applyCamera(true); onTelemetry(telemetry());
  }
  function step(dt) {
    if (!running) return;
    const settings = SETTINGS[difficulty], maxSpeed = settings.speed * (mode === 'land' ? .62 : mode === 'sea' ? .8 : 1);
    elapsed += dt;
    let turn = inputs.turn, ahead = inputs.forward, lift = inputs.lift;
    if (returning) {
      const home = targetPoint(), delta = home.clone().sub(position), targetYaw = Math.atan2(delta.x, -delta.z);
      const angle = wrapAngle(targetYaw - yaw);
      turn = clamp(angle * 1.7, -1, 1); ahead = Math.max(.13, 1 - Math.abs(angle)) * .55;
      lift = mode === 'air' ? clamp(delta.y * .15, -.6, .6) : 0;
      if (distanceToTarget() < 3.5) { returning = false; running = false; velocity.set(0, 0, 0); emit('returned'); }
    }
    yaw = wrapAngle(yaw + turn * settings.turn * dt);
    forward.set(Math.sin(yaw), 0, -Math.cos(yaw)); right.set(Math.cos(yaw), 0, Math.sin(yaw));
    desiredVelocity.copy(forward).multiplyScalar(ahead * maxSpeed);
    if (mode === 'air') desiredVelocity.addScaledVector(right, inputs.strafe * maxSpeed * .7);
    desiredVelocity.y = mode === 'air' ? lift * maxSpeed * .55 : 0;
    // Beginner guidance applies gentle braking near a checkpoint, rather than
    // making the learner repeatedly overshoot while holding a forward control.
    if (assistance && !returning && distanceToTarget() < 21) {
      const guidedLimit = mode === 'air' ? 7 : mode === 'sea' ? 5 : 4;
      if (desiredVelocity.length() > guidedLimit) desiredVelocity.setLength(guidedLimit);
    }
    const windy = weather === 'wind' || weather === 'breeze' || weather === 'rain';
    if (windy && mode !== 'land') {
      const strength = (difficulty === 'expert' ? 2.4 : 1.3) * (assistance ? .35 : 1);
      desiredVelocity.x += Math.sin(elapsed * .47) * strength;
      desiredVelocity.z += Math.cos(elapsed * .33) * strength * .5;
    }
    velocity.lerp(desiredVelocity, 1 - Math.exp(-dt * settings.drag * (assistance ? 1.45 : 1)));
    const previous = position.clone(); position.addScaledVector(velocity, dt);
    const loX = mode === 'sea' ? 15 : -95, hiX = mode === 'land' ? -12 : 95;
    if (position.x < loX || position.x > hiX || position.z < -108 || position.z > 72) {
      position.x = clamp(position.x, loX, hiX); position.z = clamp(position.z, -108, 72); collision('boundary');
    }
    if (mode === 'air') {
      if (position.y < 2 || position.y > 48) { position.y = clamp(position.y, 2, 48); collision('altitude'); }
    } else position.y = HOMES[mode][1];
    for (const b of structures) if (Math.hypot(position.x - b.x, position.z - b.z) < b.r + 1 && position.y < b.height + 1) {
      position.copy(previous); collision('structure'); break;
    }
    battery = Math.max(0, battery - dt * settings.drain * (1 + velocity.length() / maxSpeed));
    if (battery <= 0) { running = false; velocity.set(0, 0, 0); emit('battery'); }
    if (!returning && progress < 5 && distanceToTarget() < settings.gate + (assistance ? 1 : 0)) {
      const safeSpeed = mode === 'air' ? 8 : mode === 'sea' ? 6 : 5;
      if (velocity.length() <= safeSpeed) {
        progress++; emit('checkpoint', { index: progress, total: 5 }); updateGates();
        if (progress === 5) { completed = true; running = false; velocity.set(0, 0, 0); const result = telemetry(); onTelemetry(result); onComplete(result); emit('complete', { score: result.score }); }
      } else if (elapsed - lastUnsafe > 4) { lastUnsafe = elapsed; emit('slowDown', { limit: safeSpeed }); }
    }
    vehicle.position.copy(position); vehicle.rotation.y = -yaw;
    drone.rotation.z = -inputs.strafe * .13 - turn * .09;
    drone.rotation.x = -ahead * .13;
    boat.rotation.z = Math.sin(elapsed * 1.5) * (weather === 'rain' ? .045 : .02);
    rotors.forEach((rotor, i) => rotor.rotation.y += dt * (running ? 42 : 2) * (i % 2 ? 1 : -1));
    wheels.forEach(wheel => wheel.rotation.x -= velocity.length() * dt * 2);
    wake.material.opacity = clamp(velocity.length() / 30, 0, .32);
  }
  function frame(now) {
    if (destroyed) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(.05, lastTime ? (now - lastTime) / 1000 : .016); lastTime = now;
    if (document.hidden) return;
    step(dt); emitTimer += dt;
    if (emitTimer >= .15) { emitTimer = 0; onTelemetry(telemetry()); }
    if (lowPower && now - lastRender < 30) return;
    lastRender = now;
    const target = targetPoint(), attr = guideGeometry.getAttribute('position');
    attr.setXYZ(0, position.x, position.y - .5, position.z); attr.setXYZ(1, target.x, target.y, target.z); attr.needsUpdate = true; guideGeometry.computeBoundingSphere();
    waves.position.x = Math.sin(now * .0001) * 1.5;
    beacon.scale.setScalar(.95 + Math.sin(now * .002) * .08);
    applyCamera(false, dt); renderer.render(scene, camera);
  }
  function setInput(value = {}) {
    const aliases = { forward: value.forward ?? value.throttle ?? value.pitch, turn: value.turn ?? value.yaw, strafe: value.strafe ?? value.roll, lift: value.lift ?? value.vertical };
    for (const key of Object.keys(inputs)) if (aliases[key] !== undefined) inputs[key] = clamp(Number(aliases[key]) || 0, -1, 1);
    if (Object.values(inputs).some(v => Math.abs(v) > .1)) returning = false;
  }
  function action(name) {
    if (name === 'inspect') {
      if (!running || completed) { emit('startFirst'); return false; }
      if (distanceToTarget() > 18) { emit('inspectionFar', { distance: Math.round(distanceToTarget()) }); return false; }
      if (velocity.length() > 3) { emit('slowDown', { limit: 3 }); return false; }
      if (lastInspected === progress) { emit('alreadyInspected'); return false; }
      lastInspected = progress; inspected++; emit('inspected', { index: progress + 1 }); onTelemetry(telemetry()); return true;
    }
    if (name === 'confirm') { briefed = true; emit('confirmed'); onTelemetry(telemetry()); return true; }
    if (name === 'assist') { assistance = !assistance; updateGates(); emit('assistance', { enabled: assistance }); return assistance; }
    if (name === 'return') { returning = true; running = true; completed = false; inputs = { forward: 0, turn: 0, strafe: 0, lift: 0 }; updateGates(); emit('returning'); return true; }
    return false;
  }
  reset(); raf = requestAnimationFrame(frame);
  return {
    setMode(value) { if (ROUTES[value] && value !== mode) { mode = value; reset(); emit('mode', { mode }); } },
    setDifficulty(value) { if (SETTINGS[value]) { difficulty = value; onTelemetry(telemetry()); } },
    setWeather(value) {
      weather = value;
      const foggy = value === 'fog', wet = value === 'rain', night = value === 'night';
      const sky = night ? '#132837' : foggy ? '#a9bfc2' : wet ? '#6f929e' : '#9acbd4';
      scene.background.set(sky); scene.fog.color.set(sky); scene.fog.near = foggy ? 18 : wet ? 50 : 95; scene.fog.far = foggy ? 115 : wet ? 190 : 300;
      sunlight.intensity = night ? .25 : wet ? 1.4 : 3.1; hemisphere.intensity = night ? .8 : 2.25;
      waterMat.color.set(night ? '#153e51' : wet ? '#377a86' : '#238e9d'); onTelemetry(telemetry());
    },
    setCamera(value) { if (['fpv', 'close', 'chase'].includes(value)) { cameraMode = value; applyCamera(true); onTelemetry(telemetry()); } },
    setAssistance(value) { assistance = !!value; updateGates(); onTelemetry(telemetry()); },
    start() { if (completed) reset(); running = true; emit('started'); onTelemetry(telemetry()); },
    pause() { running = false; returning = false; inputs = { forward: 0, turn: 0, strafe: 0, lift: 0 }; emit('paused'); onTelemetry(telemetry()); },
    reset, setInput, action,
    snapshot() { renderer.render(scene, camera); return canvas.toDataURL('image/png'); },
    destroy() {
      destroyed = true; cancelAnimationFrame(raf); observer.disconnect();
      const materials = new Set(); scene.traverse(obj => { if (obj.material) (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach(m => materials.add(m)); });
      materials.forEach(m => m.dispose()); geos.forEach(g => g.dispose()); textures.forEach(t => t.dispose()); renderer.dispose();
    },
  };
}
