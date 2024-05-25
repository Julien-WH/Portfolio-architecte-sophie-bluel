const modal = document.getElementById("modal"); // Récupérer la modale
const closeModalButton = document.querySelector(".closeModalButton"); // Récupérer le bouton pour fermer la modale
import API from "./apiConfig.js";
export function displayModal() {
  displayWorksInModal();
}

// Fermer la modale
closeModalButton.addEventListener("click", () => {
  modal.close();
});

function displayWorksInModal() {
  const modalGallery = document.querySelector(".modalGallery");
  modalGallery.innerHTML = "";
  const api = new API();
  api.fetchWorks().then((works) => {
    works.forEach((work) => {
      const modalGalleryElement = document.createElement("div");
      modalGalleryElement.classList.add("modalGalleryElement");
      const workImage = document.createElement("img");
      workImage.src = work.imageUrl;
      modalGalleryElement.style.backgroundImage = `url(${workImage.src})`;
      const modalDeleteWorkButton = document.createElement("button");
      modalDeleteWorkButton.innerText = "supprimer le projet";
      modalDeleteWorkButton.classList.add("deleteWorkButton");
      modalDeleteWorkButton.addEventListener("click", () => {
        console.log("delete work", work.id);
      });
      modalGallery.appendChild(modalGalleryElement);
      modalGalleryElement.appendChild(modalDeleteWorkButton);
    
    });
  });
}
// const modal = document.querySelector("#modal");
// const openModal = document.querySelector(".open-modal");
// const closeModal = document.querySelector(".close-modal");
// import { works } from "./gallery.js";

// openModal.addEventListener("click", () => {
//   modal.showModal();
// });

// closeModal.addEventListener("click", () => {
//     modal.close();
//   });

// // * Afficher la galerie de travaux dans la modale
// function displayWorksInModal() {
//   const modalGallery = document.querySelector(".modalGallery");
//   modalGallery.innerHTML = "";
//   works.forEach((work) => {
//     const figure = document.createElement("figure");
//     const workImage = document.createElement("img");
//     workImage.src = work.imageUrl;
//     workImage.alt = work.title;
//     const deleteButton = document.createElement("button");
//     deleteButton.innerText = "X";
//     deleteButton.addEventListener("click", () => {
//       deleteWork(work.id);
//     });

//     figure.appendChild(workImage);
//     figure.appendChild(deleteButton);
//     modalGallery.appendChild(figure);
//   });
// }
// displayWorksInModal();          