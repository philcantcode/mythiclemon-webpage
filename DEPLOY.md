# MythicLemon Website

This repository contains the GitHub Pages website for MythicLemon - Premium Unreal Engine Assets & Tools.

## Quick Deploy to GitHub Pages

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `mythiclemon-webpage`
3. Make it public
4. Don't initialize with README (we already have one)

### Step 2: Push Your Code
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial website for MythicLemon"

# Add your GitHub repository as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/mythiclemon-webpage.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select branch: `main`
6. Select folder: `/ (root)`
7. Click "Save"

### Step 4: Visit Your Site
After a few minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/mythiclemon-webpage/
```

## Custom Domain (Optional)

If you want to use a custom domain like `www.mythiclemon.com`:

1. Add a file named `CNAME` with your domain name
2. Configure your DNS provider to point to GitHub Pages
3. Wait for DNS propagation (can take up to 24 hours)

## Site Structure

```
mythiclemon-webpage/
├── index.html              # Homepage template
├── product.html            # Product detail page template
├── styles.css              # Main stylesheet
├── product.css             # Product page styles
├── app.js                  # Dynamic content loader
├── products.json           # All product data (centralized)
├── README.md               # Documentation
└── DEPLOY.md               # This file
```

## Adding New Products

To add a new product, simply edit `products.json`:

1. Add a new product object to the `products` array
2. Include all required fields (id, name, description, price, etc.)
3. Commit and push - that's it!

No need to create new HTML files. The system automatically generates product pages from the JSON data.

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern dark theme matching Unreal Engine aesthetic
- ✅ Individual product pages with detailed information
- ✅ Direct links to Fab marketplace
- ✅ Social media integration
- ✅ Fast loading with optimized CSS
- ✅ SEO-friendly structure

## Maintenance

To update the site:

1. Edit the HTML/CSS files
2. Test locally
3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
4. GitHub Pages will automatically rebuild and deploy

## Support

For issues with the website, contact through:
- [X (Twitter)](https://x.com/MythicLemon)
- [YouTube](https://youtube.com/@mythiclemonstudio)
