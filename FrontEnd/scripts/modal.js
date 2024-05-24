const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");
import { works } from "../assets/js/gallery.js";

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
    modal.close();
  });

// * Afficher la galerie de travaux dans la modale
function displayWorksInModal() {
  const modalGallery = document.querySelector(".modalGallery");
  modalGallery.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const workImage = document.createElement("img");
    workImage.src = work.imageUrl;
    workImage.alt = work.title;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", () => {
      deleteWork(work.id);
    });

    figure.appendChild(workImage);
    figure.appendChild(deleteButton);
    modalGallery.appendChild(figure);
  });
}
displayWorksInModal();          