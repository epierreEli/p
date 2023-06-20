
function buildPannel(grid = []) {
    const indexedMatrix = [];
    const main = document.getElementById("main");
    grid.forEach((element) => {
        var rowDom = document.createElement('div');
        rowDom.style.left = "20px";
        rowDom.classList.add('row');
        const title = document.createElement("h2");
        title.textContent = element.title;
        title.style.color= "white";
        title.style.textShadow= "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
        main.appendChild(title);
        const indexedRow = [];

        // test pour recupere le roomsevirce
        // console.log("element");
        // console.log(element);


        element.children.forEach((data) => {
            // test pour recupere le roomsevirce
            // console.log("my datatg fggfh");
            // console.log(data);

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

function buildVignette(data, selectable = true) {
    var vignetteElement = document.createElement('div');
    vignetteElement.classList.add('child');
    var url = `https://hospitality.ansetech.com/host/files/images/pages/${data.icon}`;
    var vignetteInstance = new Vignette(data.title, url);
    
    if (isVideoLink(url)) {
        // url diffrent pour les vidéos
        url=data.icon;
        var vignetteInstance = new Video(data.title, url);
    }else {
        var vignetteInstance = new Vignette(data.title, url);
    }

    // important pour lacces et l envoie apres
    vignetteElement.setAttribute('description', data.text);
    vignetteElement.setAttribute('title', data.title);
    vignetteElement.setAttribute('icon', url);

    if (selectable)vignetteElement.setAttribute("tabindex", "0");

   

    vignetteElement.appendChild(vignetteInstance.render());

    return vignetteElement;
}
function isVideoLink(link) {
    // Check if the link ends with a video file extension (e.g., .mp4, .avi, .mov)
    const videoExtensions = ['.mp4', '.avi', '.mov'];
    const fileExtension = link.substring(link.lastIndexOf('.')).toLowerCase();
    return videoExtensions.includes(fileExtension);
}

