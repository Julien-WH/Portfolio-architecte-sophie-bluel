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
            FormatErrorMsg.innerHTML = "Format de fichier invalide. Les formats valides sont: .jpeg, .jpg, .png";
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
        dragText.textContent = "+ Ajouter photo";
    }
}