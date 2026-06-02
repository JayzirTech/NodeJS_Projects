/**
 * Elimina una tarjeta de personaje con confirmación y animación
 * 
 * @param {number} id - ID del personaje a eliminar
 */

import { loadCharactersDeletedLocalStorage, loadLocalStorage, saveCharactersDeletedLocalStorage, saveLocalStorage } from "../services/localStorage";

export function deleteCharacter(id) {
    // Solicitar confirmación
    if (confirm('Are you sure you want to delete this character?')) {
        const article = document.getElementById(id);
        if (article) {
            // Agregar clase para animación de eliminación
            article.classList.add('fade-out');

            // Esperar a que termine la animación (300ms)
            setTimeout(() => {
                article.remove();
                let apiData = loadLocalStorage(); // Obtengo los personajes de localStorage
                let charactersDeleted = loadCharactersDeletedLocalStorage(); // Obtengo los personajes eliminados de localStorage
                
                charactersDeleted.push(apiData.find(char => char.id === parseInt(id))); // Agrego el personaje eliminado al array
                apiData = apiData.filter(char => char.id !== parseInt(id)); // Quito el personaje eliminado del array
                
                saveLocalStorage(apiData); // Guardo los personajes actualizados en localStorage
                saveCharactersDeletedLocalStorage(charactersDeleted); // Guardo los personajes eliminados en localStorage
            }, 300);
        }
    }
}