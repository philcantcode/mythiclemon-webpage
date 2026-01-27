# Quick Reference - MythicLemon Website

## 🚀 Quick Start

### View Site Locally
```bash
cd /Users/phil/Code/mythiclemon-webpage
python3 -m http.server 8000
# Open: http://localhost:8000
```

### Add a Product
1. Open `products.json`
2. Add to `products` array:
   ```json
   {
     "id": "my-product",
     "name": "Product Name",
     "shortDescription": "Brief description",
     "price": "£XX.XX",
     "fabUrl": "https://www.fab.com/listings/...",
     "image": "image-url",
     "category": "Category",
     "featured": true,
     "tags": ["tag1", "tag2"]
   }
   ```
3. Save, commit, push

### Deploy to GitHub Pages
```bash
git add .
git commit -m "Update products"
git push origin main
```

Then enable GitHub Pages:
- Settings → Pages → Source: main → Save

## 📁 Files Overview

| File | Purpose |
|------|---------|
| `products.json` | **All product data** - edit this to add/update products |
| `app.js` | JavaScript that loads and renders products |
| `index.html` | Homepage template |
| `product.html` | Single product page template (for all products) |
| `styles.css` | Main website styles |
| `product.css` | Product page specific styles |

## 🔗 URL Structure

```
Homepage:         /index.html
Product Page:     /product.html?id=PRODUCT-ID
```

Examples:
- `/product.html?id=landscape-pack`
- `/product.html?id=ritual-jars`
- `/product.html?id=chart-widgets`

## ✏️ Common Tasks

### Update Product Price
`products.json` → Find product → Change `"price": "£XX.XX"`

### Change Product Image
`products.json` → Find product → Update `"image": "new-url"`

### Add Product Feature
`products.json` → Find product → Add to `keyFeatures` array

### Remove Product from Homepage
`products.json` → Find product → Set `"featured": false`

### Update Site Metadata
`products.json` → Edit `metadata` section at bottom

## 🎨 Categories

Use these for consistency:
- `Environment` - Landscapes, environments
- `Props` - 3D models, decorations
- `Tools` - Plugins, utilities
- `Furniture` - Chairs, tables, thrones

## 📋 Product Fields

### Required
- `id` - Unique identifier
- `name` - Product name  
- `shortDescription` - Brief description
- `price` - Starting price
- `fabUrl` - Fab marketplace link
- `image` - Product image URL
- `category` - Product category

### Optional
- `featured` - Show on homepage (true/false)
- `subtitle` - Extra title info
- `tags` - Array of tags
- `description` - Long description
- `features` - Array of feature objects
- `technicalDetails` - Object with specs
- `keyFeatures` - Array of bullet points

## 🔍 Troubleshooting

**Products not showing:**
- Check JSON is valid
- Look for JavaScript errors in browser console
- Verify `featured: true` for homepage

**Product page broken:**
- Check URL has correct `?id=` parameter
- Verify ID exists in products.json

**Images not loading:**
- Verify image URLs work
- Check network tab in browser dev tools

## 📚 Documentation

- `README.md` - Project overview
- `DEPLOY.md` - Deployment guide
- `ADDING_PRODUCTS.md` - Detailed product guide
- `ARCHITECTURE.md` - System architecture
- `QUICK_REFERENCE.md` - This file

## 🎯 Best Practices

✅ Use lowercase IDs with hyphens
✅ Commit after each product addition
✅ Test locally before pushing
✅ Keep descriptions concise
✅ Optimize images before upload
✅ Only feature your best products

## 🆘 Get Help

- Check browser console for errors
- Validate JSON at jsonlint.com
- Review example products in products.json
- Read ADDING_PRODUCTS.md for details

---

**That's it! Your website is data-driven and easy to maintain.**
