import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Stockez les informations de l'utilisateur dans la session
        req.session.userId = user.id;
        req.session.username = user.username;

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        // Stockez les informations de l'utilisateur dans la session
        req.session.userId = newUser.id;
        req.session.username = newUser.username;

        res.status(201).json({ message: 'User successfully created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};