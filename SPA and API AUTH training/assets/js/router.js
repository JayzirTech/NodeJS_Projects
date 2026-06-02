/**
 * Router SPA
 */

import { renderHome } from './pages/home.js';
import { renderContacts } from './pages/contacts.js';
import { renderAbout } from './pages/about.js';
import { renderWelcome } from './pages/welcome.js';
import { renderEpisodes } from './pages/episodes.js';
import { renderLocations } from './pages/locationes.js';
import { renderCharactersDeleted } from './pages/CharatersDeleted.js';

/**
 * Rutas disponibles
 */
const routes = {
    '/': renderWelcome,
    '/characters': renderHome,
    '/episodes': renderEpisodes,
    '/locations': renderLocations,
    '/contacts': renderContacts,
    '/about': renderAbout,
    '/charactersDeleted': renderCharactersDeleted
};

/**
 * Router principal
 */
export async function router() {

    // Obtiene ruta real
    const path = window.location.pathname;
    // Busca render
    const render = routes[path];
    if (render) {
        await render();
    } else {
        document.getElementById('content').innerHTML = `
            <section class="page-404">
                <h2>404 - Page Not Found</h2>
            </section>
        `;
    }
}