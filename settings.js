
// Get the options container element
var optionsContainer = document.getElementById('options-container');
// Populate the matrix and initialize focus on the first element
var settingsMatrix = populateMatrix();

function hideSettings() {
    settingscontainer = document.getElementById('settings-container');
    settingscontainer.style.display = "none";

    // Add the event listener using the stored event handler function
    document.addEventListener("keydown", keydownHandler);
    
    optionsContainer.removeEventListener('keydown', handleArrowKeys);

}
function showSettings() {
    settingscontainer = document.getElementById('settings-container');
    settingscontainer.style.display = "block";

    // Remove the event listener using the stored event handler function
    document.removeEventListener("keydown", keydownHandler);

    // Add event listener for arrow key navigation
    optionsContainer.addEventListener('keydown', handleArrowKeys);


    settingsMatrix[0][1].focus();

}

hideSettings();


// navigation in setting 


// Function to populate the matrix array
function populateMatrix() {
    // Get all the option elements within the container
    const options = optionsContainer.getElementsByClassName('option');

    // Create an empty matrix
    const settingsMatrix = [];

    // Loop through each option element
    for (let option of options) {
        // Get the label text
        const label = option.querySelector('label').textContent;

        // Get the associated input element
        const input = option.querySelector('input');
        if (!input) continue; // Skip the option if there's no input element

        // Push the label and input element as an array to the matrix
        settingsMatrix.push([label, input]);
    }

    return settingsMatrix;
}

// Variable to store the current focused index
let focusedIndex = 0;

// Function to update the focus on the element
function updateFocus() {
    // Remove focus from all elements
    for (let option of settingsMatrix) {
        option[1].blur();
    }

    // Add focus to the current focused element
    settingsMatrix[focusedIndex][1].focus();
}

// Function to handle arrow key navigation
function handleArrowKeys(event) {
    if (event.keyCode === 38) {
        goUp();
    } else if (event.keyCode === 40) {
        goDown();
    } else if (event.keyCode === 37) {
        goLeft();
    } else if (event.keyCode === 39) {
        goRight();
    }
    else if (event.keyCode === 8) {
        hideSettings();
    }
}

// Function to handle going up to the previous element
function goUp() {
    if (focusedIndex > 0) {
        focusedIndex--;
    } else {
        focusedIndex = settingsMatrix.length - 1;
    }
    updateFocus();
}

// Function to handle going down to the next element
function goDown() {
    if (focusedIndex < settingsMatrix.length - 1) {
        focusedIndex++;
    } else {
        focusedIndex = 0;
    }
    updateFocus();
}

// Function to handle going left to the previous element in the current row
function goLeft() {
    const row = Math.floor(focusedIndex / 2);
    const previousIndex = (row * 2) + (focusedIndex % 2) - 1;
    if (previousIndex >= 0) {
        focusedIndex = previousIndex;
    } else {
        focusedIndex = row * 2 + 1;
    }
    updateFocus();
}

// Function to handle going right to the next element in the current row
function goRight() {
    const row = Math.floor(focusedIndex / 2);
    const nextIndex = (row * 2) + (focusedIndex % 2) + 1;
    if (nextIndex < settingsMatrix.length) {
        focusedIndex = nextIndex;
    } else {
        focusedIndex = row * 2;
    }
    updateFocus();
}



