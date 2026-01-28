# UE5 Landscape Tutorial: From Heightmaps to Final Terrain

**Published:** February 4, 2026  
**Reading Time:** 12 minutes  
**Tags:** Tutorial, Heightmap, Landscape, Workflow

This comprehensive tutorial walks you through the complete UE5 landscape workflow - from importing your first heightmap to shipping a production-ready terrain with optimized performance.

## What You'll Build

By the end of this tutorial, you'll have:
- A 4km x 4km realistic landscape
- Multi-layer terrain materials
- Vegetation and foliage distribution
- Optimized performance (60+ FPS)
- Understanding of the full production pipeline

**Time to complete:** 3-4 hours (first time)  
**Skill level:** Beginner to Intermediate  
**Prerequisites:** UE5.3+, basic UE5 knowledge

## Phase 1: Heightmap Preparation

### Understanding Heightmaps

A heightmap is a grayscale image where:
- **White pixels** = highest elevation
- **Black pixels** = lowest elevation
- **Gray pixels** = mid-elevation

**Technical requirements:**
- Format: 16-bit PNG or RAW (16-bit recommended for max detail)
- Dimensions: Power-of-two + 1 (1025, 2049, 4097, 8193)
- Color mode: Grayscale
- Color depth: 16-bit (65,536 height levels)

### Option 1: Generate a Heightmap (Gaea)

**Step 1:** Download and install Gaea (free trial or $99 Indie)

**Step 2:** Create a new terrain
- Resolution: 4097x4097
- Scale: 4km x 4km
- Seed: Random (or specific for reproducibility)

**Step 3:** Build your terrain graph
```
Perlin Noise (base shape)
  ↓
Erosion (realism)
  ↓
Coastal (if you want water)
  ↓
Output → PNG 16-bit
```

**Step 4:** Configure export settings
- Format: PNG 16-bit
- Resolution: 4097x4097
- Filename: MyTerrain_Height.png

**Step 5:** Build and export

**Tip:** Export multiple versions with different erosion amounts. You can blend them in UE5 later.

### Option 2: Download Real-World Data

**Step 1:** Go to terrain.party

**Step 2:** Navigate to your desired location
- Use search or manual navigation
- Look for interesting topology (mountains, valleys)

**Step 3:** Select your area
- Click to place bounds
- Drag to adjust size
- Aim for ~4km x 4km

**Step 4:** Download heightmap
- Format: Merge PNG
- Resolution: 4097x4097 (if available)

**Step 5:** Process in Photoshop/GIMP (optional)
- Levels adjustment to increase contrast
- Blur slightly to remove artifacts
- Save as 16-bit PNG

### Option 3: Create from Scratch in UE5

**Step 1:** Open UE5 and create new level

**Step 2:** Enter Landscape mode (Shift+3)

**Step 3:** Configure landscape settings
- Section Size: 63x63 quads
- Sections Per Component: 1x1
- Number of Components: 64x64
- Overall Resolution: 4033x4033

**Step 4:** Click Create

You now have a flat landscape ready for sculpting or stamping.

## Phase 2: Import Heightmap to UE5

### Importing Your Heightmap

**Step 1:** Open your UE5 project

**Step 2:** Switch to Landscape mode (Shift+3)

**Step 3:** Click "Import from File" tab

**Step 4:** Configure import settings
- Heightmap File: Browse to your PNG
- Material: Leave as default for now
- Section Size: 63x63 quads
- Sections Per Component: 1x1
- Number of Components: Auto-calculated

**Step 5:** Verify dimensions match
- If your heightmap is 4097x4097:
  - Total components should be 64x64
  - Overall resolution: 4033x4033

**Step 6:** Set Z-Scale
- Start with 100 (meters)
- Adjust later if mountains too short/tall

**Step 7:** Click Import

**Result:** Your heightmap is now a 3D landscape!

### Common Import Issues

**Problem:** Landscape looks flat  
**Solution:** Increase Z-Scale to 200-300

**Problem:** Terrain is too small  
**Solution:** Check Overall Scale XY (should be 100 for 1m per vertex)

**Problem:** Landscape has seams/cracks  
**Solution:** Heightmap dimensions don't match component setup

**Problem:** Terrain looks blocky  
**Solution:** Heightmap resolution too low - export higher res version

## Phase 3: Terrain Refinement

### Using Landstamp Pro for Features

If you started with a flat landscape or want to add features:

**Step 1:** Install [Landstamp Pro](product.html?id=landstamp-pro)

**Step 2:** Enable the plugin
- Edit → Plugins → Search "Landstamp"
- Enable and restart

**Step 3:** Open Landstamp Panel
- Window → Landstamp Pro

**Step 4:** Select a stamp
- Browse library: Mountains, Valleys, Cliffs
- Click thumbnail to preview

**Step 5:** Position and stamp
- Click on landscape to place preview
- Adjust Size, Rotation, Intensity
- Click "Apply Stamp" when ready

