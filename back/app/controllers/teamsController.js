import { Teams } from "../models/modelRelation.js";
import { Pokemons } from "../models/modelRelation.js";
import { Types } from "../models/modelRelation.js";

export const getAllTeams = async (req, res) => {
    try {
        const teams = await Teams.findAll();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOneTeam = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(id);
        const team = await Teams.findByPk(id, {
            include: [{
                model: Pokemons,
                as: 'pokemons',
                attributes: ['id', 'name', 'hp', 'atk', 'def', 'atk_spe', 'def_spe', 'speed'],
                through: {
                    attributes: []
                },
                include: [{
                    model: Types,
                    as: 'types',
                    attributes: ['id', 'name', 'color'],
                    through: {
                        attributes: []
                    }
                }]
            }]
        });

        if (!team) {
            return res.status(404).json({ message: "Équipe non trouvée" });
        }

        res.json(team);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'équipe:", error);
        res.status(500).json({ error: error.message });
    }
}

export const createTeam = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newTeam = await Teams.create({ name, description });
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedTeam = await Teams.update(
            { name, description },
            { where: { id } }
        );
        res.json(updatedTeam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;

        // Supprimer d'abord les associations dans team_pokemon
        const deletedAssociations = await Teams.findByPk(id, {
            include: ['pokemons']
        }).then(team => {
            if (team) {
                return team.setPokemons([]);
            }
            return null;
        });

        // Ensuite, supprimer l'équipe
        const deletedTeam = await Teams.destroy({ where: { id } });
        
        res.json({
            teamDeleted: deletedTeam,
            associationsRemoved: deletedAssociations !== null
        });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'équipe:", error);
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour ajouter un Pokémon à une équipe
export const addPokemonToTeam = async (req, res) => {
    try {
        // Récupération des IDs de l'équipe et du Pokémon depuis les paramètres de l'URL
        const teamId = Number(req.params.teamId);
        const pokeId = Number(req.params.pokeId);

        // Affichage des IDs pour le débogage
        console.log('Team ID:', teamId);
        console.log('Pokemon ID:', pokeId);

        // Recherche de l'équipe dans la base de données, en incluant ses Pokémons associés
        const team = await Teams.findByPk(teamId, {
            include: {
                association: 'pokemons',
            }
        });

        // Si l'équipe n'est pas trouvée, renvoyer une erreur 404
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // Recherche du Pokémon dans la base de données
        const pokemon = await Pokemons.findByPk(pokeId);
        // Si le Pokémon n'est pas trouvé, renvoyer une erreur 404
        if (!pokemon) {
            return res.status(404).json({ error: "Pokemon not found" });
        }

        // Ajout du Pokémon à l'équipe
        await team.addPokemon(pokemon);

        // Rechargement des données de l'équipe pour inclure le nouveau Pokémon
        await team.reload({ include: ['pokemons'] });

        // Envoi de l'équipe mise à jour en réponse
        res.json(team);
    } catch (error) {
        // En cas d'erreur, log l'erreur et renvoie un statut 500 avec le message d'erreur
        console.error('Error in addPokemonToTeam:', error);
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour supprimer un Pokémon d'une équipe
export const deletePokemonFromTeam = async (req, res) => {
    try {
        // Récupération des IDs de l'équipe et du Pokémon depuis les paramètres de l'URL
        const teamId = Number(req.params.teamId);
        const pokeId = Number(req.params.pokeId);

        // Affichage des IDs pour le débogage
        console.log('Team ID:', teamId);
        console.log('Pokemon ID:', pokeId);

        // Recherche de l'équipe dans la base de données, en incluant ses Pokémons associés
        const team = await Teams.findByPk(teamId, {
            include: {
                association: 'pokemons',
            }
        });

        // Si l'équipe n'est pas trouvée, renvoyer une erreur 404
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // Recherche du Pokémon dans la base de données
        const pokemon = await Pokemons.findByPk(pokeId);
        // Si le Pokémon n'est pas trouvé, renvoyer une erreur 404
        if (!pokemon) {
            return res.status(404).json({ error: "Pokemon not found" });
        }

        // Suppression du Pokémon de l'équipe
        await team.removePokemons(pokemon);

        // Rechargement des données de l'équipe pour refléter la suppression du Pokémon
        await team.reload({ include: ['pokemons'] });

        // Envoi de l'équipe mise à jour en réponse
        res.json(team);
        
    } catch (error) {
        // En cas d'erreur, renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: error.message });
    }
};