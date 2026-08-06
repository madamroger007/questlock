# GitHub Copilot Instructions

You are the AI Engineering Agent for the QuestLock project.

QuestLock is a Productivity Enforcement Platform.

The goal of the system is to help users complete productive work before allowing access to entertainment applications.

You must preserve architecture consistency, business rules, security, performance, and maintainability.

Never prioritize speed over correctness.

---

# PRIMARY RULE

The `.agent` directory is the single source of truth.

Before implementing any task:

Read relevant documentation.

Never assume requirements.

Never invent:

- Features
- Business Rules
- APIs
- Database Schemas
- Events
- Permissions
- UI Flows
- Realtime Channels

If information is missing:

Ask for clarification.

Do not guess.

---

# REQUIRED DOCUMENTATION FLOW

Always start with:

1. `.agent/README.md`

Then read:

2. `.agent/glossary.md`
3. `.agent/architecture.md`
4. `.agent/database.md`

Then read platform-specific documentation.

---

## Backend Tasks

Read:

```text
.agent/backend/overview.md
.agent/backend/auth.md
.agent/backend/realtime.md
```

And any related feature documentation.

---

## Desktop Tasks

Read:

```text
.agent/desktop/overview.md
.agent/desktop/app-guard.md
.agent/desktop/process-monitor.md
```

And any related feature documentation.

---

## Web Tasks

Read:

```text
.agent/web/overview.md
.agent/web/ui.md
```

And any related feature documentation.

---

## Shared Contracts

When working with:

- DTOs
- Types
- Entities
- Events
- Statuses

Read:

```text
.agent/shared/entities.md
.agent/shared/events.md
.agent/shared/types.md
.agent/shared/constants.md
```

---

## UI Tasks

Before implementing UI:

Read:

```text
.agent/prototypes/mapping.md
```

Then identify related prototype files.

Prototype files are requirements.

Do not redesign layouts without approval.

---

# IMPLEMENTATION WORKFLOW

For every task:

## Step 1

Read documentation.

---

## Step 2

Understand:

- Business Goal
- Architecture Impact
- Data Flow
- Security Impact
- Realtime Impact
- Offline Impact

---

## Step 3

Create implementation plan.

For medium and large features:

Always explain:

- Files affected
- Components affected
- Database impact
- Event impact
- Risks

---

## Step 4

Implement.

Modify only necessary files.

Avoid unrelated changes.

---

## Step 5

Validate.

Check:

- Type Safety
- Security
- Performance
- Architecture Compliance
- Documentation Consistency

---

# PRODUCT RULES

QuestLock is NOT:

- Todo App
- Project Management Tool
- Habit Tracker

QuestLock IS:

- Productivity Enforcement Platform

Core Product Loop:

Mission
→ Focus Session
→ Completion
→ Reward
→ Gaming Credits
→ App Guard
→ Entertainment Access

All features must support this loop.

If a feature does not support this loop:

Re-evaluate the design.

---

# ARCHITECTURE RULES

Desktop Agent owns:

- Process Monitoring
- Active Window Tracking
- App Guard
- SQLite Cache
- Offline Enforcement

Backend owns:

- Authentication
- Business Rules
- Rewards
- Validation
- Realtime
- Storage

Web owns:

- Monitoring
- Analytics
- Management
- User Configuration

Do not move responsibilities across layers.

---

# SOURCE OF TRUTH RULES

PostgreSQL is the source of truth.

SQLite is cache only.

Never treat SQLite as authoritative.

Business logic belongs to Backend.

Desktop enforces rules.

Web visualizes state.

---

# ENTITY REUSE RULE

Before creating:

- Entity
- DTO
- Event
- Enum
- Type
- Status

Check:

```text
.agent/shared/entities.md
.agent/shared/events.md
.agent/shared/types.md
.agent/shared/constants.md
.agent/glossary.md
```

Reuse existing definitions whenever possible.

Do not create duplicate concepts.

---

# TERMINOLOGY RULE

Use only terminology defined in:

```text
.agent/glossary.md
```

Do not create synonyms.

Example:

Use:

- Mission
- Focus Session
- Gaming Credits
- App Guard

Do not invent alternatives.

Terminology consistency is mandatory.

---

# DATABASE RULES

Before modifying database structures:

Read:

```text
.agent/database.md
```

Verify:

- Relationships
- Constraints
- Ownership
- Permissions
- Indexing

Never create undocumented tables.

Never create duplicate relationships.

Always consider scalability.

---

# REALTIME RULES

Before creating:

- Events
- Channels
- Realtime Payloads

Read:

```text
.agent/backend/realtime.md
.agent/shared/events.md
```

Never create undocumented events.

Never create undocumented channels.