**Step 6:** Build terrain with layers
- Stamp 1: Large mountain range (background)
- Stamp 2: Hero mountain (focal point)
- Stamp 3: Valley system (gameplay flow)
- Stamp 4: Cliff formations (visual interest)

**Benefits of stamps:**
- 10x faster than manual sculpting
- Non-destructive (can move/adjust later)
- Professional quality guaranteed

### Manual Sculpting Touch-Ups

**Step 1:** Switch to Sculpt mode (Landscape mode → Sculpt tab)

**Step 2:** Select Sculpt tool

**Step 3:** Configure brush
- Brush Size: Start large (1000-2000)
- Brush Falloff: Smooth
- Strength: 0.3 (subtle)

**Step 4:** Smooth transitions
- Use Smooth tool between stamped features
- Blend edges where stamps meet
- Create natural flow

**Step 5:** Add gameplay-specific features
- Flatten areas for buildings/camps
- Create ramps for vehicle traversal
- Carve paths for player navigation

**Step 6:** Detail pass
- Smaller brush (100-300)
- Add micro-variations
- Erosion tool for realism

## Phase 4: Landscape Materials

### Creating Your First Landscape Material

**Step 1:** Create new material
- Content Browser → Right-click → Material
- Name: M_Landscape_Master

**Step 2:** Set material domain
- Details panel → Material Domain → Surface
- Blend Mode → Opaque

**Step 3:** Add Landscape Layer Blend node
- Right-click graph → Landscape → Layer Blend
- Layer Type → LB_HeightBlend

**Step 4:** Add texture layers
- Layer 0: Grass (Base)
- Layer 1: Rock (Cliffs)
- Layer 2: Dirt (Transitions)
- Layer 3: Snow (Peaks)

**Step 5:** Connect Megascans textures
- For each layer:
  - Add Megascans material function
  - Connect to Layer Blend input
  - Wire Layer Blend output to Base Color/Normal/Roughness

**Step 6:** Add height-based layering
- Create Landscape Layer Height node
- Connect to layer blend weights
- Snow at high elevation, grass at low

**Step 7:** Add slope-based layering
- Create Landscape Layer Slope node
- Cliff rock on steep slopes (> 45°)
- Grass on flat areas (< 30°)

**Step 8:** Save and compile

### Applying Material to Landscape

**Step 1:** Select landscape in viewport

**Step 2:** Details panel → Landscape Material
- Assign M_Landscape_Master

**Step 3:** Paint layer weights (optional)
- Landscape mode → Paint tab
- Select layer (Grass, Rock, etc.)
- Paint to override automatic blending

### Advanced Material Tips

**Triplanar projection:** Prevents texture stretching on cliffs
```
Use Landscape Layer Triplanar node for rock layers
```

**Macro variation:** Breaks up tiling
```
Add noise to UV coordinates
Multiply by small amount (0.1-0.3)
```

**Distance blending:** Simple materials far away
```
Blend detailed and simple materials based on camera distance
Massive performance win
```

## Phase 5: Vegetation & Foliage

### Setting Up PCG Foliage

**Step 1:** Enable PCG plugin
- Edit → Plugins → Search "PCG"
- Enable "Procedural Content Generation Framework"
- Restart UE5

**Step 2:** Create PCG Volume
- Place Actors → PCG → PCG Volume
- Scale to cover your landscape

**Step 3:** Create PCG Graph
- Content Browser → Right-click → PCG → PCG Graph
- Name: PCG_Landscape_Foliage

**Step 4:** Build foliage graph
```
Surface Sampler (generates points on landscape)
  ↓
Slope Filter (only flat-ish areas: 0-35°)
  ↓
Height Filter (grass at 0-200m, trees at 0-500m)
  ↓
Static Mesh Spawner (Megascans grass/trees)
```

**Step 5:** Configure density
- Surface Sampler → Points Per Square Meter
- Grass: 10-20 points/m²
- Bushes: 0.5-2 points/m²
- Trees: 0.1-0.5 points/m²

**Step 6:** Add variation
- PCG Random node → Scale variation (0.8-1.2)
- PCG Random node → Rotation (0-360°)

**Step 7:** Assign to PCG Volume

**Step 8:** Generate
- Click "Generate" in PCG Volume

### Manual Foliage Painting

For hero areas, manual painting gives more control:

**Step 1:** Open Foliage mode (Shift+4)

**Step 2:** Add foliage types
- + Add Foliage → Select Megascans plants/trees
- Repeat for multiple types

**Step 3:** Configure painting settings
- Brush Size: 512-2048
- Paint Density: 10-50 instances
- Erase Density: 50-100 instances

**Step 4:** Paint foliage
- LMB to paint
- Shift+LMB to erase
- Layer different species for realism

**Step 5:** Add variation
- Enable random scale (0.8-1.2)
- Enable random rotation
- Align to surface normal

## Phase 6: Optimization

Your terrain needs to run at 60+ FPS. Here's how:

### Enable World Partition

**Step 1:** World Settings → Enable World Partition

**Step 2:** World Partition Setup → Create Grid

**Step 3:** Configure streaming
- Grid cell size: 512m - 1024m
- Loading range: 2-3 cells

