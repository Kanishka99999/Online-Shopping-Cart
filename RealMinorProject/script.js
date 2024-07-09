const products = [
    { id: 1, name: "Product 1", price: 10.00, image: "product1.jpg" },
    { id: 2, name: "Product 2", price: 15.00, image: "product2.jpg" },
    { id: 3, name: "Product 3", price: 20.00, image: "product3.jpg" },
   
];

let cart = [];

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });
    
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    document.getElementById('cart-count').textContent = cart.length;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function displayProducts() {
    const productsContainer = document.getElementById('products');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <span>$${product.price.toFixed(2)}</span>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        
        productsContainer.appendChild(productElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
});
