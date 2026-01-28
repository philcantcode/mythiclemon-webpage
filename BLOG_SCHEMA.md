# Blog System Schema Reference

## File Structure

```
mythiclemon-webpage/
├── blog.html              # Blog listing page
├── blog-post.html         # Individual blog post template
├── blogs.json             # Blog metadata index
├── blogs/                 # Markdown content files
│   └── *.md              # Individual blog post content
└── images/
    └── blog/             # Blog post cover images
        └── *.jpg/png
```

## blogs.json Schema

```json
{
  "posts": [
    {
      "id": "string",           // Required: Unique slug (URL-safe)
      "title": "string",        // Required: Post title
      "subtitle": "string",     // Optional: Secondary heading
      "author": "string",       // Required: Author name
      "date": "YYYY-MM-DD",     // Required: ISO date format
      "category": "string",     // Required: Post category
      "tags": ["string"],       // Optional: Array of tags
      "excerpt": "string",      // Required: Short description (1-2 sentences)
      "image": "path/to/img",   // Optional: Cover image path
      "content": "blogs/*.md",  // Required: Path to markdown file
      "featured": boolean,      // Optional: Feature in special sections
      "readTime": "X min read"  // Optional: Estimated read time
    }
  ]
}
```

## Markdown File Format

Blog content files are standard Markdown (.md) files:

```markdown
# Main Heading

Introduction paragraph...

## Section Heading

Content with **bold**, *italic*, [links](url).

### Subsection

- Bullet points
- Lists

1. Numbered
2. Lists

> Blockquotes

\`\`\`language
// Code blocks
\`\`\`

![Alt text](image-url)

| Table | Header |
|-------|--------|
| Cell  | Cell   |
```

## Supported Markdown Features

- ✅ Headings (h1-h6)
- ✅ Bold, italic, strikethrough
- ✅ Links
- ✅ Images
- ✅ Lists (ordered and unordered)
- ✅ Blockquotes
- ✅ Code blocks (with syntax highlighting)
- ✅ Inline code
- ✅ Horizontal rules
- ✅ Tables

## Category Examples

- `Tutorial` - How-to guides
- `Release` - Product announcements
- `Tips` - Quick tips and tricks
- `Showcase` - Project showcases
- `Announcement` - Company news
- `Development` - Behind-the-scenes

## Quick Add Workflow

### 1. Create Content
```bash
# Create markdown file
nano blogs/my-post-slug.md
```

### 2. Add Metadata
```bash
# Edit blogs.json
nano blogs.json
```

Add entry:
```json
{
  "id": "my-post-slug",
  "title": "My Post Title",
  "author": "Your Name",
  "date": "2026-01-28",
  "category": "Tutorial",
  "tags": ["UE5", "Tutorial"],
  "excerpt": "Brief description of the post.",
  "content": "blogs/my-post-slug.md",
  "readTime": "5 min read"
}
```

### 3. Add Image (Optional)
```bash
# Copy cover image
cp ~/cover.jpg images/blog/my-post-slug.jpg
```

Update JSON:
```json
"image": "images/blog/my-post-slug.jpg"
```

### 4. Test & Commit
```bash
# Test locally
python3 -m http.server 8000

# Visit: http://localhost:8000/blog.html

# Commit changes
git add blogs/ blogs.json images/blog/
git commit -m "Add blog post: My Post Title"
git push
```

## URL Format

- Blog listing: `blog.html`
- Individual post: `blog-post.html?id=post-slug`

## Best Practices

1. **Use descriptive IDs**: `ue5-landscape-tips` not `post1`
2. **Write compelling excerpts**: Shows in listings
3. **Include cover images**: 1200x630px recommended
4. **Add relevant tags**: 3-5 tags per post
5. **Proper markdown**: Use h2/h3, not h1 (reserved for title)
6. **Test before committing**: Always preview locally

## Integration Points

The blog system integrates with:
- ✅ Main navigation (all pages)
- ✅ Consistent styling with site theme
- ✅ Responsive design
- ✅ Category filtering
- ✅ Search-friendly URLs

## Technical Details

- **Markdown Parser**: marked.js (CDN)
- **No Build Process**: Static files only
- **Client-Side Rendering**: JavaScript loads and renders
- **SEO Friendly**: Meta tags updated per post
