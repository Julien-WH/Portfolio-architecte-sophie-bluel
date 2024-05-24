export const checkAuthentification = () => {
    // Retrouver le token dans le localStorage
    const token = localStorage.getItem('token');

    // Si le token existe, l'utilisateur est authentifié
    if (token) {
        // Remplacer le lien de connexion par un lien de déconnexion
        const navLoginLink = document.querySelector('a[href="login.html"]');
        if (navLoginLink) {
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.innerText = 'logout';

            // Effacer le contenu de navLoginLink et y ajouter logoutLink
            navLoginLink.innerHTML = '';
            navLoginLink.appendChild(logoutLink);

            // Ajouter EventListener pour la déconnexion
            logoutLink.addEventListener('click', () => {
                localStorage.removeItem('token');
                window.location.reload();
            });
        }

        return true;
    }

    // Si le token n'existe pas, l'utilisateur n'est pas authentifié
    return false;
};