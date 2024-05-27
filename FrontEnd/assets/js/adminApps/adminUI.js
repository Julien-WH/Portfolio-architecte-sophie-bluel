import { displayWorksInModal } from "./deleteWorksModal.js";
import { formReset } from "./addWorksModal.js";

const modal = document.getElementById("modal"); // Récupérer la modale
const closeModalButtons = document.querySelectorAll(".closeModalButton");
const modalAddWorkButton = document.querySelector(".modalAddButton");
const deleteWorkModal = document.querySelector(".modal1");
const addWorkModal = document.querySelector(".modal2");
const modalBackButton = document.querySelector(".modalBackButton");


// Ajout d'event listener
function addListener(element, event, handler) {
    element.addEventListener(event, handler);
  }

// Trouver tous les boutons de fermeture de la modale et ajouter un event listene
closeModalButtons.forEach((button) => {
    addListener(button, "click", () => {
      modal.close();
      formReset();
    });
  });

// Fermer la modale en cliquant en dehors de la modale
addListener(modal, "click", (event) => {
    if (event.target == modal) {
      modal.close();
    }
  });

  function createAdminUiElement(type, className, innerHTML) {
    const element = document.createElement(type);
    element.classList.add(className);
    element.innerHTML = innerHTML;
    return element;
  }


// Fonction pour afficher la bannière du mode édition
export function showEditBanner() {
    const banner = createAdminUiElement("div", "editorsBanner", `<a href="#" class="openButton"><i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p></a>`);
    const bannerSpacer = createAdminUiElement("div", "editorsBannerSpacer", "");
  
    document.body.insertBefore(bannerSpacer, document.body.firstChild);
    document.body.insertBefore(banner, bannerSpacer.nextSibling);
  
    const openButton = document.querySelector(".openButton");
    addListener(openButton, "click", () => {
      modal.showModal();
      displayWorksInModal();
    });
  }


// Ajouter le bouton d'édition de la galerie
export function addEditButton() {
    const galleryHeaderWrapper = createAdminUiElement("div", "galleryHeaderAdmin", "");
    const editButton = createAdminUiElement("button", null, `<i class="fa-regular fa-pen-to-square"></i> Modifier`);
  
    editButton.classList.add("openButton", "openModal");
  
    const portfolioSectionH2 = document.querySelector("#portfolio h2");
    portfolioSectionH2.parentNode.insertBefore(galleryHeaderWrapper, portfolioSectionH2.nextSibling);
    galleryHeaderWrapper.appendChild(portfolioSectionH2);
    galleryHeaderWrapper.appendChild(editButton);
  
    addListener(editButton, "click", () => {
      modal.showModal();
      displayWorksInModal();
    });
  }

// Masquer les filtres
export function hideFilters() {
  const filtersElement = document.querySelector(".filters");
  if (filtersElement) {
    filtersElement.style.display = "none";
  }
}

// Switch à l'ajout de travaux
addListener(modalAddWorkButton, "click", () => {
  deleteWorkModal.classList.add("modalHidden");
  addWorkModal.classList.remove("modalHidden");
});

// Retour à la suppression de travaux
addListener(modalBackButton, "click", () => {
    deleteWorkModal.classList.remove("modalHidden");
    addWorkModal.classList.add("modalHidden");
  });
