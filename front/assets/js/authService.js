import { apiBaseUrl } from "./config.js";

const authService = {
    login: async (email, password) => {
        const response = await fetch(`${apiBaseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Échec de la connexion');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Stocker le token
        return data;
    },

    register: async (username, email, password) => {
        console.log('Envoi des données d\'inscription:', { username, email, password });

        const response = await fetch(`${apiBaseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erreur de réponse:', errorText);
            throw new Error('Échec de l\'inscription');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Stocker le token
        return data;
    }
};

export default authService;