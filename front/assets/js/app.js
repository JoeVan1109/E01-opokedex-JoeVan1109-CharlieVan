import { initPokeModal, initTeam } from './modal.js';
import { fetchAndInsertAllPokemon } from './pokemon.js';
import { fetchAndInsertAllTypes } from './type.js';
import { fetchAndInsertAllTeams, setupUpdateTeamListener, initDeleteTeamButton } from './team.js';

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

        // Vérifiez si l'utilisateur est connecté
        const token = localStorage.getItem('token');
        if (token) {
            await fetchAndInsertAllTeams(); // Récupérer les équipes seulement si l'utilisateur est connecté
            console.log("Équipes récupérées et insérées");
        } else {
            console.log("Utilisateur non connecté, les équipes ne seront pas chargées.");
        }

        await setupUpdateTeamListener();
        console.log("Écouteur d'événements pour la mise à jour des équipes initialisé");

        await initDeleteTeamButton();
        console.log("Bouton de suppression d'équipe initialisé");
        
        console.log("Initialisation terminée avec succès");
    } catch (error) {
        console.error("Erreur lors de l'initialisation de l'application:", error);
    }
});