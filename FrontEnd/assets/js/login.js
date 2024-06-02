import API from "./apiConfig.js";
import { checkAuthentification } from "./checkAuth.js";

// Verifier si l'utilisateur est connecté
if (checkAuthentification()) {
  displayConnectedDiv();
} else {
  adminLogin();
}

// Afficher un message si l'utilisateur est connecté
function displayConnectedDiv() {
  const connectedDiv = document.createElement("div");
  connectedDiv.classList.add("connectedDiv");
  connectedDiv.innerHTML = `
    <p>Vous êtes connecté.e.</p>
    <a href="index.html">Retour à l'accueil</a>
    `;
  loginForm.insertAdjacentElement("afterend", connectedDiv);
  loginForm.style.display = "none";
}

// Connexion de l'administrateur
async function adminLogin() {
  const loginForm = document.getElementById("loginFormDiv");
  const loginInput = document.getElementById("loginInput");
  const passwordInput = document.getElementById("passwordInput");
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = loginInput.value;
    const password = passwordInput.value;
    const api = new API();
    try {
      const response = await api.login(email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      window.location.replace("index.html");
    } catch (error) {
      displayErrorMessage(loginForm, "Veuillez vérifier vos identifiants.");
    }
  });
}

// Afficher un message d'erreur
function displayErrorMessage(element, message) {
  const errorMessage = document.querySelector(".errorLoginMessage");
  if (errorMessage) {
    errorMessage.remove();
  }
  const newErrorMessage = document.createElement("p");
  newErrorMessage.innerText = message;
  newErrorMessage.classList.add("errorLoginMessage");
  element.insertAdjacentElement("beforebegin", newErrorMessage);
}
