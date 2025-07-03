// script.js

// Sample Product Data (you would replace these with your actual products)
const products = [
    {
        id: 1,
        name: "HP Pavilion 15",
        category: "electronics",
        image: "pavion.webp",
        description: "Powerful and sleek laptop for everyday computing and light gaming. Features a 15.6-inch Full HD display and an Intel Core i5 processor.",
        specifications: "Intel Core i5, 8GB RAM, 256GB SSD, Windows 11 Home",
        price: 60099.99
    },
    {
        id: 2,
        name: "Samsung Galaxy A54",
        category: "electronics",
        image: "galaxy.webp ", // Replace with your image URL
        description: "Capture stunning photos and enjoy vibrant visuals on the Super AMOLED display of this feature-packed smartphone. Long-lasting battery.",
        specifications: "6.4-inch AMOLED, 50MP Camera, 5000mAh Battery",
        price: 42900.00
    },
    {
        id: 3,
        name: "Women's Casual Blouse",
        category: "clothing",
        image: "blause.avif", 
        description: "Lightweight and breathable blouse, perfect for a casual day out or office wear. Available in various sizes and colors.",
        specifications: "Material: Chiffon, Sizes: S, M, L, XL, Color: White, Blue, Pink",
        price: 549.99
    },
    {
        id: 4,
        name: "The Midnight Library",
        category: "books",
        image: "midnight.jpg",
        description: "A captivating novel by Matt Haig about a woman who gets a chance to revisit different versions of her life.",
        specifications: "Author: Matt Haig, Genre: Fiction/Fantasy, Pages: 304",
        price: 540.50
    },
    {
        id: 5,
        name: "Sony WH-1000XM5 Headphones",
        category: "electronics",
        image: "sony.jpg", 
        description: "Industry-leading noise-cancelling headphones with exceptional sound quality and comfortable design for long listening sessions.",
        specifications: "Active Noise Cancellation, 30-hour Battery Life, Bluetooth 5.2",
        price: 2500.00
    },
    {
        id: 6,
        name: "Men's Slim Fit kaki",
        category: "clothing",
        image: "trouser.jpg",
        description: "Comfortable and stylish slim-fit jeans made from high-quality denim. A versatile addition to any wardrobe.",
        specifications: "Material: Denim, Sizes: 28-36, Color: Blue, Black, Grey",
        price: 1250.00
    },
    {
        id: 7,
        name: "Kitchen Blender 1.5L",
        category: "home-appliances",
        image: "blender.jpg", 
        description: "Powerful 500W blender with a 1.5-liter capacity, perfect for smoothies, soups, and sauces. Easy to clean.",
        specifications: "Power: 500W, Capacity: 1.5L, Material: Stainless Steel blades",
        price: 5700.00
    },
    {
        id: 8,
        name: "Ergonomic Office Chair",
        category: "furniture",
        image: "chair.jpg", 
        description: "Designed for maximum comfort and support during long working hours. Adjustable features for personalized ergonomics.",
        specifications: "Material: Mesh, Adjustable height, Lumbar support",
        price: 10850.00
    }
];

const productListDiv = document.getElementById('product-list');
const searchInput = document.getElementById('searchInput');
const categoryFilterNav = document.getElementById('category-filter');
const productDetailModal = new bootstrap.Modal(document.getElementById('productDetailModal'));

// Function to display products
function displayProducts(filteredProducts) {
    productListDiv.innerHTML = ''; // Clear previous products
    if (filteredProducts.length === 0) {
        productListDiv.innerHTML = '<div class="col-12"><p class="text-center">No products found for your selection.</p></div>';
        return;
    }

    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('col-md-4', 'col-lg-3', 'mb-4', 'product-item'); // Added col-lg-3 for smaller cards on large screens
        productItem.setAttribute('data-category', product.category);
        productItem.setAttribute('data-product-id', product.id);

        productItem.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title product-title">${product.name}</h5>
                    <p class="card-text product-description">${product.description.substring(0, 80)}...</p> <p class="card-text fw-bold text-success mt-auto">KSh ${product.price.toFixed(2)}</p> <button class="btn btn-primary btn-sm view-details" data-bs-toggle="modal" data-bs-target="#productDetailModal" data-product-id="${product.id}">View Details</button>
                </div>
            </div>
        `;
        productListDiv.appendChild(productItem);
    });

    // Attach event listeners to "View Details" buttons after products are displayed
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const selectedProduct = products.find(p => p.id === productId);
            if (selectedProduct) {
                document.getElementById('modal-product-image').src = selectedProduct.image;
                document.getElementById('modal-product-title').textContent = selectedProduct.name;
                document.getElementById('modal-product-description').innerHTML = `<p>${selectedProduct.description}</p><p><strong>Specifications:</strong> ${selectedProduct.specifications}</p>`;
                document.getElementById('modal-product-category').textContent = selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1);
                document.getElementById('modal-product-price').textContent = selectedProduct.price.toFixed(2);
                productDetailModal.show();
            }
        });
    });
}

// Initial display of all products
displayProducts(products);

// Search Functionality (as provided in case study) [cite: 30, 31, 32, 33, 34, 35, 36, 37]
searchInput.addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let filteredProducts = products.filter(product => {
        let title = product.name.toLowerCase();
        let description = product.description.toLowerCase();
        // Search by title or description
        return title.includes(filter) || description.includes(filter);
    });
    displayProducts(filteredProducts);
});

// Category Filter
categoryFilterNav.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.dataset.category) {
        event.preventDefault(); // Prevent default link behavior

        // Remove active class from all category links
        categoryFilterNav.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        // Add active class to the clicked link
        event.target.classList.add('active');

        const selectedCategory = event.target.dataset.category;

        if (selectedCategory === 'all') {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.category === selectedCategory);
            displayProducts(filteredProducts);
        }
    }
});