 export const works = await fetchWorks();
 export const categories = await fetchCategories();
 let selectedCategory

// Récupérer les travaux dans l'api et les stocker dans une variable "works"
async function fetchWorks() {
  try {
    const worksResponse = await fetch("http://localhost:5678/api/works");
    const works = await worksResponse.json();
    return works;
  } catch (error) {
    console.error(error);
  }
}

// Récupérer les catégories dans l'api et les stocker dans une variable "categories"
async function fetchCategories() {
  try {
    const categoriesResponse = await fetch(
      "http://localhost:5678/api/categories"
    );
    const categories = await categoriesResponse.json();
    return categories;
  } catch (error) {
    console.error(error);
  }
}

const filtersDiv = document.querySelector("#portfolio .filters");
const worksGallerySection = document.querySelector("#portfolio .gallery");

// Vérifier si l'API a renvoyé les travaux et les catégories
if (works && categories) {

  // Afficher le bouton de filtre "Tous"
  const allButton = document.createElement("button");
  allButton.innerText = "Tous";
  allButton.addEventListener("click", () => {
    worksGallerySection.innerHTML = "";
    displayWorks();
  });
  filtersDiv.appendChild(allButton);

  // Afficher les boutons de filtre pour chaque catégorie
  categories.forEach((category) => {
    const filterButton = document.createElement("button");
    filterButton.innerText = category.name;
    filterButton.addEventListener("click", () => {
      displayWorks(category.id);
      return category.id === selectedCategory;
    });
    filtersDiv.appendChild(filterButton);
  });

  // Afficher les travaux dans la galerie par défaut
  displayWorks();
} else {

  // Afficher une erreur le cas échéant
  worksGallerySection.innerHTML = "Erreur de requête API";
  worksGallerySection.classList.add("error");
}

function displayWorks(selectedCategory) {
  if (selectedCategory) {
    worksGallerySection.innerHTML = "";
    works.forEach((work) => {
      if (work.categoryId === selectedCategory) {
        const figure = document.createElement("figure");
        const workImage = document.createElement("img");
        workImage.src = work.imageUrl;
        workImage.alt = work.title;
        const workTitle = document.createElement("figcaption");
        workTitle.innerText = work.title;

        figure.appendChild(workImage);
        figure.appendChild(workTitle);
        worksGallerySection.appendChild(figure);
      }
    });
  } else {
    worksGallerySection.innerHTML = "";
    works.forEach((work) => {
      const figure = document.createElement("figure");
      const workImage = document.createElement("img");
      workImage.src = work.imageUrl;
      workImage.alt = work.title;
      const workTitle = document.createElement("figcaption");
      workTitle.innerText = work.title;

      figure.appendChild(workImage);
      figure.appendChild(workTitle);
      worksGallerySection.appendChild(figure);
    });
  }
}