# Getting Started with Landstamp Pro

If you're looking to create professional terrain for your Unreal Engine projects, **Landstamp Pro** is your go-to tool. This guide will walk you through the basics of using our heightmap stamping system.

## What is Landstamp Pro?

Landstamp Pro is a professional-grade heightmap stamping system for Unreal Engine that allows you to create complex, detailed terrains by combining and layering heightmap stamps with precise control and real-time preview.

## Installation

1. Download Landstamp Pro from the [Fab marketplace](https://www.fab.com/sellers/MythicLemon)
2. Enable the plugin in your Unreal Engine project
3. Restart Unreal Engine
4. Access the tool from **Tools → Landstamp Pro**

## Your First Stamp

### Step 1: Create a Landscape

Before using Landstamp Pro, you'll need a landscape in your level:

1. Open the **Landscape** mode
2. Click **Create New** to generate a base landscape
3. Set your desired size and resolution
4. Click **Create**

### Step 2: Open Landstamp Pro

Navigate to **Tools → Landstamp Pro** to open the stamping interface. You'll see:

- Stamp library panel
- Layer stack
- Preview viewport
- Stamp controls

### Step 3: Apply Your First Stamp

1. **Select a stamp** from the library (try "Mountain Peak" for beginners)
2. **Position** the stamp on your landscape using the preview
3. **Adjust parameters**:
   - Scale: Size of the stamp
   - Rotation: Orientation
   - Intensity: How pronounced the effect is
4. **Apply** the stamp

That's it! You've just created your first terrain feature.

## Layer-Based Workflow

One of Landstamp Pro's most powerful features is its **non-destructive layer system**:

### Adding Layers

```
Layer 3: Mountain Peak (Additive)
Layer 2: Valley (Subtractive)  
Layer 1: Base Terrain
```

Each layer can be:
- **Toggled on/off** to see the effect
- **Reordered** by dragging
- **Modified** without affecting other layers
- **Deleted** if you change your mind

### Blend Modes

Experiment with different blend modes:

| Mode | Effect |
|------|--------|
| Additive | Raises terrain |
| Subtractive | Carves into terrain |
| Maximum | Uses highest values |
| Minimum | Uses lowest values |
| Replace | Completely overwrites |

## Pro Tips

### Tip 1: Start Large, Add Detail

Begin with large-scale features (mountains, valleys) and progressively add smaller details (ridges, erosion).

### Tip 2: Rotate for Variation

The same stamp rotated at different angles creates variety without needing more stamps.

### Tip 3: Use Preview Extensively

Toggle the preview on/off frequently to ensure your terrain looks natural without the stamp overlay.

### Tip 4: Save Layer Presets

Once you create a terrain you like, save your layer stack as a preset for reuse in other projects.

## Next Steps

Now that you've mastered the basics:

1. **Explore the stamp library** - Hundreds of pre-made stamps await
2. **Import custom stamps** - Use your own heightmaps
3. **Experiment with blend modes** - Create unique combinations
4. **Check the [user guide](user-guides.html)** - Comprehensive documentation

## Common Questions

**Q: Can I use Landstamp Pro on existing landscapes?**  
A: Yes! It works perfectly with landscapes you've already created.

**Q: Does it work with World Partition?**  
A: Absolutely. Landstamp Pro is fully compatible with UE5's World Partition system.

**Q: Can I undo changes?**  
A: Yes, the layer system is non-destructive. Simply delete or disable layers.

## Resources

- [Download User Guide](user-guides/Landstamp-Pro-User-Guide.pdf)
- [View on Fab](https://www.fab.com/listings/98b3d002-eedf-42f9-9d4e-007b0a9b0f9d)
- [Browse All Products](index.html#products)

---

*Have questions? Reach out to us on [X @MythicLemon](https://x.com/MythicLemon)!*
