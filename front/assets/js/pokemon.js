// Importe l'URL de base de l'API depuis le fichier de configuration
import { apiBaseUrl } from "./config.js";
import { fetchAndInsertAllTeams,  showPokemonSelectionModal, addPokemonToTeam, fetchTeam, afficheTeam } from "./team.js";


// Fonction pour récupérer et insérer tous les Pokémon dans le HTML
export async function fetchAndInsertAllPokemon() {
    // Effectue une requête GET pour obtenir tous les Pokémon
    const httpResponse = await fetch(`${apiBaseUrl}/pokemons`);
    // Convertit la réponse en JSON
    const pokemons = await httpResponse.json();

    // Pour chaque Pokémon récupéré, l'insère dans le HTML
    pokemons.forEach(pokemon => {
        insertPokemonInHTML(pokemon);
    });
    
}

// Fonction pour récupérer un Pokémon spécifique par son ID
export async function fetchPokemon(id) {
    try {
        // Effectue une requête GET pour obtenir un Pokémon spécifique
        const httpResponse = await fetch(`${apiBaseUrl}/pokemons/${id}`);
        if (!httpResponse.ok) {
            // Gère le cas où le Pokémon n'est pas trouvé
            if (httpResponse.status === 404) {
                console.error('Pokémon non trouvé');
                return null;
            }
            // Lance une erreur pour les autres types d'erreurs HTTP
            throw new Error('Erreur lors de la récupération du Pokémon');
        }
        
        // Convertit la réponse en JSON
        const pokemon = await httpResponse.json();
        setupAddPokemonToTeamModal(pokemon);
        console.log("Pokemon récupéré:", pokemon);
        return pokemon;
    } catch (error) {
        // Gère les erreurs lors de la récupération du Pokémon
        console.error("Erreur lors de la récupération du pokemon:", error);
        return null;
    }
}

// Fonction pour filtrer les Pokémon par type
export async function filterPokemonByType(event) {
    // Récupère l'ID du type sélectionné dans le menu déroulant
    const selectedTypeId = event.target.value;
    
    // Efface les Pokémon existants de la page
    const pokePage = document.querySelector('.poke-page');
    pokePage.innerHTML = '';

    try {
        let pokemons;
        if (selectedTypeId === "Trier par type") {
            // Si "Trier par type" est sélectionné, affiche tous les Pokémon
            const response = await fetch(`${apiBaseUrl}/pokemons`);
            pokemons = await response.json();
        } else {
            // Sinon, récupère les Pokémon filtrés par type
            const response = await fetch(`${apiBaseUrl}/types/${selectedTypeId}/pokemons`);
            pokemons = await response.json();
        }

        console.log("Pokémons à afficher:", pokemons);

        // Insère chaque Pokémon filtré dans le HTML
        pokemons.forEach(pokemon => {
            insertPokemonInHTML(pokemon);
        });
    } catch (error) {
        // Gère les erreurs lors du filtrage des Pokémon
        console.error("Erreur lors du filtrage des Pokémon:", error);
    }
}

// Fonction pour insérer un Pokémon dans le HTML
// Fonction pour insérer un Pokémon dans le HTML
export function insertPokemonInHTML(pokemon) {
    // Vérifie si le Pokémon est valide (a un id)
    if (!pokemon || !pokemon.id) {
        console.error("Pokemon invalide:", pokemon);
        return;
    }

    // Recherche le template Pokémon dans le HTML
    const pokemonTemplate = document.querySelector('.template-pokemon');
    if (!pokemonTemplate) {
        // Si le template n'est pas trouvé, crée un élément div à la place
        console.error("Template Pokemon non trouvé");
        const newPoke = document.createElement('div');
        newPoke.className = 'card-poke primary';
        newPoke.style.width = '18rem';
        // Crée le contenu HTML pour le Pokémon
        newPoke.innerHTML = `
            <img src="./assets/img/${pokemon.id}.webp" class="img-poke card-img-top w-75" alt="${pokemon.name}">
            <div class="card-body">
                <h5 class="title-poke card-title">${pokemon.name}</h5>
                <button type="button" class="btn-poke-card btn" data-bs-toggle="modal" data-bs-target="#addCardModal" data-pokemon-id="${pokemon.id}">Voir +</button>
            </div>
        `;
        // Ajoute le nouveau Pokémon à la page
        document.querySelector('.poke-page').appendChild(newPoke);
        return;
    }

    // Clone le contenu du template
    const newPoke = document.importNode(pokemonTemplate.content, true);

    // Remplit le clone avec les informations du Pokémon
    newPoke.querySelector('.img-poke').src = `./assets/img/${pokemon.id}.webp`;
    newPoke.querySelector('.img-poke').alt = pokemon.name;
    newPoke.querySelector('.title-poke').textContent = pokemon.name;
    newPoke.querySelector('.btn-poke-card').setAttribute('data-pokemon-id', pokemon.id);

    // Ajoute le nouveau Pokémon à la page
    document.querySelector('.poke-page').appendChild(newPoke);
}

