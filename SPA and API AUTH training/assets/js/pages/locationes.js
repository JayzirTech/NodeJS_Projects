import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { episodeCard } from '../components/episodesCard.js';
import { locationCard } from '../components/locationsCard.js';

/**
 * Renderiza Home
 */
export async function renderLocations() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );
    const container = document.getElementById(
        'characters-container'
    );
    const characters = await getCharacters('/location');
    container.innerHTML = characters
        .map(character => locationCard(character))
        .join('');
}
