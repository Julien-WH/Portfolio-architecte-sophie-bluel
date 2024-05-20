import { tokenStatus } from './login.js';
console.log(tokenStatus);


// Si le tokenStatus est false, afficher le lien de connexion
if (tokenStatus) {
    // Afficher le bouton de déconnexion
    const navLinks = document.querySelectorAll("header nav li");
    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.innerText = "Déconnexion";
    navLinks[2].innerHTML = "";
    navLinks[2].appendChild(logoutLink);
    logoutLink.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.reload();
    });
} else {
    // Afficher le lien de connexion
    const navLinks = document.querySelectorAll("header nav li");
    const loginLink = document.createElement("a");
    loginLink.href = "login.html";
    loginLink.innerText = "login";
    navLinks[2].innerHTML = "";
    navLinks[2].appendChild(loginLink); 
}
// //Récupérer les travaux de l'API
// const worksResponse = await fetch("http://localhost:5678/api/works")
// const works = await worksResponse.json()

// //Récupérer les catégories de l'API
// const categoriesResponse = await fetch("http://localhost:5678/api/categories")
// const categories = await categoriesResponse.json()

// //Afficher les travaux dans la galerie
// if (document.querySelector("#portfolio")) {
//     const worksGallerySection = document.querySelector("#portfolio .gallery")
// works.forEach(work => {
//     const figure = document.createElement("figure")
//     const workImage = document.createElement("img")
//     workImage.src = work.imageUrl
//     workImage.alt = work.title
//     const workTitle = document.createElement("figcaption")
//     workTitle.innerText = work.title

//     figure.appendChild(workImage)
//     figure.appendChild(workTitle)
//     worksGallerySection.appendChild(figure)
// })

// const filters = document.querySelector("#portfolio .filters")

// const allButton = document.createElement("button")
// allButton.innerText = "Tous"
// allButton.addEventListener("click", () => {
//     worksGallerySection.innerHTML = ""
//     works.forEach(work => {
//         const figure = document.createElement("figure")
//         const workImage = document.createElement("img")
//         workImage.src = work.imageUrl
//         workImage.alt = work.title
//         const workTitle = document.createElement("figcaption")
//         workTitle.innerText = work.title

//         figure.appendChild(workImage)
//         figure.appendChild(workTitle)
//         worksGallerySection.appendChild(figure)
//     })
// })
// filters.appendChild(allButton)

// categories.forEach(category => {
//     const filterButton = document.createElement("button")
//     filterButton.innerText = category.name
//     filterButton.addEventListener("click", () => {
//         worksGallerySection.innerHTML = ""
//         works.forEach(work => {
//             if (work.categoryId === category.id) {
//                 const figure = document.createElement("figure")
//                 const workImage = document.createElement("img")
//                 workImage.src = work.imageUrl
//                 workImage.alt = work.title
//                 const workTitle = document.createElement("figcaption")
//                 workTitle.innerText = work.title

//                 figure.appendChild(workImage)
//                 figure.appendChild(workTitle)
//                 worksGallerySection.appendChild(figure)
//             }
//         })
//     })
//     filters.appendChild(filterButton)
// })
// }
// // // Si l'utilisateur est connecté, afficher un bouton de déconnexion
// // if (localStorage.getItem("token")) {
// //     const logoutLink = document.querySelector("nav a[href='login.html']")
// //     logoutLink.innerText = "Se déconnecter"
// //     logoutLink.href = "#"
// //     logoutLink.addEventListener("click", () => {
// //         localStorage.removeItem("token")
// //         window.location.reload()
// //     })

// // }



