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

// fetchCategories().then((categories) => {
//     console.log(categories);
// });

function createCategoryButtons() {
    fetchCategories().then((categories) => {
        const filterList = document.createElement("ul");
        filterList.className = "filter-list";

        const galleryDiv = document.querySelector(".gallery");
        galleryDiv.insertAdjacentElement("beforebegin", filterList);

        categories.forEach((category) => {
            const filterItem = document.createElement("li");
            const filterButton = document.createElement("button");
            filterButton.textContent = category.name;
            filterButton.dataset.categoryId = category.id;
            filterButton.className = "filter-button";
            filterItem.appendChild(filterButton);
            filterItem.className = "filter-item";
            filterList.appendChild(filterItem);
        });
    });
}

createCategoryButtons();

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

function displayWorks() {
    fetchWorks().then((works) => {
        works.forEach((work) => {
            const galleryDiv = document.querySelector(".gallery");
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

document.getElementsByClassName("filter-button");
addEventListener("click", (filterButton) => {
    console.log("click");
});
