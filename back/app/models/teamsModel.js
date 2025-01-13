import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";



export class Teams extends Model {}

Teams.init({ 
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    }
}, {
    sequelize,
    tableName: "team", // nom de la table
    timestamps: false, // desactiver les 'champs created_at' & 'updated_at'
});