# Fab 3D Asset Submission: Best Practices and Common Pitfalls

Selling 3D assets on Epic's Fab marketplace can be lucrative, but the review process is thorough. This guide covers what you need to know to get your meshes, materials, and environments approved on the first try.

## What Fab Reviewers Look For

The review team checks your assets for:
- Technical correctness (UVs, scale, collisions)
- Visual quality (no defects, proper materials)
- Project organization (folder structure, naming)
- Usability (demo maps, documentation)

Let's break down each area.

## Static Mesh Requirements

### Lightmap UVs: The #1 Technical Issue

Most 3D asset rejections involve lightmap UVs. Here's what you need:

**Non-overlapping UV channel for lightmaps:**
- Lightmaps use UV channel 1 (not 0)
- UVs must not overlap or wrap
- Check in Mesh Editor → UV → Lightmap UV

**Lightmap Coordinate Index must not be 0:**
- UV0 is for textures
- UV1 (or higher) is for lightmaps
- Exception: meshes ONLY used in particle systems

If you see "Needs valid lightmap UV" warnings in your project, fix them before submission.

### LODs: Required and Documented

**Every mesh should have LODs unless there's a reason not to.**

More importantly: your product description MUST state what LODs are included, even if the answer is "none."

Good documentation examples:
- "All meshes include LOD0-LOD3"
- "Hero props have 4 LODs, smaller props have 2"
- "No LODs included - designed for close-up cinematic use"

### Collision

**Collision must be appropriate for the use case:**
- Simple collision for gameplay (boxes, spheres, capsules)
- Complex collision for environment pieces (auto-generated or custom)
- Some props need no collision (small decorative items)

Document your collision approach in the description.

### Visual Quality

Your meshes must have:
- No visible defects
- No seams or gaps
- No material issues
- No z-fighting when placed in scenes

Test your meshes in various lighting conditions. Issues often become visible only with specific lighting.

## Modular Assets

If you're selling modular kits, additional requirements apply:

### Pivot Points
Pivots must be placed for smooth assembly:
- Consistent placement (corner, center, or edge)
- Document your convention
- All pieces in the set should follow the same rule

### Grid Snapping
Modular pieces must snap together cleanly:
- Use standard grid sizes (50, 100, 200 units)
- Test snapping in-engine
- Document the grid size: "Designed for 100-unit grid"

### Scale Consistency
All modular pieces must be scaled correctly relative to each other:
- Doors should fit doorframes
- Walls should meet floors without gaps
- Windows should align with wall heights

## Texture Requirements

### Power of 2 Dimensions

Texture dimensions MUST be powers of 2:

✅ Valid: 512x512, 1024x2048, 4096x4096
❌ Invalid: 1000x1000, 1920x1080, 500x500

Why? Non-power-of-2 textures can't generate mipmaps properly, causing visual issues at distance.

### Maximum Size

No dimension can exceed 16,384 pixels. Most use cases don't need anything beyond 4096x4096.

### Quality

- Provide highest quality sources
- Don't upscale compressed images
- Consider offering multiple resolutions

### Compression

Use appropriate compression for texture type:
- **BC7**: Best for color/albedo
- **BC5**: Normal maps
- **BC4**: Single-channel masks
- **Uncompressed**: UI elements that need crisp edges

## Material Requirements

### Use Material Instances

One master material with many instances beats many standalone materials:
- Better for batching
- Easier for customers to modify
- More professional organization

### No Material Defects

Check for:
- Visible seams in tiling
- Incorrect normal map orientation
- Wrong roughness/metallic values for the surface type
- Missing or broken textures

## Character & Animation Requirements

If you're selling characters or animated assets:

### Skeleton Compatibility

Humanoid characters MUST:
- Scale correctly to the Epic or MetaHumans skeleton (192cm humanoid reference)
- Use Epic/MetaHumans skeleton, OR
- Include a custom skeleton with ALL necessary animations

If using Epic skeleton:
- Keep same bone names
- IK joints stay unweighted in same hierarchy position
- Document any additional bones or modifications

### Animations

- Must be clean and consistent
- No jitter or foot sliding
- Looping animations must loop seamlessly
- Include preview video or 3D model in Gallery

### Physics Assets

- Must properly cover the mesh
- Should produce appropriate results when simulated
- Test in Physics Asset Editor

## Project Structure

### Distribution Method

Choose the right method:
- **Asset Pack**: For assets meant to merge into existing projects
- **Complete Project**: For standalone frameworks or templates

Asset Packs have additional restrictions.

