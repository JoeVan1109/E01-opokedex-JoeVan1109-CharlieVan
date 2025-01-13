import express from 'express';
import * as pokemonsController from './controllers/pokemonsController.js';
import * as typesController from './controllers/typesController.js';
import * as teamsController from './controllers/teamsController.js';


const router = express.Router();

// Routes Pokémons
router.get('/pokemons', pokemonsController.getAllPokemons);
router.get('/pokemons/:id', pokemonsController.getOnePokemon);

// Routes Types
router.get('/types', typesController.getAllTypes);
router.get('/types/:id', typesController.getOneType);
router.get('/types/:id/pokemons', typesController.getTypePokemons);

// Routes Teams avec authentification
router.get('/teams', teamsController.getAllTeams);
router.get('/teams/:id', teamsController.getOneTeam);
router.post('/teams', teamsController.createTeam);
router.put('/teams/:id', teamsController.updateTeam);
router.delete('/teams/:id', teamsController.deleteTeam);

// Routes pour gérer les Pokémon dans les équipes
router.put('/teams/:teamId/pokemons/:pokeId', teamsController.addPokemonToTeam);
router.delete('/teams/:teamId/pokemons/:pokeId', teamsController.deletePokemonFromTeam);

export { router };