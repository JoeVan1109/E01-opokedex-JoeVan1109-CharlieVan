import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";

export class Pokemons extends Model {}

Pokemons.init({ 
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    atk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    def: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    atk_spe: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    def_spe: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    speed: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "pokemon", // nom de la table
    timestamps: false, // desactiver les 'champs created_at' & 'updated_at'
});