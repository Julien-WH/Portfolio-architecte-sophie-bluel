import { checkAuthentification } from "../assets/js/checkAuth.js";

const loginForm = document.getElementById("loginFormDiv");
const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");

if (checkAuthentification()) {
   displayConnectedDiv();
} else {
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
            window.location.href = "index.html";
        } else {
            const errorMessage = document.createElement("div");
            errorMessage.textContent = "Identifiants incorrects. Veuillez réessayer.";
            errorMessage.classList.add("error");
            loginForm.appendChild(errorMessage);
        }
    });
}

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