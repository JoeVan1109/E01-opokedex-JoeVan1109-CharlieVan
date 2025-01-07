import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { User } from './User.js';

const Team = sequelize.define('Team', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'team',
    timestamps: false // Désactivez les timestamps
});

export { Team };