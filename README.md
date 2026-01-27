# MythicLemon

Premium Unreal Engine Assets & Tools

Visit the live site: [https://YOUR-USERNAME.github.io/mythiclemon-webpage/](https://YOUR-USERNAME.github.io/mythiclemon-webpage/)

## About

This is the official GitHub Pages website for MythicLemon, showcasing professional Unreal Engine assets, plugins, and tools available on the Fab marketplace.

### Architecture

This website uses a **data-driven architecture** with JSON and JavaScript for easy maintenance:

- **products.json** - All product data, specs, features, and metadata in one centralized file
- **app.js** - Dynamic content loader that renders products from JSON
- **index.html** - Homepage template
- **product.html** - Single reusable product detail template (uses URL parameters)

**To add a new product:** Simply add an entry to `products.json` - no need to create new HTML files!

## Products Featured

- **Massive Open World Landscape Pack** - 14 unique landscape height maps with AutoMaterial system
- **Fast Chart Widgets** - Easy blueprintable graph and chart widgets
- **Landstamp Pro** - Professional landscape heightmap stamp system
- **Ritual Jars | Canopic Jars from the Abyss** - 9 unique demonic sculptures
- **The Crimson Sovereign Throne** - Dark opulent throne asset
- **The Volcanic Sentinel Throne** - Fire and molten rock fantasy throne

## Links

- [Fab Marketplace](https://www.fab.com/sellers/MythicLemon)
- [X (Twitter)](https://x.com/MythicLemon)
- [YouTube](https://youtube.com/@mythiclemonstudio)

## Local Development

To run this website locally:

1. Clone this repository
2. Open `index.html` in your web browser
3. Or use a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## Deployment

This site is designed to be deployed on GitHub Pages. To deploy:

1. Push to your GitHub repository
2. Go to Settings > Pages
3. Set source to "Deploy from a branch"
4. Select the main branch
5. Your site will be live at `https://YOUR-USERNAME.github.io/mythiclemon-webpage/`

## Technologies

- HTML5 Templates
- CSS3 with Responsive Design
- Vanilla JavaScript (ES6+)
- JSON Data Store
- GitHub Pages (Static Hosting)

## License

© 2026 MythicLemon. All rights reserved.

Unreal Engine and UE5 are trademarks of Epic Games, Inc.
