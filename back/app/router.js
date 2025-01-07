import express from 'express';
import * as pokemonsController from './controllers/pokemonsController.js';
import * as typesController from './controllers/typesController.js';
import * as teamsController from './controllers/teamsController.js';
import * as authController from './controllers/authController.js';
import { authenticateToken } from './middlewares/middleToken.js';

const router = express.Router();

// Routes Pokémons
router.get('/pokemons', pokemonsController.getAllPokemons);
router.get('/pokemons/:id', pokemonsController.getOnePokemon);

// Routes Types
router.get('/types', typesController.getAllTypes);
router.get('/types/:id', typesController.getOneType);
router.get('/types/:id/pokemons', typesController.getTypePokemons);

// Routes de connexion et d'inscription
router.post('/login', authController.login);
router.post('/register', authController.register);

// Routes Teams avec authentification
router.get('/teams', authenticateToken, teamsController.getAllTeams);
router.get('/teams/:id', authenticateToken, teamsController.getOneTeam);
router.post('/teams', authenticateToken, teamsController.createTeam);
router.put('/teams/:id', authenticateToken, teamsController.updateTeam);
router.delete('/teams/:id', authenticateToken, teamsController.deleteTeam);

// Routes pour gérer les Pokémon dans les équipes
router.put('/teams/:teamId/pokemons/:pokeId', authenticateToken, teamsController.addPokemonToTeam);
router.delete('/teams/:teamId/pokemons/:pokeId', authenticateToken, teamsController.deletePokemonFromTeam);

export { router };