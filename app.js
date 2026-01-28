// MythicLemon Products - Dynamic Content Loader
// Loads products from JSON and renders them dynamically

class MythicLemonApp {
    constructor() {
        this.products = [];
        this.metadata = {};
    }

    // Format price to neat USD (nearest whole dollar, minus $0.01)
    formatUsdPrice(priceString) {
        if (!priceString) return priceString;

        const numbers = priceString.match(/\d+(?:\.\d+)?/g);
        if (!numbers || numbers.length === 0) return priceString;

        const toNeatUsd = (num) => {
            const value = parseFloat(num);
            if (Number.isNaN(value)) return priceString;

            const rounded = Math.floor(value + 0.5);
            const neat = Math.max(rounded - 0.01, 0.99);
            return `$${neat.toFixed(2)}`;
        };

        if (priceString.includes('to') && numbers.length >= 2) {
            return `${toNeatUsd(numbers[0])} to ${toNeatUsd(numbers[1])}`;
        }

        return toNeatUsd(numbers[0]);
    }

    // Load products data from JSON
    async loadProducts() {
        try {
            const response = await fetch('products.json');
            const data = await response.json();
            this.products = data.products;
            this.metadata = data.metadata;
            return data;
        } catch (error) {
            console.error('Error loading products:', error);
            return null;
        }
    }

    // Get product by ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Get featured products
    getFeaturedProducts() {
        return this.products.filter(product => product.featured);
    }

    // Get products by category
    getProductsByCategory(category) {
        return this.products.filter(product => product.category === category);
    }

    // Render product cards on homepage
    renderProductGrid(container, products = null) {
        const productsToRender = products || this.products;
        const grid = document.querySelector(container);
        
        if (!grid) return;

        grid.innerHTML = productsToRender.map(product => `
            <a class="product-card" href="product.html?id=${product.id}" aria-label="View ${product.name}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.shortDescription}</p>
                    <div class="product-features">
                        ${product.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="product-footer">
                        <span class="price">From ${this.formatUsdPrice(product.price)}</span>
                        <span class="btn btn-small">Learn More</span>
                    </div>
                </div>
            </a>
        `).join('');
    }

    // Render product detail page
    renderProductDetail(productId) {
        const product = this.getProductById(productId);
        
        if (!product) {
            document.body.innerHTML = '<div class="container" style="padding: 4rem 2rem; text-align: center;"><h1>Product Not Found</h1><p><a href="index.html">Return to Homepage</a></p></div>';
            return;
        }

        // Update page title and meta
        document.title = `${product.name} | MythicLemon`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = product.description;

        // Render breadcrumb
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            breadcrumb.innerHTML = `<a href="index.html">Home</a> / <a href="index.html#products">Products</a> / <span>${product.name}</span>`;
        }

        // Render hero
        const heroTitle = document.querySelector('.product-hero h1');
        const heroSubtitle = document.querySelector('.product-hero .subtitle');
        if (heroTitle) heroTitle.textContent = product.name;
        if (heroSubtitle) heroSubtitle.textContent = product.subtitle;

        // Render main image
        const gallery = document.querySelector('.product-gallery');
        if (gallery) {
            gallery.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
        }

        // Render description
        const descSection = document.querySelector('.product-description');
        if (descSection) {
            let html = `
                <h2>Description</h2>
                <p>${product.description}</p>
                
                <h3>Key Features</h3>
                <ul class="feature-list">
                    ${product.features.map(f => `
                        <li><strong>${f.title}:</strong> ${f.description}</li>
                    `).join('')}
                </ul>
            `;

            // Add detailed content sections
            if (product.detailedContent) {
                product.detailedContent.forEach(section => {
                    html += `<h3>${section.heading}</h3>`;
                    
                    if (section.items) {
                        html += `<div class="maps-grid">`;
                        section.items.forEach(item => {
                            html += `
                                <div class="map-item">
                                    <h4>${item.name}</h4>
                                    <p>${item.description}</p>
                                </div>
                            `;
                        });
                        html += `</div>`;
                    }
                    
                    if (section.content) {
                        html += `<p>${section.content}</p>`;
                    }
                });
            }

            descSection.innerHTML = html;
        }

