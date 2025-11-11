# Literati Website

A beautiful Jekyll landing page for the Literati macOS app.

## Setup

1. Install Jekyll dependencies:
   ```bash
   bundle install
   ```

2. Add your DMG file:
   - Place your `Literati.dmg` file in the `downloads/` directory
   - The download button will automatically link to `/downloads/Literati.dmg`

3. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser to `http://localhost:4000`

## Customization

### Colors
Edit the CSS variables in `assets/css/style.css`:
```css
--primary-color: #6366f1;
--primary-dark: #4f46e5;
```

### Content
Edit `index.html` to modify:
- Hero section text
- Feature descriptions
- Footer information

### Site Settings
Edit `_config.yml` to update:
- Site title
- Description
- Base URL

## Deployment

### GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Select the main branch as source

### Netlify
1. Connect your repository
2. Build command: `jekyll build`
3. Publish directory: `_site`

## File Structure

```
literati_website/
├── _config.yml          # Jekyll configuration
├── _layouts/
│   └── default.html     # Default page layout
├── assets/
│   └── css/
│       └── style.css    # Main stylesheet
├── downloads/
│   └── Literati.dmg     # Your app DMG file (add this)
├── index.html           # Landing page
├── Gemfile              # Ruby dependencies
└── README.md            # This file
```
