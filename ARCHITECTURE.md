# MythicLemon Website - Data-Driven Architecture

## 🎯 Overview

The MythicLemon website has been refactored to use a **modern, data-driven architecture** that makes it incredibly easy to maintain and update. Instead of creating individual HTML files for each product, the entire site is powered by a centralized JSON database with JavaScript templates.

## ✨ Key Benefits

### Before (Static HTML)
- ❌ Each product required a separate HTML file
- ❌ Updating product info meant editing multiple files
- ❌ High duplication of code
- ❌ Easy to have inconsistencies
- ❌ Time-consuming to add new products

### After (Data-Driven)
- ✅ **One JSON file** contains all product data
- ✅ **Single template** for all product pages
- ✅ **Update once** - changes reflect everywhere
- ✅ **Automatic consistency** across all products
- ✅ **Add products in seconds** by editing JSON

## 📁 Architecture

```
mythiclemon-webpage/
├── products.json       ← All product data in ONE file
├── app.js             ← Loads and renders products
├── index.html         ← Homepage template
├── product.html       ← Single product template (reusable)
├── styles.css         ← Main styles
└── product.css        ← Product page styles
```

## 🚀 How It Works

### 1. Data Storage (products.json)
All product information is stored in a structured JSON format:

```json
{
  "products": [
    {
      "id": "landscape-pack",
      "name": "Massive Open World Landscape Pack",
      "price": "£13.15",
      "description": "...",
      "features": [...],
      "technicalDetails": {...}
    }
  ]
}
```

### 2. Dynamic Rendering (app.js)
JavaScript loads the JSON and renders products:
- **Homepage**: Displays featured products in grid
- **Product Pages**: Reads `?id=` parameter and renders details
- **Related Products**: Automatically suggests similar items

### 3. URL-Based Navigation
Products are accessed via URL parameters:
```
product.html?id=landscape-pack
product.html?id=ritual-jars
product.html?id=chart-widgets
```

## 📝 Adding a New Product (3 Steps)

1. **Open `products.json`**
2. **Add a product object:**
   ```json
   {
     "id": "new-product",
     "name": "My New Product",
     "shortDescription": "Brief description",
     "price": "£10.00",
     "fabUrl": "https://www.fab.com/listings/...",
     "image": "image-url",
     "category": "Props",
     "featured": true
   }
   ```
3. **Save and commit** - Done!

The product automatically:
- ✅ Appears on homepage (if `featured: true`)
- ✅ Has its own detail page at `product.html?id=new-product`
- ✅ Shows in related products section
- ✅ Appears in category filters

## 🔧 Maintenance Tasks

### Update Product Price
```json
// In products.json, find your product and change:
"price": "£15.99"  // Old price
"price": "£12.99"  // New price
```

### Change Product Description
```json
"description": "New and improved description with updated features..."
```

### Add New Feature
```json
"keyFeatures": [
  "Existing Feature 1",
  "Existing Feature 2",
  "New Feature 3"  // Just add to array
]
```

### Update Technical Specs
```json
"technicalDetails": {
  "UE Version": "5.8",  // Update version
  "Textures": "64"      // Update count
}
```

## 🌐 GitHub Pages Compatible

This architecture is **100% compatible** with GitHub Pages because:
- ✅ Pure client-side rendering (no server required)
- ✅ JavaScript loads JSON directly from same domain
- ✅ No build process needed
- ✅ Works with any static hosting

## 🎨 Customization

### Modify Homepage Layout
Edit `index.html` - the product grid is automatically populated

### Change Product Page Design
Edit `product.html` template - all products use it

### Update Styles
- `styles.css` - Global styles and homepage
- `product.css` - Product page specific styles

### Modify Rendering Logic
Edit `app.js` - controls how products are displayed

## 📊 Example Product Object

See `ADDING_PRODUCTS.md` for complete documentation and examples.

## 🧪 Testing Locally

```bash
# Start local server
python3 -m http.server 8000

# Visit in browser
http://localhost:8000
http://localhost:8000/product.html?id=landscape-pack
```

## 🚢 Deployment

Same as before - just push to GitHub:

```bash
git add .
git commit -m "Update products"
git push
```

GitHub Pages automatically deploys the changes.

## 💡 Pro Tips

1. **Keep IDs consistent** - Use lowercase with hyphens
2. **Use featured sparingly** - Only showcase best products on homepage
3. **Compress images** - Better loading times
4. **Test JSON validity** - Use a JSON validator before committing
5. **Backup before major changes** - Commit frequently

## 🔍 Troubleshooting

**Products not showing?**
- Check browser console for errors
- Verify JSON is valid (use jsonlint.com)
- Ensure `featured: true` for homepage display

**Product page blank?**
- Check URL has correct `?id=` parameter
- Verify ID matches exactly what's in JSON
- Look for JavaScript errors in console

**Images not loading?**
- Verify image URLs are accessible
- Check for CORS issues (shouldn't happen on same domain)
- Use placeholder images for testing

## 📈 Future Enhancements

Possible additions:
- 🔍 Search functionality
- 🏷️ Tag-based filtering
- 📱 Category pages
- ⭐ Rating display
- 💬 Reviews integration
- 🎨 Image galleries

All of these can be added by extending the JSON structure and updating `app.js` - no HTML changes needed!

## 📚 Documentation

- `README.md` - General project info
- `DEPLOY.md` - Deployment instructions
- `ADDING_PRODUCTS.md` - Detailed product adding guide
- `ARCHITECTURE.md` - This file

## 🎉 Summary

You now have a **professional, maintainable, data-driven website** that's:
- Easy to update (just edit JSON)
- Consistent across all pages
- Fast to add new products
- GitHub Pages compatible
- SEO friendly
- Fully responsive

**Adding a product is now as simple as editing one JSON file!**
