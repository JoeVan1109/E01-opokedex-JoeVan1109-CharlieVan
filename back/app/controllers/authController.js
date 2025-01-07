import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Vérifiez les identifiants de l'utilisateur
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Génération du token JWT
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'pokedex',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }

        // Créez un nouvel utilisateur
        const newUser = new User({ username, email, password });

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;

        await newUser.save();

        // Génération du token JWT
        const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET || 'pokedex', // Utilisez une variable d'environnement
            { expiresIn: '1h' }
        );

        res.status(201).json({ token, userId: newUser.id, message: 'Utilisateur créé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};