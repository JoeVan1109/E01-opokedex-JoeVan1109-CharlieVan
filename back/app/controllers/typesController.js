import { Types, Pokemon } from "../models/modelRelation.js";

export const getAllTypes = async (req, res) => {
    try {
        const types = await Types.findAll();
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOneType = async (req, res) => {
    try {
        const { id } = req.params;
        const types = await Types.findByPk(id);
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTypePokemons = async (req, res) => {
    const typeId = req.params.id;
    console.log(`Recherche des Pokémon pour le type ID: ${typeId}`);
    try {
        console.log("Début de la recherche dans la base de données");
        const type = await Types.findByPk(typeId, {
            include: [{
                model: Pokemon,
                as: 'pokemon',
                through: { attributes: [] }
            }]
        });
        console.log("Résultat de la recherche:", type);

        if (!type) {
            console.log(`Type avec ID ${typeId} non trouvé`);
            return res.status(404).json({ message: "Type non trouvé" });
        }

        console.log(`Nombre de Pokémon trouvés: ${type.pokemon.length}`);
        res.json(type.pokemon);
    } catch (error) {
        console.error("Erreur détaillée:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};