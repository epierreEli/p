// Define your application grid
var gridDataApp = [
    {
        title: "",
        children: [
            { title: "tv", icon: "ic_television_icon.png", text: "Description 2", disabled: false },
            { title: "Message", icon: "3.png", text: "envoyer des message", disabled: false },
            { title: "Panier", icon: "4.png", text: "faites vos achats", disabled: false },
            { title: "Parametres", icon: "ic_settings_icon.png", text: "Description 1", disabled: false }

        ]
    }
];


function buildPannel(grid = []) {



    const indexedMatrix = [];
    const main = document.getElementById("main");
    grid.forEach((element) => {
        var rowDom = document.createElement('div');
        rowDom.style.left = "20px";
        rowDom.classList.add('row');
        const title = document.createElement("h2");
        title.textContent = element.title;
        title.style.color = "white";
        title.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
        main.appendChild(title);
        const indexedRow = [];


        element.children.forEach((data) => {

            const isSelectable = !data.disabled;
            let vignetteElement = buildVignette(data, isSelectable);

            // on essaie de setter le rooservise sur la vignet pour pour=voir le recup apres il faudra tester que ca a bien etete setter 
            if (element.roomService) vignetteElement.classList.add("roomService");


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
    var url = `https://hospitality.ansetech.com/host/files/images/pages/${data.icon}`;

    if (isVideoLink(url)) {
        // url diffrent pour les vidéos
        url = data.icon;
        var vignetteInstance = new Video(data.title, url, 250, 200);
        var vignetteElement = vignetteInstance.render();

        vignetteElement.classList.add('video');
    } else {
        var vignetteInstance = new Vignette(data.title, url, 275, 200);
        var vignetteElement = vignetteInstance.render();

    }
    // important pour lacces et l envoie apres
    vignetteElement.setAttribute('description', data.text);
    vignetteElement.setAttribute('title', data.title);
    vignetteElement.setAttribute('icon', url);


    if (selectable) vignetteElement.setAttribute("tabindex", "0");

    return vignetteElement;
}
function isVideoLink(link) {
    // Check if the link ends with a video file extension (e.g., .mp4, .avi, .mov)
    const videoExtensions = ['.mp4', '.avi', '.mov'];
    const fileExtension = link.substring(link.lastIndexOf('.')).toLowerCase();
    return videoExtensions.includes(fileExtension);
}





//application panel revoir pour fusionner les deux fonc
function buildAppPannel(grid = []) {



    const indexedMatrix = [];
    const main = document.getElementById("main");
    grid.forEach((element) => {
        var rowDom = document.createElement('div');
        rowDom.style.left = "20px";
        rowDom.classList.add('row');
        const title = document.createElement("h2");
        title.textContent = element.title;
        title.style.color = "white";
        title.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
        main.appendChild(title);
        const indexedRow = [];


        element.children.forEach((data) => {

            const isSelectable = !data.disabled;
            const vignetteElement = buildAppVignette(data, isSelectable);
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

function buildAppVignette(data, selectable = true) {
    var vignetteElement = document.createElement('div');
    vignetteElement.classList.add('child');


    var vignetteInstance = new VignetteApp(data.title, data.icon);


    // important pour lacces et l envoie apres
    vignetteElement.setAttribute('description', data.text);
    vignetteElement.setAttribute('title', data.title);
    vignetteElement.setAttribute('icon', data.icon);
    // we create a new attribute to indicate that this is an application
    vignetteElement.classList.add('application');


    if (selectable) vignetteElement.setAttribute("tabindex", "0");



    vignetteElement.appendChild(vignetteInstance.render());

    return vignetteElement;
}


function mergeMatrices(moveMatrix, indexedMatrix) {
    // Iterate over the moveMatrix and append each row to the indexedMatrix
    moveMatrix.forEach((row) => {
        indexedMatrix.push(row);
    });

    return indexedMatrix;
}
