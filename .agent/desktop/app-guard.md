# App Guard Specification

This document defines how App Guard works within QuestLock.

App Guard is the core productivity enforcement system.

Its purpose is to prevent access to entertainment applications until productivity requirements have been satisfied.

If implementation conflicts with this document:

This document wins.

---

# Purpose

App Guard exists to enforce the QuestLock productivity model.

Core Product Loop:

Mission
→ Focus Session
→ Completion
→ Reward
→ Gaming Credits
→ Entertainment Access

App Guard controls the final step.

Without App Guard, QuestLock loses its enforcement capability.

---

# Responsibilities

App Guard owns:

- Application Blocking
- Game Blocking
- Access Validation
- Gaming Credit Consumption
- Entertainment Access Control
- Enforcement Logging
- Offline Enforcement

App Guard is the only system allowed to block applications.

No other component may perform enforcement actions.

---

# App Guard Philosophy

QuestLock does not prevent entertainment permanently.

QuestLock requires productive work before entertainment access.

Users earn access.

Users do not receive unrestricted access.

---

# Supported Application Sources

Applications may be registered through:

## Steam Library Detection

Automatically discover installed Steam games.

Examples:

- Dota 2
- Counter Strike 2
- Elden Ring

---

## Epic Games Detection

Automatically discover Epic Games titles.

Examples:

- Fortnite
- Rocket League

---

## Riot Games Detection

Automatically discover Riot applications.

Examples:

- Valorant
- League of Legends

---

## Active Process Detection

Users may select currently running applications.

Examples:

- Indie Games
- Custom Launchers
- Non-standard Installations

---

## Manual Registration

Users may manually register executable files.

Examples:

- Custom Applications
- Portable Games
- Standalone Executables

---

# Application Categories

App Guard primarily targets:

- Games
- Entertainment Applications

Examples:

Allowed Categories:

- Development Tools
- Productivity Software
- Education Software

Restricted Categories:

- Games
- Entertainment

Application classification rules must remain consistent across platforms.

---

# Enforcement Flow

User Launches Application

↓

Process Monitor Detects Process

↓

App Guard Receives Process Information

↓

Application Match Found

↓

Access Validation

↓

Allowed OR Blocked

↓

Event Generated

↓

Audit Log Recorded

---

# Access Validation

Before allowing execution:

App Guard must evaluate:

1. User State
2. Mission State
3. Gaming Credits
4. Enforcement Rules
5. Device State

All conditions must pass before access is granted.

---

# Mission Validation

Access may depend on mission progress.

Examples:

Mission Not Completed

↓

No Reward

↓

No Gaming Credits

↓

Access Denied

---

Mission Completed

↓

Reward Granted

↓

Gaming Credits Earned

↓

Access Allowed

---

Mission validation logic belongs to Backend.

App Guard only consumes validated state.

---

# Gaming Credit Validation

Gaming Credits represent earned entertainment access.

Examples:

100 Credits

↓

30 Minutes Gaming Access

Credits may be:

- Earned
- Consumed
- Expired

Credit calculation belongs to Backend.

Credit enforcement belongs to App Guard.

---

# Unlock Rules

Applications may be launched when:

- Required Missions Completed
- Required Credits Available
- User Account Valid
- Enforcement Rules Satisfied

All conditions must be met.

---

# Blocking Rules

Applications must be blocked when:

- Credits Insufficient
- Mission Requirements Unmet
- Application Is Restricted
- Enforcement Policy Active

Blocking must occur immediately.

---

# Enforcement Actions

App Guard may perform:

## Prevent Launch

Detect application startup.

Terminate before gameplay begins.

---

## Force Termination

Application already running.

Terminate process.

---

## Warning Notification

Display local notification.

Example:

"Access Denied. Complete your missions to unlock gaming time."

---

## Audit Logging

Record enforcement event.

Example:

Valorant.exe blocked
Reason: Insufficient Gaming Credits

---

# Offline Enforcement

App Guard must continue functioning without internet access.

Requirements:

- Cached Rules
- Cached Credits
- Cached Mission State

Stored in:

SQLite

---

# Synchronization Behavior

Backend remains the source of truth.

Desktop synchronizes:

- Mission Updates
- Credit Updates
- Rule Updates

If synchronization fails:

App Guard continues using cached state.

---

# Emergency Unlock

Purpose:

Provide controlled access in exceptional situations.

Rules:

- Must be explicitly enabled
- Must be logged
- Must be auditable
- May apply penalties

Examples:

- Credit deduction
- XP deduction
- Temporary restriction

Emergency Unlock must never bypass audit logging.

---

# Strict Mode

Purpose:

Reduce user bypass attempts.

When enabled:

- App Guard becomes more aggressive
- Additional protection may apply
- Enforcement actions are logged

Strict Mode behavior must be documented.

---

# Event Generation

App Guard may generate events:

- ApplicationDetected
- ApplicationBlocked
- ApplicationAllowed
- CreditConsumed
- EmergencyUnlockUsed

All events must be documented in:

shared/events.md

Do not create undocumented events.

---

# Logging Requirements

Every enforcement action must be logged.

Examples:

- Blocked Application
- Allowed Application
- Credit Consumption
- Emergency Unlock

Logs support:

- Auditing
- Analytics
- User History

---

# Security Rules

App Guard is security-sensitive.

Requirements:

- Validate all cached state
- Protect local rules
- Protect credit state
- Prevent unauthorized modifications

Never trust client-side modifications.

---

# Performance Requirements

App Guard runs continuously.

Requirements:

CPU Usage:

- Low

Memory Usage:

- Low

Startup Time:

- Fast

Enforcement must not noticeably impact system performance.

---

# AI Agent Checklist

Before modifying App Guard:

Ask:

1. Does this affect enforcement?
2. Does this affect Gaming Credits?
3. Does this affect Mission requirements?
4. Does this affect Offline Mode?
5. Does this affect Process Monitoring?
6. Does this affect Security?
7. Does this affect Audit Logs?

If YES:

Review:

- architecture.md
- desktop/process-monitor.md
- database.md
- shared/events.md

Before implementation.

---

# Anti-Hallucination Rules

Do not invent:

- Unlock systems
- Credit systems
- Blocking rules
- Enforcement mechanisms
- Reward calculations

If behavior is not documented:

Ask for clarification.

Do not guess.

---

# Final Rule

App Guard is the heart of QuestLock.

Backend decides who has earned access.

App Guard enforces that decision.

Entertainment access must always be tied to productive work.
