import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) return res.sendStatus(401); // Pas d'autorisation

    jwt.verify(token, process.env.JWT_SECRET || 'pokedex', (err, user) => {
        if (err) return res.sendStatus(403); // Token invalide
        req.user = user;
        next();
    });
};