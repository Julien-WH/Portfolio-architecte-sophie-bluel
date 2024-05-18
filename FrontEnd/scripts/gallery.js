const works = await fetchWorks();
const categories = await fetchCategories();
const selectedCategory = "all";

// Récupérer les travaux dans l'api et les stocker dans une variable "works"
async function fetchWorks() {
    try {
        const worksResponse = await fetch("http://localhost:5678/api/works");
        const works = await worksResponse.json();
        console.log(works);
        return works;
    } catch (error) {
        console.error(error);
    }
}

// Récupérer les catégories dans l'api et les stocker dans une variable "categories"
async function fetchCategories() {
    try {
        const categoriesResponse = await fetch("http://localhost:5678/api/categories");
        const categories = await categoriesResponse.json();
        console.log(categories);
        return categories;
    } catch (error) {
        console.error(error);
    }
}

const filtersDiv = document.querySelector("#portfolio .filters");
const worksGallerySection = document.querySelector("#portfolio .gallery");

// Afficher le bouton de filtre "Tous"
const allButton = document.createElement("button");
allButton.innerText = "Tous";
allButton.addEventListener("click", () => {
    worksGallerySection.innerHTML = "";
    displayWorks(selectedCategory);
});
filtersDiv.appendChild(allButton);

// Afficher les boutons de filtre pour chaque catégorie
categories.forEach(category => {
    const filterButton = document.createElement("button");
    filterButton.innerText = category.name;
    filterButton.addEventListener("click", () => {
      
    });
    filtersDiv.appendChild(filterButton);
});


// worksGallerySection.innerHTML = "";
// works.forEach(work => {
//     if (work.categoryId === category.id) {
//         const figure = document.createElement("figure");
//         const workImage = document.createElement("img");
//         workImage.src = work.imageUrl;
//         workImage.alt = work.title;
//         const workTitle = document.createElement("figcaption");
//         workTitle.innerText = work.title;

//         figure.appendChild(workImage);
//         figure.appendChild(workTitle);
//         worksGallerySection.appendChild(figure);
//     }
// });

//

function displayWorks(selectedCategory) {
    if (selectedCategory === "all") {
        worksGallerySection.innerHTML = "";
        works.forEach(work => {
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

