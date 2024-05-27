import API from "./apiConfig.js";

// DOM
const worksGallerySection = document.querySelector("#portfolio .gallery");
const filtersDiv = document.querySelector("#portfolio .filters");

// Nouvelle instance de l'API
const api = new API();

// Affichage des travaux dans la galerie
export async function displayWorks(categoryId) {
  worksGallerySection.innerHTML = "";

  const works = await api.fetchWorks();

  works.filter(work => !categoryId || work.categoryId === categoryId)
       .forEach(work => {
         const figure = createFigureElement(work);

         worksGallerySection.appendChild(figure);
       });
}

// Fonction pour créer un élément figure pour un projet
function createFigureElement(work) {
  const figure = document.createElement("figure");
  const workImage = document.createElement("img");
  const workTitle = document.createElement("figcaption");

  workImage.src = work.imageUrl;
  workImage.alt = work.title;
  workTitle.innerText = work.title;

  figure.appendChild(workImage);
  figure.appendChild(workTitle);

  return figure;
}

// Afficher les filtres de catégories
export async function displayCategoriesFilters() {
  // Création et ajout du bouton "Tous"
  const allButton = createFilterButton("Tous", () => displayWorks(), true);
  filtersDiv.appendChild(allButton);

  // Récupération des catégories
  const categories = await api.fetchCategories();

  // Création et ajout des boutons de filtre pour chaque catégorie
  categories.forEach(category => {
    const button = createFilterButton(category.name, () => displayWorks(category.id), false);
    filtersDiv.appendChild(button);
  });
}

// Création d'un bouton filtre et ajout d'un gestionnaire d'événements
function createFilterButton(text, onClick, isActive) {
  const button = document.createElement("button");
  button.innerText = text;
  if (isActive) {
    button.classList.add("active");
  }
  button.addEventListener("click", () => {
    clearActiveFilters();
    onClick();
    button.classList.add("active");
  });
  return button;
}

// Supprimer la classe "active" des boutons de filtre
function clearActiveFilters() {
  const activeFilters = document.querySelectorAll(".filters button.active");
  activeFilters.forEach(button => button.classList.remove("active"));
}