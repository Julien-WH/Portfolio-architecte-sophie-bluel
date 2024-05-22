// Vérifier si le token est présent dans le localStorage
const token = localStorage.getItem("token");
const tokenStatus = token !== null;

// Si l'utilisateur est connecté
if (tokenStatus === true) {
  // Afficher le bouton de déconnexion si l'utilisateur est connecté
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

  // Afficher la bannière du mode édition si l'utilisateur est connecté
  const banner = document.createElement("div");
  banner.classList.add("editorsBanner");
  banner.innerText = "Mode édition";
  document.body.insertBefore(banner, document.body.firstChild);

  // Masquer les filtres
  const filterDiv = document.querySelector(".filters");
  filterDiv.style.display = "none";

  // Afficher le bouton d'édition après après le tag H2 de la section id "portfolio"
  const editButton = document.createElement("button");
  editButton.innerText = "Modifier";
  editButton.classList.add("open-button", "open-modal");
  const portfolioSection = document.getElementById("portfolio");
  const h2Tag = portfolioSection.querySelector("h2");
  portfolioSection.insertBefore(editButton, h2Tag.nextSibling);

} else {
  // Afficher le lien de connexion
  const navLinks = document.querySelectorAll("header nav li");
  const loginLink = document.createElement("a");
  loginLink.href = "login.html";
  loginLink.innerText = "login";
  navLinks[2].innerHTML = "";
  navLinks[2].appendChild(loginLink);
}
