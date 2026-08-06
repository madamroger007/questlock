# Shared Type Contracts

This document defines the canonical shared types used throughout QuestLock.

All platforms must use the same contracts.

Platforms:

- Backend
- Desktop
- Web

Shared types are the source of truth for cross-platform communication.

If implementation conflicts with this document:

This document wins.

---

# Purpose

This document exists to:

- Standardize DTOs
- Standardize API contracts
- Standardize Realtime payloads
- Standardize Entity representations
- Prevent duplicate types
- Maintain naming consistency

All shared data structures must be documented here.

Undocumented shared types are not allowed.

---

# Type Categories

QuestLock shared types are grouped into:

1. Entity Types
2. API Types
3. Event Types
4. State Types
5. Enum Types

---

# Entity Types

Entity types represent business entities.

They must align with:

shared/entities.md

Examples:

- User
- Device
- Mission
- FocusSession
- Reward
- GamingCredit
- BlockedApplication
- ActivityLog
- AuditLog

Entity types should be reused whenever possible.

---

# User

```ts
interface User {
  id: string;
  email: string;
  createdAt: string;
}
```

---

# Device

```ts
interface Device {
  id: string;
  userId: string;
  name: string;
  platform: string;
  status: DeviceStatus;
  lastSeenAt: string;
}
```

---

# Mission

```ts
interface Mission {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: MissionStatus;
  verificationType: VerificationType;
  targetMinutes: number;
  rewardValue: number;
  createdAt: string;
}
```

---

# Focus Session

```ts
interface FocusSession {
  id: string;
  missionId: string;
  userId: string;
  status: FocusSessionStatus;
  startedAt: string;
  endedAt?: string;
  trackedMinutes: number;
}
```

---

# Reward

```ts
interface Reward {
  id: string;
  userId: string;
  missionId: string;
  type: RewardType;
  amount: number;
  createdAt: string;
}
```

---

# Gaming Credit

```ts
interface GamingCredit {
  userId: string;
  balance: number;
  updatedAt: string;
}
```

---

# Blocked Application

```ts
interface BlockedApplication {
  id: string;
  userId: string;
  name: string;
  executableName: string;
  source: AppSource;
  enabled: boolean;
}
```

---

# Activity Log

```ts
interface ActivityLog {
  id: string;
  userId: string;
  event: string;
  description: string;
  createdAt: string;
}
```

---

# Audit Log

```ts
interface AuditLog {
  id: string;
  userId: string;
  event: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}
```

---

# API Types

API contracts must remain consistent across platforms.

---

# ApiResponse

```ts
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

---

# PaginatedResponse

```ts
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

---

# Event Types

All event payloads must align with:

shared/events.md

---

# BaseEvent

```ts
interface BaseEvent<T> {
  event: string;
  timestamp: string;
  userId: string;
  payload: T;
}
```

---

# MissionCompletedEvent

```ts
interface MissionCompletedEvent {
  missionId: string;
  rewardId: string;
}
```

---

# AppGuardBlockedEvent

```ts
interface AppGuardBlockedEvent {
  applicationName: string;
  executableName: string;
}
```

---

# State Types

Used by UI and Desktop.

---

# AppGuardState

```ts
type AppGuardState = "LOCKED" | "UNLOCKED";
```

---

# DeviceConnectionState

```ts
type DeviceConnectionState = "ONLINE" | "OFFLINE";
```

---

# Enum Types

Enums must be reused.

Do not duplicate enums.

---

# MissionStatus

```ts
type MissionStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "PENDING_VERIFICATION"
  | "FAILED"
  | "ARCHIVED";
```

---

# FocusSessionStatus

```ts
type FocusSessionStatus = "RUNNING" | "PAUSED" | "COMPLETED";
```

---

# VerificationType

```ts
type VerificationType = "AUTO_TRACKED" | "MANUAL_PROOF";
```

---

# RewardType

```ts
type RewardType = "XP" | "COINS" | "GAMING_CREDITS";
```

---

# DeviceStatus

```ts
type DeviceStatus = "ONLINE" | "OFFLINE";
```

---

# AppSource

```ts
type AppSource = "STEAM" | "EPIC" | "RIOT" | "MANUAL";
```

---

# Naming Rules

Use:

User

Not:

UserDto
UserData
UserPayload

---

Use:

Mission

Not:

Task
Todo
MissionData

---

Use:

FocusSession

Not:

Timer
StudySession
WorkSession

---

Use:

GamingCredit

Not:

PlayTime
AccessToken
EntertainmentPoints

---

# Type Ownership Rules

Shared types belong in:

shared/types.md

Do not redefine shared contracts inside:

- Web
- Desktop
- Backend

Platform-specific extensions are allowed only when documented.

---

# Anti-Duplication Rules

Before creating a new type:

Ask:

1. Does a similar type already exist?
2. Can an existing type be extended?
3. Is this only a subset of an existing type?
4. Is this only a view model?

If YES:

Reuse the existing type.

Do not create duplicates.

---

# AI Agent Checklist

Before introducing a new type:

Review:

- shared/entities.md
- shared/events.md
- database.md

Verify:

- Naming consistency
- Existing contracts
- Event compatibility
- Database compatibility

If unclear:

Ask for clarification.

Do not invent types.

---

# Final Rule

Shared types are contracts.

Desktop, Backend, and Web must communicate using the same contracts.

No duplicate DTOs.

No duplicate enums.

No duplicate payload definitions.

Consistency is mandatory.
