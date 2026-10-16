/* Resilience Crew Lab v3 — one distinct pictogram per mission type (24×24, stroke), plus a colour per type.
   Shared by the Crew Lab pages and the simulator. Original drawings, CC0. */
export const CREW_ICONS = {
  'sar-mountain': ['#3f7d5a', 'M2 20 9 8l4 6 3-4 6 10zM15 5a2 2 0 1 0 0 .1M15 7v3M13.5 8.5h3'],
  'flood-extent': ['#2d6fa3', 'M3 9l4-3 4 3 4-3 4 3M2 14c2-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0M2 19c2-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0'],
  'roof-inspect': ['#8a5a3c', 'M3 12 12 4l9 8M5 10v10h14V10M9 20v-5h6v5M16 7V4h2v5'],
  'medical-delivery': ['#c0392b', 'M4 8h16v12H4zM9 8V5h6v3M12 11v6M9 14h6'],
  'forest-observe': ['#2e7d32', 'M7 3 3 11h8zM7 11v9M17 6l-4 8h8zM17 14v6M2 20h20'],
  'solar-inspect': ['#d4a017', 'M3 18 6 9h14l-3 9zM8 9l-2 9M12 9l-1 9M16 9l-1 9M4.5 13.5h15M12 2v3M6 4l1.5 2M18 4l-1.5 2'],
  'bridge-record': ['#5d6d7e', 'M2 17h20M2 12h20M5 12v8M19 12v8M12 12v8M5 12c2-5 12-5 14 0'],
  'storm-assess': ['#6c5ce7', 'M4 10c0-4 4-6 8-6s8 2 8 6M2 14h13a3 3 0 1 0-3-3M2 18h17a3 3 0 1 1-3 3'],
  'landslide-watch': ['#a0522d', 'M2 20 10 6l10 14zM10 6l2 6-3 3 2 5M15 15h2M14 18h3M6 18h2'],
  'wildfire-watch': ['#e67e22', 'M12 21c-4 0-6-3-6-6 0-4 4-6 4-10 3 2 3 4 3 6 1-1 2-2 2-4 3 2 3 5 3 8 0 3-2 6-6 6zM12 21c-1.5 0-2.5-1-2.5-2.5S12 15 12 15s2.5 2 2.5 3.5S13.5 21 12 21'],
  'coast-erosion': ['#c8a165', 'M2 8c3 0 4 3 7 3s4-3 7-3 4 2 6 2M2 13c3 0 4 3 7 3s4-3 7-3 4 2 6 2M13 20l3-4 3 4zM5 20l2-3 2 3'],
  'heritage-record': ['#9b2d30', 'M3 9 12 3l9 6M3 9h18M5 9v9M9 9v9M15 9v9M19 9v9M2 20h20'],
  'wildlife-census': ['#16a085', 'M4 12c3-4 7-4 10 0-3 4-7 4-10 0zM14 12l4-3v6zM8 12h.1M4 20h16M6 17v3M10 17v3'],
  'crop-survey': ['#7cb342', 'M2 20 8 8h8l6 12zM6 14h12M4 17h16M10 8l-2 12M14 8l2 12M12 2v4M10 4h4'],
  'lighthouse-inspect': ['#e0a800', 'M9 21 10 8h4l1 13zM9 8h6M10 8V5l2-2 2 2v3M3 6l4 1M21 6l-4 1M8 14h8'],
  'relay-comms': ['#00838f', 'M12 10v11M8 21h8M12 10a2 2 0 1 0 0-.1M7 5a7 7 0 0 0 0 9M17 5a7 7 0 0 1 0 9M4 2a11 11 0 0 0 0 15M20 2a11 11 0 0 1 0 15'],
  'aerial-survey': ['#34495e', 'M2 12h20M12 5l-2 7 2 7M5 9l2 3-2 3M19 12l3-2v4zM8 12l-1-5h2l3 5'],
  'relief-sorting': ['#d35400', 'M3 10h8v9H3zM13 10h8v9h-8zM8 3h8v7H8zM6 13h2M16 13h2M11 5h2'],
  'accessible-route': ['#2471a3', 'M12 4a1.5 1.5 0 1 0 0 .1M11 7v6h5l2 5M11 10h5M8 11a6 6 0 1 0 8 6'],
  'road-obstacle': ['#e74c3c', 'M4 21 10 3h4l6 18zM8 15h8M9 11h6M2 21h20'],
  'shelter-inspect': ['#27ae60', 'M3 11 12 4l9 7M5 10v10h14V10M10 20v-5h4v5M12 8v1'],
  'load-balance': ['#8e44ad', 'M12 4v16M5 20h14M4 8h16M4 8l-2 6h4zM20 8l-2 6h4zM12 4a1 1 0 1 0 0 .1'],
  'vehicle-precheck': ['#2c3e50', 'M3 15l2-6h14l2 6v4H3zM5 9l2-4h10l2 4M7 19v2M17 19v2M7 15h.1M17 15h.1M10 12l2 2 3-4'],
  'relay-transport': ['#117a65', 'M2 15h7v4H2zM15 15h7v4h-7zM9 17h6M12 14l3 3-3 3M4 15v-3h3l2 3M17 15v-3h3l2 3'],
  'trail-patrol': ['#6d4c41', 'M3 21c4-4 2-8 6-11s7-2 8-7M14 21c1-3 4-4 7-5M9 9h.1M6 15h.1M17 6l2-2'],
  'tunnel-portal': ['#4e5d6c', 'M2 20V10a10 7 0 0 1 20 0v10M7 20v-7a5 4 0 0 1 10 0v7M2 20h20M12 15v5'],
  'market-logistics': ['#b9770e', 'M3 10l2-5h14l2 5M3 10h18v10H3zM9 20v-6h6v6M3 10c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0'],
  'marine-litter': ['#1abc9c', 'M2 16c2-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0M9 4h2v3l1 2v5H8V9l1-2zM15 9l3 1-1 4-3-1z'],
  'harbor-inspect': ['#1f618d', 'M12 3v14M8 7h8M12 3a1.5 1.5 0 1 0 0 .1M4 13a8 8 0 0 0 16 0M4 13l2 2M20 13l-2 2M2 20h20'],
  'lifebuoy-delivery': ['#e74c3c', 'M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 12m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0M6.3 6.3l3.2 3.2M17.7 6.3l-3.2 3.2M6.3 17.7l3.2-3.2M17.7 17.7l-3.2-3.2'],
  'water-sampling': ['#3498db', 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7 15h10'],
  'pier-inspect': ['#7f8c8d', 'M2 10h20M4 10v10M9 10v10M15 10v10M20 10v10M2 16c2-1 3-1 5 0s3 1 5 0 3-1 5 0 3 1 5 0M6 10V6h4v4'],
  'lake-patrol': ['#2e86c1', 'M3 15h14l3-4H8l-2-3H4zM10 8V5h3l2 3M2 19c2-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0'],
  'oil-sheen-watch': ['#5b2c6f', 'M12 3c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10zM2 20c2-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0M10 14a2 2 0 0 0 2 2'],
  'reef-survey': ['#ff6f61', 'M12 21v-8M12 13l-4-4V5M12 13l4-4V6M8 9 5 7M16 9l3-2M12 17l-3-2M12 17l3-2M4 21h16'],
  'seagrass-record': ['#4caf50', 'M6 21c0-6-2-9-2-14M10 21c0-5 1-8 3-12M14 21c0-4-1-7-3-9M18 21c0-6 1-9 3-13M2 21h20'],
  'hull-inspect': ['#2c3e50', 'M2 10h20l-3 7H5zM5 10V6h9l3 4M8 6V4M2 20c2-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0M17 13h.1'],
  'cable-check': ['#0e6655', 'M2 14c4-3 6 3 10 0s6-3 10 0M2 19h20M7 8h4v4H7zM11 10h3M9 8V5M15 4l3 3'],
  'lake-bottom': ['#154360', 'M2 6c2-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0M2 20h20M5 20l2-3 2 3M15 20l3-5 3 5M10 12h4v3h-4zM12 9v3'],
  'phishing': ['#c0392b', 'M3 5h18v13H3zM3 5l9 7 9-7M17 12v4a2 2 0 0 1-4 0'],
  'mfa': ['#2980b9', 'M7 3h10v18H7zM10 18h4M12 7a2 2 0 0 1 2 2v2h-4V9a2 2 0 0 1 2-2zM9.5 11h5v3h-5z'],
  'backup': ['#16a085', 'M12 3c5 0 8 1.5 8 3s-3 3-8 3-8-1.5-8-3 3-3 8-3zM4 6v6c0 1.5 3 3 8 3M20 6v4M15 17a4 4 0 1 0 1.5-3.2M15 13v2h2'],
  'fact-check': ['#8e44ad', 'M10 10m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0M14.5 14.5 20 20M7.5 10l2 2 3.5-4'],
  'permissions': ['#d35400', 'M9 7a3 3 0 1 0 0 .1M3 20v-1a6 6 0 0 1 9-5M16 13v-2a2 2 0 0 1 4 0v2M15 13h6v6h-6z'],
  'handover': ['#2c3e50', 'M8 4h8v3H8zM6 5H4v16h16V5h-2M8 12h8M8 16h5'],
  'comms-outage': ['#7f8c8d', 'M12 20h.1M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 14 0M2 9.5a15 15 0 0 1 20 0M3 3l18 18'],
  'weather-brief': ['#f39c12', 'M7 9a4 4 0 0 1 7.7-1.5A3.5 3.5 0 1 1 17 15H7a3 3 0 0 1 0-6zM9 19l-1 2M13 19l-1 2M17 19l-1 2'],
  'map-reading': ['#27ae60', 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15M12 10a1.5 1.5 0 1 0 0 .1'],
  'image-privacy': ['#34495e', 'M3 7h4l2-3h6l2 3h4v12H3zM12 13m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0M3 3l18 18'],
};
export function crewIcon(type, size = 24, color) {
  const [c, d] = CREW_ICONS[type] || ['#556', 'M4 4h16v16H4z'];
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" fill="none" stroke="${color || c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
}
export const crewColor = type => (CREW_ICONS[type] || ['#556'])[0];
/* satellite imagery (Esri World Imagery) tiles around a place: distinct, real picture for every mission card */
export function satTiles(lat, lon, z = 16) {
  const n = 2 ** z, x = (lon + 180) / 360 * n, s = Math.sin(lat * Math.PI / 180), y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n;
  const tx = Math.floor(x - 0.5), ty = Math.floor(y - 0.5);
  return { z, tiles: [[tx, ty], [tx + 1, ty], [tx, ty + 1], [tx + 1, ty + 1]].map(([i, j]) => `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${j}/${i}`), fx: x - tx, fy: y - ty };
}
