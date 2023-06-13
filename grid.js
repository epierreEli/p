import * as vignetteModule from "./grid.js";
import * as logicParserModule from "./logicParser.js";

export function buildPannel(grid = []) {
    const indexedMatrix = [];
    const main = document.getElementById("main");
    grid.forEach((element) => {
        var rowDom = document.createElement('div');
        rowDom.style.left = "20px";
        rowDom.classList.add('row');
        const title = document.createElement("h2");
        title.textContent = element.title;
        main.appendChild(title);
        const indexedRow = [];

        element.children.forEach((data) => {
            const isSelectable = !data.disabled;
            const vignetteElement = buildVignette(data, isSelectable);
            if (isSelectable) indexedRow.push(vignetteElement);
            rowDom.appendChild(vignetteElement); // Append vignetteElement to rowDom
        });

        indexedMatrix.push(indexedRow);

        // Iterate over the indexedRow array and append each element to rowDom
        indexedRow.forEach((child) => {
            rowDom.appendChild(child);
        });

        main.appendChild(rowDom);
    });

    return indexedMatrix;
}

export function buildVignette(data, selectable = true) {
    var vignetteElement = document.createElement('div');
    vignetteElement.classList.add('child');
    var url = `https://hospitality.ansetech.com/host/files/images/pages/${data.icon}`;
    var vignetteInstance = new logicParserModule.Vignette(data.title, url);
    console.log(data.title, data.icon);

    if (selectable) vignetteElement.setAttribute("tabindex", "0");

    vignetteElement.appendChild(vignetteInstance.render());

    return vignetteElement;
}
