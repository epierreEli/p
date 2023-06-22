function hideInfoPage() {
    const infoPage = document.getElementById("info-container");
    infoPage.style.display = "none";
}

function showInfoPage() {
    const infoPage = document.getElementById("info-container");
    infoPage.style.display = "block";

}

function getDataFromElement(activeElement) {
    showInfoPage();

    var title = document.getElementById('info-title');
    var infodescription = document.getElementById('infodescription');
    title.innerHTML = activeElement.getAttribute('title');
    infodescription.innerHTML = activeElement.getAttribute('description');

    var littleimage = document.getElementById("imagest");
    littleimage.style.backgroundImage = "url(" + activeElement.getAttribute('icon') + ")";
    var fullimage = document.getElementById("full-image");
    fullimage.style.backgroundImage = "url(" + activeElement.getAttribute('icon') + ")";
}
