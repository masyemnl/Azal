// Bonnen Coffee - Enhanced E-commerce JavaScript

const cartIcon = document.getElementById('view-cart-btn');

// Show cart icon only if there are products in the cart
function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cartIcon) {
    cartIcon.style.display = cart.length > 0 ? 'block' : 'none';
  }
}

// Add product to cart with enhanced functionality
function addToCart(productId, productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: parseFloat(productPrice),
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartIcon();
  showNotification(`${productName} added to cart!`);
}

// Show notification for user feedback
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #6b3e26;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 2000;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideDown 0.3s ease-out;
  `;
  
  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
      to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideDown 0.3s ease-out reverse';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Attach event listeners to "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
    btn.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      const productName = this.getAttribute('data-product-name');
      const productPrice = this.getAttribute('data-product-price');
      
      if (productId && productName && productPrice) {
        addToCart(productId, productName, productPrice);
        
        // Visual feedback
        this.classList.add('added');
        this.textContent = 'Added!';
        setTimeout(() => {
          this.classList.remove('added');
          this.textContent = 'Add to Cart';
        }, 1500);
      }
    });
  });
  
  // Initial cart icon state
  updateCartIcon();
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Update active navigation link on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

// Checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', function() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  // For demo: Show a thank you message
  alert("Thank you for your purchase!\nTotal: $" + cart.reduce((sum, item) => sum + item.price, 0).toFixed(2));
  // Clear cart after checkout
  localStorage.removeItem('cart');
  document.getElementById('cart-list').innerHTML = '<li style="color:#888;">Your cart is empty.</li>';
});
