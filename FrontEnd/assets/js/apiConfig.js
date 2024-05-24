class API {
    constructor() {
        this.baseUrl = 'http://localhost:5678/api';
    }
    async login(email, password) {
        try {
            const response = await fetch(`${this.baseUrl}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
    async fetchWorks() {
        try {
            const worksResponse = await fetch(`${this.baseUrl}/works`);
            return worksResponse.json();
        } catch (error) {
            console.error('Error during fetching works:', error);
            throw error;
        }
    }
    async fetchCategories() {
        try {
            const categoriesResponse = await fetch(`${this.baseUrl}/categories`);
            return categoriesResponse.json();
        } catch (error) {
            console.error('Error during fetching categories:', error);
            throw error;
        }
    }
}

export default API;