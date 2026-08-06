# Canonical Business Entities

This document defines the official business entities used throughout QuestLock.

These entities are shared across:

- Backend
- Desktop
- Web
- Database
- Realtime Events

This document is the source of truth for business terminology.

If implementation conflicts with this document:

This document wins.

---

# Purpose

This document exists to:

- Standardize terminology
- Prevent duplicate entities
- Maintain platform consistency
- Define ownership boundaries
- Establish domain language

Every feature must use these entities.

Do not invent alternative names.

---

# Domain Philosophy

QuestLock is a Productivity Enforcement Platform.

Core Product Loop:

Mission
→ Focus Session
→ Completion
→ Reward
→ Gaming Credits
→ App Guard Access

All entities should support this workflow.

---

# Entity Ownership

Backend owns:

- Business State
- Validation
- Permissions

Desktop owns:

- Enforcement
- Monitoring

Web owns:

- Visualization
- Management

Entities are shared across all platforms.

---

# User

Purpose:

Represents an authenticated account.

Description:

A User owns all productivity data.

Relationships:

User
├── Devices
├── Missions
├── Focus Sessions
├── Rewards
├── Gaming Credits
├── Activity Logs
└── Audit Logs

Owned By:

Backend

---

# Device

Purpose:

Represents a registered desktop client.

Description:

A Device connects a user's computer to the QuestLock ecosystem.

Examples:

- Personal Laptop
- Gaming PC
- Workstation

Relationships:

Device
├── User
└── Audit Logs

Owned By:

Backend

---

# Mission

Purpose:

Represents productive work that must be completed.

Description:

A Mission defines a measurable productivity requirement.

Examples:

- Study Programming
- Write Documentation
- Complete Project Feature

Relationships:

Mission
├── User
├── Focus Sessions
└── Rewards

Owned By:

Backend

---

# Focus Session

Purpose:

Represents tracked productive work.

Description:

A Focus Session records time spent on productive activities.

Focus Sessions may be:

- Manual
- Auto-Tracked

Relationships:

Focus Session
├── User
└── Mission

Owned By:

Backend

Tracked By:

Desktop

---

# Reward

Purpose:

Represents earned productivity value.

Description:

Rewards are granted after successful mission completion.

Examples:

- XP
- Coins
- Bonus Credits

Relationships:

Reward
├── User
└── Mission

Owned By:

Backend

---

# Gaming Credit

Purpose:

Represents earned entertainment access.

Description:

Gaming Credits are consumed to unlock games and entertainment applications.

Gaming Credits are earned through productive work.

Relationships:

Gaming Credit
└── User

Owned By:

Backend

Consumed By:

App Guard

---

# Blocked Application

Purpose:

Represents an application controlled by App Guard.

Description:

A Blocked Application may be restricted until requirements are satisfied.

Examples:

- Valorant
- Dota 2
- Steam
- Epic Games Launcher

Relationships:

Blocked Application
├── User
└── Audit Logs

Owned By:

Backend

Enforced By:

Desktop

---

# Activity Log

Purpose:

Represents user-facing history.

Description:

Activity Logs provide visibility into productivity actions.

Examples:

- Mission Created
- Mission Completed
- Reward Granted
- Focus Session Started

Relationships:

Activity Log
└── User

Owned By:

Backend

Displayed By:

Web
Desktop

---

# Audit Log

Purpose:

Represents enforcement and security history.

Description:

Audit Logs record important system actions.

Examples:

- Application Blocked
- Credits Consumed
- Device Connected
- Emergency Unlock Used

Relationships:

Audit Log
├── User
├── Device
└── Blocked Application

Owned By:

Backend

---

# Entity Relationship Overview

User

├── Devices

├── Missions

│ └── Focus Sessions

│ └── Rewards

├── Gaming Credits

├── Activity Logs

└── Audit Logs

Blocked Applications

└── Audit Logs

---

# Approved Business Terminology

Always use:

Mission

Never use:

- Task
- Todo
- Work Item

---

Always use:

Focus Session

Never use:

- Timer
- Work Session
- Study Session

---

Always use:

Reward

Never use:

- Achievement
- Bonus Item
- Prize

---

Always use:

Gaming Credit

Never use:

- Play Time
- Entertainment Token
- Access Token

---

Always use:

Blocked Application

Never use:

- Blacklist Entry
- Game Rule
- Restriction Item

---

# Anti-Duplication Rules

Before creating a new entity:

Ask:

1. Does an equivalent entity already exist?
2. Can an existing entity be extended?
3. Is this merely a new status of an existing entity?
4. Is this only a view of existing data?

If YES:

Reuse the existing entity.

Do not create duplicates.

---

# AI Agent Checklist

Before introducing a new entity:

Review:

- database.md
- shared/types.md
- shared/events.md

Verify:

- Ownership
- Relationships
- Terminology

If unclear:

Ask for clarification.

Do not invent entities.

---

# Final Rule

Entities define the business language of QuestLock.

All platforms must use these entities consistently.

No duplicate entities are allowed.

No alternative terminology is allowed without approval.
