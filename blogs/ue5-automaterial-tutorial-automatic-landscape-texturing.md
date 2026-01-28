# UE5 AutoMaterial Tutorial: Automatic Landscape Texturing

**Published:** February 14, 2026  
**Reading Time:** 6 minutes  
**Tags:** Tutorial, Materials, Landscape, Texturing, Blueprints

Painting landscape materials by hand is tedious. For a 4km² map, you could spend days painting grass, rock, snow, and dirt. AutoMaterials do this automatically based on height and slope - instant texturing with zero painting.

## What is an AutoMaterial?

An AutoMaterial is a landscape material that paints itself:

- **Snow on peaks** - High elevation = snow texture
- **Rock on cliffs** - Steep slope = rock texture  
- **Grass on flats** - Low slope = grass texture
- **Dirt in transitions** - Between zones = dirt texture

You apply the material and the terrain is instantly textured.

## How AutoMaterials Work

### Height-Based Blending

The material checks each point's elevation:

```
Elevation 0-100m: Grass
Elevation 100-300m: Dirt
Elevation 300-600m: Rock
Elevation 600m+: Snow
```

Transitions blend smoothly between zones.

### Slope-Based Blending

The material checks surface angle:

```
Slope 0-30°: Grass/vegetation
Slope 30-60°: Dirt/gravel
Slope 60-90°: Rock/cliff
```

Cliffs get rock regardless of height.

### Combined Logic

Height AND slope work together:

```
High elevation + flat = snow
High elevation + steep = rock with snow patches
Low elevation + flat = grass
Low elevation + steep = rock with grass at base
```

This creates realistic, natural-looking terrain.

## Using the AutoMaterial from Landscape Packs

[Massive Open World Landscape Pack](product.html?id=massive-open-world-landscape-pack) includes a ready-to-use AutoMaterial.

### Step 1: Apply AutoMaterial

1. Select your landscape
2. In Details panel, find **Landscape Material**
3. Apply **M_AutoMaterial_Inst**
4. Terrain instantly textured

### Step 2: View Results

The terrain now has:
- Appropriate textures based on height
- Rock on steep surfaces
- Smooth transitions between zones

### Step 3: Customize (Optional)

The AutoMaterial includes 5 custom layers:
- Paint over auto-painted areas
- Add paths, clearings, special zones
- Mix automatic and manual painting

## Customizing AutoMaterial Settings

### Adjust Height Thresholds

Open the material instance:
1. Find **M_AutoMaterial_Inst** in Content Browser
2. Double-click to edit
3. Adjust height parameters:
   - GrassMaxHeight: 100 → 150 (more grass coverage)
   - SnowMinHeight: 600 → 500 (snow lower on mountains)
   - TransitionBlend: 50 → 100 (smoother transitions)

### Adjust Slope Thresholds

Change when rock appears:
- CliffMinSlope: 45 → 35 (rock on gentler slopes)
- CliffMaxSlope: 90 (vertical always rock)
- SlopeBlend: 10 → 20 (softer cliff transitions)

### Swap Textures

Replace default textures with your own:

1. Open material instance
2. Find texture parameters:
   - GrassTexture
   - RockTexture
   - DirtTexture
   - SnowTexture
3. Replace with Megascans or custom textures
4. Match your game's art style

## Creating Your Own AutoMaterial

Want to build one from scratch? Here's the process:

### Step 1: Create Material

1. Right-click Content Browser → Material
2. Name: M_Landscape_Auto
3. Double-click to open Material Editor

### Step 2: Add Landscape Layer Blend

1. Add **Landscape Layer Blend** node
2. Set blend type to **LB Height Blend**
3. Add layers:
   - Grass (weight 1.0)
   - Rock (weight 1.0)
   - Snow (weight 1.0)

### Step 3: Get World Position

1. Add **World Position** node
2. Add **Component Mask** to get Z (height)
3. Divide by max terrain height for 0-1 range

### Step 4: Calculate Slope

1. Add **Vertex Normal** node
2. Dot product with (0, 0, 1) vector
3. Result: 1 = flat, 0 = vertical

### Step 5: Blend by Height

Use height value to blend layers:

```
Height 0.0-0.3: Grass weight = 1
Height 0.3-0.6: Rock weight = 1
Height 0.6-1.0: Snow weight = 1
```

