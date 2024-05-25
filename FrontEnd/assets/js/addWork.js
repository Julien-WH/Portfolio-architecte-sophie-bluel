const dropArea = document.querySelector(".uploadArea");
const dragText = document.querySelector(".uploadButton");

let button = dropArea.querySelector(".uploadButton");
let input = dropArea.querySelector("input");

let file;

button.onclick = (event) => {
    event.preventDefault();
    input.click();
}; 

// Lorsque clique sur "Ajouter photo"
input.addEventListener("change", function() {
    file = this.files[0];
    dropArea.classList.add("active");
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

function showFile(){
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="">`;
            dropArea.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    } else {
        alert("Format de fichier invalide. Les formats valides sont: .jpeg, .jpg, .png");
        dropArea.classList.remove("active");
        dragText.textContent = "+ Ajouter photo";
    }
}