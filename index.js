const products = [
  { id: 1, name: "Sneakers", price: 1999, image: "shoes.jpeg" },
  { id: 2, name: "Headphones", price: 2999, image: "headphones.webp" },
  { id: 3, name: "Smartwatch", price: 4999, image: "watch.jpeg" },
  { id: 4, name: "Laptop Bag", price: 1499, image: "bag.jpeg" }
];

let cart = [];

// Load products
const productList = document.getElementById("product-list");
products.forEach(p => {
  const col = document.createElement("div");
  col.className = "col-md-3 mb-4";
  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${p.image}" class="card-img-top" alt="${p.name}">
      <div class="card-body text-center">
        <h5 class="card-title">${p.name}</h5>
        <p class="card-text">₹${p.price}</p>
        <button class="btn btn-primary btn-add" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `;
  productList.appendChild(col);
});

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity = (item.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();

  // Show cart modal
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
}

// Update cart
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span>${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}</span>
      <div>
        <button class="btn btn-sm btn-secondary" onclick="decreaseQuantity(${item.id})">-</button>
        <button class="btn btn-sm btn-secondary" onclick="increaseQuantity(${item.id})">+</button>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartItems.innerHTML += `<hr><p><strong>Total: ₹${total}</strong></p>`;
}

// Remove from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Increase quantity
function increaseQuantity(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.quantity++;
  updateCart();
}

// Decrease quantity
function decreaseQuantity(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity--;
    if (item.quantity === 0) {
      cart = cart.filter(p => p.id !== id);
    }
  }
  updateCart();
}
