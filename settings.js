function hideSettings() {
    settingscontainer = document.getElementById('settings-container');
    settingscontainer.style.display = "none";

}
function showSettings() {
    settingscontainer = document.getElementById('settings-container');
    settingscontainer.style.display = "block";

}

hideSettings();

/*
function generateSettingsMatrix() {
    console.log("Generating");

    // Access the settings container
    const settingsContainer = document.getElementById('settings-container');

    // Get all the option elements
    const options = settingsContainer.querySelectorAll('.option');

    // Create an empty matrix
    const settingsMatrix = [];

    // Iterate over each option and extract the label and value
    options.forEach((option) => {
        const label = option.querySelector('label').innerText;
        let value;

        if (option.querySelector('input[type="checkbox"]')) {
            value = option.querySelector('input[type="checkbox"]').checked;
        } else if (option.querySelector('select')) {
            value = option.querySelector('select').value;
        }

        // Create an array with label and value and add it to the matrix
        settingsMatrix.push([label, value]);
    });

    // Print the settings matrix
    console.log(settingsMatrix);

    const languageSelect = document.getElementById('language-option');

    // Focus on the language select element
    languageSelect.focus();

    settingsContainer.addEventListener("keydown", function (e) {
        if ((e.keyCode >= 37 && e.keyCode <= 40) || e.keyCode === 13 || e.keyCode === 8) {
            e.preventDefault();
            logicEvent(settingsMatrix, e, function (myEvent, controles) {
                switch (myEvent) {
                    case logicEvents.CANT_GO_RIGHT:
                        // controles.goDownFirst();
                        break;
                    case logicEvents.CANT_GO_LEFT:
                        // controles.goUpLast();
                        break;
                }
            });
            smoothScrollToElement(document.activeElement);
        }
    });

    return settingsMatrix;
}
*/
/*
function navigateSet() {

    document.addEventListener("keydown", function (e) {
        if ((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode == 13) || (e.keyCode == 8)) {
            e.preventDefault();
            navigateSettingsEvent(e, function (myEvent, controles) {

            });


        }
    });
}
function navigateSettingsEvent(keyboardEvent, manageEvent = () => { }) {

    switch (keyboardEvent.keyCode) {
        case 38:

            navigateSettings("next");
            break;
        case 40:
            navigateSettings("previous");
            break;
        case 37:
            navigateSettings("previous");
            break;
        case 39:
            navigateSettings("next");
            break;
        case 13:
            // gestion de a touvh entrer
            actionOnElement();
            break;
        default:

            throw new Error("Unknown key");
    }
}
function navigateSettings(direction) {
    const options = document.querySelectorAll('.option');
    let currentIndex = -1;

    // Find the currently focused option
    for (let i = 0; i < options.length; i++) {
        if (options[i] === document.activeElement) {
            currentIndex = i;
            break;
        }
    }

    // Navigate to the next or previous option based on the direction
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % options.length;
    } else if (direction === 'previous') {
        currentIndex = (currentIndex - 1 + options.length) % options.length;
    }

    // Focus on the new option
    options[currentIndex].querySelector('input, select').focus();
}
*/