# Struktur Folder

```
src/
│
├── app.ts                 # Inisialisasi aplikasi Hono
├── index.ts               # Menjalankan server
│
├── config/                # Konfigurasi aplikasi
│   ├── env.ts             # Environment variables
│   ├── supabase.ts        # Supabase Client
│   ├── logger.ts          # Logger
│   └── constants.ts       # Konstanta global
│   └── index.ts           # export and import global state of config
│
├── core/                  # Infrastruktur yang dipakai semua module
│   ├── middleware/        # Auth, CORS, Error Handler, Logger
│   ├── validation/        # Helper validasi (Zod Parser)
│   ├── permissions/       # RBAC & Permission
│   ├── realtime/          # Helper Supabase Realtime
│   ├── security/          # JWT, Hashing, Encryption
│   ├── errors/            # Custom Error
│   └── utils/             # Helper umum
│
├── modules/               # Semua fitur aplikasi
│   ├── auth/
│   ├───|──── auth.controller.ts        # controller for manage function logic
│   ├───|──── auth.repository.ts        # controller for manage database logic
│   ├───|──── auth.route.ts             # controller for manage route logic
│   ├───|──── auth.service.ts           # controller for manage business logic
│   ├───|──── auth.types.ts             # controller for manage types ts
│   ├───|──── auth.validation.ts        # controller for manage validation 
│   ├───|──── index.ts                  # controller for manage export and import global state of config
│   ├── users/
│   ├── missions/
│   ├── focus/
│   ├── rewards/
│   ├── analytics/
│   ├── app-guard/
│   ├── gaming-credit/
│   ├── devices/
│   ├── notifications/
│   └── settings/
│
├── shared/                # Kontrak yang dipakai lintas module
│   ├── dto/
│   ├── enums/
│   ├── types/
│   ├── events/
│   └── schemas/
│
│
├── jobs/                  # Background Jobs / Scheduler
│
├── tests/                 # Unit & Integration Test
│
└── docs/                  # Dokumentasi API & Backend
supabase/            # Database assets
│   migrations/
│   seeders/
|   config.toml
scripts
|   create-seed.ts

```

# Root Files

## app.ts

Application bootstrap.

Responsibilities:

- Create Hono instance
- Register global middleware
- Register application modules
- Configure global error handler
- Configure Not Found handler

Flow

```text
Create App
    ↓
Register Middleware
    ↓
Register Routes
    ↓
Export App
```

---

## index.ts

Application entry point.

Responsibilities:

- Import application
- Load configuration
- Start HTTP server

Flow

```text
Import App
    ↓
Load Configuration
    ↓
Start Server
    ↓
Listening
```

---

# config/

Global application configuration.

This folder **must never contain business logic**.

```text
config/
│
├── env.ts
├── supabase.ts
├── logger.ts
├── constants.ts
└── index.ts
```

---

## env.ts

Loads and validates environment variables.

Examples

- PORT
- NODE_ENV
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Flow

```text
.env
    ↓
env.ts
    ↓
Entire Application
```

---

## supabase.ts

Creates a single global Supabase Client.

All repositories must use this client.

Flow

```text
Repository
      ↓
Supabase Client
      ↓
PostgreSQL
```

Never place database queries inside this file.

---

## logger.ts

Global logger configuration.

Used across the application.

Examples

- logger.info()
- logger.warn()
- logger.error()
- logger.debug()

---

## constants.ts

Global application constants.

Examples

- APP_NAME
- API_PREFIX
- DEFAULT_PAGE_SIZE
- DEFAULT_LANGUAGE

Do not place Enums or DTOs here.

---

## index.ts

Exports all configuration files.

Instead of

```ts
import { env } from "@/config/env";
import { logger } from "@/config/logger";
```

Use

```ts
import { env, logger } from "@/config";
```

---

# core/

Core infrastructure shared across all modules.

Core must never contain business logic.

```text
core/
│
├── middleware/
├── validation/
├── permissions/
├── realtime/
├── security/
├── errors/
└── utils/
```

---

## middleware/

Global middleware.

Examples

- Authentication
- Authorization
- CORS
- Request Logger
- Error Handler
- Rate Limiter

Flow

```text
Request
    ↓
Middleware
    ↓
Controller
```

---

## validation/

Validation helpers.

Examples

- parse()
- safeParse()
- validateBody()
- validateQuery()

Feature-specific validation belongs inside each module.

Example

```text
modules/auth/auth.validation.ts
```

---

## permissions/

Permission and Role management.

Examples

- RBAC
- Role Validation
- Permission Checking

Flow

```text
Request
    ↓
Permission Check
    ↓
Controller
```

---

## realtime/

Shared helpers for Supabase Realtime.

Examples

- Channel Factory
- Broadcast Helper
- Presence Helper

---

## security/

Security utilities.

Examples

- JWT
- Password Hashing
- Encryption
- Secret Management

---

## errors/

