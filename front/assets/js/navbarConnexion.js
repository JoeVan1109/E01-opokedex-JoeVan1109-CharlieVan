export function updateNavbar(isLoggedIn) {
    const authItem = document.getElementById('authItem');
    const teamItem = document.getElementById('teamItem');
    const createTeamItem = document.getElementById('createTeamItem');

    if (isLoggedIn) {
        authItem.setAttribute('inert', 'true');
        authItem.classList.add('d-none');
        teamItem.removeAttribute('inert');
        teamItem.classList.remove('d-none');
        createTeamItem.removeAttribute('inert');
        createTeamItem.classList.remove('d-none');
    } else {
        authItem.removeAttribute('inert');
        authItem.classList.remove('d-none');
        teamItem.setAttribute('inert', 'true');
        teamItem.classList.add('d-none');
        createTeamItem.setAttribute('inert', 'true');
        createTeamItem.classList.add('d-none');
    }
}

// Vérifiez l'état de connexion de l'utilisateur au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    updateNavbar(!!token); // Si le token existe, l'utilisateur est connecté
});