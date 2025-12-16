const filtersNames = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];

let galleryDiv = document.querySelector(".gallery");

let filterUL = document.createElement("ul");

filtersNames.forEach((Name) => {
    let filterLI = document.createElement("li");
    let buttonFilter = document.createElement("button");

    buttonFilter.innerText = Name;

    filterLI.appendChild(buttonFilter);
    filterUL.appendChild(filterLI);
});

galleryDiv.insertAdjacentElement("beforebegin", filterUL);
console.log(filterUL);

filterUL.style.display = "flex";
filterUL.style.justifyContent = "center";
filterUL.style.gap = "20px";
filterUL.style.listStyleType = "none";
filterUL.style.marginBottom = "30px";
