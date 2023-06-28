var cart_container = document.getElementById('cart-container');
let focusedIndexcart = 0;

function hideCart() {
  cartcontainer = document.getElementById('cart-container');
  cartcontainer.style.display = 'none';




  document.addEventListener('keydown', keydownHandler);

  cart_container.removeEventListener("keydown", handleArrowKeys);

}

function showCart() {
  cart_container = document.getElementById('cart-container');
  cart_container.style.display = 'flex';
  // Render the initial cart items
  renderCartItems();
  populateCartMatrix();
  const cartItemsElement = document.getElementById('cart-items');
  const firstCartItem = cartItemsElement.querySelector('li'); // Get the first list item

  if (firstCartItem) {
    firstCartItem.focus(); // Focus on the first list item
  } else {
    const continueButton = document.getElementById('continue-btn');
    continueButton.focus(); // Focus on the button instead  if there is no element 
  }

  // Remove the event listener using the stored event handler function
  document.removeEventListener("keydown", keydownHandler);

  // Add event listener for arrow key navigation
  cart_container.addEventListener('keydown', handleArrowKeys);
}





// Function to calculate the total price of the cart items
function calculateTotal() {
  let total = 0;
  cartItems.forEach(item => {

    // Remove the euro symbol from the price string
    const priceWithoutEuro = item.price.replace('€', '');

    // Convert the price to a number and add it to the total
    const price = parseFloat(priceWithoutEuro);
    total += price;
  });
  return total;
}

// Function to render the cart items in the HTML
function renderCartItems() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = ''; // Clear the existing items

  cartItems.forEach((item, index) => {
    // Create a list item
    const li = document.createElement('li');
    li.tabIndex = index; // Add tabindex to make it focusable

    // Create an image element
    const img = document.createElement('img');
    img.src = item.backgroundImage; // Replace with the actual path to the image
    img.alt = item.title; // Set the alt text for accessibility
    img.style.height = "20px";
    img.style.width = "20px";

    li.style.textAlignment = "center";
    li.style.border = "1px solid";
    // Create a span element for the item details
    const span = document.createElement('span');
    span.innerText = `${item.name} - $${item.price}`;

    // Append the image and span to the list item
    li.appendChild(img);
    li.appendChild(span);

    // Append the list item to the cart items container
    cartItemsElement.appendChild(li);
  });

  const cartTotalElement = document.getElementById('cart-total');
  cartTotalElement.innerText = calculateTotal();
}

// Event listener for checkout button
const checkoutButton = document.getElementById('checkout-btn');
checkoutButton.addEventListener('click', () => {
  console.log('Checkout functionality is not implemented yet.');
});

const deleteButton = document.querySelector('.delete-button');

const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

deleteButton.addEventListener('click', function () {
  // Perform the delete action here
  console.log('Delete button clicked!');


  const modal = document.getElementById("modalconfirm");
  modal.style.display = "block";




  cart_container.removeEventListener("keydown", handleArrowKeys);
  confirmBtn.focus();
  modal.addEventListener("keydown", handleRightLeftKeys);



  confirmBtn.addEventListener("click", function () {

    // Clear all the cartItems from the matrixCart
    while (matrixCart[0].length > 0) {
      matrixCart[0].splice(0, 1);
    }
    //empty the cartItems
    cartItems = [];

    showCart();
    modal.style.display = "none";
  });



  cancelBtn.addEventListener("click", function () {
    modal.style.display = "none";
    showCart();
  });


});

function handleRightLeftKeys(event) {
  if (event.keyCode === 39) {
    // Right arrow key logic
    if (document.activeElement === confirmBtn) {
      cancelBtn.focus(); // Focus on the cancel button
    }
  } else if (event.keyCode === 37) {
    // Left arrow key logic
    if (document.activeElement === cancelBtn) {
      confirmBtn.focus(); // Focus on the confirm button
    }
  }
}

const continueButton = document.getElementById('continue-btn');
continueButton.addEventListener('click', function () {
  // Perform the delete action here
  hideCart();
  console.log('continue button clicked!');
});


var matrixCart = [];

function populateCartMatrix() {
  const cartItemsElement = document.getElementById('cart-items');

  const checkoutButton = document.getElementById('checkout-btn');

  const cartItems = cartItemsElement.querySelectorAll('li'); // Get all the list items

  // Create a matrix with the elements
  matrixCart = [
    [...cartItems], // Add the list items as separate elements
    [continueButton],
    [checkoutButton],
    [deleteButton]
  ];
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
    hideCart();
  }
}



// Function to handle going up to the previous element
function goUp() {
  if (focusedIndexcart > 0) {
    focusedIndexcart--;
  } else {
    focusedIndexcart = matrixCart.flat().length - 1;
  }
  updateFocus();
}

// Function to handle going down to the next element
function goDown() {
  if (focusedIndexcart < matrixCart.flat().length - 1) {
    focusedIndexcart++;
  } else {
    focusedIndexcart = 0;
  }
  updateFocus();
}

// Function to handle going left to the previous element in the current row
function goLeft() {
  const row = Math.floor(focusedIndexcart / matrixCart[0].length);
  const previousIndex = (row * matrixCart[0].length) + (focusedIndexcart % matrixCart[0].length) - 1;
  if (previousIndex >= row * matrixCart[0].length) {
    focusedIndexcart = previousIndex;
  } else {
    focusedIndexcart = (row + 1) * matrixCart[0].length - 1;
  }
  updateFocus();
}

// Function to handle going right to the next element in the current row
function goRight() {
  const row = Math.floor(focusedIndexcart / matrixCart[0].length);
  const nextIndex = (row * matrixCart[0].length) + (focusedIndexcart % matrixCart[0].length) + 1;
  if (nextIndex < (row + 1) * matrixCart[0].length) {
    focusedIndexcart = nextIndex;
  } else {
    focusedIndexcart = row * matrixCart[0].length;
  }
  updateFocus();
}

function updateFocus() {
  const elements = matrixCart.flat();

  elements.forEach((element, index) => {
    if (index === focusedIndexcart) {
      element.tabIndex = -1;
      element.focus();
    } else {
      element.tabIndex = index;
    }
  });
}
