# QuestLock AI Operating Instructions

This document is the entry point for all AI agents working on the QuestLock project.

Before performing any task, read and follow the instructions in this document.

This file defines:

- Project purpose
- Documentation hierarchy
- Development workflow
- Architecture boundaries
- AI operating rules

Documentation is the source of truth.

---

# Project Overview

Project Name:

QuestLock

Category:

Productivity Enforcement Platform

Core Purpose:

Help users complete productive work before accessing distracting or entertainment applications.

QuestLock actively enforces productivity rules.

It is not a passive tracking application.

---

# Product Philosophy

Productivity must be completed before entertainment is granted.

Users earn access to entertainment through productive work.

QuestLock exists to create accountability through enforcement, rewards, and controlled access.

Every implementation decision should reinforce this principle.

---

# Core Product Loop

All major systems must support the following loop:

Mission
→ Focus Session
→ Mission Completion
→ Reward Earned
→ Gaming Credits Granted
→ App Guard Validation
→ Entertainment Access
→ Credits Consumed
→ Mission Required Again

If a feature does not support this loop, reconsider the implementation.

---

# What QuestLock Is

QuestLock is:

- Productivity Enforcement Platform
- Focus Accountability System
- Reward-Based Access Control System
- Mission-Based Productivity System

---

# What QuestLock Is NOT

QuestLock is NOT:

- Todo Application
- Habit Tracker
- Project Management Tool
- Team Collaboration Tool
- Note Taking Application
- Calendar Application
- Generic Productivity Dashboard

These may exist as supporting features, but they are not the product.

---

# Documentation Hierarchy

The `.agent` directory is the single source of truth.

Never implement features without consulting documentation.

---

# Required Reading Order

Always start here:

1. README.md

Then read:

2. product.md
3. glossary.md
4. architecture.md
5. database.md

After that:

6. Relevant platform documentation
7. Relevant feature documentation
8. Prototype documentation
9. decisions.md

---

# Documentation Responsibilities

## product.md

Defines:

- Product vision
- Business goals
- Core product loop
- Product boundaries

---

## glossary.md

Defines:

- Canonical terminology
- Product vocabulary
- Naming standards

Always use terminology from this file.

Never create synonyms.

---

## architecture.md

Defines:

- System architecture
- Platform responsibilities
- Data flow
- Realtime flow
- Offline behavior

Never violate architecture boundaries.

---

## database.md

Defines:

- Database entities
- Relationships
- Constraints
- Ownership rules

Never create undocumented database structures.

---

## decisions.md

Defines:

- Architecture decisions
- Technical decisions
- Historical context

Check before making significant changes.

---

# Shared Frontend Architecture

QuestLock uses a single shared frontend codebase.

Technology:

- SvelteKit
- TypeScript
- TailwindCSS

Deployment Targets:

- Web Dashboard
- Tauri Desktop Application

Shared:

- Components
- Layouts
- Stores
- Types
- Services

Avoid creating duplicate UI implementations.

Prefer shared components whenever possible.

---

# Platform Responsibilities

## Desktop Layer

Responsibilities:

- Process Monitoring
- Active Window Tracking
- App Guard
- SQLite Cache
- Offline Enforcement
- System Tray

Desktop is the enforcement layer.

---

## Backend Layer

Responsibilities:

- Authentication
- Authorization
- Business Rules
- Rewards
- Storage
- Realtime Synchronization

Backend is the business layer.

---

## Web Layer

Responsibilities:

- Monitoring
- Analytics
- User Management
- Configuration
- Reporting

Web is the management layer.

---

# Development Workflow

For every task:

1. Read documentation
2. Understand requirements
3. Analyze architecture impact
4. Analyze database impact
5. Create implementation plan
6. Implement changes
7. Validate behavior
8. Update documentation if necessary

Never skip planning for medium or large features.

---

# Prototype Workflow

UI prototypes are implementation requirements.

Before implementing UI:

1. Read prototypes/mapping.md
2. Identify associated prototype
3. Identify layout structure
4. Identify component hierarchy
5. Identify interactions
6. Implement accordingly

Do not redesign screens without approval.

---

# Shared Contracts Rule

Before creating:

- Entity
- DTO
- Event
- Type
- Enum
- Status

Read:

- shared/entities.md
- shared/events.md
- shared/types.md
- shared/constants.md

Reuse existing definitions.

Do not create duplicates.

---

# Database Rule

PostgreSQL is the source of truth.

SQLite is cache only.

Business logic belongs to Backend.

Desktop enforces rules.

Web visualizes state.

Never move responsibilities across layers.

---

# Realtime Rule

Before creating:

- Events
- Channels
- Payloads

Consult:

- backend/realtime.md
- shared/events.md

Never create undocumented events.

Never create undocumented realtime channels.

---

# Security Rule

Always assume user data is private.

Always validate:

- Ownership
- Permissions
- Session access

Never trust client input.

Security takes priority over convenience.

---

# Performance Rule

QuestLock includes a continuously running desktop agent.

Priorities:

1. Stability
2. Reliability
3. Performance

Keep:

- CPU usage low
- Memory usage low
- Startup time low

Avoid unnecessary polling and heavy dependencies.

---

# AI Self Check

Before implementing anything, ask:

1. Does this feature already exist?
2. Does a similar entity already exist?
3. Does a similar event already exist?
4. Does a similar type already exist?
5. Does a similar constant already exist?
6. Does documentation already define this behavior?

If YES:

Reuse existing implementation.

Do not create duplicates.

---

# Anti-Hallucination Rule

Never invent:

- Requirements
- Features
- Business Rules
- Database Tables
- Events
- Statuses
- Routes
- Permissions
- APIs

If documentation does not provide enough information:

Ask for clarification.

Do not guess.

---

# Final Instruction

QuestLock is a Productivity Enforcement Platform.

Every implementation decision should improve:

- Productivity accountability
- Focus consistency
- Reward progression
- Entertainment access control

Documentation is the source of truth.

If documentation conflicts with assumptions:

Documentation wins.
