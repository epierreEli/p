var orderHistoryContainer = document.getElementById('orderHistory');
var focusedIndexHistory = 0;

function getOrderHistory() {
    getBilling(infos).then(function (data) {

      


        // This date should be updated with each check
        const date = infos.userInfos.checkInDate;



        console.log(data);
        renderOrderHistoryItems();

    })
        .catch(function (error) {
            console.error('Error retrieving messages:', error);
        });
}


function hideOrderHistory() {
    orderHistoryContainer.style.display = 'none';
    document.addEventListener('keydown', keydownHandler);
    orderHistoryContainer.removeEventListener('keydown', handleArrowKeys);
}

function showOrderHistory() {
    
    getOrderHistory()
    orderHistoryContainer.style.display = 'block';
    // Render the initial order history items


    const orderHistoryItemsElement = document.getElementById('orderHistoryList');
    const firstOrderHistoryItem = orderHistoryItemsElement.querySelector('li');

    if (firstOrderHistoryItem) {
        firstOrderHistoryItem.focus();
    } else {
        const closeButton = document.getElementById('close');
        closeButton.focus();
    }

    // Remove the event listener using the stored event handler function
    document.removeEventListener('keydown', keydownHandler);

    // Add event listener for arrow key navigation
    orderHistoryContainer.addEventListener('keydown', handleArrowKeys);
}

// Function to calculate the total price of the order history items
function calculateTotal() {
    let total = 0;
    orderHistoryItems.forEach(item => {
        // Assuming you have a data structure for order history items similar to cartItems in the previous code
        const price = parseFloat(item.unitPrice);
        total += price;
    });
    return total;
}

// Function to render the order history items in the HTML
function renderOrderHistoryItems() {
    const orderHistoryItemsElement = document.getElementById('orderHistoryList');
    orderHistoryItemsElement.innerHTML = ''; // Clear the existing items

    orderHistoryItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.tabIndex = index; // Add tabindex to make it focusable

        // Create a span element for the item details
        const span = document.createElement('span');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');

        span.innerText = `${item.wording}` 
        span1.innerText =`${item.unitPrice}`
        span2.innerHTML=`${item.quantity}`
        span3.innerHTML=`${item.date}`;

        // Append the span to the list item
        li.appendChild(span);
        li.appendChild(span1);
        li.appendChild(span2);
        li.appendChild(span3);


        // Append the list item to the order history items container
        orderHistoryItemsElement.appendChild(li);
    });

    const orderHistoryTotalElement = document.getElementById('billingTotal');
    orderHistoryTotalElement.innerText = `Total: $${calculateTotal()}`;
}

// Event listener for close button
const closeButton = document.getElementById('close');
closeButton.addEventListener('click', hideOrderHistory);


// Function to handle arrow key navigation
function handleArrowKeys(event) {
    if (event.keyCode === 38) {
        // Up arrow key
        goUpHistory();
    } else if (event.keyCode === 40) {
        // Down arrow key
        goDownHistory();
    } else if (event.keyCode === 37) {
        // Left arrow key
        goLeftHistory();
    } else if (event.keyCode === 39) {
        // Right arrow key
        goRightHistory();
    } else if (event.keyCode === 461) {
        // Back key (Assuming this is the key code for the back button)
        hideOrderHistory();
    }
}

// Function to handle going up to the previous element in the order history items
function goUpHistory() {
    if (focusedIndexHistory > 0) {
        focusedIndexHistory--;
    } else {
        focusedIndexHistory = orderHistoryItems.length - 1;
    }
    updateFocusHistory();
}

// Function to handle going down to the next element in the order history items
function goDownHistory() {
    if (focusedIndexHistory < orderHistoryItems.length - 1) {
        focusedIndexHistory++;
    } else {
        focusedIndexHistory = 0;
    }
    updateFocusHistory();
}

// Function to handle going left to the previous element in the current row (if needed)
function goLeftHistory() {
    const row = Math.floor(focusedIndexHistory / orderHistoryItemsPerRow); // Assuming you have a row-based layout for order history items
    const previousIndex = (row * orderHistoryItemsPerRow) + (focusedIndexHistory % orderHistoryItemsPerRow) - 1;
    if (previousIndex >= row * orderHistoryItemsPerRow) {
        focusedIndexHistory = previousIndex;
    } else {
        focusedIndexHistory = (row + 1) * orderHistoryItemsPerRow - 1;
    }
    updateFocusHistory();
}

// Function to handle going right to the next element in the current row (if needed)
function goRightHistory() {
    const row = Math.floor(focusedIndexHistory / orderHistoryItemsPerRow); // Assuming you have a row-based layout for order history items
    const nextIndex = (row * orderHistoryItemsPerRow) + (focusedIndexHistory % orderHistoryItemsPerRow) + 1;
    if (nextIndex < (row + 1) * orderHistoryItemsPerRow) {
        focusedIndexHistory = nextIndex;
    } else {
        focusedIndexHistory = row * orderHistoryItemsPerRow;
    }
    updateFocusHistory();
}

// Function to update focus on the currently focused element
function updateFocusHistory() {
    const elements = orderHistoryItems.map((item, index) => document.getElementById(`orderHistoryItem_${index}`));

    elements.forEach((element, index) => {
        if (index === focusedIndexHistory) {
            element.tabIndex = -1;
            element.focus();
        } else {
            element.tabIndex = index;
        }
    });
}

// Call the function to show the order history when needed (e.g., on a button click)
// showOrderHistory();


// Assuming you have a similar data structure for order history items like cartItems in the previous code
var orderHistoryItems = [
    {
        wording: 'Item 1',
        unitPrice: '10.00',
        quantity: 2,
        date: '2023-07-18'
    },
    {
        wording: 'Item 2',
        unitPrice: '20.00',
        quantity: 1,
        date: '2023-07-19'
    },
    // Add more items as needed
];
