const defaultZones = ['Asia/Tokyo', 'America/New_York', 'Europe/London', 'Australia/Sydney'];
const zoneNames = {
  'Asia/Tokyo': 'Tokyo', 'America/New_York': 'New York', 'Europe/London': 'London', 'Australia/Sydney': 'Sydney',
  'Europe/Paris': 'Paris', 'Asia/Kolkata': 'Mumbai', 'Asia/Seoul': 'Seoul', 'America/Los_Angeles': 'Los Angeles',
  'America/Sao_Paulo': 'São Paulo', 'Africa/Cairo': 'Cairo', 'Pacific/Auckland': 'Auckland', 'Asia/Singapore': 'Singapore'
};
let zones = JSON.parse(localStorage.getItem('chrono-zones') || 'null') || defaultZones;
let hour12 = localStorage.getItem('chrono-format') === '12';
const grid = document.querySelector('#clockGrid');
const select = document.querySelector('#zoneSelect');
const formatButton = document.querySelector('#formatToggle');
const search = document.querySelector('#zoneSearch');

function save() { localStorage.setItem('chrono-zones', JSON.stringify(zones)); localStorage.setItem('chrono-format', hour12 ? '12' : '24'); }
function city(zone) { return zoneNames[zone] || zone.split('/').pop().replaceAll('_', ' '); }
function offset(zone, date) { const parts = new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'longOffset' }).formatToParts(date); return parts.find(p => p.type === 'timeZoneName')?.value.replace('GMT', 'UTC') || 'UTC'; }
function render() {
  const term = search.value.toLowerCase();
  grid.innerHTML = zones.filter(z => city(z).toLowerCase().includes(term) || z.toLowerCase().includes(term)).map((zone, index) => `
    <article class="clock-card"><div class="card-top"><span class="city">${city(zone)}</span><button class="remove" data-index="${index}" aria-label="Remove ${city(zone)}">×</button></div>
    <div class="time" data-zone="${zone}">--:--:<span class="seconds">--</span></div><div class="date" data-date-zone="${zone}">Loading date...</div><span class="offset" data-offset-zone="${zone}">${offset(zone, new Date())}</span></article>`).join('') || '<p>No matching zones found.</p>';
  document.querySelectorAll('.remove').forEach(btn => btn.onclick = () => { zones.splice(Number(btn.dataset.index), 1); save(); render(); });
  updateTimes();
}
function updateTimes() {
  const now = new Date();
  document.querySelectorAll('[data-zone]').forEach(el => { const parts = new Intl.DateTimeFormat('en-GB', { timeZone: el.dataset.zone, hour:'2-digit', minute:'2-digit', second:'2-digit', hour12 }).formatToParts(now); const get = type => parts.find(p => p.type === type)?.value || ''; el.innerHTML = `${get('hour')}:${get('minute')}:<span class="seconds">${get('second')}</span>${hour12 ? ` ${get('dayPeriod')}` : ''}`; });
  document.querySelectorAll('[data-date-zone]').forEach(el => el.textContent = new Intl.DateTimeFormat('en-US', { timeZone:el.dataset.dateZone, weekday:'long', month:'short', day:'numeric', year:'numeric' }).format(now));
  document.querySelectorAll('[data-offset-zone]').forEach(el => el.textContent = offset(el.dataset.offsetZone, now));
  document.querySelector('#syncStatus').textContent = `SYNCED ${now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
}
function populate() { Object.keys(zoneNames).sort().forEach(zone => { if (!zones.includes(zone)) { const option = document.createElement('option'); option.value=zone; option.textContent=`${city(zone)} — ${zone}`; select.append(option); } }); }
formatButton.onclick = () => { hour12 = !hour12; formatButton.textContent = hour12 ? '12H FORMAT' : '24H FORMAT'; save(); updateTimes(); };
document.querySelector('#addZone').onclick = () => { if (select.value) { zones.push(select.value); populate(); save(); render(); } };
search.oninput = render;
document.querySelector('#themeToggle').onclick = () => document.body.classList.toggle('light');
formatButton.textContent = hour12 ? '12H FORMAT' : '24H FORMAT'; populate(); render(); setInterval(updateTimes, 1000);
