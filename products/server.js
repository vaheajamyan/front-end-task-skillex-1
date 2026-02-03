const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'Electronics',
        brand: 'Brand A',
        price: 99.99,
        rating: 4.5,
        imageUrl: 'https://example.com/images/headphones.jpg',
    },
    {
        id: 2,
        name: 'Bluetooth Speaker',
        category: 'Electronics',
        brand: 'Brand B',
        price: 49.99,
        rating: 4.0,
        imageUrl: 'https://example.com/images/speaker.jpg',
    },
    {
        id: 3,
        name: 'Running Shoes',
        category: 'Footwear',
        brand: 'Brand C',
        price: 59.99,
        rating: 4.2,
        imageUrl: 'https://example.com/images/shoes.jpg',
    },
    {
        id: 4,
        name: 'Smartphone',
        category: 'Electronics',
        brand: 'Brand D',
        price: 499.99,
        rating: 4.8,
        imageUrl: 'https://example.com/images/smartphone.jpg',
    },
    {
        id: 5,
        name: 'Leather Jacket',
        category: 'Clothing',
        brand: 'Brand E',
        price: 199.99,
        rating: 4.7,
        imageUrl: 'https://example.com/images/jacket.jpg',
    },
    ...Array.from({ length: 25 }).map((_, i) => ({
        id: i + 6,
        name: `Product ${i + 6}`,
        category: ['Electronics', 'Footwear', 'Clothing'][i % 3],
        brand: ['Brand A', 'Brand B', 'Brand C', 'Brand D'][i % 4],
        price: 30 + i * 5,
        rating: +(3.5 + (i % 3) * 0.5).toFixed(1),
        imageUrl: 'https://example.com/images/placeholder.jpg',
    })),
];

/**
 * GET /products
 * Query params:
 * - page (default 1)
 * - limit (default 10)
 * - category
 * - brand
 * - minPrice
 * - maxPrice
 * - minRating
 */
app.get('/products', (req, res) => {
    const {
        page = 1,
        limit = 10,
        category,
        brand,
        minPrice,
        maxPrice,
        minRating,
    } = req.query;

    let filtered = [...products];

    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }

    if (brand) {
        filtered = filtered.filter(p => p.brand === brand);
    }

    if (minPrice) {
        filtered = filtered.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    if (minRating) {
        filtered = filtered.filter(p => p.rating >= Number(minRating));
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + Number(limit);
    const paginatedData = filtered.slice(start, end);

    res.json({
        data: paginatedData,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / limit),
        },
    });
});

/**
 * GET /filters
 * Returns available filter values
 */
app.get('/filters', (req, res) => {
    const categories = [...new Set(products.map(p => p.category))];
    const brands = [...new Set(products.map(p => p.brand))];
    const prices = products.map(p => p.price);
    const ratings = products.map(p => p.rating);

    res.json({
        categories,
        brands,
        priceRange: {
            min: Math.min(...prices),
            max: Math.max(...prices),
        },
        ratingRange: {
            min: Math.min(...ratings),
            max: Math.max(...ratings),
        },
    });
});

app.listen(PORT, () => {
    console.log(`Mock products API running at http://localhost:${PORT}`);
});