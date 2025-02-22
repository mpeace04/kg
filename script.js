document.addEventListener('DOMContentLoaded', function () {
  const cartItems = []; // Array to store cart items
  const cartList = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const clearCartButton = document.getElementById('clear-cart');
  const submitOrderButton = document.getElementById('submit-order'); // Submit Order button
  const nameInput = document.getElementById('name'); // Name input field
  const emailInput = document.getElementById('email'); // Email input field

  // Function to calculate the total price
  function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price;
    });
    totalPriceElement.textContent = `R${total.toFixed(2)}`;
    document.getElementById('cart-total-input').value = total.toFixed(2); // Update hidden input
  }

  // Function to add an item to the cart
  function addToCart(product) {
    cartItems.push(product);
    updateCartDisplay();
    calculateTotal();
  }

  // Function to update the cart display
  function updateCartDisplay() {
    cartList.innerHTML = ''; // Clear the cart display
    cartItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - R${item.price.toFixed(2)} (Color: ${item.color}, Length: ${item.length}")`;
      cartList.appendChild(li);
    });
  }

  // Function to show a temporary notification message
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add the 'show' class to trigger the animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10); // Small delay to allow the element to be added to the DOM

    // Remove the notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300); // Wait for the fade-out animation to complete
    }, 3000); // Notification stays visible for 3 seconds
  }

  // Event listener for "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      console.log('Add to Cart button clicked'); // Debugging log

      const productName = this.getAttribute('data-name');
      const basePrice = parseFloat(this.getAttribute('data-price'));

      // Get the selected color and length
      const colorSelector = this.closest('.product').querySelector('.color-selector');
      const lengthSlider = this.closest('.product').querySelector('.length-slider');
      const lengthValue = this.closest('.product').querySelector('.length-value');
      
      const selectedColor = colorSelector ? colorSelector.value : 'N/A';
      const selectedLength = lengthSlider ? getNearestEven(lengthSlider.value) : 16; // Default to 16 if no slider

      // Calculate the price based on the slider length
      const lengthPriceAdjustment = (selectedLength - 16) * 200; // Price increments by R200 per inch
      const totalPrice = basePrice + lengthPriceAdjustment;

      // Add product to cart with color, length, and dynamic price
      addToCart({
        name: productName,
        price: totalPrice,
        color: selectedColor,
        length: selectedLength
      });

      // Show a notification message
      showNotification(`${productName} has been added to cart!`);

      // Add animation to the button
      this.classList.add('add-to-cart-animation');
      setTimeout(() => {
        this.classList.remove('add-to-cart-animation');
      }, 500); // Remove animation after 0.5 seconds
    });
  });

  // Event listener for the Clear Cart button
  clearCartButton.addEventListener('click', function () {
    if (cartItems.length === 0) {
      Swal.fire({
        title: 'Empty Cart!',
        text: 'Your cart is already empty.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      return;
    }

    // SweetAlert2 confirmation for clearing the cart
    Swal.fire({
      title: 'Clear Cart?',
      text: 'Are you sure you want to clear your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        cartItems.length = 0; // Clear the cart
        updateCartDisplay();
        calculateTotal();
        Swal.fire({
          title: 'Cart Cleared!',
          text: 'Your cart has been cleared.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    });
  });

  // Event listener for the Submit Order button
  submitOrderButton.addEventListener('click', function () {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    // Validate Name and Email fields
    if (!name || !email) {
      Swal.fire({
        title: 'Missing Information!',
        text: 'Please fill in your name and email before submitting the order.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (cartItems.length === 0) {
      Swal.fire({
        title: 'Empty Cart!',
        text: 'Your cart is empty. Please add products before submitting your order.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    // SweetAlert2 confirmation for submitting the order
    Swal.fire({
      title: 'Submit Order?',
      text: 'Are you sure you want to submit your order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulate order submission (replace with actual logic)
        Swal.fire({
          title: 'Order Submitted!',
          html: `Thank you, <strong>${name}</strong>! Your order has been successfully submitted. A confirmation email will be sent to <strong>${email}</strong>.`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          cartItems.length = 0; // Clear the cart
          updateCartDisplay();
          calculateTotal();
          nameInput.value = ''; // Clear name field
          emailInput.value = ''; // Clear email field
        });
      }
    });
  });

  // Handle slider price change dynamically
  document.querySelectorAll('.length-slider').forEach(slider => {
    slider.addEventListener('input', function () {
      const length = getNearestEven(this.value); // Ensure even length
      const lengthValue = this.closest('.product').querySelector('.length-value');
      const basePriceElement = this.closest('.product').querySelector('.base-price');
      const priceElement = this.closest('.product').querySelector('.price');

      // Update the displayed length
      lengthValue.textContent = `${length}"`;  // Show the length in inches

      // Get the base price (use data-attribute for dynamic pricing)
      const basePrice = parseFloat(basePriceElement.getAttribute('data-base-price'));
      const price = basePrice + (length - 16) * 200; // Example: Price increments by R200 per inch

      // Update the displayed price
      priceElement.textContent = `R${price.toFixed(2)}`;
    });
  });

  // Helper function to get the nearest even number
  function getNearestEven(value) {
    const num = parseInt(value, 10);
    return num % 2 === 0 ? num : num + 1;
  }
});
