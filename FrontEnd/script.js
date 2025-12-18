// filter names list for the buttons
const filtersNames = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];

let filterUL = document.createElement("ul");

// creating filter buttons
filtersNames.forEach((names) => {
    let filterLI = document.createElement("li");
    let filterButtons = document.createElement("button");
    filterButtons.className = "filter-button";

    filterButtons.innerText = names;
    filterLI.appendChild(filterButtons);
    filterUL.appendChild(filterLI);
});

// inserting filter button list before gallery

let galleryDiv = document.querySelector(".gallery");

galleryDiv.insertAdjacentElement("beforebegin", filterUL);
console.log(filterUL);

// styling filter button list
filterUL.style.display = "flex";
filterUL.style.justifyContent = "center";
filterUL.style.gap = "20px";
filterUL.style.listStyleType = "none";
filterUL.style.marginBottom = "30px";

// styling buttons default state
let filterButtons = filterUL.querySelectorAll("button");

filterButtons.forEach((button) => {
    button.style.borderRadius = "25px";
    button.style.border = "solid 2px #1d6154";
    button.style.backgroundColor = "none";
    button.style.padding = "10px 20px";
    button.style.color = "#1d6154";
});

// // styling buttons hover state and return default
// filterButtons.forEach((button) => {
//     button.addEventListener("mouseenter", () => {
//         button.style.backgroundColor = "#1d6154";
//         button.style.color = "white";
//         button.style.cursor = "pointer";
//     });
//     button.addEventListener("mouseleave", () => {
//         button.style.backgroundColor = "white";
//         button.style.color = "#1d6154";
//     });
// });
