import API from "../apiConfig.js";
import { displayWorks } from "../gallery.js";

// Création d'une instance de l'API
const api = new API();

// Création d'un élément de la galerie
function createGalleryElement(work) {
    const modalGalleryElement = document.createElement("div");
    modalGalleryElement.classList.add("modalGalleryElement");
    modalGalleryElement.style.backgroundImage = `url(${work.imageUrl})`;
    return modalGalleryElement;
}

// Ajout d'un bouton de suppression
function createDeleteButton(work, modalGalleryElement) {
    const modalDeleteWorkButton = document.createElement("button");
    modalDeleteWorkButton.innerText = "supprimer le projet";
    modalDeleteWorkButton.classList.add("deleteWorkButton");
    modalDeleteWorkButton.addEventListener("click", () => {
        api.deleteWork(work.id)
            .then(() => {
                modalGalleryElement.remove();
                displayWorksInModal();
                displayWorks();
            });
    });
    return modalDeleteWorkButton;
}

// Afficher les travaux dans la modale en tant que galerie
export function displayWorksInModal() {
    const modalGallery = document.querySelector(".modalGallery");
    modalGallery.innerHTML = "";
    api.fetchWorks().then((works) => {
        works.forEach((work) => {
            const modalGalleryElement = createGalleryElement(work);
            const modalDeleteWorkButton = createDeleteButton(work, modalGalleryElement);
            modalGallery.appendChild(modalGalleryElement);
            modalGalleryElement.appendChild(modalDeleteWorkButton);
        });
    });
}