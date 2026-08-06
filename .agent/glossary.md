# QuestLock Glossary

This document defines the canonical terminology used throughout the QuestLock project.

All platforms, documentation, database entities, API contracts, events, and UI labels must use the terminology defined here.

Never invent alternative names for existing concepts.

If a concept already exists in this glossary, reuse the existing terminology.

---

# Purpose

The purpose of this document is to:

- Maintain consistent naming
- Prevent duplicate concepts
- Prevent terminology drift
- Improve communication between Desktop, Backend, and Web

---

# Core Product Terms

## Mission

Definition:

A productive objective that must be completed by the user.

Examples:

- Study for 2 hours
- Complete project documentation
- Finish coding task

Mission is the canonical term.

Do NOT replace with:

- Task
- Todo
- Quest
- Assignment

Use "Mission" everywhere.

---

## Focus Session

Definition:

A tracked period of productive work associated with a Mission.

Examples:

- Timer-based work session
- Application-tracked coding session
- Writing session

Focus Session is the canonical term.

Do NOT replace with:

- Work Session
- Productivity Session
- Study Session

---

## Reward

Definition:

A benefit granted after productive work is completed.

Examples:

- XP
- Coins
- Gaming Credits

Reward is the parent concept.

---

## XP

Definition:

Experience points earned from completed missions.

Purpose:

Measure long-term progression.

XP cannot unlock applications directly.

---

## Coins

Definition:

Virtual currency earned through productivity.

Purpose:

Exchange value inside the reward system.

---

## Gaming Credits

Definition:

Consumable credits used to unlock entertainment applications.

Gaming Credits are consumed by App Guard.

Gaming Credits are the only reward that can unlock blocked applications.

Do NOT rename as:

- Tokens
- Credits
- Play Time
- Reward Points

Use Gaming Credits.

---

# Enforcement Terms

## App Guard

Definition:

The enforcement system responsible for application blocking.

Responsibilities:

- Detect applications
- Validate access
- Consume Gaming Credits
- Block applications

App Guard is the canonical name.

Do NOT replace with:

- Application Guard
- Process Guard
- Blocker
- Restriction Engine

---

## Blocked Application

Definition:

An application that requires authorization before use.

Examples:

- Steam
- Valorant
- League of Legends
- YouTube Desktop

---

## Allowed Application

Definition:

An application currently permitted to run.

---

# Tracking Terms

## Active Window

Definition:

The application window currently focused by the operating system.

---

## Running Process

Definition:

A currently executing process detected by the Desktop Agent.

---

## Focus Time

Definition:

Time spent performing productive activities.

---

## Entertainment Time

Definition:

Time spent using blocked or entertainment applications.

---

# User Terms

## Device

Definition:

A registered desktop installation connected to a user account.

---

## Activity Log

Definition:

Historical record of user actions and system events.

Examples:

- Mission Started
- Mission Completed
- Game Blocked
- Reward Granted

---

# Platform Terms

## Desktop Agent

Definition:

The local Tauri application responsible for enforcement.

Responsibilities:

- Monitoring
- Blocking
- Offline support

---

## Web Dashboard

Definition:

The web application used for management and analytics.

Responsibilities:

- Monitoring
- Reporting
- Configuration

---

## Backend

Definition:

Supabase services responsible for business logic, storage, and synchronization.

---

# Naming Rules

Before creating:

- Entity names
- DTO names
- Event names
- UI labels
- Database tables

Check this glossary first.

If a term already exists:

Reuse it.

Do not create synonyms.

Terminology consistency is mandatory.