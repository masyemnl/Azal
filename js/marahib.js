// Marahib - Premium Frozen Products JavaScript

// Product data
const products = {
    meals: [
        { id: 'meal-1', name: 'Grilled Chicken Meal', price: 12.99, description: 'Grilled chicken with rice and vegetables' },
        { id: 'meal-2', name: 'Beef Stew', price: 14.99, description: 'Tender beef stew with potatoes and carrots' },
        { id: 'meal-3', name: 'Vegetable Lasagna', price: 11.99, description: 'Layered pasta with vegetables and cheese' },
        { id: 'meal-4', name: 'Fish Fillet Meal', price: 13.99, description: 'Fish fillet with mashed potatoes and peas' },
        { id: 'meal-5', name: 'Chicken Curry', price: 12.99, description: 'Spicy chicken curry with basmati rice' },
        { id: 'meal-6', name: 'Vegetable Stir Fry', price: 10.99, description: 'Mixed vegetables with sauce over rice' }
    ],
    chicken: [
        { id: 'chicken-1', name: 'Whole Chicken', price: 15.99, description: 'Whole frozen chicken, premium quality' },
        { id: 'chicken-2', name: 'Chicken Breast (1kg)', price: 18.99, description: 'Boneless, skinless chicken breast' },
        { id: 'chicken-3', name: 'Chicken Thighs (1kg)', price: 16.99, description: 'Chicken thighs, bone-in' },
        { id: 'chicken-4', name: 'Chicken Wings (1kg)', price: 14.99, description: 'Chicken wings, perfect for grilling' },
        { id: 'chicken-5', name: 'Chicken Drumsticks (1kg)', price: 15.99, description: 'Chicken drumsticks, family pack' },
        { id: 'chicken-6', name: 'Chicken Cutlets', price: 17.99, description: 'Pre-cut chicken cutlets, ready to cook' }
    ],
    fish: [
        { id: 'fish-1', name: 'Salmon Fillet (500g)', price: 22.99, description: 'Premium Atlantic salmon fillet' },
        { id: 'fish-2', name: 'Cod Fillet (500g)', price: 18.99, description: 'Fresh cod fillet, wild caught' },
        { id: 'fish-3', name: 'Tuna Steaks (500g)', price: 19.99, description: 'Fresh tuna steaks' },
        { id: 'fish-4', name: 'Shrimp (500g)', price: 24.99, description: 'Large shrimp, peeled and deveined' },
        { id: 'fish-5', name: 'Fish Fillets Mixed (1kg)', price: 16.99, description: 'Assorted fish fillets' },
        { id: 'fish-6', name: 'Crab Meat (300g)', price: 26.99, description: 'Premium crab meat, ready to use' }
    ],
    vegetables: [
        { id: 'veg-1', name: 'Mixed Vegetables (1kg)', price: 8.99, description: 'Assorted frozen vegetables' },
        { id: 'veg-2', name: 'Broccoli (500g)', price: 6.99, description: 'Fresh frozen broccoli florets' },
        { id: 'veg-3', name: 'Green Beans (500g)', price: 5.99, description: 'Tender green beans' },
        { id: 'veg-4', name: 'Peas (500g)', price: 4.99, description: 'Sweet green peas' },
        { id: 'veg-5', name: 'Spinach (500g)', price: 5.99, description: 'Frozen spinach leaves' },
        { id: 'veg-6', name: 'Corn (500g)', price: 4.99, description: 'Sweet corn kernels' },
        { id: 'veg-7', name: 'Carrots (500g)', price: 4.99, description: 'Diced carrots' },
        { id: 'veg-8', name: 'Cauliflower (500g)', price: 5.99, description: 'Cauliflower florets' }
    ]
};

// Cart functionality
let cart = JSON.parse(localStorage.getItem('marahibCart')) || [];

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Set up view products buttons
    const viewButtons = document.querySelectorAll('.view-products-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showProductCategory(category);
        });
    });
    
    // Set up footer category links
    const footerLinks = document.querySelectorAll('.footer-section a[data-category]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            showProductCategory(category);
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple form validation and submission
            alert('Thank you for your message! We will get back to you soon.\n\nName: ' + data.name + '\nEmail: ' + data.email);
            this.reset();
        });
    }
});

// Show product category
function showProductCategory(category) {
    const productDetails = document.getElementById('productDetails');
    const categoryTitle = document.getElementById('categoryTitle');
    const productList = document.getElementById('productList');
    
    if (!productDetails || !categoryTitle || !productList) return;
    
    const categoryNames = {
        meals: 'Frozen Meals',
        chicken: 'Frozen Chicken Products',
        fish: 'Frozen Fish & Seafood',
        vegetables: 'Frozen Vegetables'
    };
    
    categoryTitle.textContent = categoryNames[category] || category;
    productList.innerHTML = '';
    
    if (products[category]) {
        products[category].forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <span class="price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', ${product.price})">
                    Add to Cart
                </button>
            `;
            productList.appendChild(productItem);
        });
    }
    
    productDetails.style.display = 'block';
    productDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    
    // Show feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added! ✓';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1500);
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    
    // Reload cart page if on cart page
    if (window.location.pathname.includes('marahib-cart.html')) {
        loadCart();
    }
}

// Update quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        updateCartCount();
        
        // Reload cart page if on cart page
        if (window.location.pathname.includes('marahib-cart.html')) {
            loadCart();
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('marahibCart', JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Load cart on cart page
function loadCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItems) cartItems.innerHTML = '';
        if (cartTotal) cartTotal.textContent = '0.00';
        if (cartSubtotal) cartSubtotal.textContent = '0.00';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    
    let total = 0;
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartRow = document.createElement('div');
        cartRow.className = 'cart-item';
        cartRow.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${index}, -1)" class="qty-btn">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)" class="qty-btn">+</button>
            </div>
            <div class="cart-item-total">
                <strong>$${itemTotal.toFixed(2)}</strong>
            </div>
            <div class="cart-item-remove">
                <button onclick="removeFromCart(${index})" class="remove-btn">×</button>
            </div>
        `;
        cartItems.appendChild(cartRow);
    });
    
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
    if (cartSubtotal) {
        cartSubtotal.textContent = total.toFixed(2);
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let summary = 'Order Summary:\n\n';
    
    cart.forEach(item => {
        summary += `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    summary += `\nTotal: $${total.toFixed(2)}\n\nThank you for your order! We will contact you shortly to confirm delivery details.`;
    
    alert(summary);
    
    // Clear cart after checkout
    cart = [];
    saveCart();
    updateCartCount();
    loadCart();
}

// Initialize cart page
if (window.location.pathname.includes('marahib-cart.html')) {
    document.addEventListener('DOMContentLoaded', loadCart);
}

