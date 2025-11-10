

// Load CSV and organize into { Master Category → { Category → [parts] } }
fetch('car-parts.csv')
    .then(response => response.text())
    .then(csvText => {
        const data = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;

        data.forEach(row => {
            const master = row['Master Category'];
            const category = row['Category'];
            if (!hierarchy[master]) hierarchy[master] = {};
            if (!hierarchy[master][category]) hierarchy[master][category] = [];
            hierarchy[master][category].push({
                part: row['Part'],
                description: row['Description'],
                price: parseFloat(row['Price']) || 0 // optional price field
            });
        });

        // Default view
        showMasterCategory('Engine Parts');
    });

// Show all master categories
function showAll() {
    const container = document.getElementById('productsGrid');
    container.innerHTML = '<h2>All Major Categories</h2>';
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    Object.keys(hierarchy).forEach(master => {
        const card = document.createElement('div');
        card.className = 'nav-card';
        card.textContent = master;
        card.onclick = () => showMasterCategory(master);
        cardsContainer.appendChild(card);
    });

    container.appendChild(cardsContainer);
}

// Show subcategories for a master category
function showMasterCategory(master) {
    const container = document.getElementById('productsGrid');
    currentMaster = master;

    if (!hierarchy[master]) {
        container.innerHTML = `<h2>No data available for ${master}</h2>`;
        return;
    }

    container.innerHTML = `<h2>${master} Categories</h2>`;
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    Object.keys(hierarchy[master]).forEach(cat => {
        const card = document.createElement('div');
        card.className = 'nav-card';
        card.textContent = cat;
        card.onclick = () => showParts(master, cat);
        cardsContainer.appendChild(card);
    });

    container.appendChild(cardsContainer);
}

// Show parts of a category
function showParts(master, category) {
    const container = document.getElementById('productsGrid');
    container.innerHTML = `<h2>${category}</h2>`;
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    hierarchy[master][category].forEach(p => {
        const card = document.createElement('div');
        card.className = 'part-card';
        card.innerHTML = `
            <h4>${p.part}</h4>
            <p>${p.description}</p>
            <p>Price: $${p.price.toFixed(2)}</p>
            <button>Add to Cart</button>
        `;

        // Add event listener for cart
        card.querySelector('button').addEventListener('click', () => {
            addToCart({
                part: p.part,
                description: p.description,
                master: master,
                category: category,
                price: p.price
            });
        });

        cardsContainer.appendChild(card);
    });

    container.appendChild(cardsContainer);

    // Back button
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.className = 'checkout-btn';
    backBtn.onclick = () => showMasterCategory(master);
    container.appendChild(backBtn);
}
