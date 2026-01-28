# Complete Guide to Submitting UE5 Code Plugins to Epic's Fab Store

So you've built an Unreal Engine plugin and want to sell it on Fab. Great! But the submission process has specific requirements that trip up even experienced developers. This guide walks you through everything you need to know.

## Why Plugin Submissions Get Rejected

Before diving in, let's address the elephant in the room: **many first-time submissions get rejected**. The most common reasons are:

1. Missing or incorrect `.uplugin` descriptor fields
2. Using Epic's default copyright notice instead of your own
3. Including local build folders in the zip
4. Missing demonstration video or example project
5. Third-party software not properly declared

Every single one of these is avoidable. Let's make sure your submission goes smoothly.

## Understanding Fab's Distribution Model

Here's something crucial to understand: **Fab installs code plugins as engine plugins**, not project plugins. When a customer downloads your plugin, it goes to:

```
Epic Games/UE_5.x/Engine/Plugins/Fab/YourPlugin/
```

This means:
- Your plugin must work as an engine plugin
- Example projects are separate downloads, not bundled
- The FabURL in your .uplugin enables automatic installation

Keep this architecture in mind as we go through the requirements.

## The .uplugin Descriptor: Your Plugin's ID Card

The `.uplugin` file is where most rejections happen. Let's get it right.

### Required Fields

**EngineVersion** (CRITICAL)

```json
"EngineVersion": "5.4.0",
```

This tells Epic which engine version to build against. You need a **separate submission per engine version**, each with its own EngineVersion value.

**PlatformAllowList or PlatformDenyList** (CRITICAL)

Every module must specify platforms:

```json
"Modules": [
  {
    "Name": "MyPlugin",
    "Type": "Runtime",
    "LoadingPhase": "Default",
    "PlatformAllowList": ["Win64", "Mac", "Linux"]
  }
]
```

For UE4 plugins, use `WhitelistPlatforms` instead (the naming changed in UE5).

**FabURL** (CRITICAL)

This enables the "Install Missing Plugin" functionality:

```json
"FabURL": "com.epicgames.launcher://ue/Fab/product/YOUR_PRODUCT_ID"
```

Get your product ID from the Publisher Portal URL after creating your initial submission.

### Example Complete .uplugin

```json
{
  "FileVersion": 3,
  "Version": 1,
  "VersionName": "1.0.0",
  "FriendlyName": "My Awesome Plugin",
  "Description": "Does awesome things",
  "Category": "Gameplay",
  "CreatedBy": "Your Name",
  "CreatedByURL": "https://yourwebsite.com",
  "DocsURL": "https://yourwebsite.com/docs",
  "MarketplaceURL": "",
  "SupportURL": "https://yourwebsite.com/support",
  "EngineVersion": "5.4.0",
  "FabURL": "com.epicgames.launcher://ue/Fab/product/abc123def456",
  "CanContainContent": true,
  "IsBetaVersion": false,
  "IsExperimentalVersion": false,
  "Installed": false,
  "Modules": [
    {
      "Name": "MyPlugin",
      "Type": "Runtime",
      "LoadingPhase": "Default",
      "PlatformAllowList": ["Win64", "Mac", "Linux", "IOS", "Android"]
    },
    {
      "Name": "MyPluginEditor",
      "Type": "Editor",
      "LoadingPhase": "Default",
      "PlatformAllowList": ["Win64", "Mac", "Linux"]
    }
  ]
}
```

## Source Code Requirements

### Copyright Headers (CRITICAL)

Every `.h` and `.cpp` file needs YOUR copyright notice:

```cpp
// Copyright 2026 Your Company Name. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
// ... rest of file
```

Do NOT use the auto-generated Epic Games copyright. That's a guaranteed rejection.

### Open Source Requirement

Any code that depends on Unreal Engine source must be included as source code. You can only include pre-compiled binaries for code that has **zero UE dependencies**.

Why? Customers need source to compile against source-built engine versions.

### What Makes a Valid Plugin

Your plugin must:
- Have at least one C++ module
- Introduce new editor functionality, integrate with third-party systems, OR expose complex gameplay logic to Blueprints
- NOT distribute executables (.exe, .msi)

Blueprint-only products should be submitted as Asset Packs, not Code Plugins.

## Compilation Requirements

Epic builds your plugin binaries. You need to ensure clean compilation.

### Test Before Submission

Use the Package command:

1. Open your plugin in the Plugins window
2. Right-click → Package
3. Verify no errors

Or from command line:

```bash
Engine\Build\BatchFiles\RunUAT.bat BuildPlugin -Plugin="C:\Path\To\Your.uplugin" -Package="C:\Output" -Rocket
```

### IWYU Compliance (4.18+)

Add to your `.Build.cs`:

```csharp
PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
```

