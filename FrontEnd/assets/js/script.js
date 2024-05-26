import { checkAuthentification } from "./checkAuth.js";
import { displayWorks, displayCategoriesFilters } from "./gallery.js";
import * as adminUI from "./adminApps/adminUI.js";
// Vérifie si l'utilisateur est connecté
if (checkAuthentification()) {
  // Si la section #portfolio existe, lancer les fonctions suivantes
  if (document.getElementById("portfolio")) {
    adminUI.showEditBanner();
    adminUI.hideFilters();
    adminUI.addEditButton();
    }
}
// Si la section #portfolio existe, afficher la galerie
if (document.getElementById("portfolio")) {
  displayCategoriesFilters();
  displayWorks();
}




