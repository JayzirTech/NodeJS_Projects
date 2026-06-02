export function saveLocalStorage(apiData) {
    localStorage.setItem('apiData', JSON.stringify(apiData));
}

export function loadLocalStorage() {
    if (localStorage.getItem('apiData')) {
        return JSON.parse(localStorage.getItem('apiData'));
    }
    return [];
}

export function saveCharactersDeletedLocalStorage(charactersDeleted) {
    localStorage.setItem('charactersDeleted', JSON.stringify(charactersDeleted));
}

export function loadCharactersDeletedLocalStorage() {
    if (localStorage.getItem('charactersDeleted')) {
        return JSON.parse(localStorage.getItem('charactersDeleted'));
    }
    return [];
}