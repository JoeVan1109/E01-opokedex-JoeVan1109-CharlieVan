import { Teams } from "../models/teamsModel.js";
import { Pokemons } from "../models/pokemonsModel.js";
import { Types } from "../models/typesModel.js";

Pokemons.belongsToMany(Teams, { 
    as: 'teams',
    through: 'team_pokemon',
    foreignKey: 'pokemon_id',
    otherKey: 'team_id',
    timestamps: false
});

Teams.belongsToMany(Pokemons, {
    as: 'pokemons',
    through: 'team_pokemon',
    foreignKey: 'team_id',
    otherKey: 'pokemon_id',
    timestamps: false
});

Pokemons.belongsToMany(Types, {
    as: 'types',
    through: 'pokemon_type',
    foreignKey: 'pokemon_id',
    otherKey: 'type_id',
    timestamps: false
});

Types.belongsToMany(Pokemons, {
    as: 'pokemons',
    through: 'pokemon_type',
    foreignKey: 'type_id',
    otherKey: 'pokemon_id',
    timestamps: false
});

export { Teams, Pokemons, Types };