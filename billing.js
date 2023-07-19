var orderHistoryContainer = document.getElementById('orderHistory');
var focusedIndexHistory = 0;

function getOrderHistory() {
    getBilling(infos)
        .then(function (data) {
            console.log(data);
            // Assuming the received data is in the format provided above
            const orderHistoryItems = [];

            data.commands.forEach(item => {
                item.products.forEach(product => {
                    const orderItem = {
                        wording: product.product,
                        // You can add any other properties related to the product here
                        unitPrice: product.price ,
                        quantity: product.qty,
                        date: item.lastOrder,
                        cancelled: item.cancelled
                    };
                    orderHistoryItems.push(orderItem);
                });
            });

            // Call the renderOrderHistoryItems function with the updated order history items
            renderOrderHistoryItems(orderHistoryItems);
        })
        .catch(function (error) {
            console.error('Error retrieving messages:', error);
        });
}




function hideOrderHistory() {
    orderHistoryContainer.style.display = 'none';
    document.addEventListener('keydown', keydownHandler);
    orderHistoryContainer.removeEventListener('keydown', handleArrowKeysOrderHistory);
}

function showOrderHistory() {

    getOrderHistory()
    orderHistoryContainer.style.display = 'block';
    // Render the initial order history items


    const orderHistoryItemsElement = document.getElementById('orderHistoryList');
    const firstOrderHistoryItem = orderHistoryItemsElement.querySelector('li');
    console.log("firstOrderHistoryItem");
    console.log(firstOrderHistoryItem);

    if (firstOrderHistoryItem) {
        firstOrderHistoryItem.focus();
        console.log("hellosss");
        console.log(firstOrderHistoryItem);
    } else {
        const closeButton = document.getElementById('close');
        closeButton.focus();
        console.log(firstOrderHistoryItem);
    }

    // Remove the event listener using the stored event handler function
    document.removeEventListener('keydown', keydownHandler);

    // Add event listener for arrow key navigation
    orderHistoryContainer.addEventListener('keydown', handleArrowKeysOrderHistory);
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

function renderOrderHistoryItems(orderHistoryItems) {
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

        console.log(item.wording);
        console.log(item.price);
        span.innerText = `${item.wording}`
        span1.innerText = `${item.unitPrice}`
        span2.innerHTML = `${item.quantity}`

        // Check if the order is canceled and display "ORDER CANCELLED" in red if it is
        if (item.cancelled) {
            const cancelledSpan = document.createElement('span');
            cancelledSpan.innerText = "ORDER CANCELLED";
            cancelledSpan.style.color = 'red';
            span3.appendChild(cancelledSpan);
        } else {
            span3.innerHTML = `${item.date}`;
        }

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
function handleArrowKeysOrderHistory(event) {
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
    } else if (event.keyCode === 461 || event.keyCode === 8) {
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
