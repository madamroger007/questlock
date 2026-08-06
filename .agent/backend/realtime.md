# Realtime Synchronization Architecture

This document defines the realtime communication architecture used by QuestLock.

Realtime communication is used to synchronize state between:

- Backend
- Desktop Agent
- Web Dashboard

The backend is the source of truth.

Realtime exists to distribute state changes.

It must never become the primary source of truth.

If implementation conflicts with this document:

This document wins.

---

# Purpose

Realtime synchronization exists to:

- Synchronize mission updates
- Synchronize focus sessions
- Synchronize rewards
- Synchronize gaming credits
- Synchronize App Guard state
- Synchronize device status

Realtime should improve responsiveness.

Realtime should not replace database persistence.

---

# Source of Truth

Primary Source:

PostgreSQL (Supabase)

Realtime Layer:

Supabase Realtime

Local Cache:

SQLite (Desktop Only)

Rules:

- PostgreSQL is authoritative.
- Realtime mirrors PostgreSQL state.
- SQLite is cache only.
- Realtime events must never become permanent storage.

---

# Realtime Architecture

Flow:

Desktop

↓

Backend

↓

PostgreSQL

↓

Supabase Realtime

↓

Desktop Subscribers

↓

Web Subscribers

All state changes originate from backend-approved actions.

---

# Allowed Event Categories

Only the following event categories are allowed:

---

## Mission Events

Examples:

- mission.created
- mission.updated
- mission.completed

Purpose:

Synchronize mission lifecycle.

Consumers:

- Desktop
- Web

---

## Focus Session Events

Examples:

- focus.started
- focus.paused
- focus.completed

Purpose:

Synchronize productivity tracking.

Consumers:

- Desktop
- Web

---

## Reward Events

Examples:

- reward.granted

Purpose:

Synchronize reward distribution.

Consumers:

- Desktop
- Web

---

## Gaming Credit Events

Examples:

- gaming_credit.earned
- gaming_credit.spent

Purpose:

Synchronize entertainment access balance.

Consumers:

- Desktop
- Web

---

## App Guard Events

Examples:

- app_guard.locked
- app_guard.unlocked
- app_guard.blocked

Purpose:

Synchronize enforcement state.

Consumers:

- Desktop
- Web

---

## Device Events

Examples:

- device.connected
- device.disconnected

Purpose:

Synchronize device presence.

Consumers:

- Web

---

## Monitoring Events

Examples:

- monitoring.active_app_changed

Purpose:

Display current desktop activity.

Consumers:

- Web

---

# Event Ownership

Every event must have exactly one owner.

Examples:

mission.completed

Owner:

Backend

---

app_guard.blocked

Owner:

Desktop

---

device.connected

Owner:

Desktop

Multiple owners are not allowed.

---

# Event Contracts

All events must be documented in:

shared/events.md

Required:

- Event Name
- Owner
- Payload
- Consumers
- Business Purpose

Undocumented events are not allowed.

---

# Subscription Rules

Subscriptions must be documented.

Before creating a subscription:

Define:

- Event Source
- Event Consumer
- Payload
- Expected Frequency

Avoid broad subscriptions.

Subscribe only to required events.

---

# Channel Strategy

Preferred approach:

Feature-Oriented Channels

Examples:

missions

focus_sessions

rewards

gaming_credits

devices

app_guard

Avoid:

- Global Channels
- Catch-All Channels
- Excessive Broadcast Channels

---

# Desktop Synchronization

Desktop subscribes to:

- Mission Updates
- Reward Updates
- Gaming Credit Updates
- App Guard Updates

Desktop uses these updates to:

- Refresh Local Cache
- Update Enforcement State
- Update UI

---

# Web Synchronization

Web subscribes to:

- Mission Updates
- Focus Session Updates
- Reward Updates
- Device Updates
- Monitoring Updates
- App Guard Updates

Web uses realtime for visualization only.

Web must not perform enforcement.

---

# Offline Behavior

Desktop must continue operating when offline.

When connection is lost:

Desktop:

- Uses SQLite Cache
- Continues Enforcement
- Queues Local Events

When connection returns:

Desktop:

- Reconnects
- Synchronizes Changes
- Refreshes State

Realtime must support reconnection.

---

# Performance Rules

Realtime is expensive.

Avoid:

- High-frequency broadcasts
- Unnecessary subscriptions
- Duplicate events
- Polling replacement abuse

Prefer:

- Event-driven updates
- Minimal payloads
- Scoped subscriptions

---

# Security Rules

Never trust realtime payloads directly.

Sensitive actions must always be validated through backend rules.

Realtime updates:

- Inform
- Synchronize
- Display

Realtime updates do not grant permissions.

---

# Consistency Rules

After receiving realtime events:

Consumers must verify consistency with:

- PostgreSQL
- Backend State
- Shared Contracts

If inconsistency occurs:

Backend state wins.

Realtime state must never override authoritative state.

---

# AI Agent Checklist

Before implementing realtime features:

1. Read architecture.md
2. Read shared/events.md
3. Read shared/types.md
4. Identify event owner
5. Identify event consumers
6. Identify payload structure
7. Verify subscription necessity

If an event is not documented:

Do not implement it.

Update documentation first.

---

# Anti-Hallucination Rules

Do not invent:

- Realtime Channels
- Event Categories
- Event Names
- Payload Structures
- Subscription Patterns

Everything must be documented first.

If unclear:

Ask for clarification.

Do not guess.

---

# Final Rule

Realtime exists to synchronize state.

PostgreSQL remains the source of truth.

Desktop enforces.

Backend validates.

Web visualizes.

Maintain this separation at all times.