This ensures Include-What-You-Use compliance.

### Include Paths (4.20+)

When including your own plugin directories:

```csharp
using System.IO;

// In your Build.cs constructor:
PublicIncludePaths.Add(Path.Combine(ModuleDirectory, "MyFolder"));
```

## File Structure

### What to Include

```
MyPlugin/
├── Config/
│   └── FilterPlugin.ini    (if you have extra folders)
├── Content/                 (optional)
├── Resources/
│   └── Icon128.png
├── Source/
│   ├── MyPlugin/
│   │   ├── Private/
│   │   ├── Public/
│   │   └── MyPlugin.Build.cs
│   └── ThirdParty/          (if applicable)
└── MyPlugin.uplugin
```

### What NOT to Include

**Delete these folders before zipping:**
- Binaries/
- Build/
- Intermediate/
- Saved/

Epic rebuilds binaries. Including them causes rejection.

### Path Length

All paths from the plugin root must be **170 characters or less**.

### Extra Folders

Need to distribute a Docs folder? Create `Config/FilterPlugin.ini`:

```ini
[FilterPlugin]
/Docs/...
```

## Third-Party Software

### Declaration Required

If you use ANY third-party code, fonts, sounds, or libraries, you must:

1. Select "This Product Uses Third-Party Software" in the submission
2. Fill out the [Third-Party Software Declaration Form](https://epicgames.formstack.com/forms/third_party_software_declaration_form)
3. Place dependencies in `Source/ThirdParty/`

### No Plugin Dependencies

Your plugin cannot depend on other user-made plugins. Only engine plugins distributed with UE are allowed as dependencies.

## Engine Version Support

### Initial Submission

Your first submission MUST support the **latest UE version**.

### Multiple Versions

For code plugins, you need **separate Project Versions** for each engine version, each with:
- Different hosted zip file
- Different EngineVersion in .uplugin
- Same source code (usually)

### Maintenance

You must support at least one of the three latest engine versions. Epic only builds against the latest three by default.

## Demo & Documentation

### Example Project (Strongly Recommended)

Since plugins install as engine plugins, a separate example project helps users:

1. Host it on Google Drive/Dropbox/OneDrive
2. Add the link in Technical Information: "Example Project:"
3. The project should DEPEND on your plugin but NOT contain it

### Video or Demo Required for Blueprint Features

If your plugin exposes Blueprint functionality, you MUST include either:
- A downloadable demo project, OR
- A video URL in the Long Description

This is a hard requirement, not optional.

### Documentation

Products requiring setup knowledge need documentation:
- Web guides
- PDF files
- Video tutorials
- In-editor tutorials

Must be in English (translations optional).

## Product Page

### Required Information

- English text with correct spelling/grammar
- Accurate feature descriptions
- All Technical Information fields completed
- Relevant, accurate tags
- Proper category selection

### Media

- Screenshots showing editor integration
- In-game functionality (if applicable)
- Video demonstration recommended

### Disclosures

Check these if applicable:
- Created with AI
- Uses Third-Party Software
- Mature content rating

## Submission Checklist

Before you hit submit:

- [ ] EngineVersion in .uplugin
- [ ] PlatformAllowList in each module
- [ ] FabURL in .uplugin (after first submission)
- [ ] Your copyright in ALL source files
- [ ] No local folders (Binaries, Build, Intermediate, Saved)
- [ ] Clean compilation with no warnings
- [ ] Paths under 170 characters
- [ ] Third-party software declared (if any)
- [ ] Video or demo project for Blueprint features
- [ ] Documentation provided
- [ ] Tested in fresh project

## Common Pitfalls

### "Works on My Machine"

Your dev project has context fresh projects don't. Always test in a brand new project.

### Assuming Users Have Source

Binary (launcher-installed) UE is the default. Your plugin must work without source access.

### Ignoring Warnings

"It's just a warning" → "It's a rejection on a different platform." Fix all warnings.

### Last-Minute Changes

Don't edit code after testing. One more "quick fix" creates untested code.

## After Submission

- Keep your download link active
- Monitor email for review feedback
- Prepare to address feedback quickly
- Once approved, update FabURL in future versions

## Resources

- [Official Fab Technical Requirements](https://support.fab.com/s/article/FAB-TECHNICAL-REQUIREMENTS)
- [Fab Code Plugin Checklist](/resources/fab-code-plugin-checklist.html)
- [Fab Publisher Checklist](/resources/fab-publisher-checklist.html)
- [Third-Party Declaration Form](https://epicgames.formstack.com/forms/third_party_software_declaration_form)

---

Submitting a plugin isn't difficult once you understand the requirements. The key is preparation: get your .uplugin right, add your copyright notices, remove build folders, and test in a clean environment.

Good luck with your submission!
