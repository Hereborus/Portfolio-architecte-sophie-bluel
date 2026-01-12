// fetch cat api + add "Tous" category
async function fetchCategories() {
    try {
        const responseCategories = await fetch(
            "http://localhost:5678/api/categories"
        );

        if (!responseCategories.ok) {
            throw new Error("error fetching categories");
        }

        let categories = await responseCategories.json();

        categories.unshift({ id: 0, name: "Tous" });

        return categories;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// fetch works api
async function fetchWorks() {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works");

        if (!responseWorks.ok) {
            throw new Error("error fetching works");
        }

        const works = await responseWorks.json();

        return works;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// Create category filter buttons
function createCategoryButtons() {
    fetchCategories().then((categories) => {
        const filterList = document.createElement("ul");
        filterList.className = "filter-list";

        const galleryDiv = document.querySelector(".gallery");
        galleryDiv.insertAdjacentElement("beforebegin", filterList);

        categories.forEach((category) => {
            // create list list for buttons
            const filterItem = document.createElement("li");
            filterItem.className = "filter-item";

            // Create button for each category
            const filterButton = document.createElement("button");
            filterButton.className = "filter-button";
            filterButton.textContent = category.name;
            filterButton.dataset.categoryId = category.id;

            // Append button to list item and list item to filter list
            filterItem.appendChild(filterButton);
            filterList.appendChild(filterItem);

            // Add event listener to filter works on button click
            filterButton.addEventListener("click", () => {
                filterCategory(category.id);
            });

            // Add active class toggle on button click
            filterButton.addEventListener("click", () => {
                // Remove 'active' class from all buttons
                document
                    .querySelectorAll(".filter-button")
                    .forEach((btn) => btn.classList.remove("active"));

                // Add 'active' class to clicked button
                filterButton.classList.add("active");
            });
        });
    });
}

// Display works in gallery
function displayWorks() {
    fetchWorks().then((works) => {
        const galleryDiv = document.querySelector(".gallery");
        works.forEach((work) => {
            galleryDiv.innerHTML += `<figure data-category-id="${work.categoryId}" data-work-id="${work.id}">
                                    <img
                                        src="${work.imageUrl}"
                                        alt="${work.title}" />
                                    <figcaption>${work.title}</figcaption>
                                </figure>`;
        });
    });
}
displayWorks();

// Filter works by category
function filterCategory(categoryId) {
    const figures = document.querySelectorAll(".gallery figure");
    figures.forEach((figure) => {
        if (categoryId == 0 || figure.dataset.categoryId == categoryId) {
            figure.style.display = "block";
        } else {
            figure.style.display = "none";
        }
    });
}

function editionMode() {
    // add edit banner
    const editBanner = document.createElement("div");
    editBanner.id = "edit-banner";
    editBanner.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>`;
    document.body.insertAdjacentElement("afterbegin", editBanner);

    const logoutLink = document.querySelector(".logout");
    logoutLink.classList.remove("hidden");
    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.reload();
    });
    const loginLink = document.querySelector(".login");
    loginLink.classList.add("hidden");

    // add edit project button
    const projectTitle = document.getElementById("project-title");
    const editProjectButton = document.createElement("button");
    editProjectButton.addEventListener("click", openModal);

    editProjectButton.id = "edit-project-button";
    editProjectButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>modifier`;
    projectTitle.insertAdjacentElement("beforeend", editProjectButton);
}

if (localStorage.getItem("token")) {
    editionMode();
} else {
    const editBanner = document.getElementById("edit-banner");
    if (editBanner) {
        editBanner.remove();
    }
    createCategoryButtons();
}

// modal
const modal = document.getElementById("modal");

// background overlay
const background = document.getElementById("background");

// open modal button
const openModalButton = document.getElementById("edit-project-button");

// close modal button
const closeModalButton = document.getElementById("close-modal");

// back button in modal
const backModalButton = document.getElementById("back-button");

// modal content sections
const modalProjectList = document.getElementById("modal-content-gallery");

// add project modal content
const modalAddProject = document.getElementById("modal-content-add");

// add project button in modal
const buttonAddProject = document.getElementById("add-project-button");

// image upload zone
const addimgZone = document.getElementById("image-upload-zone");

// preview image element
const previewImage = document.getElementById("preview-image");

// dialog element
const dialog = document.querySelector("dialog");

// open modal function
function openModal() {
    modal.classList.remove("hidden");
    background.classList.remove("hidden");
    modal.showModal();
    document.body.classList.add("modal-open");
}

// close modal
closeModalButton.addEventListener("click", closeModal);

// click exterior to close modal
dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();

    const isInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

    if (!isInDialog) {
        dialog.close();
        modal.classList.add("hidden");
        background.classList.add("hidden");
        modalAddProject.classList.add("hidden");
        modalProjectList.classList.remove("hidden");
        backModalButton.classList.add("hidden");
        document.body.classList.remove("modal-open");
        previewImage.src = "";
        previewImage.classList.add("hidden");
        uploadContent.classList.remove("hidden");
        addProjectForm.reset();
    }
});

// close modal function
function closeModal() {
    modal.classList.add("hidden");
    background.classList.add("hidden");
    modal.close();
    dialog.close();
    modalAddProject.classList.add("hidden");
    modalProjectList.classList.remove("hidden");
    backModalButton.classList.add("hidden");
    document.body.classList.remove("modal-open");
    previewImage.src = "";
    previewImage.classList.add("hidden");
    uploadContent.classList.remove("hidden");
    addProjectForm.reset();
}

// open add project modal content
buttonAddProject.addEventListener("click", () => {
    modalProjectList.classList.add("hidden");
    modalAddProject.classList.remove("hidden");
    backModalButton.classList.remove("hidden");
});

// back to project list modal content
backModalButton.addEventListener("click", () => {
    modalAddProject.classList.add("hidden");
    modalProjectList.classList.remove("hidden");
    backModalButton.classList.add("hidden");
    previewImage.src = "";
    previewImage.classList.add("hidden");
    uploadContent.classList.remove("hidden");
    addProjectForm.reset();
});

// modal gallery display works with delete buttons
function modalGallery() {
    fetchWorks().then((works) => {
        const modalGallery = document.getElementById("galery-modal");

        works.forEach((work) => {
            // inject all figures
            modalGallery.innerHTML += `<figure data-work-id="${work.id}">
                                    <img
                                        src="${work.imageUrl}"
                                        alt="${work.title}" />
                                        <button class="delete-btn" data-id="${work.id}">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                </figure>`;
        });

        // add delete buttons
        const deleteButtons = modalGallery.querySelectorAll(".delete-btn");

        // function of the delete buttons
        deleteButtons.forEach((button) => {
            button.addEventListener("click", deleteFunction);
        });
    });
}
function deleteFunction(e) {
    e.preventDefault();
    // retrive work id of button clicked
    const workId = e.currentTarget.dataset.id;

    // send delete request to api with authentication
    fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        // handle response
        .then((response) => {
            if (response.ok) {
                // Remove the figure from the modal gallery
                const figureToDelete = document.querySelector(
                    `#galery-modal figure[data-work-id="${workId}"]`
                );
                console.log(figureToDelete);
                figureToDelete.remove();
                // Also remove the figure from the main gallery
                const mainGallery = document.querySelector(".gallery");
                const mainFigureToDelete = mainGallery.querySelector(
                    `figure[data-work-id="${figureToDelete.dataset.workId}"]`
                );
                if (mainFigureToDelete) {
                    mainFigureToDelete.remove();
                }
            } else {
                throw new Error("Failed to delete the work");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

modalGallery();

// Image upload functionality
const fileInput = document.getElementById("img-input");

const inputButton = document.getElementById("upload-BTN");

const previewImg = document.getElementById("preview-image");

const uploadContent = document.getElementById("upload-content");

// open file dialog on button click
inputButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInput.click();
});

// prevent event propagation on file input click
fileInput.addEventListener("click", (e) => {
    e.stopPropagation();
});

// handle file selection and preview
fileInput.addEventListener("change", (event) => {
    event.stopPropagation();
    const file = fileInput.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Afficher l'aperçu de l'image
            previewImage.src = e.target.result;
            previewImage.classList.remove("hidden");
            uploadContent.classList.add("hidden");
        };
        reader.readAsDataURL(file);
        console.log("Fichier choisi :", file.name);
    }
});

// open file dialog on preview image click
previewImage.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInput.click();
});

