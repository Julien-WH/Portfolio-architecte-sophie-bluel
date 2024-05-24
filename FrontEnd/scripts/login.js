import { checkAuthentification } from "../assets/js/checkAuth.js";

const loginForm = document.getElementById("loginFormDiv");
const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");

// Récupérer les données du formulaire de connexion et les envoyer à l'API
if (checkAuthentification()) {
  // Création des éléments HTML
  const connectedMessage = document.createElement("div");
  connectedMessage.textContent = "Vous êtes connecté.e. ";
  const disconnectLink = document.createElement("a");
  disconnectLink.textContent = "[Se déconnecter]";
  disconnectLink.href = "#";
  disconnectLink.addEventListener("click", () => {
    // Supprimer le token du local storage
    localStorage.removeItem("token");
    // Recharger la page
    window.location.reload();
  });

  // Ajout des éléments dans le DOM
  connectedMessage.appendChild(disconnectLink);
  const mainTag = document.querySelector("main");
  const H2tag = document.querySelector("h2");
  mainTag.insertBefore(connectedMessage, H2tag.nextSibling);
  loginForm.style.display = "none";
} else {
    const loginForm = document.getElementById("loginFormDiv");
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const login = loginInput.value;
      const password = passwordInput.value;
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        // Rediriger l'utilisateur vers la page d'accueil
        window.location.href = "index.html";
      } else {
        const errorMessage = document.createElement("div");
        errorMessage.textContent =
          "Identifiants incorrects. Veuillez réessayer.";
        errorMessage.classList.add("error");
        loginForm.appendChild(errorMessage);
      }
    });
  }

// // Afficher le message de statut connecté
// if (tokenStatus === true) {
//     // Création des éléments HTML
//     const connectedMessage = document.createElement('div');
//     connectedMessage.textContent = 'Vous êtes connecté.e. ';
//     const disconnectLink = document.createElement('a');
//     disconnectLink.textContent = '[Se déconnecter]';
//     disconnectLink.href = '#';
//     disconnectLink.addEventListener('click', () => {
//         // Supprimer le token du local storage
//         localStorage.removeItem('token');
//         // Recharger la page
//         window.location.reload();
//     });

//     // Ajout des éléments dans le DOM
//     connectedMessage.appendChild(disconnectLink);
//     const mainTag = document.querySelector('main');
//     const H2tag = document.querySelector('h2');
//     mainTag.insertBefore(connectedMessage, H2tag.nextSibling);
//     loginForm.style.display = 'none';
// }
