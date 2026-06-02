import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { episodeCard } from '../components/episodesCard.js';

/**
 * Renderiza Home
 */
export async function renderEpisodes() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );
    const container = document.getElementById(
        'characters-container'
    );
    const characters = await getCharacters('/episode');
    container.innerHTML = characters
        .map(character => episodeCard(character))
        .join('');
}