Add **Lerp** nodes for smooth transitions.

### Step 6: Blend by Slope

Override with rock on steep slopes:

```
If slope < 0.5:
    Use rock texture
    Blend based on slope
```

### Step 7: Add Textures

For each layer:
1. Add **Texture Sample** node
2. Connect diffuse/normal/roughness
3. Wire to layer blend inputs

### Step 8: Apply to Landscape

1. Compile and save material
2. Apply to landscape
3. Instant auto-texturing

## Advanced AutoMaterial Features

### Macro Variation

Add large-scale color variation:

1. Sample noise texture at large scale
2. Multiply with base colors
3. Breaks up tiling at distance

### Distance Blending

Simpler textures at distance:

1. Calculate camera distance
2. Lerp between detailed and simple textures
3. Massive performance improvement

### Wetness/Puddles

Add wet areas in valleys:

1. Use height to determine water accumulation
2. Increase roughness, darken color
3. Add puddle normal maps

### Procedural Snow Line

Variable snow based on facing:

1. Sample world normal
2. North-facing = more snow
3. South-facing = less snow
4. More realistic mountain appearance

## Performance Optimization

AutoMaterials can be expensive. Optimize:

### Reduce Texture Samples

- Limit to 4-6 unique textures
- Use texture arrays if more needed
- Share normal maps where possible

### Use Virtual Texturing

1. Enable Virtual Texture Output
2. Reduces VRAM usage
3. Essential for large landscapes

### Distance Culling

- Simple materials at distance
- Full detail only up close
- Lerp based on camera distance

### Limit Instruction Count

- Target < 400 instructions
- Check with Material Stats
- Simplify if over budget

## Troubleshooting

### Issue: No Texturing Visible

**Cause:** Material not applied correctly

**Fix:**
1. Verify material is assigned
2. Check material compiles without errors
3. Ensure textures are valid

### Issue: Visible Seams Between Zones

**Cause:** Harsh blend transitions

**Fix:**
1. Increase blend radius in parameters
2. Add noise to transition zones
3. Smooth height/slope sampling

### Issue: Performance Problems

**Cause:** Material too complex

**Fix:**
1. Reduce texture samples
2. Enable Virtual Texturing
3. Add distance-based simplification
4. Check instruction count

### Issue: Tiling Visible

**Cause:** Texture repetition obvious

**Fix:**
1. Add macro variation
2. Use larger texture tiles
3. Add detail normal overlay
4. Blend multiple scales

## Complete Example: Fantasy Terrain

Here's a complete AutoMaterial setup for fantasy games:

**Layers:**
1. **Grass** (0-150m, flat areas)
2. **Dirt** (transitions, paths)
3. **Rock** (cliffs, 150-500m)
4. **Snow** (500m+, peaks)
5. **Custom** (for manual painting)

**Settings:**
```
GrassMaxHeight: 150
RockMinHeight: 100
RockMaxHeight: 500
SnowMinHeight: 450
CliffMinSlope: 40
TransitionBlend: 75
```

**Textures:**
- Grass: Megascans lush grass
- Dirt: Megascans forest floor
- Rock: Megascans granite cliff
- Snow: Megascans fresh snow

**Result:** Professional terrain in 5 minutes.

## Combining with Heightmap Packs

[Massive Open World Landscape Pack](product.html?id=massive-open-world-landscape-pack) includes:
- 14 unique heightmaps
- Ready-to-use AutoMaterial
- Demo levels with applied materials
- Customizable material instances

Import heightmap → Apply AutoMaterial → Done.

## Conclusion

AutoMaterials transform landscape texturing:
- ✅ Instant results (no manual painting)
- ✅ Consistent quality across entire terrain
- ✅ Easy customization (adjust parameters)
- ✅ Works with any textures

Stop painting landscapes by hand. Use AutoMaterials.

**[Get Massive Open World Landscape Pack (includes AutoMaterial) →](product.html?id=massive-open-world-landscape-pack)**

---

*More terrain tutorials: [Importing heightmaps](how-to-import-heightmaps-ue5-tutorial.md) and [complete terrain guide](how-to-create-terrain-ue5-complete-guide.md).*
