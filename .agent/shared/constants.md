# Shared Constants

This document defines system-wide constants, enums, statuses, categories, and fixed values.

All platforms must use these constants.

Do not create duplicate constants.

Do not hardcode values that are already defined here.

---

# Mission Status

Mission lifecycle:

```text
DRAFT
ACTIVE
IN_PROGRESS
PENDING_VERIFICATION
COMPLETED
FAILED
CANCELLED
```

Rules:

- All mission state transitions must use these values.
- Do not invent additional statuses without documentation updates.

---

# Focus Session Status

```text
CREATED
STARTED
PAUSED
COMPLETED
FAILED
```

Used by:

- Desktop
- Backend
- Analytics

---

# Device Status

```text
ONLINE
OFFLINE
SYNCING
ERROR
```

Used by:

- Monitoring
- Device Management
- Realtime

---

# App Guard Status

```text
LOCKED
UNLOCKED
```

Purpose:

Determine whether blocked applications may be launched.

---

# Application Categories

```text
GAME
SOCIAL_MEDIA
VIDEO_STREAMING
ENTERTAINMENT
PRODUCTIVITY
DEVELOPMENT
CUSTOM
```

Used by:

- App Guard
- Analytics
- Monitoring

---

# Reward Types

```text
XP
COINS
GAMING_CREDITS
```

Do not create additional reward types without approval.

---

# Verification Types

```text
AUTO_TRACKING
MANUAL_PROOF
```

Mission verification must use these values.

---

# Notification Types

```text
MISSION_COMPLETED
MISSION_FAILED
REWARD_GRANTED
GAME_BLOCKED
GAME_ALLOWED
SYSTEM_WARNING
```

---

# Event Categories

```text
MISSION
FOCUS_SESSION
REWARD
APP_GUARD
DEVICE
SYSTEM
```

---

# Supported Game Sources

```text
STEAM
EPIC_GAMES
RIOT_GAMES
MANUAL
```

Used by:

- App Guard
- Game Discovery
- Analytics

---

# Theme Options

```text
SYSTEM
LIGHT
DARK
```

---

# Language Options

```text
ENGLISH
INDONESIAN
```

---

# Sync Status

```text
PENDING
SYNCED
FAILED
```

Used by:

- SQLite Cache
- Offline Queue
- Realtime Recovery

---

# Default System Limits

These values may be adjusted later.

```text
MAX_PROOF_IMAGES_PER_MISSION = 5

MAX_ACTIVE_MISSIONS = 20

MAX_DEVICE_PER_USER = 10

PROCESS_SCAN_INTERVAL_SECONDS = 5

ACTIVE_WINDOW_SCAN_INTERVAL_SECONDS = 1

REALTIME_RECONNECT_SECONDS = 10
```

---

# AI Agent Rules

Before creating:

- Enum
- Constant
- Status
- Category
- Type

Check this file.

If a similar constant already exists:

Reuse it.

Do not create duplicate status values.

Do not hardcode values already documented here.

This file is the canonical source of truth for shared constants.