import API from "../apiConfig.js";
import { displayWorks } from "../gallery.js";
const dropArea = document.querySelector(".uploadArea");
const dragText = document.querySelector(".uploadButton");
const uploadButton = document.querySelector(".addPhotoButton");
const inputCategories = document.getElementById("inputSelectCategory");
const titleInput = document.getElementById("inputTitle");
const fileInput = document.getElementById("addWorkInputFile");
const dropAreaSaved = dropArea.innerHTML;

let button = dropArea.querySelector(".uploadButton");
let input = document.getElementById("addWorkInputFile");

let file;

button.onclick = (event) => {
  event.preventDefault();
  input.click();
};

// Lorsque clique sur "Ajouter photo"
input.addEventListener("change", function () {
  file = this.files[0];
  showFile();
});

// Lorsque l'utilisateur glisse un fichier
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Relâchez pour ajouter la photo";
});

// Lorsque l'utilisateur quitte la zone de glisser-déposer
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "+ Ajouter photo";
});

// Lorsque l'utilisateur relâche le fichier
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  showFile();
});

function labelCategories() {
  const api = new API();
  api.fetchCategories().then((categories) => {
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.innerText = category.name;
      inputCategories.appendChild(option);
    });
  });
}
labelCategories();

// Afficher l'image sélectionnée dans la zone d'upload
function showFile() {
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  let maxSize = 4000000; // 4MB

  if (validExtensions.includes(fileType) && file.size <= maxSize) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    if (!validExtensions.includes(fileType)) {
      // alert("Format de fichier invalide. Les formats valides sont: .jpeg, .jpg, .png");
      const FormatErrorMsg = document.createElement("div");
      FormatErrorMsg.classList.add("errorMsg");
      FormatErrorMsg.innerHTML =
        "Format de fichier invalide. Les formats valides sont: .jpeg, .jpg, .png";
      dropArea.appendChild(FormatErrorMsg);
    }
    if (file.size > maxSize) {
      // alert("Taille maximale autorisée: 4MB");
      const SizeErrorMsg = document.createElement("div");
      SizeErrorMsg.classList.add("errorMsg");
      SizeErrorMsg.innerHTML = "Taille maximale autorisée: 4MB";
      dropArea.appendChild(SizeErrorMsg);
    }
    dropArea.classList.remove("active");
  }
}

function validateForm() {
  if (titleInput.value.trim() === "") {
    uploadButton.disabled = true;
    return false;
  }

  if (inputCategories.value === "") {
    uploadButton.disabled = true;
    return false;
  }

  if (fileInput.files.length === 0) {
    uploadButton.disabled = true;

    return false;
  }
  uploadButton.disabled = false;
  return true;
}
titleInput.addEventListener("change", function () {
  validateForm();
});

inputCategories.addEventListener("change", function () {
  validateForm();
});

fileInput.addEventListener("change", function () {
  validateForm();
});
// Example usage:
// Add an event listener to the form submit button or form submit event
uploadButton.addEventListener("click", function (event) {
  event.preventDefault();
  uploadData();
});

function uploadData() {
  // création du formData
  const formData = new FormData();
  const title = titleInput.value;
  const categoryId = inputCategories.value;
  const image = fileInput.files[0];

  formData.append("title", title);
  formData.append("image", image);
  formData.append("category", categoryId);

  const api = new API();
  api.addWork(formData).then((addResponse) => {
    try {
      if (addResponse) {
        const uploadMessage = document.createElement("div");
        uploadMessage.classList.add("uploadSuccessMessage");
        uploadMessage.innerHTML = "Projet ajouté avec succès";
        dropArea.appendChild(uploadMessage);
        displayWorks();
        setTimeout(() => {
          uploadMessage.remove();
          titleInput.value = "";
          inputCategories.value = "";
          fileInput.value = "";
          dropArea.innerHTML = dropAreaSaved;
          uploadButton.disabled = true;
        }, 3000);
      }
    } catch (error) {
      const uploadMessage = document.createElement("div");
      uploadMessage.classList.add("errorMsg");
      uploadMessage.innerHTML = "Erreur lors de l'ajout du projet";
      dropArea.appendChild(uploadMessage);

      throw error;
    }
  });
}
// // affiche dans la console des éléments récupérés
// console.log("Titre:", title);
// console.log("Catégorie:", categoryId);
// console.log("Image:", formData.get("image"));
// console.log("token:", token);

// //appel à l'API
// fetch("http://localhost:5678/api/works", {
//   method: "POST",
//   body: formData,
//   headers: {
//     accept: "application/json",
//     Authorization: `bearer ${token}`,
//   },
// })
//   // si la reponse n'est pas valide : erreur, sinon la convertir en json
//   .then((response) => {
//     if (!response.ok) {
//       alert("remplir les trois champs");
//       throw new Error("Erreur de la requete");
//     } else {
//       return response.json();
//     }
//   })

//   // appliquer la fonction UpdateProjects pour mettre à jour la gallerie et la modale
//   .then((newProject) => {
//     console.log("Nouveau projet ajouté :", newProject);

//   })

//   .catch((error) => {
//     console.error("Erreur", error);
//   });
