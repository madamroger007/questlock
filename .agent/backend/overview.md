# Backend Architecture Specification

This document defines the responsibilities, boundaries, and architecture of the QuestLock Backend Layer.

The Backend Layer is the business authority of the platform.

All productivity rules, validations, permissions, and state transitions originate here.

If implementation conflicts with this document:

This document wins.

---

# Purpose

The Backend exists to:

- Manage business logic
- Validate user actions
- Manage authentication
- Manage permissions
- Persist data
- Generate rewards
- Calculate Gaming Credits
- Publish realtime updates
- Coordinate synchronization

The Backend is the source of business truth.

---

# Backend Philosophy

QuestLock follows a strict separation of responsibilities.

Backend decides.

Desktop enforces.

Web visualizes.

Business rules must never be duplicated outside the Backend Layer.

---

# Technology Stack

Backend Services:

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Realtime
- Supabase Storage

Database:

- PostgreSQL (Source of Truth)

Realtime:

- Supabase Realtime Channels

Storage:

- Supabase Storage Buckets

---

# Backend Responsibilities

The Backend owns:

## Authentication

Responsibilities:

- Registration
- Login
- Session Validation
- OAuth Integration
- User Identity Management

Related Documentation:

backend/auth.md

---

## Authorization

Responsibilities:

- Ownership Validation
- Access Control
- Permission Verification
- Resource Protection

Related Documentation:

backend/permissions.md

---

## Mission Management

Responsibilities:

- Mission Creation
- Mission Updates
- Mission Completion
- Mission State Validation

Mission rules are defined here.

---

## Focus Session Validation

Responsibilities:

- Session Validation
- Duration Verification
- Completion Evaluation

Desktop tracks activity.

Backend validates completion.

---

## Rewards

Responsibilities:

- XP Calculation
- Coin Calculation
- Reward Generation
- Reward Distribution

Reward calculations belong exclusively to Backend.

---

## Gaming Credits

Responsibilities:

- Credit Generation
- Credit Consumption Rules
- Credit Expiration Rules
- Credit Balance Management

Gaming Credits are owned by Backend.

Desktop only consumes validated credit state.

---

## Realtime

Responsibilities:

- Event Publishing
- State Synchronization
- Cross-Platform Updates

Related Documentation:

backend/realtime.md

---

## Storage

Responsibilities:

- Proof Submission Files
- User Assets
- Verification Attachments

Storage access must follow ownership rules.

---

## Analytics Data Generation

Responsibilities:

- Aggregate Metrics
- Productivity Statistics
- Historical Analysis

Analytics calculations originate from backend-owned data.

---

# Backend Does NOT Own

The Backend must never own:

## UI Logic

Owned By:

Web / Desktop UI

Backend provides data only.

---

## Desktop Enforcement

Owned By:

Desktop Layer

Examples:

- Process Monitoring
- App Guard
- Active Window Detection

Backend defines rules.

Desktop enforces them.

---

## Local Device Monitoring

Owned By:

Desktop Layer

Backend never directly monitors user processes.

---

# Core Product Loop

The entire system revolves around this workflow:

Mission

↓

Focus Session

↓

Mission Completion

↓

Reward

↓

Gaming Credits

↓

App Guard Access

↓

Entertainment Access

Every business feature must support this loop.

Features unrelated to this workflow should be questioned before implementation.

---

# State Ownership

Backend owns all authoritative state.

Examples:

- Missions
- Rewards
- Gaming Credits
- Devices
- User Settings
- Activity Logs

Desktop may cache state.

Web may display state.

Neither owns state.

---

# State Transitions

All important state transitions must occur in Backend.

Examples:

Mission:

Draft
→ Active
→ Completed

Reward:

Pending
→ Granted

Gaming Credits:

Earned
→ Available
→ Consumed
→ Expired

State transitions must never be performed directly by the UI.

---

# Validation Rules

All business validation belongs to Backend.

Examples:

- Mission Completion Validation
- Reward Eligibility
- Credit Availability
- Permission Checks
- Ownership Validation

Never trust client-side validation.

---

# Event Architecture

Backend is the primary event publisher.

Examples:

MissionCompleted

RewardGranted

GamingCreditsEarned

GamingCreditsConsumed

DeviceConnected

DeviceDisconnected

All events must be documented in:

shared/events.md

backend/realtime.md

Undocumented events are not allowed.

---

# Synchronization Architecture

Backend is responsible for:

- State Consistency
- Conflict Resolution
- Realtime Broadcasting

Desktop and Web subscribe to backend state.

Backend never trusts client state without validation.

---

# Permissions

Every protected resource must verify:

1. Authentication
2. Ownership
3. Authorization

Protected Resources:

- Missions
- Focus Sessions
- Rewards
- Gaming Credits
- Devices
- Activity Logs

Permission rules must be documented.

---

# Storage Rules

All uploaded files must:

- Have an owner
- Be access-controlled
- Follow storage policies

Examples:

- Mission Proof Images
- Verification Attachments

Storage access must be validated.

---

# Database Responsibilities

Backend owns:

- Schema Management
- Relationships
- Constraints
- RLS Policies
- Data Integrity

Before changing database structures:

Read:

- database.md
- shared/entities.md

---

# Realtime Responsibilities

Backend publishes:

- Mission Updates
- Reward Updates
- Credit Updates
- Device Updates

Realtime events must be:

- Documented
- Versioned
- Consistent

---

# Security Principles

Backend is the primary security boundary.

Requirements:

- Validate all input
- Validate ownership
- Validate permissions
- Protect sensitive data
- Enforce RLS

Never trust:

- Client State
- Client Validation
- Client Ownership Claims

---

# AI Agent Checklist

Before implementing Backend features:

Identify:

1. Which entity is affected?
2. Which permissions are required?
3. Which events are emitted?
4. Which state transitions occur?
5. Which database changes are required?
6. Which realtime channels are affected?
7. Which storage rules apply?

Review:

- architecture.md
- database.md
- shared/entities.md
- shared/events.md
- backend/auth.md
- backend/permissions.md

Before implementation.

---

# Anti-Hallucination Rules

Do not invent:

- Business Rules
- Reward Systems
- Credit Calculations
- Permission Models
- Event Structures
- Database Entities

If requirements are unclear:

Ask for clarification.

Do not guess.

---

# Final Rule

Backend is the business authority of QuestLock.

Backend defines:

- Rules
- Permissions
- Rewards
- Credits
- State Transitions

Desktop enforces those decisions.

Web displays those decisions.

Maintain this separation at all times.
