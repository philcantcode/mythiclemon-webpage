# Build a Leaderboard System in UE5 with Blueprints

**Published:** February 7, 2026  
**Reading Time:** 11 minutes  
**Tags:** Tutorial, Leaderboard, Multiplayer, Blueprints, HTTP

Leaderboards transform single-player games into competitive experiences. Players return to beat their high scores, compare with friends, and climb the ranks. This tutorial shows you how to build a complete leaderboard system in UE5 using only Blueprints.

## What We're Building

By the end of this tutorial, you'll have:

- ✅ Score submission to a backend server
- ✅ Leaderboard fetching and display
- ✅ Player rank calculation
- ✅ Local caching for offline support
- ✅ Error handling and retry logic
- ✅ Beautiful leaderboard UI

**Prerequisites:**
- Unreal Engine 5.5+
- [EasyHTTP plugin](product.html?id=easyhttp) (for HTTP requests)
- Basic Blueprint knowledge
- A backend API (we'll use a mock server)

## Architecture Overview

```
Player completes level
        ↓
Submit score (POST request)
        ↓
Backend stores score
        ↓
Fetch leaderboard (GET request)
        ↓
Display in UI
```

**Components:**
1. **Score Manager** - Handles score submission
2. **Leaderboard Manager** - Fetches and caches data
3. **Leaderboard Widget** - Displays the rankings
4. **HTTP Layer** - EasyHTTP handles all requests

## Part 1: Setting Up EasyHTTP

### Install the Plugin

1. Purchase [EasyHTTP](product.html?id=easyhttp) from Fab
2. Enable in Edit → Plugins → Search "EasyHTTP"
3. Restart Unreal Engine

### Create Test Environment

For development, use EasyHTTP's built-in test server:

**In your GameMode BeginPlay:**

1. Add **Start Local Test Server** node
2. Set **Port** to `8080`
3. Enable **Log To Screen**

Now you have a local API at `http://localhost:8080`.

### Configure Mock Responses

Set up the test server to return leaderboard data:

1. Add **Configure Test Server Response** node
2. Set **Path** to `/leaderboard`
3. Set **Response Body**:
```json
{
  "leaderboard": [
    {"rank": 1, "player": "ProGamer99", "score": 15000},
    {"rank": 2, "player": "SpeedRunner", "score": 12500},
    {"rank": 3, "player": "CasualPlayer", "score": 10000},
    {"rank": 4, "player": "Newbie123", "score": 5000},
    {"rank": 5, "player": "TestPlayer", "score": 2500}
  ]
}
```

## Part 2: Score Submission

### Create Score Manager Blueprint

1. Create new Blueprint Class → Actor Component
2. Name it `BP_ScoreManager`

### Add Variables

- `CurrentScore` (Integer) - Player's current score
- `PlayerName` (String) - Player's display name
- `APIEndpoint` (String) - Default: `http://localhost:8080`

### Submit Score Function

Create a function called `SubmitScore`:

**Inputs:**
- `Score` (Integer)
- `LevelID` (String)

**Implementation:**

```
1. Create JSON payload string:
   {"player": "PlayerName", "score": Score, "level": "LevelID"}

2. Add Easy HTTP Request node
   - Method: POST
   - URL: APIEndpoint + "/scores"
   
3. Add Make Options node
   - Content Type: application/json
   - Body: JSON payload

4. Connect On Success:
   - Parse response for new rank
   - Dispatch "Score Submitted" event
   - Pass rank to event

5. Connect On Failure:
   - Cache score locally
   - Dispatch "Score Cached" event
   - Attempt retry later
```

### Handle Submission Response

The server should return the player's new rank:

```json
{
  "success": true,
  "rank": 3,
  "message": "New personal best!"
}
```

Parse this and notify the UI.

## Part 3: Leaderboard Fetching

### Create Leaderboard Manager Blueprint

1. Create new Blueprint Class → Actor Component
2. Name it `BP_LeaderboardManager`

### Add Variables

- `CachedLeaderboard` (Array of Structs) - Cached data
- `LastFetchTime` (DateTime) - For cache invalidation
- `CacheDuration` (Float) - Default: 60.0 seconds
- `APIEndpoint` (String) - Default: `http://localhost:8080`

### Create Leaderboard Entry Struct

1. Create new Blueprint Struct: `S_LeaderboardEntry`
2. Add members:
   - `Rank` (Integer)
   - `PlayerName` (String)
   - `Score` (Integer)
   - `IsCurrentPlayer` (Boolean)

### Fetch Leaderboard Function

Create a function called `FetchLeaderboard`:

**Inputs:**
- `ForceRefresh` (Boolean) - Ignore cache

**Implementation:**

```
1. Check cache validity:
   - If (Now - LastFetchTime) < CacheDuration AND NOT ForceRefresh:
     - Return cached data
     - Exit

2. Add Easy HTTP Request node
   - Method: GET
   - URL: APIEndpoint + "/leaderboard?limit=10"

3. Connect On Success:
   - Parse JSON response
   - Convert to array of S_LeaderboardEntry
   - Store in CachedLeaderboard
   - Update LastFetchTime
   - Dispatch "Leaderboard Updated" event

4. Connect On Failure:
   - If cache exists:
     - Return cached data (stale but available)
   - Else:
     - Dispatch "Leaderboard Error" event
```

### Parse Leaderboard Response

Create a helper function `ParseLeaderboardJSON`:

```
1. Input: JSON String

2. Break JSON Object
3. Get "leaderboard" array

4. For Each entry:
   - Create S_LeaderboardEntry
   - Set Rank from "rank"
   - Set PlayerName from "player"
   - Set Score from "score"
   - Set IsCurrentPlayer by comparing to local player name
   - Add to output array

5. Return array of S_LeaderboardEntry
```

## Part 4: Leaderboard UI

### Create Leaderboard Widget

1. Create Widget Blueprint: `WBP_Leaderboard`
2. Design structure:

```
├── Vertical Box (Container)
│   ├── Text "LEADERBOARD" (Title)
│   ├── Scroll Box (Entries Container)
│   │   └── [Leaderboard entries go here]
│   ├── Horizontal Box (Player Rank)
│   │   ├── Text "Your Rank:"
│   │   └── Text PlayerRank
│   └── Button "Refresh"
```

### Create Leaderboard Entry Widget

1. Create Widget Blueprint: `WBP_LeaderboardEntry`
2. Design structure:

```
├── Horizontal Box
│   ├── Text Rank (Width: 50)
│   ├── Text PlayerName (Width: 200)
│   └── Text Score (Width: 100)
```

3. Add variables:
   - `EntryData` (S_LeaderboardEntry)

4. Add function `SetEntry`:
   - Input: S_LeaderboardEntry
   - Set Rank text
   - Set PlayerName text
   - Set Score text (formatted with commas)
   - If IsCurrentPlayer: Highlight row

### Style the Entries

**Normal entry:**
- Background: Dark gray
- Text: White

**Current player:**
- Background: Gold/Yellow
- Text: Black
- Slightly larger font

**Top 3:**
- Rank 1: Gold icon 🥇
- Rank 2: Silver icon 🥈
- Rank 3: Bronze icon 🥉

### Populate the Leaderboard

In `WBP_Leaderboard`:

Create function `PopulateLeaderboard`:

```
1. Input: Array of S_LeaderboardEntry

2. Clear Entries Container

3. For Each entry:
   - Create WBP_LeaderboardEntry widget
   - Call SetEntry with entry data
   - Add to Entries Container

4. Find current player entry
5. Set "Your Rank" text

6. If current player not in top 10:
   - Add separator
   - Add current player entry at bottom
```

### Add Refresh Button

```
On Button Clicked:
1. Show loading indicator
2. Call LeaderboardManager.FetchLeaderboard(ForceRefresh = true)
3. On Leaderboard Updated event:
   - Hide loading indicator
   - Call PopulateLeaderboard
```

## Part 5: Integrating with Gameplay

### Submit Score on Level Complete

In your Level Blueprint or GameMode:

```
Event: On Level Complete

1. Get player's final score
2. Get Score Manager component
3. Call SubmitScore(Score, LevelID)
4. Show "Submitting score..." indicator

On Score Submitted Event:
5. Hide indicator
6. Show rank notification: "You ranked #X!"
7. Open leaderboard widget
```

### Show Leaderboard from Menu

```
On "Leaderboard" Button Clicked:
1. Create WBP_Leaderboard widget
2. Add to viewport
3. Get Leaderboard Manager
4. Bind to "Leaderboard Updated" event
5. Call FetchLeaderboard(ForceRefresh = false)
```

### Auto-Refresh on Game Start

```
Event: Begin Play

1. Get Leaderboard Manager
2. Call FetchLeaderboard(ForceRefresh = true)
3. Cache is now warm for instant display
```

## Part 6: Production Backend

When you're ready for a real backend, switch from the test server:

### Update API Endpoint

Change `APIEndpoint` from `http://localhost:8080` to your production URL:
```
https://api.yourgame.com
```

### Add Authentication

Most production APIs require auth:

```
1. On game start, authenticate user
2. Receive JWT token
3. Store token securely
4. Use Make Options With Bearer Token for all requests
```

### Backend Endpoints (Reference)

Your backend should implement:

**GET /leaderboard**
```
Query params: ?limit=10&game_id=puzzle&period=weekly
Response: {"leaderboard": [{rank, player, score}, ...]}
```

**POST /scores**
```
Body: {"player_id": "123", "score": 5000, "level": "forest"}
Response: {"success": true, "rank": 5}
```

**GET /leaderboard/player/{player_id}**
```
Response: {"rank": 42, "score": 3500, "percentile": 85}
```

## Part 7: Advanced Features

### Weekly/Daily Leaderboards

Add time period filtering:

```
FetchLeaderboard function:
- Add Period parameter (All Time, Weekly, Daily)
- Append to URL: ?period=weekly
- Display period tabs in UI
```

### Friend Leaderboards

Show only friends:

```
FetchFriendLeaderboard function:
- GET /leaderboard/friends
- Requires authentication
- Backend filters by friend relationships
```

### Multiple Leaderboards

Support different game modes:

```
FetchLeaderboard function:
- Add GameMode parameter
- Append to URL: ?game_id=speedrun
- Different tabs in UI for each mode
```

### Ghost Data

Let players race against leaderboard ghosts:

```
GET /ghosts/{rank}
Response: {"ghost_data": [...], "player": "ProGamer99"}
```

Store ghost replay data when submitting scores.

## Part 8: Offline Support

Games should work offline. Handle disconnection:

### Queue Score Submissions

```
SubmitScore On Failure:
1. Create S_PendingScore struct
2. Add to PendingScores array
3. Save to local storage
4. Show "Score saved locally" message

On Network Reconnect:
1. Load PendingScores from storage
2. For each pending score:
   - Submit to server
   - Remove from queue on success
3. Clear local storage
```

### Cache Leaderboard Data

```
On Successful Fetch:
1. Save leaderboard to local JSON file
2. Include fetch timestamp

On Failed Fetch:
1. Load from local JSON file
2. Display with "Last updated: X minutes ago"
3. Show refresh button
```

## Error Handling Checklist

Handle these scenarios:

✅ **Network offline** - Use cached data, queue submissions
✅ **Server error (5xx)** - Retry with backoff
✅ **Invalid response** - Log error, show user message
✅ **Authentication expired** - Refresh token, retry
✅ **Rate limited (429)** - Wait and retry
✅ **Player not found** - Create new player record

## Performance Tips

**Minimize requests:**
- Cache leaderboard for 60+ seconds
- Don't fetch on every menu open

**Optimize payload:**
- Only request needed fields
- Limit to top 10-50 entries

**Background loading:**
- Fetch leaderboard during loading screens
- Pre-warm cache before player needs it

**Fire-and-forget scores:**
- Submit score async
- Don't block gameplay on response

## Complete Blueprint Reference

### Score Manager Variables
- `CurrentScore` (Integer)
- `PlayerName` (String)
- `APIEndpoint` (String)
- `PendingScores` (Array of S_PendingScore)

### Score Manager Functions
- `SubmitScore(Score, LevelID)`
- `RetryPendingScores()`

### Score Manager Events
- `OnScoreSubmitted(Rank)`
- `OnScoreCached()`
- `OnSubmissionFailed(ErrorMessage)`

### Leaderboard Manager Variables
- `CachedLeaderboard` (Array of S_LeaderboardEntry)
- `LastFetchTime` (DateTime)
- `CacheDuration` (Float)
- `APIEndpoint` (String)

### Leaderboard Manager Functions
- `FetchLeaderboard(ForceRefresh)`
- `GetCachedLeaderboard()`
- `ClearCache()`

### Leaderboard Manager Events
- `OnLeaderboardUpdated(Entries)`
- `OnLeaderboardError(ErrorMessage)`

## Conclusion

You now have a complete leaderboard system:

- ✅ Score submission with retry logic
- ✅ Leaderboard fetching with caching
- ✅ Beautiful UI with player highlighting
- ✅ Offline support with local queuing
- ✅ Production-ready error handling

All built in Blueprints. No C++ required.

The key to this system is [EasyHTTP](product.html?id=easyhttp), which handles all the HTTP complexity so you can focus on gameplay.

**[Get EasyHTTP on Fab →](product.html?id=easyhttp)**

---

*Want more multiplayer features? Check out our guides on [user authentication](ue5-user-authentication-blueprints.md) and [cloud save systems](ue5-cloud-save-system-blueprints.md).*
