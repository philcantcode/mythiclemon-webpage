# How to Submit Blueprint Products to Epic's Fab Store

Blueprint-based products—gameplay systems, game templates, UI frameworks, tools—are popular on Fab. But they have specific requirements that differ from code plugins and 3D assets. This guide covers everything you need for a successful Blueprint product submission.

## The Critical Requirement: Demo or Video

Let's start with the most important point: **Blueprint-based products MUST include either a downloadable demo project OR a video URL in the Long Description.**

This is a hard requirement. Without demonstration of your system in action, your submission will be rejected.

### Video Demo

A good demo video should:
- Show the system running in-game (1-3 minutes)
- Demonstrate Blueprint nodes in action
- Cover setup process briefly
- Highlight key features

Host on YouTube or Vimeo and paste the URL in your Long Description.

### Demo Project

Alternatively, provide a downloadable demo:
- Host on Google Drive/Dropbox/OneDrive
- Include everything needed to run
- Test that it opens and works in a fresh environment

## Blueprint Quality Standards

Fab reviewers look at your Blueprints. Messy graphs mean rejection.

### No Errors or Warnings

Open your Blueprints and check the Compiler Results:
- **Zero errors** (red)
- **Zero consequential warnings** (yellow)

Fix all issues before submission.

### No Loose Nodes

Disconnected nodes look unprofessional and confuse users:
- Delete unused nodes
- If keeping nodes for documentation, add clear comments explaining why

### Neat Layout

Your Blueprints must be organized:

**Good practices:**
- Align nodes using the alignment tools
- Group related logic together
- Flow from left to right
- Use Comment boxes for sections
- Keep wires from crossing excessively

**Bad practices:**
- Spaghetti connections everywhere
- Nodes scattered randomly
- Event Graphs that scroll for pages without organization

### Use Functions

If your Event Graph is massive, break it into functions:

```
Event BeginPlay
    → Initialize Components (function)
    → Setup Input Bindings (function)
    → Load Saved Data (function)
```

This makes your system readable and debuggable.

### Descriptive Names

Every function, variable, and event needs a clear name:

✅ Good:
- `CalculateDamage`
- `PlayerCurrentHealth`
- `OnInventoryUpdated`

❌ Bad:
- `Function1`
- `MyVar`
- `Event_2`

### Tooltips on Exposed Variables

Every public variable should have a tooltip explaining:
- What it does
- Valid value ranges
- When to use it

Users read tooltips before documentation. Good tooltips reduce support requests.

### Variable Categories

Organize exposed variables with categories:

```
Category: "Movement|Speed"
Category: "Combat|Damage"
Category: "UI|Appearance"
```

This groups related settings in the Details panel.

## Project Structure

Blueprint products are submitted as content-only projects (usually Asset Packs).

### Folder Structure

```
MyBlueprintSystem/
├── Config/
├── Content/
│   └── MyBlueprintSystem/
│       ├── Blueprints/
│       │   ├── Core/
│       │   ├── UI/
│       │   └── Examples/
│       ├── Data/
│       ├── Widgets/
│       └── Maps/
└── MyBlueprintSystem.uproject
```

**Requirements:**
- Single top-level folder under Content
- No local folders (Binaries, Build, Intermediate, Saved, Plugins)
- Paths under 140 characters

### Asset Pack Restrictions

If using "Asset Pack" distribution method:

