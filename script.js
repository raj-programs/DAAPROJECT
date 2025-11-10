 const products = [
            { id: 1, name: "Chrome Bumper Set", price: 299.99, category: "exterior", icon: "🔩", description: "Authentic chrome finish bumpers" },
            { id: 2, name: "V8 Engine Carburetor", price: 449.99, category: "engine", icon: "⚙️", description: "Rebuilt 4-barrel carburetor" },
            { id: 3, name: "Leather Steering Wheel", price: 189.99, category: "interior", icon: "🎯", description: "Genuine leather wrapped" },
            { id: 4, name: "Vintage Headlights", price: 159.99, category: "electrical", icon: "💡", description: "Original style sealed beams" },
            { id: 5, name: "Exhaust Manifold", price: 329.99, category: "engine", icon: "🔧", description: "Cast iron performance manifold" },
            { id: 6, name: "Chrome Side Mirrors", price: 129.99, category: "exterior", icon: "🪞", description: "Polished chrome mirrors" },
            { id: 7, name: "Dashboard Gauge Cluster", price: 279.99, category: "interior", icon: "📊", description: "Complete gauge set" },
            { id: 8, name: "Distributor Cap & Rotor", price: 79.99, category: "electrical", icon: "⚡", description: "High-quality ignition parts" },
            { id: 9, name: "Piston Ring Set", price: 199.99, category: "engine", icon: "⭕", description: "Complete piston ring kit" },
            { id: 10, name: "Door Handle Kit", price: 89.99, category: "exterior", icon: "🚪", description: "Chrome door handles" },
            { id: 11, name: "Bench Seat Upholstery", price: 399.99, category: "interior", icon: "🛋️", description: "Premium vinyl material" },
            { id: 12, name: "Alternator", price: 179.99, category: "electrical", icon: "🔋", description: "High-output alternator" }
        ];

        let cart = [];
        let currentFilter = 'all';

        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            const filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
            
            grid.innerHTML = filtered.map(product => `
                <div class="product-card">
                    <div class="product-image">${product.icon}</div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-footer">
                            <div class="product-price">$${product.price}</div>
                            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

       function filterProducts(type) {
    if (!window.hierarchy) return;

    switch (type) {
        case 'all':
            showAll(); // shows all major master categories (Engine, Exterior, etc.)
            break;

        case 'exterior':
            if (window.hierarchy['Exterior']) {
                showMasterCategory('Exterior');
            } else if (window.hierarchy['Exterior Parts']) {
                showMasterCategory('Exterior Parts');
            } else {
                alert("No Exterior parts available");
            }
            break;

        case 'engine':
            if (window.hierarchy['Engine']) {
                showMasterCategory('Engine');
            } else if (window.hierarchy['Engine Parts']) {
                showMasterCategory('Engine Parts');
            } else {
                alert("No Engine parts available");
            }
            break;

        case 'interior':
            if (window.hierarchy['Interior']) {
                showMasterCategory('Interior');
            } else if (window.hierarchy['Interior Parts']) {
                showMasterCategory('Interior Parts');
            } else {
                alert("No Interior parts available");
            }
            break;

        case 'electrical':
            if (window.hierarchy['Electrical']) {
                showMasterCategory('Electrical');
            } else if (window.hierarchy['Electrical Parts']) {
                showMasterCategory('Electrical Parts');
            } else {
                alert("No Electrical parts available");
            }
            break;

        default:
            showAll();
            break;
    }
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

        function updateCart() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            cartCount.textContent = totalItems;
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.icon} ${item.name}</div>
                        <div>Quantity: ${item.quantity} × $${item.price}</div>
                    </div>
                    <button class="close-cart" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `).join('') + `
                <div class="cart-total">
                    <strong style="color: #FFD700;">Total:</strong>
                    <strong style="color: #FFD700;">$${total.toFixed(2)}</strong>
                </div>
                <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
            `;
        }

        function toggleCart() {
            const modal = document.getElementById('cartModal');
            modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
        }

        function checkout() {
            if (cart.length === 0) return;
            alert('Thank you for your order! Total: $' + cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
            cart = [];
            updateCart();
            toggleCart();
        }

        renderProducts();