
// Get the options container element
var optionsContainer = document.getElementById('options-container');
// Populate the matrix and initialize focus on the first element
var settingsMatrix = populateMatrix();
// Variable to store the current focused index
let focusedIndex = 0;


function hideSettings() {
    settingscontainer = document.getElementById('settings-container');
    settingscontainer.style.display = "none";

    // Add the event listener using the stored event handler function
    document.addEventListener("keydown", keydownHandler);

    optionsContainer.removeEventListener('keydown', handleArrowKeysSettings);

}
function showSettings() {
    settingscontainer = document.getElementById('settings-container');
    settingscontainer.style.display = "block";

    // Remove the event listener using the stored event handler function
    document.removeEventListener("keydown", keydownHandler);

    // Add event listener for arrow key navigation
    optionsContainer.addEventListener('keydown', handleArrowKeysSettings);


    settingsMatrix[0][1].focus();
    console.log(settingsMatrix);

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
      const select = option.querySelector('select');
  
      if (!input && !select) continue; // Skip the option if there's no input or select element
  
      let element;
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
    } else if (event.keyCode === 8) {
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