const categoryList = document.getElementById("cat-list");

// populate category dropdown in add project modal
fetchCategories().then((categories) => {
    categories.forEach((category) => {
        if (category.id !== 0) {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            categoryList.appendChild(option);
        }
    });
});

// handle add project form submission
const addProjectForm = document.getElementById("edit-project-form");
addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addProjectForm);
    const imageFile = fileInput.files[0];
    const title = formData.get("project-title");
    const categoryId = formData.get("categorie-list");
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("category", categoryId);
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                const errorUpload = document.querySelector(".error-upload");
                errorUpload.classList.remove("hidden");
                throw new Error("Failed to add project");
            }
        })
        .then((newWork) => {
            // Add the new work to the main gallery
            const galleryDiv = document.querySelector(".gallery");
            const newFigure = document.createElement("figure");
            newFigure.dataset.categoryId = newWork.categoryId;
            newFigure.dataset.workId = newWork.id;
            newFigure.innerHTML = `<img src="${newWork.imageUrl}" alt="${newWork.title}" data-category-id="${newWork.categoryId}" data-work-id="${newWork.id}" />
                                    <figcaption>${newWork.title}</figcaption>`;
            galleryDiv.appendChild(newFigure);
            // Also add the new work to the modal gallery
            const modalGallery = document.getElementById("galery-modal");
            const newModalFigure = document.createElement("figure");
            newModalFigure.dataset.workId = newWork.id;
            newModalFigure.innerHTML = `<img src="${newWork.imageUrl}" alt="${newWork.title}" data-work-id="${newWork.id}" />
                                        <button class="delete-btn" data-id="${newWork.id}"><i class="fa-solid fa-trash-can"></i></button>`;
            const deleteButton = newModalFigure.querySelector(".delete-btn");
            deleteButton.addEventListener("click", deleteFunction);
            modalGallery.appendChild(newModalFigure);
            // Reset the form and preview
            addProjectForm.reset();
            previewImage.src = "";
            previewImage.classList.add("hidden");
            uploadContent.classList.remove("hidden");
            // Return to the project list modal content
            modalAddProject.classList.add("hidden");
            modalProjectList.classList.remove("hidden");
            backModalButton.classList.add("hidden");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
