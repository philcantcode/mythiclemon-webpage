# Blog System Guide

## Overview

The MythicLemon blog system uses a simple JSON + Markdown approach that integrates seamlessly with your existing site.

## File Structure

```
mythiclemon-webpage/
├── blogs.json              # Blog index with metadata
├── blogs/                  # Markdown content files
│   └── post-slug.md       # Individual blog posts
└── images/
    └── blog/              # Blog post images
        └── image.jpg
```

## Adding a New Blog Post

### 1. Create the Markdown Content

Create a new `.md` file in the `blogs/` directory:

```bash
blogs/my-new-post.md
```

Write your content using standard Markdown:

```markdown
# Post Title

Introduction paragraph...

## Section Heading

Content with **bold**, *italic*, [links](url), etc.

### Subsection

- Bullet points
- More bullets

1. Numbered lists
2. Work too

> Blockquotes for important notes

\`\`\`cpp
// Code blocks supported
void Example() {
    // Your code here
}
\`\`\`
```

### 2. Add Metadata to blogs.json

Add an entry to the `posts` array in `blogs.json`:

```json
{
  "id": "my-new-post",
  "title": "My Awesome Blog Post",
  "subtitle": "A brief subtitle describing the post",
  "author": "Author Name",
  "date": "2026-01-28",
  "category": "Tutorial",
  "tags": ["Unreal Engine", "UE5", "Tutorial"],
  "excerpt": "A short excerpt that appears in blog listings (1-2 sentences)",
  "image": "images/blog/my-post.jpg",
  "content": "blogs/my-new-post.md",
  "featured": false,
  "readTime": "5 min read"
}
```

### 3. Add Cover Image (Optional)

Place your blog post cover image in:
```
images/blog/my-post.jpg
```

Recommended size: 1200x630px

## Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✓ | Unique slug (used in URL) |
| `title` | string | ✓ | Post title |
| `subtitle` | string | | Secondary heading |
| `author` | string | ✓ | Author name |
| `date` | string | ✓ | ISO date (YYYY-MM-DD) |
| `category` | string | ✓ | Category (Tutorial, Release, Tips, etc.) |
| `tags` | array | | Array of tag strings |
| `excerpt` | string | ✓ | Short description for listings |
| `image` | string | | Cover image path |
| `content` | string | ✓ | Path to .md file |
| `featured` | boolean | | Show in featured section |
| `readTime` | string | | Estimated read time |

## Categories

Suggested categories:
- **Tutorial** - How-to guides and walkthroughs
- **Release** - Product announcements and updates
- **Tips** - Quick tips and tricks
- **Showcase** - Project showcases and case studies
- **Announcement** - Company news and announcements
- **Development** - Behind-the-scenes development posts

## Best Practices

1. **Use descriptive IDs**: `landscaping-tips-ue5` not `post1`
2. **Write compelling excerpts**: This appears in listings and previews
3. **Include cover images**: Visual appeal matters
4. **Add relevant tags**: Helps with organization and filtering
5. **Keep markdown clean**: Use proper heading hierarchy (h2, h3, not h1)
6. **Test locally**: Preview your post before committing

## Markdown Support

The blog system supports standard Markdown including:
- Headings (h1-h6)
- Bold, italic, strikethrough
- Links and images
- Lists (ordered and unordered)
- Blockquotes
- Code blocks with syntax highlighting
- Horizontal rules
- Tables

## Example Workflow

```bash
# 1. Create content file
echo "# My Post\n\nContent here..." > blogs/new-feature.md

# 2. Add to blogs.json
# (edit blogs.json to add metadata)

# 3. Add cover image
cp ~/my-image.jpg images/blog/new-feature.jpg

# 4. Test locally
python3 -m http.server 8000

# 5. Commit
git add blogs/ blogs.json images/blog/
git commit -m "Add blog post: New Feature"
git push
```

## URL Structure

Blog posts are accessible at:
```
blog-post.html?id=post-slug
```

Example:
```
blog-post.html?id=welcome-to-mythiclemon
```
