# Build a Stealth Visibility System in UE5 Without Tracing Lights

**Published:** February 10, 2026  
**Reading Time:** 7 minutes  
**Tags:** Tutorial, Stealth, Visibility, Blueprints, Lighting

Traditional stealth visibility systems trace to every light in the scene. It's slow, inaccurate, and a nightmare to maintain. There's a better way.

## The Traditional Approach (And Why It Fails)

Every stealth game tutorial teaches the same broken pattern:

```
For each light in level:
    Distance = Get distance to player
    Intensity = Light brightness / (distance * distance)
    
    If has line of sight:
        Total brightness += Intensity

Visibility = Total brightness / Max brightness
```

**Problems:**

1. **Doesn't account for shadows** - You're lit by a light blocked by a wall
2. **Ignores global illumination** - Bounced light doesn't exist to this system
3. **Misses emissive materials** - A glowing computer screen lights you up
4. **Static lights are baked** - Your trace doesn't know about lightmaps
5. **Performance scales with lights** - 100 lights = 100 traces per frame
6. **Constant maintenance** - Every new light type needs special handling

The fundamental flaw: **You're simulating what the renderer already calculated.**

## The Better Approach: Sample the Rendered Scene

Instead of recreating the renderer's work, measure its output:

1. Capture what the scene looks like at the player's position
2. Measure the brightness of that capture
3. Done

This is what [Lumen Meter](product.html?id=lumen-meter) does. It samples the post-render scene and returns an accurate brightness value.

## Building the Visibility System

### Step 1: Install Lumen Meter

1. Get [Lumen Meter](product.html?id=lumen-meter) from Fab
2. Add to your project
3. No configuration needed

### Step 2: Attach to Player

Create a component setup:

```
BP_StealthCharacter
├─ Capsule Component
├─ Mesh Component
├─ Camera Component
└─ BP_LumenMeter (attached to mesh)
```

Or spawn and follow:

```
Event BeginPlay:
1. Spawn BP_LumenMeter
2. Store reference
3. Each tick: Set Lumen Meter location to player location
```

### Step 3: Create Visibility Component

New Actor Component: `BP_VisibilityComponent`

**Variables:**
- `LumenMeterRef` (BP_LumenMeter) - Reference to meter
- `CurrentVisibility` (Float) - 0-1 visibility value
- `VisibilityState` (Enum) - Hidden/Dim/Visible/Exposed
- `UpdateInterval` (Float) - Default: 0.1 seconds

**Enum: E_VisibilityState**
- Hidden (player invisible to AI)
- Dim (reduced detection)
- Visible (normal detection)
- Exposed (enhanced detection)

### Step 4: Update Visibility

Function: `UpdateVisibility`

```
1. Get Normalized Brightness from Lumen Meter
2. Store as CurrentVisibility

3. Map to VisibilityState:
   If brightness < 0.15: Hidden
   Else if brightness < 0.35: Dim
   Else if brightness < 0.65: Visible
   Else: Exposed

4. Broadcast OnVisibilityChanged event
```

Call this function on a timer (every 0.1 seconds).

### Step 5: Expose to AI

Function: `GetDetectionMultiplier` → Float

```
Switch on VisibilityState:
   Hidden: Return 0.0
   Dim: Return 0.5
   Visible: Return 1.0
   Exposed: Return 1.5
```

AI uses this to modify their detection:

```
AI Detection Check:
1. Base detection distance = 1000 units
2. Get player DetectionMultiplier
3. Effective distance = Base * Multiplier
4. If player within effective distance: Detected
```

### Step 6: UI Feedback

Show players their visibility:

```
Bind UI to VisibilityComponent:
   OnVisibilityChanged:
      Switch on NewState:
         Hidden: Show closed eye icon
         Dim: Show half-open eye icon
         Visible: Show open eye icon
         Exposed: Show eye icon + alert indicator
```

## Complete System Overview

```
┌─────────────────────────────────────────┐
│           BP_LumenMeter                 │
│  (Samples rendered scene brightness)    │
└─────────────────┬───────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────┐
│       BP_VisibilityComponent            │
│  ├─ CurrentVisibility (0-1)             │
│  ├─ VisibilityState (enum)              │
│  └─ GetDetectionMultiplier()            │
└─────────────────┬───────────────────────┘
                  │
         ┌───────┴───────┐
         ↓               ↓
┌─────────────┐  ┌─────────────┐
│   AI System │  │     UI      │
│ (Detection) │  │ (Feedback)  │
└─────────────┘  └─────────────┘
```

## Advanced: Dynamic Thresholds

Different areas might need different thresholds. A moonlit forest is darker than a lit building, but both can have "hidden" spots.

### Area-Based Thresholds

```
Create BP_StealthZone (Box Trigger):
├─ HiddenThreshold: 0.2
├─ DimThreshold: 0.4
├─ ExposedThreshold: 0.75

On Player Enter Zone:
1. Store zone reference on VisibilityComponent
2. Use zone's thresholds for state calculation

On Player Exit Zone:
1. Clear zone reference
2. Return to default thresholds
```

