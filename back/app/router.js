import express from 'express';
import * as pokemonsController from './controllers/pokemonsController.js';
import * as typesController from './controllers/typesController.js';
import * as teamsController from './controllers/teamsController.js';
import * as authController from './controllers/authController.js';
import { authenticateSession } from './middlewares/authMiddleware.js';

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
router.post('/logout', authController.logout);

// Routes Teams avec authentification
router.get('/teams', authenticateSession, teamsController.getAllTeams);
router.get('/teams/:id', authenticateSession, teamsController.getOneTeam);
router.post('/teams', authenticateSession, teamsController.createTeam);
router.put('/teams/:id', authenticateSession, teamsController.updateTeam);
router.delete('/teams/:id', authenticateSession, teamsController.deleteTeam);

// Routes pour gérer les Pokémon dans les équipes
router.put('/teams/:teamId/pokemons/:pokeId', authenticateSession, teamsController.addPokemonToTeam);
router.delete('/teams/:teamId/pokemons/:pokeId', authenticateSession, teamsController.deletePokemonFromTeam);

export { router };