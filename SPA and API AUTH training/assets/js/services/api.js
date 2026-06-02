/**
 * Servicio API Rick and Morty
 */

import { loadLocalStorage, saveLocalStorage } from './localStorage.js';
import httpClient from './httpClient.js';

/**
 * Obtiene personajes.
 *
 * @returns {Promise<Array>}
 */

// Hago un array para guardar los personajes de la API


export async function getCharacters(params) {
    let apiData = await loadLocalStorage();

    if (apiData.length > 0) {        
        return apiData;
    }

    try {
        const response = await httpClient.get(params);
        saveLocalStorage(response.data.results);
        return response.data.results;

    } catch (error) {
        console.error(error);
        return [];
    }
}