const loginForm = document.getElementById('loginForm');
const loginInput = document.getElementById('loginInput');
const passwordInput = document.getElementById('passwordInput');
const token = localStorage.getItem('token'); // Get the token from local storage

if (token) {
    // Display the connected message
    const connectedMessage = document.createElement('div');
    connectedMessage.textContent = 'Vous êtes connecté.e. ';

    const disconnectLink = document.createElement('a');
    disconnectLink.textContent = '[Se déconnecter]';
    disconnectLink.href = '#';
    disconnectLink.addEventListener('click', () => {
        // Remove the token from local storage
        localStorage.removeItem('token');
        // Reload the page
        window.location.reload();
    });

    connectedMessage.appendChild(disconnectLink);

    const mainTag = document.querySelector('main');
    const firstH2 = document.querySelector('h2');
    mainTag.insertBefore(connectedMessage, firstH2.nextSibling);
    loginForm.style.display = 'none';
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const login = loginInput.value;
    const password = passwordInput.value;

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: login,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Store the token and userID in local storage
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('token', data.token);
                // Redirect to index.html
                window.location.href = 'index.html';
            } else {
                // Display an error message in the DOM
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'Invalid login credentials';

                const mainTag = document.querySelector('main');
                const firstH2 = document.querySelector('h2');
                mainTag.insertBefore(errorMessage, firstH2.nextSibling);
            }
        })
});


export function checkToken() {
    const token = localStorage.getItem('token');
    let tokenStatus = false;

    if (token) {
        tokenStatus = true;
    }

    return tokenStatus;
}

const tokenStatus = checkToken(); // Returns true if the user is connected, false otherwise 
console.log(tokenStatus); // true or false