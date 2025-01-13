import { Pokemons } from '../models/modelRelation.js';

export const getAllPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemons.findAll();
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOnePokemon = async (req, res) => {
    try {
        const { id } = req.params; // Changez req.body en req.params
        const pokemon = await Pokemons.findByPk(id);
        if (!pokemon) {
            return res.status(404).json({ error: 'Pokémon non trouvé' });
        }
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

