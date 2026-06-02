import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { deleteCharacter } from '../utils/deleteCharacter.js';
import { router } from '../router.js';

/**
 * Renderiza Home
 */
export async function renderHome() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );
    const container = document.getElementById(
        'characters-container'
    );
    const characters = await getCharacters('/character');
    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('');
    
    // Agregar listeners a los botones delete
    container.addEventListener('click', (e) => {
        if (e.target.id.startsWith('delete-')) {
            const characterId = e.target.id.replace('delete-', '');
            deleteCharacter(characterId);
        }
        if (e.target.href) {
            e.preventDefault();
        }
    });
}

