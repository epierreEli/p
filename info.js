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

    if (event.keyCode === 8) {
        console.log("backspace");
        hideInfoPage();

    } else if (event.keyCode === 13) {
        console.log("touche entreee");

        const buttoninf = document.getElementById('button-info');

        if (buttoninf.innerHTML === "Ajouter au panier") {
            

            // Get the necessary information
            var title = document.getElementById('info-title').innerHTML;
            var price = document.getElementById('infodescription').innerHTML;
            var littleimage = document.getElementById("imagest");
            var computedStyle = window.getComputedStyle(littleimage);
            var backgroundImage = computedStyle.getPropertyValue('background-image');

            // Create an object with the information
            var item = {
                title: title,
                price: price,
                backgroundImage: backgroundImage
            };

            // Add the item to the cart array
            cartItems.push(item);
            console.log(cartItems);
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
    }

    title.innerHTML = activeElement.getAttribute('title');
    infodescription.innerHTML = activeElement.getAttribute('description') + "€";

    var littleimage = document.getElementById("imagest");
    littleimage.style.backgroundImage = "url(" + activeElement.getAttribute('icon') + ")";
    var fullimage = document.getElementById("full-image");
    fullimage.style.backgroundImage = "url(" + activeElement.getAttribute('icon') + ")";
}
