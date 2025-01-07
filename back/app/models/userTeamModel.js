import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { User } from './User.js';
import { Team } from './teamsModel.js';

const UserTeam = sequelize.define('UserTeam', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    team_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Team,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'user_team',
    timestamps: false // Désactivez les timestamps si vous ne les utilisez pas
});

export { UserTeam };