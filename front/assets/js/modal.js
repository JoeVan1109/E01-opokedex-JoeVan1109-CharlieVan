import { apiBaseUrl } from "./config.js";
import { fetchPokemon, setupAddPokemonToTeamModal } from "./pokemon.js";
import { createTeam, insertTeamInHTML } from './team.js';

export function initPokeModal() {
    try {
        const modalElement = document.getElementById('addCardModal');
        if (!modalElement) {
            throw new Error("L'élément modal 'addCardModal' n'a pas été trouvé");
        }
        const modal = new bootstrap.Modal(modalElement);

        const pokePage = document.querySelector('.poke-page');
        if (!pokePage) {
            throw new Error("L'élément '.poke-page' n'a pas été trouvé");
        }

        pokePage.addEventListener('click', async function(event) {
            if (event.target.classList.contains('btn-poke-card')) {
                const pokemonId = event.target.getAttribute('data-pokemon-id');
                const pokemon = await fetchPokemon(pokemonId);
                if (pokemon) {
                    updateModal(pokemon);
                    modal.show();
                } else {
                    console.error('Pokémon non trouvé');
                    // Afficher un message d'erreur à l'utilisateur
                }
            }
        });

        console.log("Modal Pokémon initialisée avec succès");
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la modal Pokémon:", error);
    }
}

export function initTeam() {
    const createModalElement = document.getElementById('addCreateTeamModal');
    const form = document.getElementById('form-create-team');

    if (!createModalElement || !form) {
        console.error("Éléments nécessaires non trouvés");
        return;
    }

    const createModal = new bootstrap.Modal(createModalElement);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const teamData = {
            name: formData.get('name'),
            description: formData.get('description')
        };
    
        try {
            const newTeam = await createTeam(teamData);
            console.log("Nouvelle équipe créée:", newTeam);
            
            // Fermer la modal de création
            createModal.hide();
            
            // Insérer et afficher la nouvelle équipe
            insertTeamInHTML(newTeam);
            
            // Réinitialiser le formulaire
            form.reset();
        } catch (error) {
            console.error("Erreur lors de la création de l'équipe:", error);
            // Afficher un message d'erreur à l'utilisateur
        }
    });
}



function updateModal(pokemon) {
    if (!pokemon) {
        console.error("Données du Pokémon invalides");
        return;
    }
    const modalContent = document.getElementById('addCardModal');
    if (!modalContent) {
        console.error("Modal Pokémon non trouvée");
        return;
    }
    modalContent.querySelector('.modal-title').textContent = pokemon.name;
    modalContent.querySelector('.img-poke').src = `./assets/img/${pokemon.id}.webp`;
    modalContent.querySelector('.img-poke').alt = pokemon.name;
    modalContent.querySelector('.title-poke').textContent = pokemon.name;
    modalContent.querySelector('.pv').textContent = pokemon.hp;
    modalContent.querySelector('.atk').textContent = pokemon.atk;
    modalContent.querySelector('.def').textContent = pokemon.def;
    modalContent.querySelector('.atk-spe').textContent = pokemon.atk_spe;
    modalContent.querySelector('.def-spe').textContent = pokemon.def_spe;
    modalContent.querySelector('.speed').textContent = pokemon.speed;
}
