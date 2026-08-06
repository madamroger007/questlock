# Architecture Decision Records (ADR)

This document stores important architectural, technical, and product decisions for the QuestLock project.

Its purpose is to preserve consistency over time and prevent architecture drift.

All major decisions must be documented here.

Documentation in this file has priority over assumptions.

---

# Purpose

This file exists to:

- Preserve architectural consistency
- Explain why decisions were made
- Prevent conflicting implementations
- Help AI agents understand historical context
- Avoid repeatedly revisiting solved problems

---

# AI Agent Instructions

Before introducing:

- New Framework
- New Library
- New Database
- New State Management Solution
- New Realtime Strategy
- New Authentication System
- New Storage System
- New Architecture Pattern

Read this document first.

---

# Decision Rules

## Rule 1

Accepted decisions have priority.

Do not replace existing decisions without explicit approval.

---

## Rule 2

Do not introduce alternative solutions when an accepted solution already exists.

Reuse existing architecture whenever possible.

---

## Rule 3

Every major architectural change must be recorded as a new ADR entry.

---

## Rule 4

If documentation and implementation conflict:

Documentation wins until officially updated.

---

## Rule 5

When uncertain:

Ask for clarification.

Do not make architectural decisions independently.

---

# Accepted Decisions

---

## ADR-001

### Title

Single Repository Architecture

### Status

Accepted

### Decision

QuestLock uses a single repository.

### Reason

Benefits:

- Simpler maintenance
- Easier onboarding
- Shared types
- Shared components
- Shared documentation
- Better AI context

### Consequence

Do not split Web and Desktop into separate repositories.

---

## ADR-002

### Title

Shared Frontend Architecture

### Status

Accepted

### Decision

QuestLock uses a single SvelteKit frontend codebase.

The same frontend serves:

- Web Dashboard
- Tauri Desktop Application

### Reason

Benefits:

- Shared components
- Shared layouts
- Shared state
- Shared services
- Consistent UI

### Consequence

Avoid creating separate UI implementations for Web and Desktop unless technically required.

---

## ADR-003

### Title

Desktop Platform

### Status

Accepted

### Decision

Desktop application uses:

- Tauri v2
- Rust

### Reason

Benefits:

- Lightweight memory usage
- Small binary size
- Native performance
- Strong security model

### Consequence

Desktop-specific functionality must be implemented through Rust and Tauri APIs.

---

## ADR-004

### Title

Frontend Framework

### Status

Accepted

### Decision

Frontend uses:

- SvelteKit
- Svelte 5
- TypeScript
- TailwindCSS

### Reason

Benefits:

- Fast development
- Shared web and desktop UI
- Strong typing
- Excellent performance

### Consequence

Do not introduce React, Vue, Angular, or alternative frontend frameworks.

---

## ADR-005

### Title

Backend Platform

### Status

Accepted

### Decision

Backend services use Supabase.

Components:

- PostgreSQL
- Authentication
- Realtime
- Storage

### Reason

Benefits:

- Faster development
- Reduced infrastructure complexity
- Built-in security
- Built-in realtime support

### Consequence

Do not introduce additional backend frameworks unless approved.

---

## ADR-006

### Title

Database Ownership

### Status

Accepted

### Decision

PostgreSQL is the source of truth.

SQLite is local cache only.

### Reason

Benefits:

- Consistent data ownership
- Reliable synchronization
- Better offline support

### Consequence

Never treat SQLite as authoritative data storage.

---

## ADR-007

### Title

Business Logic Ownership

### Status

Accepted

### Decision

Business rules belong to Backend.

### Responsibilities

Backend:

- Rewards
- Missions
- Validation
- Permissions

Desktop:

- Enforcement

Web:

- Presentation

### Consequence

Do not duplicate business logic across platforms.

---

## ADR-008

### Title

Desktop Enforcement Model

### Status

Accepted

### Decision

App Guard is the only enforcement system.

### Responsibilities

- Process Monitoring
- Application Blocking
- Gaming Credit Validation
- Enforcement Rules

### Reason

Maintain a single source of enforcement.

### Consequence

Do not create parallel blocking systems.

---

## ADR-009

### Title

Product Philosophy

### Status

Accepted

### Decision

Productivity must be completed before entertainment is granted.

### Core Loop

Mission
→ Focus Session
→ Completion
→ Reward
→ Gaming Credits
→ App Guard
→ Entertainment Access

### Consequence

Features that do not support this loop should be reconsidered.

---

## ADR-010

### Title

Prototype-Driven UI Development

### Status

Accepted

### Decision

Prototype files are implementation requirements.

### Reason

Benefits:

- Consistent UI
- Predictable implementation
- Faster development

### Consequence

Do not redesign screens without approval.

---

# Future ADR Template

Use the following format when creating a new decision.

## ADR-XXX

### Title

Decision title

### Status

Proposed | Accepted | Deprecated

### Decision

Describe the decision.

### Reason

Explain why it was chosen.

### Consequence

Explain the impact and implementation requirements.

---

# Final Rule

Architecture consistency is more important than introducing new technologies.

Prefer existing solutions.

Prefer documented solutions.

Avoid architecture drift.

When documentation and assumptions conflict:

Documentation wins.
