# Authentication & Authorization Specification

This document defines how authentication and authorization work within QuestLock.

Authentication and access control are security-critical systems.

All implementations must follow the rules defined in this document.

If implementation conflicts with this document:

This document wins.

---

# Purpose

Authentication exists to:

- Identify users
- Protect user data
- Secure application access
- Establish ownership
- Enable permission validation

Authorization exists to:

- Control access to resources
- Validate ownership
- Protect sensitive operations
- Enforce security boundaries

---

# Authentication Provider

QuestLock uses:

Supabase Auth

Authentication is managed exclusively through Supabase.

Do not introduce alternative authentication systems.

---

# Supported Authentication Methods

## Email + Password

Primary authentication method.

Supported actions:

- Register
- Login
- Logout
- Password Reset
- Email Verification

---

## OAuth Providers

Optional authentication methods.

Examples:

- Google
- GitHub

OAuth providers must be supported through Supabase Auth.

---

# Authentication Principles

Authentication identifies the user.

Authorization determines what the user may access.

These responsibilities must never be mixed.

---

# Source of Truth

User identity is owned by:

Supabase Auth

User profile data is owned by:

PostgreSQL

Never store authentication credentials outside Supabase Auth.

---

# User Lifecycle

## Registration

Flow:

User
→ Register
→ Supabase Auth Account Created
→ User Profile Created
→ Default Settings Created
→ Account Activated

---

## Login

Flow:

User
→ Authenticate
→ Session Issued
→ Application Loaded

---

## Logout

Flow:

User
→ Session Revoked
→ Local State Cleared
→ Access Removed

---

## Password Reset

Flow:

User
→ Reset Request
→ Email Verification
→ Password Update

Password reset must be handled through Supabase.

---

# Session Management

Authentication state is session-based.

All requests requiring authentication must validate:

- Session Existence
- Session Validity
- User Ownership

Never trust client-side authentication state alone.

---

# Authorization Rules

Every protected resource must verify ownership.

Default rule:

Users may only access their own data.

Examples:

Mission
→ Must belong to authenticated user

Focus Session
→ Must belong to authenticated user

Gaming Credits
→ Must belong to authenticated user

Activity Logs
→ Must belong to authenticated user

Device Records
→ Must belong to authenticated user

---

# Ownership Validation

Before accessing any resource:

Validate:

1. User Identity
2. Resource Ownership
3. Permission Scope

Ownership validation is mandatory.

---

# Device Authentication

Desktop devices are associated with user accounts.

Rules:

- Devices must belong to a user
- Devices must authenticate through Supabase
- Device ownership must be validated
- Device actions must be auditable

A device must never access another user's data.

---

# Realtime Authentication

Realtime subscriptions must be authenticated.

Requirements:

- Active Session
- Valid User Identity
- Authorized Channel Access

Never expose realtime data to unauthorized users.

---

# Storage Access

Files uploaded by users must be protected.

Examples:

- Mission Proof Images
- Attachments
- User Assets

Rules:

- User-owned access only
- Protected storage buckets
- Ownership validation required

---

# Sensitive Operations

The following actions require authentication and ownership validation:

- Mission Creation
- Mission Updates
- Mission Completion
- Gaming Credit Access
- Blocked Application Management
- Device Registration
- Settings Modification
- Emergency Unlock

Never bypass authentication checks.

---

# Desktop Security

Desktop enforcement features require an authenticated user.

Examples:

- App Guard
- Process Monitoring
- Gaming Credit Synchronization

Desktop enforcement must never rely solely on client-side state.

The desktop application must synchronize with authenticated backend data.

---

# Row Level Security (RLS)

All user-owned data must be protected by RLS.

Default policy:

Authenticated users may only access their own records.

Protected entities include:

- missions
- focus_sessions
- rewards
- gaming_credits
- devices
- activity_logs
- audit_logs

Never disable RLS without explicit approval.

---

# Security Rules

Always:

- Validate session ownership
- Validate resource ownership
- Validate permissions
- Use least privilege access
- Protect sensitive operations

Never:

- Trust client input
- Trust client ownership claims
- Expose user identifiers unnecessarily
- Expose sensitive account data
- Bypass authorization checks

---

# AI Agent Checklist

Before modifying authentication:

Ask:

1. Does this affect user identity?
2. Does this affect ownership validation?
3. Does this affect session management?
4. Does this affect RLS policies?
5. Does this affect device ownership?
6. Does this affect realtime authorization?
7. Does this affect storage permissions?

If YES:

Review:

- architecture.md
- database.md
- backend/permissions.md

Before implementation.

---

# Anti-Hallucination Rules

Do not invent:

- Authentication Providers
- User Roles
- Permission Systems
- Access Rules
- Session Models
- Security Policies

If authentication behavior is not documented:

Ask for clarification.

Do not guess.

---

# Final Rule

Authentication identifies users.

Authorization protects resources.

All ownership must be validated.

Security takes priority over convenience.

Supabase Auth is the only authentication provider.
