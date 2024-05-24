import { checkAuthentification } from "../assets/js/checkAuth.js";
import { displayWorks, displayCategoriesFilters } from "../assets/js/gallery.js";
// Vérifie si l'utilisateur est connecté
if (checkAuthentification()) {
  // Si la section #portfolio existe, lancer les fonctions suivantes
  if (document.getElementById("portfolio")) {
    showEditBanner();
    hideFilters();
    addEditButton();
    hideFilters();
  }
}

// Si la section #portfolio existe, afficher la gallerie
if (document.getElementById("portfolio")) {
  displayCategoriesFilters();
  displayWorks();
}

// Fonction pour afficher la bannière du mode édition
function showEditBanner() {
  const banner = document.createElement("div");
  const bannerSpacer = document.createElement("div");
  bannerSpacer.classList.add("editorsBannerSpacer");

  banner.classList.add("editorsBanner");
  document.body.insertBefore(bannerSpacer, document.body.firstChild);

  banner.innerHTML = `
  <a href="#"><i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p></a>
  `;
  document.body.insertBefore(banner, document.body.firstChild);
}

// Fonction pour masquer les filtres
function hideFilters() {
  const filtersElement = document.querySelector(".filters");
  if (filtersElement) {
    filtersElement.style.display = "none";
  }
}

// Fonction pour ajouter le bouton d'édition
function addEditButton() {
  const galleryHeaderWrapper = document.createElement("div");
  galleryHeaderWrapper.classList.add("galleryHeaderAdmin");

  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Modifier`;
  editButton.classList.add("openButton", "openModal");

  const portfolioSectionH2 = document.querySelector("#portfolio h2");
  portfolioSectionH2.parentNode.insertBefore(
    galleryHeaderWrapper,
    portfolioSectionH2.nextSibling
  );
  galleryHeaderWrapper.appendChild(portfolioSectionH2);
  galleryHeaderWrapper.appendChild(editButton);
}
