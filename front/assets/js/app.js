import { initPokeModal, initTeam } from './modal.js';
import { fetchAndInsertAllPokemon } from './pokemon.js';
import { fetchAndInsertAllTypes } from './type.js';
import { fetchAndInsertAllTeams } from './team.js';
import { setupUpdateTeamListener } from './team.js';
import { initDeleteTeamButton } from './team.js';


document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log("Initialisation de l'application...");
        
        await initPokeModal();
        console.log("Modal Pokémon initialisée");
        
        await initTeam();
        console.log("Fonctionnalité d'équipe initialisée");
        
        await fetchAndInsertAllPokemon();
        console.log("Pokémon récupérés et insérés");
        
        await fetchAndInsertAllTypes();
        console.log("Types récupérés et insérés");

        await fetchAndInsertAllTeams();
        console.log("Équipes récupérées et insérées");

        await setupUpdateTeamListener();
        console.log("Écouteur d'événements pour la mise à jour des équipes initialisé");

        await initDeleteTeamButton();
        console.log("Équipe supprimée avec succès");
        
        console.log("Initialisation terminée avec succès");

    } catch (error) {
        console.error("Erreur lors de l'initialisation de l'application:", error);
    }
});