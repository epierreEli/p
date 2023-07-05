// Get the options container element
var optionsContainer = document.getElementById('options-container');

// Populate the matrix and initialize focus on the first element
var settingsMatrix = populateMatrix();

// Variable to store the current focused index
var focusedIndex = 0;

function hideSettings() {
    var settingsContainer = document.getElementById('settings-container');
    settingsContainer.style.display = "none";

    // Add the event listener using the stored event handler function
    document.addEventListener("keydown", keydownHandler);

    optionsContainer.removeEventListener('keydown', handleArrowKeysSettings);
}

function showSettings() {
    var settingsContainer = document.getElementById('settings-container');
    settingsContainer.style.display = "block";

    // Remove the event listener using the stored event handler function
    document.removeEventListener("keydown", keydownHandler);

    // Add event listener for arrow key navigation
    optionsContainer.addEventListener('keydown', handleArrowKeysSettings);

    settingsMatrix[0][1].focus();
    console.log(settingsMatrix);
}

hideSettings();

// Navigation in settings

// Function to populate the matrix array
function populateMatrix() {
    // Get all the option elements within the container
    var options = optionsContainer.getElementsByClassName('option');

    // Create an empty matrix
    var settingsMatrix = [];

    // Loop through each option element
    for (var i = 0; i < options.length; i++) {
        var option = options[i];

        // Get the label text
        var label = option.querySelector('label').textContent;

        // Get the associated input element
        var input = option.querySelector('input');
        var select = option.querySelector('select');

        if (!input && !select) continue; // Skip the option if there's no input or select element

        var element;
        if (input) {
            input.tabIndex = '0';
            element = input;
        } else {
            element = select;
        }
       


        // Push the label and element (input or select) to the matrix
        settingsMatrix.push([label, element]);
    }

    console.log(settingsMatrix);
    return settingsMatrix;
}

// Function to update the focus on the element
function updateFocus() {
    // Remove focus from all elements
    for (var i = 0; i < settingsMatrix.length; i++) {
        settingsMatrix[i][1].blur();
    }

    // Add focus to the current focused element
    settingsMatrix[focusedIndex][1].focus();
}

// Function to handle arrow key navigation
function handleArrowKeysSettings(event) {
    if (event.keyCode === 38) {
        goUpSet();
    } else if (event.keyCode === 40) {
        goDownSet();
    } else if (event.keyCode === 461) {
        hideSettings();
    }
}

// Function to handle going up to the previous element
function goUpSet() {
    if (focusedIndex > 0) {
        focusedIndex--;
    } else {
        focusedIndex = settingsMatrix.length - 1;
    }
    settingsMatrix[focusedIndex][1].focus();
}

// Function to handle going down to the next element
function goDownSet() {
    if (focusedIndex < settingsMatrix.length - 1) {
        focusedIndex++;
    } else {
        focusedIndex = 0;
    }
    settingsMatrix[focusedIndex][1].focus();
}