export function setupAddPokemonToTeamModal(pokemon) {
    const addToTeamBtn = document.querySelector('.btn-poke-team');
    if (!addToTeamBtn) {
        console.error("Bouton d'ajout d'équipe non trouvé");
        return;
    }
    
    addToTeamBtn.addEventListener('click', async () => {
        const teamListModalElement = document.getElementById('teamListModal');
        if (!teamListModalElement) {
            console.error("Modal d'équipe non trouvée");
            return;
        }

        const teamListModal = new bootstrap.Modal(teamListModalElement);
        const modalBody = teamListModalElement.querySelector('.modal-body');
        if (!modalBody) {
            console.error("Corps de la modal non trouvé");
            return;
        }

        modalBody.innerHTML = ''; // Vide le contenu existant de la modal

        try {
            const teams = await fetchAndInsertAllTeams();
            if (!Array.isArray(teams) || teams.length === 0) {
                modalBody.innerHTML = '<p>Aucune équipe disponible.</p>';
                teamListModal.show();
                return;
            }
// Crée un formulaire pour chaque équipe

            // Si un formulaire à déja été cr&eé, on le supprime
            const existingForm = document.getElementById('add-pokemon-to-teams-form');
            if (existingForm) {
                existingForm.remove();
            }
            const form = document.createElement('form');
            form.id = 'add-pokemon-to-teams-form';

            teams.forEach(team => {
                const div = document.createElement('div');
                div.className = 'form-check';

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.className = 'form-check-input';
                input.id = `team-${team.id}`;
                input.name = 'selectedTeams';
                input.value = team.id;

                const label = document.createElement('label');
                label.className = 'form-check-label';
                label.htmlFor = `team-${team.id}`;
                label.textContent = team.name;

                div.appendChild(input);
                div.appendChild(label);
                form.appendChild(div);
            });


            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Valider';
            submitButton.className = 'btn btn-primary mt-3';
            form.appendChild(submitButton);

            modalBody.appendChild(form);

            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                const selectedTeams = Array.from(form.querySelectorAll('input[name="selectedTeams"]:checked'))
                    .map(checkbox => checkbox.value);
                const btnCloseModal = document.querySelector('.btn-close');
                
                if (selectedTeams.length > 0) {
                    for (const teamId of selectedTeams) {
                        try {
                            await addPokemonToTeam(teamId, pokemon.id);
                            console.log(`Pokémon ${pokemon.name} ajouté à l'équipe ${teamId}`);
                            
                            const updatedTeam = await fetchTeam(teamId);
                            if (updatedTeam) {
                                await afficheTeam(updatedTeam);
                            } else {
                                console.error(`Équipe ${teamId} non trouvée après l'ajout du Pokémon`);
                            }
                        } catch (error) {
                            console.error(`Erreur lors de l'ajout du Pokémon ${pokemon.name} à l'équipe ${teamId}:`, error);
                        }
                    }
                    teamListModal.hide();
                    alert('Pokémon ajouté avec succès aux équipes sélectionnées.');
                } else {
                    alert('Veuillez sélectionner au moins une équipe.');
                }
                btnCloseModal.addEventListener('Click', () => {
                    // Ferme la modal lorsque le bouton de fermeture est cliqué
                    teamListModal.hide();
                    // Nettoie les résidus de modal précédents
                    const backdrop = document.querySelectorAll('.modal-backdrop');
                    if (backdrop) {
                        backdrop.remove(); // Supprime le fond sombre de la modal précédente
                    }
                });
            });

            teamListModal.show();
        } catch (error) {
            console.error("Erreur lors de la récupération des équipes:", error);
            modalBody.innerHTML = '<p>Erreur lors du chargement des équipes</p>';
            teamListModal.show();
        }
    });
}