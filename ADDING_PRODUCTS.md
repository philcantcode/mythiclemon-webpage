# Adding Products to MythicLemon Website

This website uses a **data-driven architecture**. All product information is stored in `products.json` and rendered dynamically with JavaScript.

## Quick Start: Adding a New Product

1. Open `products.json`
2. Add a new object to the `products` array
3. Save and commit

That's it! The product will automatically appear on the homepage and have its own detail page.

## Product Object Structure

```json
{
  "id": "unique-product-id",              // URL-friendly identifier
  "name": "Product Name",                 // Display name
  "subtitle": "Short tagline",            // Appears under title
  "shortDescription": "Brief description for cards",
  "price": "£XX.XX",                      // Starting price
  "priceRange": "£XX.XX to £YY.YY",      // Optional full range
  "fabUrl": "https://www.fab.com/listings/...",
  "image": "image-url",                   // Product image
  "featured": true,                       // Show on homepage?
  "category": "Environment",              // Environment, Props, Tools, Furniture
  "tags": ["tag1", "tag2", "tag3"],      // Array of tags
  "description": "Full description paragraph",
  "features": [
    {
      "title": "Feature Name",
      "description": "Feature details"
    }
  ],
  "technicalDetails": {
    "Key": "Value",
    "UE Version": "5.7+"
  },
  "keyFeatures": [
    "Feature 1",
    "Feature 2"
  ],
  "detailedContent": [
    {
      "heading": "Section Title",
      "items": [
        {
          "name": "Item name",
          "description": "Item description"
        }
      ]
    },
    {
      "heading": "Another Section",
      "content": "Text content for this section"
    }
  ]
}
```

## Required Fields

Minimum fields needed for a product:

- `id` - Unique identifier (used in URLs)
- `name` - Product name
- `shortDescription` - For product cards
- `price` - Starting price
- `fabUrl` - Link to Fab marketplace
- `image` - Product image URL
- `category` - Product category

## Optional Fields

- `subtitle` - Extra title context
- `priceRange` - Full price range
- `featured` - Boolean, shows on homepage
- `rating` - Product rating
- `reviews` - Number of reviews
- `tags` - Array of tags for filtering
- `description` - Long description
- `features` - Array of feature objects
- `technicalDetails` - Object with specs
- `keyFeatures` - Array of bullet points
- `detailedContent` - Array of detailed sections

## Example: Adding a Simple Product

```json
{
  "id": "simple-prop",
  "name": "Fantasy Sword Pack",
  "shortDescription": "Collection of 10 medieval swords",
  "price": "£5.99",
  "fabUrl": "https://www.fab.com/listings/your-listing-id",
  "image": "https://via.placeholder.com/400x250",
  "featured": true,
  "category": "Props",
  "tags": ["Weapon", "Medieval", "Fantasy"],
  "description": "A collection of 10 high-quality medieval fantasy swords perfect for RPG games.",
  "technicalDetails": {
    "Meshes": "10",
    "Materials": "5",
    "UE Version": "5.7+"
  },
  "keyFeatures": [
    "10 Unique Swords",
    "PBR Materials",
    "Nanite Ready"
  ]
}
```

## Tips

1. **Image URLs**: Use direct image URLs from Fab or placeholder images
2. **IDs**: Use lowercase with hyphens (e.g., `my-product-name`)
3. **Categories**: Stick to existing categories for consistency
4. **Featured**: Only set `featured: true` for products you want on homepage
5. **Testing**: Test locally with `python3 -m http.server 8000`

## Product URLs

Products are automatically accessible at:
```
https://yourusername.github.io/mythiclemon-webpage/product.html?id=product-id
```

The system reads the `?id=` parameter and loads the corresponding product from JSON.