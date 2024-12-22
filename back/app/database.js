import { Sequelize } from 'sequelize';
import 'dotenv/config';

if (!process.env.PG_URL) {
    throw new Error('PG_URL is not defined in the environment variables');
}

export const sequelize = new Sequelize(process.env.PG_URL, {
    dialect: 'postgres',
    logging: false, // Désactivez les logs SQL si nécessaire
});

// Testez la connexion
sequelize.authenticate()
    .then(() => console.log('Connection to the database has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));