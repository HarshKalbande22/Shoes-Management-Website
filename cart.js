function getCartItems() {
    const cartData = localStorage.getItem('cartItems');
    return cartData ? JSON.parse(cartData) : [];
}

function saveCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
}

function addToCart(item) {
    const cartItems = getCartItems(); // Get current cart items
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += item.quantity;
    } else {
        cartItems.push(item);
    }

    saveCartItems(cartItems); // Save updated cart items
}
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const item = {
                name: document.querySelector('.product-name').innerText,
                price: parseFloat(document.querySelector('.price').innerText.replace('$', '')),
                image: document.querySelector('.product-image img').src,
                quantity: parseInt(document.getElementById('quantity').value)
            };
            addToCart(item); // Call the function to add the item to the cart
            alert(`${item.name} has been added to your cart!`);
        });
    }
});
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    const cartItems = getCartItems(); // Get current cart items
    let totalPrice = 0; // Initialize total price

    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        const itemHtml = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="item-quantity">
                    <button class="quantity-button" data-action="increase" data-index="${index}">+</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-button" data-action="decrease" data-index="${index}">-</button>
                </div><br>
                <button class="remove-button" data-index="${index}">Remove</button>
            </div> `;
        itemDiv.innerHTML = itemHtml;
        cartItemsContainer.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });
    document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
}
document.addEventListener('click', (event) => {
    const cartItems = getCartItems(); // Get current cart items
    if (event.target.classList.contains('quantity-button')) {
        const action = event.target.getAttribute('data-action');
        const index = event.target.getAttribute('data-index');
        if (action === 'increase') {
            cartItems[index].quantity++;
        } else if (action === 'decrease' && cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
        }
        saveCartItems(cartItems); // Save updated cart items
        renderCartItems(); // Re-render items after updating quantity
    }
    if (event.target.classList.contains('remove-button')) {
        const index = event.target.getAttribute('data-index');
        cartItems.splice(index, 1); // Remove item from cart
        saveCartItems(cartItems); // Save updated cart items
        renderCartItems(); // Re-render items after removing
    }
});
if (document.querySelector('.cart-items')) {
    renderCartItems();

    
}
document.querySelector('.checkout-button').addEventListener('click', () => {
    const totalPrice = document.getElementById('total-price').innerText; // Get the total price
    localStorage.setItem('totalAmount', totalPrice); // Store the total amount
    window.location.href = 'payment.html'; // Redirect to the payment page
});