Application custom errors.

Examples

- ValidationError
- UnauthorizedError
- ForbiddenError
- ConflictError
- NotFoundError

---

## utils/

Reusable helper functions.

Examples

- UUID
- Date
- Pagination
- String
- Number

Utilities must remain framework-independent.

---

# modules/

Each folder represents a single business feature.

```text
modules/
│
├── auth/
├── users/
├── missions/
├── rewards/
└── ...
```

Each module follows the same structure.

---

## *.route.ts

Defines HTTP endpoints.

Responsibilities

- Register routes
- Apply route middleware
- Call controller

Never contain business logic.

---

## *.controller.ts

Handles HTTP requests and responses.

Responsibilities

- Read request
- Extract parameters
- Call Service
- Return HTTP response

Flow

```text
Request
    ↓
Controller
    ↓
Service
```

---

## *.service.ts

Business logic layer.

Responsibilities

- Business Rules
- Workflow
- Permission Validation
- Call Repository

Flow

```text
Controller
      ↓
Service
      ↓
Repository
```

---

## *.repository.ts

Database access layer.

Responsibilities

- SELECT
- INSERT
- UPDATE
- DELETE

Flow

```text
Service
      ↓
Repository
      ↓
Supabase
```

Repositories must not know HTTP.

Repositories must not contain business logic.

---

## *.validation.ts

Validation schema for the module.

Examples

- LoginSchema
- RegisterSchema
- CreateMissionSchema

---

## *.types.ts

Module-specific TypeScript types.

If shared across modules, move them to

```text
shared/types
```

---

## index.ts

Exports module components.

Used for cleaner imports.

---

# shared/

Shared contracts reused by multiple modules.

```text
shared/
│
├── dto/
├── enums/
├── events/
├── schemas/
└── types/
```

---

## dto/

Shared Data Transfer Objects.

Examples

- PaginationDto
- ApiResponseDto

---

## enums/

Global enumerations.

Examples

- MissionStatus
- RewardType
- DeviceStatus

---

## events/

Shared event definitions.

Examples

- MissionStarted
- RewardUnlocked
- DeviceConnected

---

## schemas/

Reusable validation schemas.

Examples

- UUIDSchema
- PaginationSchema

---

## types/

Shared TypeScript types.

Examples

- User
- Mission
- Reward
- Device

---

# jobs/

Background workers.

Examples

- Cleanup
- Notifications
- Analytics
- Scheduled Rewards
- Device Synchronization

Flow

```text
Scheduler
    ↓
Job
    ↓
Service
    ↓
Repository
```

---

# tests/

Application testing.

Contains

- Unit Tests
- Integration Tests
- API Tests

---

# docs/

Backend documentation.

Examples

- API Documentation
- Architecture
- OpenAPI
- Database Diagram

---

# supabase/

Database assets.

```text
supabase/
│
├── migrations/
├── seed/
├── functions/
├── policies/
└── config.toml
```

---

## migrations/

Database schema changes.

Examples

- Create Tables
- Alter Tables
- Indexes
- Constraints

---

## seed/

Initial application data.

Examples

- Admin User
- Default Settings
- Demo Missions

---

## functions/

Supabase Edge Functions.

---

## policies/

Row Level Security policies.

---

## config.toml

Supabase CLI configuration.

---

# scripts/

Developer automation scripts.

Examples

- create-migration.ts
- create-seed.ts
- build-seed.ts
- create-policy.ts

---

# End-to-End Request Flow

The backend follows a layered architecture.

Example: `GET /missions`

```text
Client
    │
    ▼
HTTP Request
    │
    ▼
index.ts
    │
    ▼
app.ts
    │
    ▼
Global Middleware
(CORS, Logger, Authentication, Validation)
    │
    ▼
missions.route.ts
    │
    ▼
missions.controller.ts
    │
    ▼
missions.service.ts
(Business Rules)
    │
    ▼
missions.repository.ts
(Database Access)
    │
    ▼
config/supabase.ts
(Supabase Client)
    │
    ▼
Supabase PostgreSQL
    │
    ▼
Database Result
    │
    ▼
Repository
    │
    ▼
Service
(Business Processing)
    │
    ▼
Controller
    │
    ▼
HTTP Response (JSON)
    │
    ▼
Client
```

---

# Architecture Principles

The backend follows these principles:

- **Config** provides global configuration and shared clients.
- **Core** provides reusable infrastructure shared across all modules.
- **Modules** implement business features using a layered architecture.
- **Shared** stores reusable contracts shared across modules.
- **Supabase** manages database infrastructure (migrations, seeds, RLS, Edge Functions).
- **Scripts** automate development tasks.

Every layer has a single responsibility.

Business logic belongs only in the **Service** layer.

Database access belongs only in the **Repository** layer.

Controllers handle HTTP communication only.

Routes define API endpoints only.

This separation keeps the codebase scalable, maintainable, and consistent as QuestLock grows.