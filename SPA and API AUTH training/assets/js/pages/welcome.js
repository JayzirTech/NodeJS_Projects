import { loadHTML } from '../utils/helpers.js';

/**
 * Renderiza About
 */
export async function renderWelcome() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/welcome.html'
    );
}