### Folder Structure (Asset Packs)

```
MyAssetPack/
├── Config/
├── Content/
│   └── MyAssetPack/          ← Single top-level folder
│       ├── Meshes/
│       │   ├── Characters/
│       │   ├── Environment/
│       │   └── Props/
│       ├── Materials/
│       ├── Textures/
│       └── Maps/
└── MyAssetPack.uproject
```

**Critical rules:**
- ALL assets in ONE folder under Content
- No local folders (Binaries, Build, Intermediate, Saved, Plugins)
- Asset paths under 140 characters

### Naming Conventions

Use clear, consistent names:

```
SM_Rock_Large_01      (Static Mesh)
SK_Character_Warrior  (Skeletal Mesh)
M_Stone_Wet           (Material)
MI_Stone_Wet_Dark     (Material Instance)
T_Stone_D             (Texture - Diffuse)
T_Stone_N             (Texture - Normal)
```

- English alphanumeric characters and underscores only
- No spaces or special characters
- Be descriptive, not vague ("Assets", "NewFolder" = rejection)

### Redirectors

Run "Fix Up Redirectors in Folder" before export. Leftover redirectors from renamed assets cause issues.

## Demo Maps

### Required for 3D Assets

Every 3D asset pack needs a demonstration map showing:
- All assets placed in context
- How modular pieces fit together
- Lighting and material appearance

### Map Requirements

- **Lighting built** (no "Preview" watermarks)
- **No errors on load** or PIE start
- **No z-fighting** or overlapping polygons
- **No Level Blueprint dependencies** for Asset Packs

### Make It Look Good

Your demo map is marketing. Make it attractive:
- Good composition
- Appropriate lighting
- Show assets at their best
- Include variety

## Scale and Consistency

### 192cm Humanoid Reference

All assets must be scaled relative to a 192cm humanoid (the UE mannequin).

**Common scale mistakes:**
- Doors too small or too large for a character
- Furniture at wrong scale relative to rooms
- Props inconsistent with each other

### Consistent Direction

All assets should face the same direction:
- X-forward
- Z-up
- Be consistent across the entire pack

### Binary Build Compatibility

Content must work in standard launcher-installed Unreal Engine. Don't depend on source-build-only features.

## Product Page Tips

### What to Include in Description

- Exact mesh/texture/material counts
- LOD information
- Collision approach
- Grid size for modular assets
- Tri/poly counts for key meshes
- Texture resolutions

### Screenshots

**Do:**
- Show in-editor views
- Include wireframe shots
- Show multiple angles
- Demonstrate modular assembly
- Display in varied lighting

**Don't:**
- Only show heavily post-processed renders
- Use effects not included in the pack
- Misrepresent quality

### Video Demo

Not required for static assets, but highly recommended for:
- Modular kit assembly
- Animated assets
- Complex material features

## Common Rejection Reasons

1. **Overlapping lightmap UVs** - Fix your UV1 channel
2. **No LOD information** - Document what's included
3. **Missing demo map** - Always include one
4. **Poor folder structure** - Single folder under Content
5. **Leftover local folders** - Delete Binaries, Build, Intermediate, Saved
6. **Non-power-of-2 textures** - 1024, 2048, 4096 only
7. **Vague naming** - Be specific and consistent
8. **Incorrect scale** - Use 192cm humanoid reference

## Before You Submit

Final checklist:

- [ ] All meshes have proper lightmap UVs (channel 1+)
- [ ] LOD information documented
- [ ] Collision appropriate for use case
- [ ] Textures are power-of-2
- [ ] Material instances used where appropriate
- [ ] Single top-level Content folder
- [ ] No local folders in submission
- [ ] Consistent naming convention
- [ ] Redirectors cleaned up
- [ ] Demo map with built lighting
- [ ] No errors on map load
- [ ] Scale consistent with 192cm reference
- [ ] AI usage disclosed (if applicable)

## Resources

- [Official Fab Technical Requirements](https://support.fab.com/s/article/FAB-TECHNICAL-REQUIREMENTS)
- [Fab 3D Asset Checklist](/resources/fab-3d-asset-checklist.html)
- [Fab Publisher Checklist](/resources/fab-publisher-checklist.html)
- [UE Content Guidelines](https://dev.epicgames.com/documentation/fab/asset-file-format-and-structure-requirements-in-fab)

---

3D asset submission is straightforward once you understand the technical requirements. The key is attention to detail: proper UVs, consistent scale, organized folders, and a polished demo map.

Take the time to get it right, and you'll build a reputation for quality that drives repeat customers.
