
function hideCart() {
  cartcontainer = document.getElementById('cart-container');
  cartcontainer.style.display = 'none';
}

function showCart() {
  cartcontainer = document.getElementById('cart-container');
  cartcontainer.style.display = 'flex';
}
// Sample data for cart items
/*const cartItems = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 15 }
];
*/
// Function to calculate the total price of the cart items
function calculateTotal() {
  let total = 0;
  cartItems.forEach(item => {
    total += item.price;
  });
  return total;
}

// Function to render the cart items in the HTML
// Function to render the cart items in the HTML
function renderCartItems() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = ''; // Clear the existing items

  cartItems.forEach(item => {
    // Create a list item
    const li = document.createElement('li');

    // Create an image element
    const img = document.createElement('img');
    img.src = backgroundImage; // Replace with the actual path to the image
    img.alt = item.title; // Set the alt text for accessibility
    img.style.height ="20px";
    img.style.width ="20px";

    li.style.textAlignment="center";
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

// Render the initial cart items
renderCartItems();