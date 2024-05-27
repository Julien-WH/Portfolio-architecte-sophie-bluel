class API {
  constructor() {
    this.baseUrl = "http://localhost:5678/api";
  }
  async login(email, password) {
    try {
      const loginResponse = await fetch(`${this.baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!loginResponse.ok) {
        throw new Error("Échec de la connexion");
      }
      return loginResponse.json();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  }
  async fetchWorks() {
    try {
      const worksResponse = await fetch(this.baseUrl + "/works/");
      return worksResponse.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des travaux:", error);
      throw error;
    }
  }
  async fetchCategories() {
    try {
      const categoriesResponse = await fetch(this.baseUrl +  "/categories");
      return categoriesResponse.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      throw error;
    }
  }
  async deleteWork(workId) {
    try {
      const deleteResponse = await fetch(this.baseUrl + "/works/" + workId, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du projet:", error);
      throw error;
    }
  }

  async addWork(formData) {
      try {
          const addResponse = await fetch(this.baseUrl + "/works", {
              method: "POST",
              headers: {
                  accept: 'application/json',
                  Authorization: `bearer ${localStorage.getItem('token')}`
              },
              body: formData,
          });
          return addResponse.json();
      } catch (error) {
          console.error('Erreur lors de l\'ajout du projet:', error);
          throw error;
      }
  }
}

export default API;
