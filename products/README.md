# Mock Product API – Guide

This project provides a **local mock Node.js API** that serves product data and supports
**pagination, filtering, and filter metadata**.  
You will use this API to build a product listing page with filtering, sorting, and user feedback.

##  Getting Started

### 1. Install dependencies

Make sure you have **Node.js (v16+)** installed.

```bash
  npm install
```

### 2. Start the server

```bash
    node server.js
```


## API Docs

### GET /products
Fetch a paginated list of products with optional filters

| Name       | In    | Type   | Required | Default | Description          |
|------------|-------|--------|----------|---------|----------------------|
| page       | query | number | No       | 1       | Page number          |
| limit      | query | number | No       | 10      | Items per page       |
| category   | query | string | No       | —       | Filter by category   |
| brand      | query | string | No       | —       | Filter by brand      |
| minPrice  | query | number | No       | —       | Minimum price        |
| maxPrice  | query | number | No       | —       | Maximum price        |
| minRating | query | number | No       | —       | Minimum rating       |


#### Example
```http request
    GET /products?category=Electronics&minPrice=50&minRating=4&page=1&limit=6
```


### GET /filters
Fetch available filter options for building the filter UI.