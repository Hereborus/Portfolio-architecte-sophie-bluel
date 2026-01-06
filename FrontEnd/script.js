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

createCategoryButtons();

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

// Display works in gallery
function displayWorks() {
    fetchWorks().then((works) => {
        const galleryDiv = document.querySelector(".gallery");
        works.forEach((work) => {
            galleryDiv.innerHTML += `<figure data-category-id="${work.categoryId}">
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

//
let loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async function (loginSubmite) {
    loginSubmite.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    console.log("Email:", email);
    console.log("Password:", password);

    try {
        const logincredential = await fetch(
            "http://localhost:5678/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );

        if (!logincredential.ok) {
            throw new Error("Login failed");
        }

        const loginData = await logincredential.json();
        console.log("Login successful:", loginData);

        // You can store the token or redirect the user here
        localStorage.setItem("token", loginData.token);
        window.location.href = "index.html";
    } catch (error) {
        console.error("Login error:", error);
    }
});
