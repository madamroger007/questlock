# QuestLock System Architecture

This document defines the architecture of the entire QuestLock platform.

It is the primary architectural source of truth.

All implementations must follow the boundaries and responsibilities defined here.

Never move responsibilities between layers without updating this document.

If implementation conflicts with architecture:

Architecture wins.

---

# Architecture Overview

QuestLock is a Productivity Enforcement Platform.

The system consists of four primary layers:

1. Frontend Layer
2. Desktop Enforcement Layer
3. Backend Business Layer
4. Database Layer

Together these layers support the Core Product Loop:

Mission
→ Focus Session
→ Completion
→ Reward
→ Gaming Credits
→ App Guard Validation
→ Entertainment Access

Every major system must support this loop.

---

# High Level Architecture

```text
┌─────────────────────────────┐
│         SvelteKit UI        │
│                             │
│  Web Dashboard + Desktop UI │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│         Supabase            │
│                             │
│ Auth                        │
│ PostgreSQL                  │
│ Realtime                    │
│ Storage                     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Tauri Desktop Agent    │
│                             │
│ App Guard                   │
│ Process Monitor             │
│ Active Window Tracking      │
│ SQLite Cache                │
└─────────────────────────────┘
```

---

# Frontend Architecture

QuestLock uses a single frontend codebase.

Technology:

- SvelteKit
- Svelte 5
- TypeScript
- TailwindCSS

Deployment Targets:

- Web Browser
- Tauri Desktop

The frontend is shared.

Avoid duplicate implementations.

---

# Frontend Responsibilities

Frontend owns:

- User Interface
- User Interactions
- State Management
- Data Presentation
- Analytics Visualization
- Monitoring Views

Frontend does NOT own:

- Business Rules
- Validation Logic
- Permission Decisions
- Reward Calculations
- Enforcement Logic

Those belong to Backend or Desktop.

---

# Desktop Layer

Desktop is the Enforcement Layer.

Technology:

- Tauri v2
- Rust
- SQLite

Desktop exists to enforce productivity rules even when offline.

---

# Desktop Responsibilities

Desktop owns:

- Process Monitoring
- Active Window Tracking
- App Guard
- Process Termination
- Local Cache
- Offline Enforcement
- System Tray
- Local Notifications

Desktop is the only layer allowed to interact directly with the operating system.

---

# Desktop Must NOT Own

Desktop must NOT own:

- User Authentication
- Reward Calculation
- Mission Validation
- User Permissions
- Account Management

These belong to Backend.

---

# Backend Layer

Backend is the Business Layer.

Technology:

- Supabase
- PostgreSQL
- Realtime
- Storage

Backend owns business rules and application state.

---

# Backend Responsibilities

Backend owns:

- Authentication
- Authorization
- User Management
- Mission Validation
- Reward Calculation
- Gaming Credit Calculation
- Storage
- Realtime Events
- Analytics Aggregation

Backend is the source of business truth.

---

# Backend Must NOT Own

Backend must NOT own:

- Process Detection
- Active Window Monitoring
- Application Blocking
- Process Termination

These belong to Desktop.

---

# Database Layer

Primary Database:

PostgreSQL

Secondary Database:

SQLite

---

# PostgreSQL Ownership

PostgreSQL is the source of truth.

Stores:

- Users
- Missions
- Rewards
- Focus Sessions
- Gaming Credits
- Devices
- Logs

All authoritative business data belongs here.

---

# SQLite Ownership

SQLite is cache only.

Stores:

- Cached Missions
- Cached Rules
- Cached Credits
- Device State

Purpose:

- Offline Operation
- Faster Local Reads
- Sync Recovery

SQLite must never become the source of truth.

---

# Core Data Flow

Mission Flow:

User
→ Create Mission
→ Backend Validation
→ PostgreSQL Storage
→ Realtime Event
→ Desktop Sync
→ Local Cache Update

---

Focus Session Flow

User
→ Start Focus Session
→ Desktop Monitoring
→ Session Tracking
→ Backend Synchronization
→ Reward Calculation
→ Credit Update

---

Gaming Credit Flow

Mission Completion
→ Backend Validation
→ Reward Calculation
→ Credit Allocation
→ Realtime Event
→ Desktop Sync
→ App Guard Update

---

# App Guard Architecture

App Guard is the core enforcement system.

Purpose:

Control access to entertainment applications.

---

# App Guard Responsibilities

App Guard:

- Detects Applications
- Monitors Processes
- Validates Access Rights
- Checks Gaming Credits
- Allows Access
- Blocks Access
- Records Events

Only Desktop may execute enforcement actions.

---

# Application Blocking Flow

User Opens Game
↓
Process Monitor Detects Process
↓
App Guard Evaluates Rules
↓
Credit Validation
↓
Allowed OR Blocked
↓
Event Logged
↓
Realtime Synchronization

---

# Realtime Architecture

Realtime synchronization is handled through Supabase Realtime.

Purpose:

Keep Web, Desktop, and Backend synchronized.

---

# Realtime Event Categories

Mission Events

Examples:

- MissionCreated
- MissionUpdated
- MissionCompleted

---

Reward Events

Examples:

- RewardGranted
- CreditAdded
- CreditConsumed

---

System Events

Examples:

- DeviceConnected
- DeviceDisconnected
- AppBlocked

---

All events must be documented in:

shared/events.md

backend/realtime.md

---

# Offline Architecture

Desktop must continue functioning without internet access.

Requirements:

- Cached Rules
- Cached Credits
- Cached Missions
- Local Enforcement

Desktop should synchronize automatically when connectivity returns.

---

# Security Boundaries

Authentication:

Backend

Authorization:

Backend

Enforcement:

Desktop

Presentation:

Frontend

Storage:

Backend

Cache:

Desktop

Never violate these boundaries.

---

# Shared Contracts

All layers must reuse shared definitions.

Before creating:

- Entity
- DTO
- Enum
- Event
- Status
- Type

Check:

- shared/entities.md
- shared/events.md
- shared/types.md
- shared/constants.md

Do not create duplicates.

---

# Ownership Matrix

| Responsibility      | Frontend | Backend | Desktop |
| ------------------- | -------- | ------- | ------- |
| UI                  | ✅       | ❌      | ❌      |
| Monitoring Views    | ✅       | ❌      | ❌      |
| Analytics Views     | ✅       | ❌      | ❌      |
| Authentication      | ❌       | ✅      | ❌      |
| Authorization       | ❌       | ✅      | ❌      |
| Business Rules      | ❌       | ✅      | ❌      |
| Reward Logic        | ❌       | ✅      | ❌      |
| Realtime            | ❌       | ✅      | ❌      |
| Process Monitoring  | ❌       | ❌      | ✅      |
| App Guard           | ❌       | ❌      | ✅      |
| Process Termination | ❌       | ❌      | ✅      |
| Offline Enforcement | ❌       | ❌      | ✅      |
| SQLite Cache        | ❌       | ❌      | ✅      |

---

# Architecture Rules

Before implementing a feature:

Identify:

1. Feature Owner
2. Data Owner
3. Event Flow
4. Sync Requirements
5. Offline Requirements
6. Security Impact

Never create duplicate systems.

Never duplicate business logic.

Never duplicate entities.

Never duplicate events.

Always reuse shared contracts.

Architecture consistency is more important than implementation speed.
