var buttons = document.getElementById("button-info");
var cartItems = [];

function hideInfoPage() {
    const infoPage = document.getElementById("info-container");
    infoPage.style.display = "none";



    infoPage.removeEventListener("keydown", handleKeysInfo);

    // Add the event listener using the stored event handler function
    document.addEventListener("keydown", keydownHandler);



}

function showInfoPage() {
    const infoPage = document.getElementById("info-container");
    infoPage.style.display = "block";


    //il faut toujours mettre le focus la ou est 
    buttons.focus();
    // Remove the event listener using the stored event handler function
    document.removeEventListener("keydown", keydownHandler);

    // Add event listener for arrow key navigation
    infoPage.addEventListener('keydown', handleKeysInfo);

}

function handleKeysInfo(event) {

    if (event.keyCode === 461 ||event.keyCode === 8) {
        hideInfoPage();

    } else if (event.keyCode === 13) {
       

        const buttoninf = document.getElementById('button-info');

        if (buttoninf.innerHTML === "Ajouter au panier") {


            // Get the necessary information
            var titleElement = document.getElementById('info-title').innerHTML;
            var price = document.getElementById('infodescription').innerHTML;
            var littleimage = document.getElementById("imagest");
           
            var computedStyle = window.getComputedStyle(littleimage);
            var backgroundImage = computedStyle.getPropertyValue('background-image');
            // decouage de l url pour obtenir que la partir necesaire 
            const urlPattern = /url\(["']?([^"']+)["']?\)/;
            const match = backgroundImage.match(urlPattern);

            if (match) {
                var urlimg = match[1];
                 // Output: https://hospitality.ansetech.com/host/files/images/pages/614d9fb78791d6309885eb69.jpg
            } else {
                console.log('No URL found.');
            }
            // Create an object with the information
            var item = {
                title: titleElement,
                price: price,
                backgroundImage: urlimg
            };

            // Add the item to the cart array
            cartItems.push(item);
           
        }
    }
}

function getDataFromElement(activeElement) {
    showInfoPage();

    var title = document.getElementById('info-title');
    var infodescription = document.getElementById('infodescription');
    var button = document.getElementById('button-info');

    if (activeElement.classList.contains('roomService')) {
        button.innerHTML = "Ajouter au panier";
    }else{
        button.innerHTML = "Voir";
    }

    title.innerHTML = activeElement.getAttribute('title');
    infodescription.innerHTML = activeElement.getAttribute('description') + "€";

    var littleimage = document.getElementById("imagest");
    littleimage.style.backgroundImage = "url(" + activeElement.getAttribute('icon') + ")";
    var fullimage = document.getElementById("full-image");
    fullimage.style.backgroundImage = "url(" + activeElement.getAttribute('icon') + ")";
}
