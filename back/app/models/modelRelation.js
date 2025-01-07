import { Team } from './teamsModel.js';
import { Pokemon } from './pokemonsModel.js';
import { Types } from './typesModel.js';
import { User } from './User.js';
import { UserTeam } from './userTeamModel.js';

// Relations existantes
Pokemon.belongsToMany(Team, { 
    as: 'teams',
    through: 'team_pokemon',
    foreignKey: 'pokemon_id',
    otherKey: 'team_id',
    timestamps: false
});

Team.belongsToMany(Pokemon, {
    as: 'pokemons',
    through: 'team_pokemon',
    foreignKey: 'team_id',
    otherKey: 'pokemon_id',
    timestamps: false
});

Pokemon.belongsToMany(Types, {
    as: 'types',
    through: 'pokemon_type',
    foreignKey: 'pokemon_id',
    otherKey: 'type_id',
    timestamps: false
});

Types.belongsToMany(Pokemon, {
    as: 'pokemons',
    through: 'pokemon_type',
    foreignKey: 'type_id',
    otherKey: 'pokemon_id',
    timestamps: false
});

User.belongsToMany(Team, {
    through: UserTeam,
    foreignKey: 'user_id',
    otherKey: 'team_id',
    as: 'teams'
});

Team.belongsToMany(User, {
    through: UserTeam,
    foreignKey: 'team_id',
    otherKey: 'user_id',
    as: 'users'
});

export { Team, Pokemon, Types, User, UserTeam };