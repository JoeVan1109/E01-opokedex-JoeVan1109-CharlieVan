const authService = {
    login: async (username, password) => {
        const response = await fetch(`${apiBaseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Échec de la connexion');
        }

        const data = await response.json();
        localStorage.setItem('username', username); // Stockez le nom d'utilisateur
        return data;
    },

    register: async (username, email, password) => {
        const response = await fetch(`${apiBaseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('Échec de l\'inscription');
        }

        const data = await response.json();
        localStorage.setItem('username', username); // Stockez le nom d'utilisateur
        return data;
    },

    logout: async () => {
        const response = await fetch(`${apiBaseUrl}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la déconnexion');
        }

        localStorage.removeItem('username'); // Supprimez le nom d'utilisateur
        return response.json();
    },

    isLoggedIn: () => {
        return !!localStorage.getItem('username');
    }
};

export default authService;