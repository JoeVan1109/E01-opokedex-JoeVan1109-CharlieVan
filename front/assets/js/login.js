import { apiBaseUrl } from './config.js';
import { updateNavbar } from './navbarConnexion.js';

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username-connexion').value;
    const password = document.getElementById('password-connexion').value;

    try {
        const response = await fetch(`${apiBaseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Stockez le token dans le localStorage
        updateNavbar(true); // Mettez à jour la barre de navigation

        // Fermez le modal de connexion
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        loginModal.hide();
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
    }
});