**Cannot include:**
- Level Blueprints (they can't migrate to other projects)
- Mandatory Config (.ini) files

**Must do instead:**
- Put level-specific logic in Actor Blueprints or GameMode
- Make configuration Blueprint-editable on Actors

### Naming Conventions

Consistent naming helps users navigate your system:

```
BP_InventoryManager         (Blueprint Actor)
W_InventorySlot             (Widget)
DT_ItemDatabase             (Data Table)
E_ItemType                  (Enum)
S_ItemData                  (Struct)
```

## Dependencies

### Document Everything

List all dependencies clearly in your description:

```
Dependencies:
- Enhanced Input (Engine Plugin)
- Common UI (Engine Plugin)
- No external marketplace dependencies
```

### Only Fab-Available Dependencies

Required external dependencies must be available on Fab. Don't depend on other marketplace products users need to buy separately.

### Disable Unused Plugins

Check your `.uproject` file. Plugins you don't use should be disabled:

```json
{
  "Name": "Paper2D",
  "Enabled": false
}
```

### Experimental Features Warning

If you use experimental or beta engine features:
- State this clearly in the description
- Warn about potential instability
- Note that features may change in future engine versions

## Demo Map

### Required Content

Your demo map should:
- Show the system working immediately
- Demonstrate all major features
- Include on-screen instructions
- Work without additional setup

### Technical Requirements

- **Lighting built** (no "Preview" watermarks)
- **No errors on load** or PIE start
- **Clear usage instructions** (press E to interact, etc.)

### First Impressions Matter

Users open the demo map first. If it doesn't work or looks broken, they refund.

Make your demo map:
- Visually clean (doesn't need to be beautiful)
- Obviously functional
- Self-explanatory

## Documentation

Blueprint systems need documentation. Users need to understand:

### Getting Started Guide

Step-by-step from import to working feature:

1. Import the asset pack
2. Add BP_GameManager to your level
3. Configure settings in Details panel
4. Press Play to test

### API Reference

Document all public functions and events:

```markdown
## OnItemAdded Event
Called when an item is added to inventory.

**Parameters:**
- ItemData (S_ItemData): The item that was added
- SlotIndex (int32): The inventory slot used

**Usage:**
Bind to this event to play sounds, update UI, or trigger achievements.
```

### Example Implementations

Show common use cases:

- Basic setup
- Integration with existing player character
- Advanced customization
- Multiplayer considerations (if applicable)

### Documentation Formats

Acceptable formats:
- Web-based guides (recommended)
- PDF files included with product
- Video tutorials
- In-editor tutorial Blueprints
- Extensive comments in example Blueprints

Must be in English. Translations are optional extras.

## Engine Version Support

### Initial Submission

Must support the latest UE version.

### Adding New Versions

For content-only projects (no C++), you can often just add new engine versions to your existing Project Version without uploading new files.

### Maintenance

Maintain support for at least one of the three latest engine versions.

### Binary Build Compatibility

Your system must work in standard launcher-installed Unreal Engine. Don't depend on source-build-only features.

## Testing

### Fresh Project Test

This catches most issues:

1. Create a brand new UE project
2. Import your asset pack
3. Open the demo map
4. Press Play
5. Test all features

Your development project has context (other plugins, settings, assets) that fresh projects don't. Test in clean conditions.

### Packaged Build Test

Some things only break in packaged games:
- Editor-only functionality
- Development-only features
- Asset reference issues

Package your project and run the standalone executable.

## Product Page Tips

### Description Content

Include:
- Clear feature list
- System requirements
- What's included (Blueprint count, widget count, etc.)
- Network replication status (if applicable)
- Supported input methods

### Screenshots

Show:
- Blueprint graphs (clean, organized ones!)
- Editor setup
- Runtime behavior
- UI elements (if any)

### Video

Highly recommended even if you also have a demo project:
- 1-3 minutes
- Show setup and runtime
- Demonstrate key features

## Common Rejection Reasons

1. **No video or demo project** - This is mandatory for Blueprint products
2. **Blueprint compilation errors** - Fix all errors and warnings
3. **Messy Blueprint layouts** - Organize your graphs
4. **Level Blueprint usage in Asset Packs** - Use Actor Blueprints instead
5. **Missing documentation** - Provide setup instructions
6. **Broken demo map** - Test thoroughly
7. **Undocumented dependencies** - List all required plugins

## Before You Submit

Final checklist:

- [ ] Demo project OR video URL in description
- [ ] Zero Blueprint errors/warnings
- [ ] Neat, organized Blueprint layouts
- [ ] Descriptive names for all functions/variables
- [ ] Tooltips on exposed variables
- [ ] Single top-level Content folder
- [ ] No Level Blueprints (for Asset Packs)
- [ ] No local folders
- [ ] Dependencies documented
- [ ] Demo map with built lighting
- [ ] No errors on map load
- [ ] Documentation provided
- [ ] Tested in fresh project
- [ ] Tested in packaged build

## Resources

- [Official Fab Technical Requirements](https://support.fab.com/s/article/FAB-TECHNICAL-REQUIREMENTS)
- [Fab Blueprint Product Checklist](/resources/fab-blueprint-checklist.html)
- [Fab Publisher Checklist](/resources/fab-publisher-checklist.html)

---

Blueprint products require more attention to code quality than you might expect. Clean graphs, clear documentation, and a working demo are the foundations of a successful submission.

Put in the effort upfront, and you'll build a reputation for quality systems that customers trust and recommend.
