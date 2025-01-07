import { sequelize } from '../database.js';
import { Model, DataTypes } from "sequelize";

export class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "user", // nom de la table
    timestamps: false, // desactiver les 'champs created_at' & 'updated_at'
});

