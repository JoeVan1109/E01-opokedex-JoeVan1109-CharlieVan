// Importe l'URL de base de l'API depuis le fichier de configuration
import { apiBaseUrl } from "./config.js";
import { fetchPokemon } from "./pokemon.js";

// Fonction pour récupérer et insérer toutes les équipes dans le HTML

export async function fetchAndInsertAllTeams() {
    try {
        const token = localStorage.getItem('token'); // Récupérez le jeton d'authentification depuis le stockage local
        const response = await fetch(`${apiBaseUrl}/teams`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajoutez le jeton d'authentification dans les en-têtes
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const teams = await response.json();
        
        const selectTeam = document.querySelector('.select-team');
        if (selectTeam) {
            // Vider les options existantes sauf la première (si elle existe)
            while (selectTeam.options.length > 1) {
                selectTeam.remove(1);
            }

            teams.forEach(team => {
                const option = document.createElement('option');
                option.value = team.id;
                option.textContent = team.name;
                selectTeam.appendChild(option);
            });

            // Ajouter un écouteur d'événements pour gérer la sélection d'une équipe
            selectTeam.addEventListener('change', (event) => {
                const selectedTeamId = event.target.value;
                if (selectedTeamId !== "Sélectionner une équipe") {
                    fetchAndDisplayTeam(selectedTeamId);
                }
            });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des équipes:', error);
    }
}

// Fonction pour récupérer une équipe spécifique par son ID
export async function fetchTeam(id) {
    if (!id || typeof id !== 'string' && typeof id !== 'number') {
        console.error('ID d\'équipe invalide:', id);
        return null;
    }

    try {
        const httpResponse = await fetch(`${apiBaseUrl}/teams/${id}`);
        if (!httpResponse.ok) {
            if (httpResponse.status === 404) {
                console.error('Équipe non trouvée');
                return null;
            }
            throw new Error('Erreur lors de la récupération de l\'équipe');
        }
        const team = await httpResponse.json();
        console.log("Équipe récupérée:", team);
        return team;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'équipe:", error);
        return null;
    }
}


// Fonction pour récupérer et afficher une équipe spécifique
export async function fetchAndDisplayTeam(teamId) {
    try {
        const response = await fetch(`${apiBaseUrl}/teams/${teamId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const team = await response.json();
        insertTeamInHTML(team);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'équipe:", error);
    }
}



export async function openUpdateTeamModal(teamId) {
    console.log("ID de l'équipe reçu:", teamId); // Log pour vérification

    if (!teamId) {
        console.error("ID de l'équipe non fourni");
        return;
    }

    try {
        const modal = document.getElementById('updateTeamModal');
        
        const team = await fetchTeam(teamId);

        console.log("Équipe récupérée:", team); 

        if (!team) {
            console.error("Équipe non trouvée");
            return;
        }

        const form = modal.querySelector('#form-update-team');
        
        // Créer ou mettre à jour le champ caché pour l'ID de l'équipe
        let hiddenInput = form.querySelector('input[name="team-id"]');
        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'team-id';
            form.appendChild(hiddenInput);
        }
        hiddenInput.value = teamId;

        const nameInput = form.querySelector('#name-team');
        const descriptionInput = form.querySelector('#description-team');
        const titleElement = modal.querySelector('.title-team');

        if (nameInput) nameInput.value = team.name;
        if (descriptionInput) descriptionInput.value = team.description;
        if (titleElement) titleElement.textContent = `Modifier ${team.name}`;

        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    } catch (error) {
        console.error("Erreur lors de l'ouverture de la modal de mise à jour:", error);
    }
}


export function setupUpdateTeamListener() {
    const form = document.getElementById('form-update-team');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const teamModal = document.querySelector('#teamModal');
        const id = teamModal.getAttribute('data-team-id');

        console.log("Formulaire soumis");
        console.log("ID de l'équipe récupéré:", id);

        if (!id) {
            console.error("ID de l'équipe non trouvé");
            return;
        }

        const formData = new FormData(form);
        const teamData = Object.fromEntries(formData);

        console.log("Données du formulaire:", teamData);
        console.log("ID de l'équipe:", id);

        try {
            const response = await fetch(`${apiBaseUrl}/team/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(teamData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedTeam = await response.json();
            console.log("Équipe mise à jour avec succès:", updatedTeam);

            afficheTeam(updatedTeam);

            // Fermer la modal après la mise à jour
            const modal = bootstrap.Modal.getInstance(document.getElementById('updateTeamModal'));
            if (modal) {
                modal.hide();
            }

                // Afficher l'équipe mise à jour
                await afficheTeam(updatedTeam);

        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'équipe:", error);
            alert("Une erreur est survenue lors de la mise à jour de l'équipe.");
        }
    });
}
// Fonction pour supprimer une équipe
export async function deleteTeam(id) {
    

    if (!id) {
        console.error("ID de l'équipe non fourni");
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/team/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }

        console.log("Équipe supprimée avec succès");
        return true;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'équipe:", error);
        throw error;
    }
}

// Fonction pour initialiser l'écouteur d'événements sur le bouton de suppression
export function initDeleteTeamButton() {
    document.querySelector('.btn-delete-team').addEventListener('click', async (event) => {
        event.preventDefault();
        const teamId = event.target.getAttribute('data-team-id');
        
        if (!teamId) {
            console.error("ID de l'équipe non trouvé sur le bouton de suppression");
            return;
        }
    
        if (confirm("Êtes-vous sûr de vouloir supprimer cette équipe ?")) {
            try {
                await deleteTeam(teamId);
                // Fermer la modal et rafraîchir l'affichage des équipes
                bootstrap.Modal.getInstance(document.getElementById('teamModal')).hide();
                await fetchAndInsertAllTeams();
            } catch (error) {
                console.error("Erreur lors de la suppression de l'équipe:", error);
                alert("Une erreur est survenue lors de la suppression de l'équipe.");
            }
        }
    });
}

// Fonction pour créer une nouvelle équipe
export async function createTeam(teamData) {
    try {
        const response = await fetch(`${apiBaseUrl}/teams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamData)
        });

        if (!response.ok) {
            const errorText = await response.text(); // Lire le corps de la réponse une seule fois
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const team = await response.json();
        return team;
    } catch (error) {
        console.error('Erreur lors de la création de l\'équipe:', error);
        throw error;
    }
}


export async function afficheTeam(team) {

    const id = teamModal.getAttribute('data-team-id');
    console.log("Équipe à afficher:", team);

    if (!team || !id) {
        console.error("Équipe invalide ou ID manquant");
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/teams/${id}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur détaillée:", errorData);
            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }

        const updatedTeam = await response.json();

        const updateButton = document.querySelector('.btn-update-team');
        if (updateButton) {
            updateButton.setAttribute('data-team-id', updatedTeam.id);
            updateButton.onclick = () => openUpdateTeamModal(updatedTeam.id);
        }

        // Nettoyer les résidus de modal précédents
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        // Insérer l'équipe mise à jour dans le HTML
        insertTeamInHTML(updatedTeam);
    } catch (error) {
        console.error("Erreur lors de l'affichage de l'équipe:", error);
        alert("Une erreur est survenue lors de l'affichage de l'équipe. Veuillez réessayer.");
    }
}

// Fonction pour insérer une équipe dans le HTML
export function insertTeamInHTML(team) {
    if (!team || !team.id) {
        console.error("Équipe invalide:", team);
        return;
    }
    
    const teamModal = document.querySelector('#teamModal');
    if (!teamModal) {
        console.error("Modal d'équipe non trouvée");
        return;
    }

    // Mettre à jour le contenu de la modal
    const idElement = teamModal.querySelector('.id-team');
    const titleElement = teamModal.querySelector('.title-team');
    const descriptionElement = teamModal.querySelector('.description-team');
    const pokemonListElement = teamModal.querySelector('.pokemon-list');

    // Ajouter l'ID de l'équipe comme attribut data sur la modal
    teamModal.setAttribute('data-team-id', team.id);

    if (idElement) {
        idElement.textContent = team.id;
    }

    if (titleElement) {
        titleElement.textContent = team.name;
    }
    if (descriptionElement) {
        descriptionElement.textContent = team.description;
    }

    // Mettre à jour le bouton de suppression avec l'ID de l'équipe
    const deleteButton = teamModal.querySelector('.btn-delete-team');
    if (deleteButton) {
        deleteButton.setAttribute('data-team-id', team.id);
    }

    // Vider le contenu existant de la liste des Pokémon
    if (pokemonListElement) {
        pokemonListElement.innerHTML = '';

        if (team.pokemons && team.pokemons.length > 0) {
            const ul = document.createElement('ul');
            ul.className = 'list-group';
            team.pokemons.forEach(pokemon => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';

                 // Créer un conteneur pour l'image et le nom du Pokémon
                const pokemonInfo = document.createElement('div');
                pokemonInfo.className = 'd-flex align-items-center';
                
                // Créer l'élément image
                const img = document.createElement('img');
                img.src = `./assets/img/${pokemon.id}.webp`;
                img.alt = pokemon.name;
                img.className = 'me-2';
                img.style.width = '50px';
                
                // Ajouter l'image et le nom du Pokémon au conteneur
                pokemonInfo.appendChild(img);
                pokemonInfo.appendChild(document.createTextNode(pokemon.name));
                
                // Ajouter le conteneur à l'élément de liste
                li.appendChild(pokemonInfo);


                // Créer le bouton de suppression
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.className = 'btn btn-danger btn-sm';
                deleteButton.addEventListener('click', async () => {
                    try {
                        await deletePokemonFromTeam(team.id, pokemon.id);
                        // Rafraîchir l'affichage de l'équipe après la suppression
                        const updatedTeam = await fetchTeam(team.id);
                        insertTeamInHTML(updatedTeam);
                    } catch (error) {
                        console.error("Erreur lors de la suppression du Pokémon:", error);
                        alert("Erreur lors de la suppression du Pokémon. Veuillez réessayer.");
                    }
                });

                li.appendChild(deleteButton);
                ul.appendChild(li);
            });
            pokemonListElement.appendChild(ul);
        } else {
            pokemonListElement.innerHTML = '<p>Aucun Pokémon dans cette équipe.</p>';
        }
    }

    // Créer et afficher la modal
    const modalInstance = new bootstrap.Modal(teamModal);
    modalInstance.show();

}

export async function deletePokemonFromTeam(teamId, pokeId) {
    try {
        const response = await fetch(`${apiBaseUrl}/teams/${teamId}/pokemons/${pokeId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = await response.text();
            }
            console.error("Erreur détaillée:", errorData);
            throw new Error(`Erreur lors de la suppression du Pokémon: ${errorData}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression du Pokémon:", error);
        throw error;
    }
}
export function displayPokemonSelectionList(pokemons, teamId) {
    const modalBody = document.querySelector('#teamModal .modal-body');
    const selectionList = document.createElement('div');
    selectionList.className = 'pokemon-selection-list mt-3';
    selectionList.innerHTML = '<h6>Sélectionner un Pokémon à ajouter :</h6>';

    const ul = document.createElement('ul');
    pokemons.forEach(pokemon => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = pokemon.name;
        button.className = 'btn btn-link';
        button.addEventListener('click', async () => {
            try {
                await addPokemonToTeam(teamId, pokemon.id);
                alert("Pokémon ajouté à l'équipe avec succès !");
                // Rafraîchir l'affichage de l'équipe
                const updatedTeam = await fetchTeam(teamId);
                insertTeamInHTML(updatedTeam);
            } catch (error) {
                console.error("Erreur lors de l'ajout du Pokémon à l'équipe:", error);
                alert("Erreur lors de l'ajout du Pokémon à l'équipe. Veuillez réessayer.");
            }
        });
        li.appendChild(button);
        ul.appendChild(li);
    });

    selectionList.appendChild(ul);
    modalBody.appendChild(selectionList);

    // Supprimer la modall de la page
    
}

export async function showPokemonSelectionModal(teamId) {
    // Créer l'élément modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'pokemonSelectionModal';
    modal.innerHTML = ``;

    // Ajouter la modal au body
    document.body.appendChild(modal);

    // Récupérer la liste des Pokémon
    try {
        const response = await fetch(`${apiBaseUrl}/pokemons`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pokemons = await response.json();

        // Remplir la liste des Pokémon
        const pokemonList = modal.querySelector('.pokemon-list');
        pokemons.forEach(pokemon => {
            const li = document.createElement('li');
            li.innerHTML = `
                <button class="btn btn-link select-pokemon" data-pokemon-id="${pokemon.id}">
                    ${pokemon.name}
                </button>
            `;
            pokemonList.appendChild(li);
        });

        // Créer et afficher l'instance de la modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();

        // Ajouter les écouteurs d'événements aux boutons de sélection
        modal.querySelectorAll('.select-pokemon').forEach(button => {
            button.addEventListener('click', async () => {
                const pokemonId = button.getAttribute('data-pokemon-id');
                try {
                    await addPokemonToTeam(teamId, pokemonId);
                    modalInstance.hide();
                    alert("Pokémon ajouté à l'équipe avec succès !");
                    // Optionnel : Rafraîchir l'affichage de l'équipe
                } catch (error) {
                    console.error("Erreur lors de l'ajout du Pokémon à l'équipe:", error);
                    alert("Erreur lors de l'ajout du Pokémon à l'équipe. Veuillez réessayer.");
                }
            });
        });

        // Supprimer la modal du DOM une fois qu'elle est fermée
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon:", error);
        alert("Erreur lors du chargement des Pokémon. Veuillez réessayer.");
    }
}




export async function addPokemonToTeam(teamId, pokemonId) {
    try {
        const response = await fetch(`${apiBaseUrl}/teams/${teamId}/pokemons/${pokemonId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }

        const updatedTeam = await response.json();
        console.log("Pokémon ajouté à l'équipe avec succès:", updatedTeam);
        return updatedTeam;
    } catch (error) {
        console.error("Erreur lors de l'ajout du Pokémon à l'équipe:", error);
        throw error;
    }
}