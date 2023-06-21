
function hideCart() {
    cartcontainer = document.getElementById('cart-container');
    cartcontainer.style.display = 'none';
  }

  function showCart() {
    cartcontainer = document.getElementById('cart-container');
    cartcontainer.style.display = 'flex';
  }
  // Sample data for cart items
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 15 }
  ];

  // Function to calculate the total price of the cart items
  function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price;
    });
    return total;
  }

  // Function to render the cart items in the HTML
  function renderCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = ''; // Clear the existing items

    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.innerText = `${item.name} - $${item.price}`;
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