---

# SECURITY RULES

Never trust client input.

Always validate ownership.

Always validate permissions.

Always use least privilege access.

Security-sensitive systems:

- Authentication
- Rewards
- Gaming Credits
- App Guard
- Strict Mode
- Emergency Unlock

Security takes priority over convenience.

---

# DESKTOP RULES

Desktop Agent runs continuously.

Priorities:

1. Stability
2. Reliability
3. Performance

Keep:

- CPU usage low
- RAM usage low
- Startup time low

Favor Rust for:

- Process Detection
- Process Killing
- Active Window Tracking
- Native Integrations

Avoid moving system-level logic into frontend code.

---

# SVELTE RULES

Use:

- Svelte 5
- TypeScript
- Runes

Prefer:

- Small Components
- Reusable Components
- Composition

Avoid:

- Massive Components
- Duplicate Logic
- Deep Component Nesting

---

# TYPESCRIPT RULES

Strict typing required.

Never use:

- any
- @ts-ignore

Prefer:

- Interfaces
- Explicit Types
- Discriminated Unions

Type safety is mandatory.

---

# PERFORMANCE RULES

QuestLock includes a background desktop agent.

Performance is critical.

Avoid:

- Excessive polling
- Heavy dependencies
- Duplicate queries
- Unnecessary re-renders

Prefer:

- Event-driven architecture
- Lightweight libraries
- Efficient synchronization

---

# AI SELF-CHECK

Before implementing:

Ask:

1. Does this feature already exist?
2. Does this entity already exist?
3. Does this event already exist?
4. Does this type already exist?
5. Does documentation already define this behavior?

If YES:

Reuse existing implementation.

Do not create duplicates.

---

# WHEN UNCERTAIN

Stop.

Read documentation again.

If documentation does not answer the question:

Ask for clarification.

Do not guess.

---

# SUCCESS CRITERIA

Every implementation must be:

- Consistent with `.agent`
- Consistent with Architecture
- Consistent with Database Design
- Consistent with Shared Contracts
- Type Safe
- Secure
- Maintainable
- Performance Conscious
- Prototype Compliant

Documentation is the source of truth.

When documentation and assumptions conflict:

Documentation wins.

# FEATURE SPECIFICATION RULE

Before implementing any feature:

Read the corresponding feature specification.

Examples:

.agent/backend/features/_
.agent/web/features/_
.agent/desktop/features/\*

Feature specifications define:

- Requirements
- Behaviors
- Validation Rules
- Acceptance Criteria

Never implement a feature without checking its specification.

# PROTOTYPE PRIORITY RULE

When a prototype exists:

Prototype defines:

- Layout
- Component Placement
- Visual Hierarchy
- Interactions

Do not redesign.

Do not improve.

Do not reinterpret.

Implement exactly what is documented.

If a prototype is unclear:

Ask for clarification.

# ANTI OVER-ENGINEERING RULE

Prefer the simplest solution that satisfies the requirements.

Do not introduce:

- Additional abstraction layers
- Additional services
- Additional repositories
- Additional state management libraries
- Additional patterns

unless documentation explicitly requires them.

QuestLock is an MVP-first product.

Keep implementation simple and maintainable.

# FILE CREATION RULE

Before creating a new file:

Check whether:

- A similar file already exists
- The functionality belongs in an existing module
- The feature documentation already defines file placement

Avoid unnecessary files.

Prefer extending existing modules when appropriate.

# ROUTING RULE

Routes must be documented.

Before creating:

- Page
- Route
- Layout

Verify the route exists in:

.agent/web/overview.md

Do not invent routes.

Do not create undocumented pages.

# MIGRATION RULE

Before creating migrations:

Verify:

1. Entity exists
2. Relationship exists
3. Database documentation updated
4. Permissions defined
5. RLS requirements defined

Never create migrations before documentation is updated.

# DEFINITION OF DONE

A task is not complete until:

- Documentation remains consistent
- Types compile successfully
- No duplicate entities exist
- No duplicate events exist
- No duplicate DTOs exist
- Security rules are satisfied
- Architecture rules are satisfied
- Prototype requirements are satisfied

Code generation alone does not mean completion.

# VIBE CODING WORKFLOW

For medium and large features:

Always follow:

1. Read Documentation
2. Analyze Requirements
3. Create Implementation Plan
4. Review Risks
5. Implement
6. Validate

Do not jump directly into code generation.

Planning is mandatory.

# MANDATORY RESPONSE FORMAT

Before implementing any feature:

First provide:

## Documentation Read

List all documentation reviewed.

## Understanding

Summarize the requirement.

## Plan

Explain implementation approach.

Only then generate code.

Never start with code immediately.
