# Desktop Layer Architecture

This document defines the architecture, responsibilities, and constraints of the QuestLock Desktop Layer.

The Desktop Layer is the enforcement engine of the platform.

Its purpose is to enforce productivity rules on the user's device.

If implementation conflicts with this document:

This document wins.

---

# Purpose

The Desktop Layer exists to:

- Monitor running applications
- Track user activity
- Enforce App Guard restrictions
- Operate while offline
- Synchronize with backend services
- Maintain local enforcement state

The Desktop Layer is responsible for executing productivity enforcement.

It is not responsible for defining business rules.

---

# Technology Stack

Desktop Application:

- Tauri v2
- Rust
- SQLite

Frontend:

- Shared SvelteKit UI

Operating System Integration:

- Rust
- Tauri Commands
- Native APIs

---

# Desktop Philosophy

The Desktop Layer is an enforcement layer.

The Backend decides.

The Desktop enforces.

The Web visualizes.

This responsibility separation must never be violated.

---

# Desktop Responsibilities

The Desktop Layer owns:

## Process Monitoring

Responsibilities:

- Running process detection
- Process tracking
- Process classification
- Application identification

Related Documentation:

desktop/process-monitor.md

---

## Active Window Tracking

Responsibilities:

- Foreground application detection
- Focus verification
- Session validation

Related Documentation:

desktop/process-monitor.md

---

## App Guard

Responsibilities:

- Application restriction
- Entertainment access control
- Rule enforcement
- Process termination

Related Documentation:

desktop/app-guard.md

---

## Local SQLite Cache

Responsibilities:

- Offline support
- Local state caching
- Sync recovery

SQLite is a cache layer only.

Never use SQLite as the source of truth.

---

## Offline Enforcement

Responsibilities:

- Continue enforcement while offline
- Cache required rules
- Cache required credits
- Cache mission state

The user must not bypass enforcement simply by disconnecting from the internet.

---

## System Tray

Responsibilities:

- Background operation
- Quick controls
- Status visibility

Desktop should continue running even when the main window is closed.

---

## Local Notifications

Responsibilities:

- Enforcement notifications
- Mission notifications
- Warning messages
- Status updates

Notifications are informational only.

Business decisions remain backend-owned.

---

# Desktop Does NOT Own

The Desktop Layer must never own:

## Authentication Logic

Owned By:

Backend

Desktop consumes authenticated sessions.

Desktop does not define authentication behavior.

---

## Authorization Rules

Owned By:

Backend

Desktop enforces validated permissions.

Desktop does not create permission rules.

---

## Reward Calculation

Owned By:

Backend

Desktop receives reward updates.

Desktop does not calculate rewards.

---

## Gaming Credit Calculation

Owned By:

Backend

Desktop consumes Gaming Credit state.

Desktop does not calculate Gaming Credits.

---

## Mission Validation

Owned By:

Backend

Desktop tracks activity.

Backend validates completion.

---

## Business Rules

Owned By:

Backend

Desktop executes decisions.

Backend defines decisions.

---

# Desktop Lifecycle

Application Startup

↓

Load Local SQLite Cache

↓

Restore Cached Rules

↓

Authenticate Session

↓

Synchronize Backend State

↓

Start Background Services

↓

Begin Enforcement

---

# Background Services

The following services may run continuously:

## Process Monitor

Purpose:

Detect running applications.

---

## Active Window Monitor

Purpose:

Track current foreground application.

---

## App Guard

Purpose:

Apply enforcement rules.

---

## Sync Service

Purpose:

Synchronize with Supabase.

---

## Notification Service

Purpose:

Display local notifications.

---

All background services must be lightweight.

---

# Offline Architecture

Desktop must continue functioning when:

- Internet is unavailable
- Supabase is unavailable
- Realtime is unavailable

Offline Requirements:

- Cached Missions
- Cached Gaming Credits
- Cached App Guard Rules
- Cached User State

Desktop should automatically resynchronize when connectivity returns.

---

# Synchronization Rules

Backend remains the source of truth.

Desktop may cache data.

Desktop may never overwrite authoritative backend state without validation.

Synchronization responsibilities:

- Pull latest state
- Apply updates
- Recover missed events
- Resolve cache inconsistencies

---

# Performance Requirements

QuestLock runs continuously in the background.

Performance is critical.

Target Requirements:

CPU Usage:

- Idle: Minimal
- Monitoring: Lightweight

Memory Usage:

- Low memory footprint
- Avoid unnecessary allocations

Startup:

- Fast startup time
- Fast tray initialization

Storage:

- Minimal SQLite usage
- Efficient caching

---

# Security Requirements

Desktop interacts directly with the operating system.

Security-sensitive responsibilities include:

- Process Detection
- Process Termination
- App Guard Enforcement
- Local Storage

Requirements:

- Validate incoming data
- Validate ownership
- Prevent unauthorized access
- Protect local state

Desktop must never trust unvalidated client data.

---

# Shared Frontend Rule

Desktop uses the same SvelteKit frontend as the Web Dashboard.

Reuse:

- Components
- Layouts
- Stores
- Types
- Services

Avoid duplicate UI implementations.

Create platform-specific UI only when required by Tauri capabilities.

---

# AI Agent Checklist

Before implementing Desktop features:

Identify:

1. Does this require OS access?
2. Does this require Rust?
3. Does this require App Guard?
4. Does this require Process Monitoring?
5. Does this require SQLite?
6. Does this affect offline operation?
7. Does this affect synchronization?

If YES:

Review:

- architecture.md
- desktop/app-guard.md
- desktop/process-monitor.md

Before implementation.

---

# Anti-Hallucination Rules

Do not invent:

- Enforcement systems
- Monitoring systems
- Local databases
- Synchronization mechanisms
- Background services

If behavior is not documented:

Ask for clarification.

Do not guess.

---

# Final Rule

Desktop is the Enforcement Layer.

Backend defines rules.

Desktop executes rules.

Web displays results.

Maintain this separation at all times.