**Result:** Landscape streams in/out automatically. Massive performance boost.

### Enable Nanite for Rocks

**Step 1:** Select all rock meshes

**Step 2:** Details → Enable Nanite Support

**Step 3:** Rebuild

**Result:** Automatic LOD management for rocks.

### Optimize Landscape Material

**Step 1:** Reduce instruction count
- Stat Shader Compilation
- Target < 400 instructions

**Step 2:** Enable Virtual Texturing
- Material → Virtual Texture Output
- Reduces memory usage

**Step 3:** Use simpler materials at distance
- Lerp between detailed and simple based on distance
- Use Level of Detail node

### Foliage Optimization

**Step 1:** Configure foliage culling
- Foliage Type → Culling
- Cull Distance: 5000-10000 (adjust per type)

**Step 2:** Enable Hierarchical LOD
- Foliage Type → Enable HLOD
- Merge distant instances into simplified meshes

**Step 3:** Grass-specific settings
- Grass → Start Cull Distance: 5000
- Grass → End Cull Distance: 10000

### Performance Profiling

**Step 1:** Enable stat commands
```
stat fps
stat unit
stat landscape
```

**Step 2:** Use Unreal Insights
- Session → Trace → Browse Traces
- Identify bottlenecks

**Step 3:** Iterate and optimize
- Target 16.6ms (60 FPS) or 33.3ms (30 FPS)
- Reduce grass density if foliage-bound
- Reduce draw calls if render-bound

### Use Chart Widgets for Monitoring

[Chart Widgets](product.html?id=chart-widgets) lets you monitor FPS in real-time:

**Step 1:** Install plugin

**Step 2:** Add FPS chart to viewport

**Step 3:** Monitor while testing

**Result:** Catch performance issues immediately.

## Phase 7: Lighting & Atmosphere

### Basic Lighting Setup

**Step 1:** Add Directional Light (sun)
- Mobility: Stationary or Movable
- Intensity: 10-20
- Color: Slight yellow tint

**Step 2:** Add Sky Atmosphere
- Automatically added in most templates

**Step 3:** Add Volumetric Clouds (optional)
- Adds realism but performance cost

**Step 4:** Add Post Process Volume
- Infinite Extent: Checked
- Exposure: Auto Exposure enabled
- Bloom: Subtle (Intensity 0.5-1.0)

### Landscape-Specific Lighting

**Step 1:** Adjust shadow settings
- Directional Light → Cascade Shadow Maps
- Dynamic Shadow Distance: 10000-20000

**Step 2:** Add landscape-specific shadows
- Landscape → Cast Shadow: On
- Landscape → Cast Far Shadow: On

**Step 3:** Bake lighting (optional)
- Build → Build Lighting
- For static objects only

## Final Checklist

Before shipping your terrain:

- ✅ World Partition enabled and working
- ✅ Nanite enabled for appropriate meshes
- ✅ Foliage culling configured
- ✅ Landscape material optimized (< 400 instructions)
- ✅ Performance profiled (60 FPS target)
- ✅ Lighting looks good at different times of day
- ✅ No texture streaming issues (enable r.Streaming.PoolSize if needed)
- ✅ No holes/seams in landscape
- ✅ Gameplay-friendly traversal (test with character)

## Common Pitfalls

**❌ Not enabling World Partition**
Large landscapes will tank performance without streaming.

**❌ Too much foliage density**
Start lower than you think. Add more if FPS allows.

**❌ Ignoring material complexity**
Complex landscape materials kill performance. Keep it simple.

**❌ No performance profiling**
Use stat commands early and often.

**❌ Forgetting about gameplay**
Beautiful terrain that's frustrating to navigate fails.

## Next Steps

Now that you have a complete landscape:

1. **Add gameplay elements** (spawns, objectives, AI paths)
2. **Iterate on visuals** (lighting, post-processing, details)
3. **Optimize further** (always room for improvement)
4. **Build levels on top** (structures, camps, POIs)

## Recommended Resources

- **[Landstamp Pro](product.html?id=landstamp-pro)** - Speed up terrain creation 10x
- **[Mountain Massifs Pack](product.html?id=mountain-massifs-pack)** - AAA mountain assets
- **[Complete terrain creation guide](how-to-create-terrain-ue5-complete-guide.md)** - Fundamentals
- **[Workflow optimization](speed-up-open-world-terrain-workflow-10x.md)** - Production tips

## Conclusion

You now have a complete UE5 landscape workflow - from heightmap import to optimized, production-ready terrain. This process scales from small indie projects to AAA open worlds.

The key to success: **Invest in good tools** ([Landstamp Pro](product.html?id=landstamp-pro), Gaea, Megascans), **profile early and often** (Unreal Insights), and **optimize relentlessly** (World Partition, Nanite, culling).

Ready to speed up your terrain workflow even further? Try [Landstamp Pro](product.html?id=landstamp-pro) and build terrain 10x faster.

---

*Questions? Feedback? Share your landscapes with us on social media!*
