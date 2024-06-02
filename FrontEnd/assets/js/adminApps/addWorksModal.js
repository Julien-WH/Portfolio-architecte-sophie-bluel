import API from "../apiConfig.js";
import { displayWorks } from "../gallery.js";
import { displayWorksInModal } from "./deleteWorksModal.js";

// Création d'une instance de l'API
const api = new API();

// Element du DOM
const dropArea = document.querySelector(".uploadArea");
const addFileBtn = document.querySelector(".uploadButton");
const uploadButton = document.querySelector(".addPhotoButton");
const inputCategories = document.getElementById("inputSelectCategory");
const titleInput = document.getElementById("inputTitle");
const fileInput = document.getElementById("addWorkInputFile");

// Etats initiaux
const dropAreaSaved = dropArea.innerHTML;
let file;

// Event listeners
// AddEventListener helper
function addListener(element, event, handler) {
  element.addEventListener(event, handler);
}

// Lorsque l'utilisateur clique sur "+ Ajouter photo"
addListener(addFileBtn, "click", (event) => {
  event.preventDefault();
  fileInput.click();
});

// Afficher l'image sélectionnée
addListener(fileInput, "change", () => {
  file = fileInput.files[0];
  showFile();
})


// Lorsque l'utilisateur glisse un fichier
addListener(dropArea, "dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  addFileBtn.textContent = "Relâchez pour ajouter la photo";
});


// Lorsque l'utilisateur quitte la zone de glisser-déposer
addListener(dropArea, "dragleave", () => {
  dropArea.classList.remove("active");
  addFileBtn.textContent = "+ Ajouter photo";
});


// Lorsque l'utilisateur relâche le fichier
addListener(dropArea, "drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  fileInput.files = event.dataTransfer.files;
  showFile();
  dropArea.classList.remove("active");
});


// Afficher les catégories dans le menu déroulant
async function labelCategories() {
  const categories = await api.fetchCategories();

  inputCategories.innerHTML =
    "<option hidden disabled selected value> Sélectionnez une catégorie </option>"; // Ajout d'une option vide

  categories.forEach(({ id, name }) => {
    inputCategories.add(new Option(name, id));
  });
}
labelCategories();

// Afficher l'image sélectionnée dans la zone d'upload
function showFile() {
  const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  const maxSize = 4000000; // 4MB

  if (validExtensions.includes(file.type) && file.size <= maxSize) {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      dropArea.innerHTML = `<img src="${fileReader.result}" alt="">`;
    };
    fileReader.readAsDataURL(file);
  } else {
    dropArea.classList.remove("active");
    handleFileErrors(file, validExtensions, maxSize);
  }
}

// Gerer les erreurs de fichier
function handleFileErrors(file, validExtensions, maxSize) {
  clearExistingErrors();

  if (!validExtensions.includes(file.type)) {
    appendErrorMessage(
      "Format de fichier invalide. Les formats valides sont: .jpeg, .jpg, .png"
    );
  }
  if (file.size > maxSize) {
    appendErrorMessage("Taille maximale autorisée: 4MB");
  }
}

// Supprimer les messages d'erreur existants
function clearExistingErrors() {
  const existingErrors = dropArea.querySelectorAll(".errorMsg");
  existingErrors.forEach((error) => error.remove());
}

// Ajouter un message d'erreur
function appendErrorMessage(message) {
  const errorMsg = document.createElement("div");
  errorMsg.classList.add("errorMsg");
  errorMsg.innerHTML = message;
  dropArea.appendChild(errorMsg);
}

function validateForm() {
  const isFormValid =
    titleInput.value.trim() !== "" &&
    inputCategories.value !== "" &&
    fileInput.files.length !== 0;

  uploadButton.disabled = !isFormValid;
  return isFormValid;
}

addListener(titleInput, "change", validateForm);
addListener(inputCategories, "change", validateForm);
addListener(fileInput, "change", validateForm);
addListener(uploadButton, "click", (event) => {
  event.preventDefault();
  if (validateForm()) {
    uploadData();
  }
});

async function uploadData() {
  const formData = createFormData();

  try {
    const addResponse = await api.addWork(formData);
    if (addResponse) {
      displayMessage("uploadSuccessMessage", "Projet ajouté avec succès");
      displayWorks(); // Rafraîchir la galerie
      displayWorksInModal(); // Rafraîchir la galerie dans la modale
      setTimeout(formReset, 2000);
    }
  } catch (error) {
    displayMessage("errorMsg", "Erreur lors de l'ajout du projet");
    throw error;
  }
}

function createFormData() {
  const formData = new FormData();
  const title = titleInput.value;
  const categoryId = inputCategories.value;
  const image = fileInput.files[0];

  formData.append("title", title);
  formData.append("image", image);
  formData.append("category", categoryId);

  return formData;
}

function displayMessage(className, message) {
  const uploadMessage = document.createElement("div");
  uploadMessage.classList.add(className);
  uploadMessage.innerHTML = message;
  dropArea.appendChild(uploadMessage);
}

export function formReset() {
  titleInput.value = "";
  inputCategories.value = "";
  fileInput.value = "";
  dropArea.innerHTML = dropAreaSaved;
  uploadButton.disabled = true;

  dropArea.querySelector(".uploadButton").onclick = (event) => {
  event.preventDefault();
  fileInput.click();
};
}
