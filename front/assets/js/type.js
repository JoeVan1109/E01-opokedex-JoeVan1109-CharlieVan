import { apiBaseUrl } from "./config.js";
import { insertPokemonInHTML, filterPokemonByType } from "./pokemon.js";

export async function fetchAndInsertAllTypes() {
    const httpResponse = await fetch(`${apiBaseUrl}/types`);
    const types = await httpResponse.json();
    types.forEach(type => {
        insertTypeInHTML(type);
    });
}

export async function fetchType(id) {
    try {
        const httpResponse = await fetch(`${apiBaseUrl}/types/${id}`);
        const types = await httpResponse.json();
        types.forEach(type => {
            insertPokemonInHTML(type);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des types :", error);
    }
}



export function insertTypeInHTML(type) {
    if (!type || !type.id) {
        console.error("Type invalide:", type);
        return;
    }
    
    const formSelect = document.querySelector('.form-select');
    
    // Créer une nouvelle option
    const newOption = document.createElement('option');
    newOption.value = type.id;
    newOption.textContent = type.name;
    newOption.classList.add('value-type');
    
    // Ajouter la nouvelle option au select
    formSelect.appendChild(newOption);

    // Ajouter l'événement de changement s'il n'existe pas déjà
    if (!formSelect.hasAttribute('data-event-attached')) {
        formSelect.addEventListener('change', filterPokemonByType);
        formSelect.setAttribute('data-event-attached', 'true');
    }
}