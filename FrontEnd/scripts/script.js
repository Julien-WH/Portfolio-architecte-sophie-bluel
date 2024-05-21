// Vérifier si le token est présent dans le localStorage
const token = localStorage.getItem("token");
export const tokenStatus = token !== null;

// Si le tokenStatus est false, afficher le lien de connexion
if (tokenStatus === true) {
  // Afficher le bouton de déconnexion
  const navLinks = document.querySelectorAll("header nav li");
  const logoutLink = document.createElement("a");
  logoutLink.href = "#";
  logoutLink.innerText = "Déconnexion";
  navLinks[2].innerHTML = "";
  navLinks[2].appendChild(logoutLink);
  logoutLink.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
  });
} else {
  // Afficher le lien de connexion
  const navLinks = document.querySelectorAll("header nav li");
  const loginLink = document.createElement("a");
  loginLink.href = "login.html";
  loginLink.innerText = "login";
  navLinks[2].innerHTML = "";
  navLinks[2].appendChild(loginLink);
}