### Dynamic Threshold Adjustment

Let the level designer mark "expected darkness":

```
Level BP:
1. At night: Lower all thresholds by 0.1
2. During power outage: Lower thresholds by 0.2
3. When alarm triggered: Raise thresholds (enemies more alert)
```

## Performance Optimization

### Sample Rate

Don't update every frame:

```
Good: 0.1s interval (10 updates/second)
Better: 0.2s interval (5 updates/second)
Best: Update only when player moves
```

### Conditional Updates

Skip updates when not needed:

```
ShouldUpdateVisibility:
   If player in cutscene: Return false
   If player in menu: Return false
   If no AI nearby: Return false
   If player hasn't moved: Return false
   Return true
```

### Mode Selection

Use Directional mode for gameplay (faster):

```
Lumen Meter Settings:
├─ Mode: Directional
├─ Capture Interval: 0.1s
```

Reserve Omnidirectional for high-stakes moments:

```
When boss fight starts:
   Switch to Omnidirectional mode
   "This detection REALLY matters"
```

## Handling Edge Cases

### Player Carrying Light Source

Torches/flashlights affect visibility:

```
If player torch is ON:
   FinalVisibility = Max(LumenMeter value, 0.8)
   "Carrying a light always makes you visible"
```

### Light Flicker

Prevent visibility state bouncing during flickers:

```
Add hysteresis to state changes:
1. Track time in current state
2. Require 0.3s in new range before changing state
3. Prevents rapid Hidden→Visible→Hidden
```

### Multiple Players

Each player needs their own measurement:

```
MP_PlayerCharacter:
├─ BP_LumenMeter (per-player)
├─ BP_VisibilityComponent (per-player)

AI checks each player's visibility independently
```

## Integration Examples

### Dishonored-Style Visibility

```
Three-state system:
├─ Hidden (full darkness): AI ignores completely
├─ Shadow (dim): AI investigates if suspicious
└─ Visible: AI detects and attacks

Plus lean bonus:
   If player leaning around corner:
      Visibility reduced by 20%
```

### Metal Gear Solid-Style Camo Index

```
Base visibility from Lumen Meter
Plus modifiers:
├─ Camo pattern vs environment: +/- 20%
├─ Movement speed: 0 (still) to +30% (running)
├─ Stance: 0 (prone) to +10% (standing)
├─ Sound: Separate noise system

Final Camo Index = 100 - (visibility * 100)
```

### Thief-Style Light Gem

```
UI element shows exact visibility:
├─ Gem brightness = LumenMeter brightness
├─ Gem fully black = perfectly hidden
├─ Gem glowing = fully exposed

Players learn to read the gem instantly
```

## Debugging Tools

### In-Game Debug Display

```
If debug mode:
   Draw text at player:
      "Brightness: 0.35"
      "State: Dim"
      "Multiplier: 0.5x"
```

### Editor Visualization

Place debug Lumen Meters around level:
1. Move them in editor (game not running)
2. See brightness values update
3. Find exactly where shadows fall
4. Adjust level design for interesting stealth routes

### Logging

```
On Visibility State Changed:
   Log: "Visibility: Hidden → Dim (brightness: 0.22)"
   
Helps identify unexpected transitions
```

## Common Mistakes

**❌ Updating every frame**
✅ Update every 0.1-0.2 seconds

**❌ Binary visible/hidden**
✅ Use gradient with multiple states

**❌ Ignoring UI feedback**
✅ Players need to know their visibility

**❌ Same thresholds everywhere**
✅ Adjust for different areas/situations

**❌ Not handling light sources on player**
✅ Torches/flashlights override darkness

## Summary

Building a visibility system with [Lumen Meter](product.html?id=lumen-meter):

| Component | Purpose |
|-----------|---------|
| BP_LumenMeter | Measures actual scene brightness |
| BP_VisibilityComponent | Manages visibility state |
| E_VisibilityState | Enum for game states |
| AI Integration | Modifies detection ranges |
| UI | Shows player their visibility |

**Total setup time:** 30 minutes  
**Lines of Blueprint:** ~50 nodes  
**Accuracy:** Perfect (measures actual rendered scene)

## Conclusion

Stop tracing lights manually. [Lumen Meter](product.html?id=lumen-meter) gives you:

- ✅ Accurate brightness from rendered scene
- ✅ No per-light calculations
- ✅ Automatic shadow/GI handling
- ✅ Works with any lighting setup
- ✅ Plug-and-play Blueprint

Build your stealth visibility system in 30 minutes instead of 30 hours.

**[Get Lumen Meter on Fab →](product.html?id=lumen-meter)**

---

*Want more stealth mechanics? Read our guides on [measuring light levels](how-to-measure-light-levels-ue5-stealth-games.md) and [AI perception tuning](ue5-ai-perception-stealth.md).*
