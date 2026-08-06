# QuestLock Database Specification

This document defines the canonical database architecture for QuestLock.

It is the single source of truth for:

- Tables
- Columns
- Relationships
- Constraints
- Indexes
- Ownership
- Permissions
- RLS Policies

Never create or modify database structures without consulting this document.

If implementation conflicts with this document:

This document wins.

---

# Database Philosophy

QuestLock uses two databases:

## PostgreSQL

Purpose:

Primary database.

Source of truth.

Stores all authoritative business data.

Technology:

Supabase PostgreSQL

---

## SQLite

Purpose:

Local desktop cache.

Stores temporary synchronized data for:

- Offline enforcement
- Local performance
- Sync recovery

SQLite is NOT the source of truth.

Never treat SQLite as primary storage.

---

# Database Ownership

PostgreSQL owns:

- Users
- Missions
- Focus Sessions
- Rewards
- Gaming Credits
- Devices
- Blocked Applications
- Activity Logs
- Audit Logs

SQLite owns:

- Cached Missions
- Cached Credits
- Cached Rules
- Cached Device State

---

# Entity Principles

Every database entity must:

- Have a clear owner
- Have a documented purpose
- Support the product loop
- Be documented before implementation

Core Product Loop:

Mission
→ Focus Session
→ Completion
→ Reward
→ Gaming Credits
→ App Guard

If an entity does not support the product model, reconsider its necessity.

---

# Naming Conventions

Tables:

snake_case

Examples:

users
missions
focus_sessions

---

Columns:

snake_case

Examples:

created_at
updated_at
user_id

---

Primary Keys:

id

Type:

uuid

Example:

id uuid primary key

---

Foreign Keys:

<entity>\_id

Examples:

user_id
mission_id
device_id

---

Timestamps

Every major entity should contain:

created_at
updated_at

UTC timestamps only.

---

# Canonical Entities

The following entities are approved.

Only create new entities when necessary.

---

## users

Purpose:

Account ownership.

Stores:

- Profile
- Preferences
- Account Status

Owner:

Backend

---

## devices

Purpose:

Registered desktop devices.

Stores:

- Device Identifier
- Device Name
- Sync Status
- Last Activity

Owner:

Backend

---

## missions

Purpose:

Productive work requirements.

Stores:

- Title
- Description
- Mission Type
- Target Duration
- Reward Values
- Status

Owner:

Backend

---

## focus_sessions

Purpose:

Track productive work sessions.

Stores:

- Mission Association
- Start Time
- End Time
- Duration
- Validation Status

Owner:

Backend

---

## rewards

Purpose:

Track earned rewards.

Stores:

- XP
- Coins
- Reward Source

Owner:

Backend

---

## gaming_credits

Purpose:

Control entertainment access.

Stores:

- Current Balance
- Earned Credits
- Consumed Credits

Owner:

Backend

---

## blocked_applications

Purpose:

Applications controlled by App Guard.

Stores:

- Application Name
- Executable Path
- Detection Method
- Rule Status

Owner:

Backend

---

## activity_logs

Purpose:

User-facing history.

Stores:

- Mission Activity
- Session Activity
- Reward Activity

Owner:

Backend

---

## audit_logs

Purpose:

Security and enforcement history.

Stores:

- App Guard Actions
- Blocking Events
- Security Events
- Device Events

Owner:

Backend

---

# Relationships

users
└── missions

users
└── focus_sessions

users
└── rewards

users
└── gaming_credits

users
└── devices

users
└── activity_logs

users
└── audit_logs

missions
└── focus_sessions

missions
└── rewards

blocked_applications
└── audit_logs

devices
└── audit_logs

---

# Indexing Rules

Create indexes for:

- Foreign Keys
- Frequently Queried Fields
- Status Fields
- Realtime Queries

Examples:

user_id
mission_id
device_id
status

Do not create unnecessary indexes.

---

# Row Level Security (RLS)

All user-owned data must be protected by RLS.

Default Rule:

Users may only access their own records.

---

Protected Entities

- missions
- focus_sessions
- rewards
- gaming_credits
- devices
- activity_logs
- audit_logs

---

RLS Principles

Never trust client requests.

Ownership must always be validated.

Access must always be scoped to authenticated users.

---

# Soft Delete Strategy

Avoid permanent deletion whenever possible.

Preferred:

status = archived

or

deleted_at timestamp

Reasons:

- Auditability
- Recovery
- Analytics Integrity

---

# Realtime Considerations

Tables participating in realtime synchronization must be documented.

Examples:

missions
gaming_credits
devices

Related event definitions must exist in:

shared/events.md

backend/realtime.md

Never publish undocumented events.

---

# Migration Workflow

Before creating a migration:

1. Read architecture.md
2. Read shared/entities.md
3. Read this document
4. Verify entity ownership
5. Verify relationships
6. Verify permissions
7. Verify RLS requirements
8. Update documentation
9. Create migration

---

# Anti-Duplication Rules

Before creating:

- Table
- Column
- Relationship
- Status
- Enum

Verify that an equivalent structure does not already exist.

Reuse existing structures whenever possible.

Do not create duplicate representations of the same business concept.

---

# AI Agent Checklist

Before modifying the database:

Ask:

1. Does this entity already exist?
2. Does this relationship already exist?
3. Does this column already exist?
4. Does this status already exist?
5. Does this require RLS?
6. Does this affect realtime synchronization?
7. Does this affect offline synchronization?
8. Does documentation require updating?

If unsure:

Stop and ask for clarification.

Do not invent database structures.

---

# Final Rule

PostgreSQL is the source of truth.

SQLite is cache only.

All database structures must be documented before implementation.

Undocumented tables, relationships, and permissions are not allowed.
