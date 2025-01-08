import authService from './authService.js';

export function updateNavbar(isLoggedIn) {
    const authItem = document.getElementById('authItem');
    const teamItem = document.getElementById('teamItem');
    const createTeamItem = document.getElementById('createTeamItem');
    const usernameDisplay = document.getElementById('username');

    console.log('Mise à jour de la barre de navigation');

    if (isLoggedIn) {
        authItem.setAttribute('inert', 'true');
        authItem.classList.add('d-none');
        teamItem.removeAttribute('inert');
        teamItem.classList.remove('d-none');
        createTeamItem.removeAttribute('inert');
        createTeamItem.classList.remove('d-none');
        usernameDisplay.textContent = localStorage.getItem('username'); // Affichez le nom d'utilisateur
    } else {
        authItem.removeAttribute('inert');
        authItem.classList.remove('d-none');
        teamItem.setAttribute('inert', 'true');
        teamItem.classList.add('d-none');
        createTeamItem.setAttribute('inert', 'true');
        createTeamItem.classList.add('d-none');
        usernameDisplay.textContent = ''; // Effacez l'affichage du nom d'utilisateur
    }
}

// Vérifiez l'état de connexion de l'utilisateur au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = authService.isLoggedIn();
    updateNavbar(isLoggedIn); // Mettez à jour la barre de navigation en fonction de l'état de connexion
});