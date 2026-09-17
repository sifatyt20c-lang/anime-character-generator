const API = 'https://v2.jokeapi.dev/joke/';
let currentJoke = null;
let count = Number(localStorage.getItem('laugh-count') || 0);
let favorites = JSON.parse(localStorage.getItem('laugh-favorites') || '[]');
const $ = selector => document.querySelector(selector);
const card = $('#jokeCard');

async function generateJoke() {
  card.classList.add('loading'); $('#error').textContent = '';
  const category = $('#category').value;
  const safe = $('#safeMode').checked ? '&safe-mode' : '';
  try {
    const response = await fetch(`${API}${encodeURIComponent(category)}?type=single,twopart${safe}&blacklistFlags=nsfw,religious,political,racist,sexist,explicit`);
    if (!response.ok) throw new Error('The comedy relay is unavailable.');
    const data = await response.json();
    if (data.error) throw new Error(data.message || 'No joke found in this channel.');
    currentJoke = { setup: data.type === 'single' ? data.joke : data.setup, delivery: data.type === 'single' ? '' : data.delivery, category: data.category };
    count += 1; localStorage.setItem('laugh-count', count); renderJoke();
  } catch (error) { $('#error').textContent = `${error.message} Try again in a moment.`; }
  finally { card.classList.remove('loading'); }
}
function renderJoke() {
  $('#jokeNumber').textContent = `#${String(count).padStart(4, '0')}`;
  $('#jokeContent').innerHTML = `<p class="setup">${escapeHtml(currentJoke.setup)}</p>${currentJoke.delivery ? `<p class="delivery">${escapeHtml(currentJoke.delivery)}</p>` : ''}`;
  $('#favoriteButton').classList.toggle('active', favorites.some(j => j.setup === currentJoke.setup));
}
function escapeHtml(value) { const div = document.createElement('div'); div.textContent = value; return div.innerHTML; }
function renderFavorites() { $('#favorites').innerHTML = favorites.length ? favorites.map((j, i) => `<button class="favorite-item" data-index="${i}" type="button">${escapeHtml(j.setup)}${j.delivery ? ` — ${escapeHtml(j.delivery)}` : ''}</button>`).join('') : '<p>No saved jokes yet. Find one worth keeping.</p>'; document.querySelectorAll('.favorite-item').forEach(el => el.onclick = () => { currentJoke = favorites[el.dataset.index]; renderJoke(); }); }
$('#newJoke').onclick = generateJoke;
$('#safeMode').onchange = generateJoke;
$('#category').onchange = generateJoke;
$('#copyButton').onclick = async () => { if (!currentJoke) return; await navigator.clipboard.writeText([currentJoke.setup, currentJoke.delivery].filter(Boolean).join('\n')); $('#copyButton').textContent = '✓ COPIED'; setTimeout(() => $('#copyButton').textContent = '▣ COPY', 1400); };
$('#favoriteButton').onclick = () => { if (!currentJoke) return; const found = favorites.findIndex(j => j.setup === currentJoke.setup); found >= 0 ? favorites.splice(found, 1) : favorites.unshift(currentJoke); localStorage.setItem('laugh-favorites', JSON.stringify(favorites)); renderJoke(); renderFavorites(); };
document.addEventListener('keydown', event => { if (event.key === 'Enter' && document.activeElement.tagName !== 'SELECT') generateJoke(); });
renderFavorites(); generateJoke();
