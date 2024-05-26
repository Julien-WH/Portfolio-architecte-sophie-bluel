import { displayModal } from "./deleteWorksModal.js";
const modal = document.getElementById("modal"); // Récupérer la modale
const closeModalButton = document.querySelectorAll(".closeModalButton"); 
const modalAddWorkButton = document.querySelector(".modalAddButton"); 
const deleteWorkModal = document.querySelector(".modal1");
const addWorkModal = document.querySelector(".modal2");
const modalBackButton = document.querySelector(".modalBackButton");


// Fermer la modale
closeModalButton.forEach(button => {
    button.addEventListener("click", () => {
        modal.close();
    });
});
    // Fermer la modale en cliquant en dehors de la modale
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

// Fonction pour afficher la bannière du mode édition
export function showEditBanner() {
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

// Ajouter le bouton d'édition de la galerie
export function addEditButton() {
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
  editButton.addEventListener("click", () => {
    modal.showModal();
    displayModal();
  });
}

// Masquer les filtres
export function hideFilters() {
  const filtersElement = document.querySelector(".filters");
  if (filtersElement) {
    filtersElement.style.display = "none";
  }
}

// Passage à l'ajout de travaux
modalAddWorkButton.addEventListener("click", () => {
    deleteWorkModal.classList.add("modalHidden");
    addWorkModal.classList.remove("modalHidden");
});

// Retour à la suppression de travaux
modalBackButton.addEventListener("click", () => {
    deleteWorkModal.classList.remove("modalHidden");
    addWorkModal.classList.add("modalHidden");
});