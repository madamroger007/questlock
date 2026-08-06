# Shared Event Contracts

This document defines the canonical event system used throughout QuestLock.

All platforms must use the same event definitions.

Platforms:

- Desktop
- Backend
- Web

Events are the source of truth for cross-platform communication.

If implementation conflicts with this document:

This document wins.

---

# Purpose

This document exists to:

- Standardize event names
- Standardize payloads
- Define event ownership
- Define event consumers
- Prevent duplicate events
- Maintain realtime consistency

Every event must be documented.

Undocumented events are not allowed.

---

# Event Architecture

QuestLock uses an event-driven architecture.

Events may originate from:

- Backend
- Desktop

Events may be consumed by:

- Backend
- Desktop
- Web

---

# Event Naming Rules

Use:

domain.action

Examples:

mission.created

mission.completed

focus.started

focus.completed

reward.granted

gaming_credit.earned

app_guard.blocked

device.connected

Avoid:

MissionCompleted

MissionDone

UserFinishedTask

FocusTimerEnded

Use consistent naming.

---

# Event Structure

Every event must contain:

```ts
{
  event: string;
  timestamp: string;
  userId: string;
  payload: object;
}
```

All payloads must be documented.

---

# Mission Events

## mission.created

Owner:

Backend

Triggered When:

A mission is created.

Consumers:

- Web
- Desktop

Payload:

```ts
{
  missionId: string;
  title: string;
}
```

---

## mission.updated

Owner:

Backend

Triggered When:

Mission data changes.

Consumers:

- Web
- Desktop

Payload:

```ts
{
  missionId: string;
}
```

---

## mission.completed

Owner:

Backend

Triggered When:

Mission is completed successfully.

Consumers:

- Desktop
- Web

Payload:

```ts
{
  missionId: string;
  rewardId: string;
}
```

Effect:

May trigger reward generation.

---

# Focus Session Events

## focus.started

Owner:

Backend

Triggered When:

A focus session begins.

Consumers:

- Desktop
- Web

Payload:

```ts
{
  focusSessionId: string;
  missionId: string;
}
```

---

## focus.paused

Owner:

Backend

Triggered When:

Focus session pauses.

Consumers:

- Desktop
- Web

Payload:

```ts
{
  focusSessionId: string;
}
```

---

## focus.completed

Owner:

Backend

Triggered When:

Focus session reaches completion requirements.

Consumers:

- Desktop
- Web

Payload:

```ts
{
  focusSessionId: string;
  missionId: string;
}
```

---

# Reward Events

## reward.granted

Owner:

Backend

Triggered When:

Reward is generated.

Consumers:

- Web
- Desktop

Payload:

```ts
{
  rewardId: string;
  rewardType: string;
  amount: number;
}
```

---

# Gaming Credit Events

## gaming_credit.earned

Owner:

Backend

Triggered When:

User earns gaming credits.

Consumers:

- Desktop
- Web

Payload:

```ts
{
  amount: number;
  balance: number;
}
```

---

## gaming_credit.spent

Owner:

Backend

Triggered When:

Gaming credits are consumed.

Consumers:

- Desktop
- Web

Payload:

```ts
{
  amount: number;
  balance: number;
}
```

---

# App Guard Events

## app_guard.locked

Owner:

Backend

Triggered When:

Entertainment access becomes restricted.

Consumers:

- Desktop
- Web

Payload:

```ts
{
  reason: string;
}
```

---

## app_guard.unlocked

Owner:

Backend

Triggered When:

Entertainment access becomes available.

Consumers:

- Desktop
- Web

Payload:

```ts
{
  gamingCreditBalance: number;
}
```

---

## app_guard.blocked

Owner:

Desktop

Triggered When:

A blocked application is terminated.

Consumers:

- Backend
- Web

Payload:

```ts
{
  applicationName: string;
  executableName: string;
}
```

---

# Device Events

## device.connected

Owner:

Desktop

Triggered When:

Desktop agent connects.

Consumers:

- Backend
- Web

Payload:

```ts
{
  deviceId: string;
}
```

---

## device.disconnected

Owner:

Desktop

Triggered When:

Desktop agent disconnects.

Consumers:

- Backend
- Web

Payload:

```ts
{
  deviceId: string;
}
```

---

# Monitoring Events

## monitoring.active_app_changed

Owner:

Desktop

Triggered When:

Foreground application changes.

Consumers:

- Backend
- Web

Payload:

```ts
{
  applicationName: string;
}
```

---

## monitoring.focus_detected

Owner:

Desktop

Triggered When:

Approved productive application becomes active.

Consumers:

- Backend

Payload:

```ts
{
  applicationName: string;
}
```

---

# Audit Events

## audit.emergency_unlock

Owner:

Backend

Triggered When:

Emergency unlock is used.

Consumers:

- Web
- Desktop

Payload:

```ts
{
  remainingCredits: number;
}
```

---

# Realtime Rules

Realtime communication must follow:

backend/realtime.md

All realtime channels must use documented events.

No undocumented realtime events are allowed.

---

# Event Ownership Rules

Every event must have:

- Single Owner
- Defined Consumers
- Defined Payload
- Defined Business Purpose

Multiple owners are not allowed.

---

# Anti-Duplication Rules

Before creating an event:

Ask:

1. Does a similar event already exist?
2. Can an existing event be extended?
3. Is this merely a different payload?
4. Is this a UI action rather than a business event?

If YES:

Reuse the existing event.

Do not create duplicates.

---

# AI Agent Checklist

Before introducing a new event:

Review:

- shared/entities.md
- shared/types.md
- backend/realtime.md

Verify:

- Event Owner
- Event Consumers
- Payload Structure
- Business Purpose

If unclear:

Ask for clarification.

Do not invent events.

---

# Final Rule

Events are contracts.

Once an event is used across platforms:

Desktop
Backend
Web

it becomes part of the public system contract.

Breaking event contracts requires documentation updates and approval.
