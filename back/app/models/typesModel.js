import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";

export class Types extends Model {}

Types.init({ 
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    color: {
        type: DataTypes.CHAR,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "type", // nom de la table
    timestamps: false, // desactiver les 'champs created_at' & 'updated_at'
});