        // Render purchase card
        const priceSection = document.querySelector('.price-section .price');
        const buyButton = document.querySelector('.purchase-card .btn');
        if (priceSection) {
            const displayPrice = product.priceRange || product.price;
            priceSection.textContent = this.formatUsdPrice(displayPrice);
        }
        if (buyButton) buyButton.href = product.fabUrl;

        // Add user guide button if available
        if (product.userGuide) {
            const purchaseCard = document.querySelector('.purchase-card');
            if (purchaseCard && buyButton) {
                const userGuideBtn = document.createElement('a');
                userGuideBtn.href = product.userGuide;
                userGuideBtn.target = '_blank';
                userGuideBtn.className = 'btn btn-secondary btn-block';
                userGuideBtn.style.marginTop = '1rem';
                userGuideBtn.innerHTML = '📄 View User Guide';
                buyButton.parentNode.insertBefore(userGuideBtn, buyButton.nextSibling);
            }
        }

        // Render technical specs
        const specsList = document.querySelector('.specs-list');
        if (specsList && product.technicalDetails) {
            specsList.innerHTML = Object.entries(product.technicalDetails)
                .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
                .join('');
        }

        // Render key features
        const featuresList = document.querySelector('.features-list');
        if (featuresList && product.keyFeatures) {
            featuresList.innerHTML = product.keyFeatures
                .map(feature => `<li>✓ ${feature}</li>`)
                .join('');
        }

        // Render tags
        const tagsContainer = document.querySelector('.tags-container');
        if (tagsContainer && product.tags) {
            tagsContainer.innerHTML = product.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');
        }

        // Render related products
        this.renderRelatedProducts(product);
    }

    // Render related products section
    renderRelatedProducts(currentProduct) {
        const relatedSection = document.querySelector('.related-products .product-grid');
        if (!relatedSection) return;

        // Get products from same category, excluding current
        const related = this.products
            .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
            .slice(0, 3);

        if (related.length === 0) {
            document.querySelector('.related-products').style.display = 'none';
            return;
        }

        relatedSection.innerHTML = related.map(product => `
            <a class="product-card" href="product.html?id=${product.id}" aria-label="View ${product.name}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.shortDescription}</p>
                    <div class="product-footer">
                        <span class="price">From ${this.formatUsdPrice(product.price)}</span>
                        <span class="btn btn-small">Learn More</span>
                    </div>
                </div>
            </a>
        `).join('');
    }

    // Render homepage metadata
    renderHomepageMetadata() {
        // Update stats
        const stats = document.querySelectorAll('.stat-item');
        if (stats.length > 0 && this.metadata.stats) {
            stats.forEach((stat, index) => {
                if (this.metadata.stats[index]) {
                    const h3 = stat.querySelector('h3');
                    const p = stat.querySelector('p');
                    if (h3) h3.textContent = this.metadata.stats[index].value;
                    if (p) p.textContent = this.metadata.stats[index].label;
                }
            });
        }

        // Update about section
        const aboutText = document.querySelector('.about > .container > p');
        if (aboutText && this.metadata.description) {
            aboutText.textContent = this.metadata.description;
        }
    }

    // Get URL parameter
    getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Initialize app based on current page
    async init() {
        await this.loadProducts();

        // Check if we're on the product detail page
        const productId = this.getUrlParameter('id');
        
        if (productId) {
            // We're on product detail page
            this.renderProductDetail(productId);
        } else if (document.querySelector('.product-grid')) {
            // We're on homepage
            this.renderProductGrid('.product-grid');
            this.renderHomepageMetadata();
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new MythicLemonApp();
    app.init();
});

// Export for use in console/debugging
window.mythicLemon = new MythicLemonApp();
