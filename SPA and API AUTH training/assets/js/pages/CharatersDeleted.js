import { characterDeletedCard } from "../components/characterDeleted";
import { loadCharactersDeletedLocalStorage } from "../services/localStorage";
import { loadHTML } from "../utils/helpers";
import { restoreCharacter } from "../utils/restoreCharaters";


export async function renderCharactersDeleted() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );
    const container = document.getElementById(
        'characters-container'
    );
    const charactersDeleted = await loadCharactersDeletedLocalStorage();

    container.innerHTML = charactersDeleted
        .map(character => characterDeletedCard(character))
        .join('');

    // Agregar listeners a los botones delete
    container.addEventListener('click', (e) => {
        if (e.target.id.startsWith('restore-')) {
            const characterId = e.target.id.replace('restore-', '');
            restoreCharacter(characterId);
        }
        if (e.target.href) {
            e.preventDefault();
        }
    });
}