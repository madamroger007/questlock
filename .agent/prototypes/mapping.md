# Prototype Mapping Specification

This document defines how visual prototypes are mapped into actual application features.

Prototype files are implementation requirements.

They are not visual suggestions.

They are not design inspiration.

They define the expected user interface.

If implementation conflicts with approved prototypes:

Prototype wins.

If prototype conflicts with architecture or business rules:

Documentation wins.

---

# Purpose

This document exists to:

- Connect prototypes to features
- Define page ownership
- Define component requirements
- Define interaction requirements
- Prevent inconsistent UI implementations

Every prototype must be traceable to a feature.

Every feature must be traceable to a prototype.

---

# Implementation Workflow

Before implementing any UI:

1. Read README.md
2. Read architecture.md
3. Read web/ui.md
4. Read this file
5. Locate the relevant prototype
6. Identify the mapped feature
7. Identify required components
8. Identify required interactions
9. Implement

Never implement UI directly from assumptions.

---

# Mapping Hierarchy

All UI work follows this hierarchy:

Prototype

↓

Feature

↓

Layout

↓

Components

↓

Interactions

↓

Implementation

Do not skip levels.

---

# Desktop Prototype Mapping

---

## dashboard.png

Feature:

Desktop Dashboard

Route:

Desktop / Dashboard

Purpose:

Provide productivity overview.

Required Components:

- Status Card
- App Guard Status
- Gaming Credits Summary
- Daily Statistics
- Focus Progress Card
- Quick Actions

Required Interactions:

- Navigate to Missions
- Navigate to App Guard
- View Analytics

---

## missions.png

Feature:

Mission Management

Route:

Desktop / Missions

Purpose:

Manage user missions.

Required Components:

- Mission List
- Mission Card
- Mission Filters
- Mission Form
- Focus Session Timer

Required Interactions:

- Create Mission
- Edit Mission
- Start Focus Session
- Complete Mission

---

## app-guard.png

Feature:

App Guard Management

Route:

Desktop / App Guard

Purpose:

Manage blocked applications.

Required Components:

- Application List
- Status Indicators
- Detection Sources
- Rule Configuration

Required Interactions:

- Add Application
- Remove Application
- Enable Rule
- Disable Rule

---

## settings.png

Feature:

Desktop Settings

Route:

Desktop / Settings

Purpose:

Configure desktop behavior.

Required Components:

- Theme Settings
- Startup Settings
- Security Settings
- Notification Settings

Required Interactions:

- Update Settings
- Save Settings

---

## profile.png

Feature:

Profile & History

Route:

Desktop / Profile

Purpose:

Display account information and logs.

Required Components:

- Profile Card
- Device Information
- Activity Timeline
- Audit Log Table

Required Interactions:

- View History
- Manage Account

---

# Web Prototype Mapping

---

## dashboard.png

Feature:

Dashboard

Route:

/dashboard

Purpose:

Provide productivity overview.

Required Components:

- Summary Cards
- Mission Overview
- Gaming Credits Overview
- Productivity Metrics

add Feature dashboard:

Realtime Monitoring

Route:

/monitoring

Purpose:

Display live desktop activity.

Required Components:

- Device Status Card
- Active Application Card
- App Guard Status Card
- Connection Status

Required Interactions:

- View Device Details
- Refresh State

---

## history.png

Feature:

History

Route:

/history

Purpose:

Display historical activity.

Required Components:

- Activity Timeline
- Mission History
- Enforcement Logs

Required Interactions:

- Search Logs
- Filter Logs

---

## account.png

Feature:

Account

Route:

/account

Purpose:

Manage user account.

Required Components:

- Profile Settings
- Security Settings
- Device Management
- Notification Preferences

Required Interactions:

- Update Profile
- Manage Devices

---

# Layout Extraction Rules

Before implementation:

Extract:

## Layout Structure

Examples:

- Sidebar
- Header
- Content Area
- Footer
- Modal Areas

---

## Component Structure

Identify:

- Cards
- Tables
- Charts
- Forms
- Buttons
- Navigation

Reuse existing components whenever possible.

---

## Interaction Structure

Identify:

- Click Actions
- Form Actions
- Navigation Actions
- Realtime Updates

Interactions are part of requirements.

Do not omit them.

---

# Responsive Requirements

Every prototype must define:

Desktop Layout

Tablet Layout

Mobile Layout (Optional during MVP)

Desktop experience has priority.

---

# Component Reuse Rules

Before creating a component:

Ask:

1. Does this component already exist?
2. Can an existing component be reused?
3. Can an existing component be extended?

Reuse first.

Create new components only when necessary.

---

# Documentation Priority

When conflicts occur:

Priority Order:

1. README.md
2. architecture.md
3. database.md
4. Feature Documentation
5. Prototype Mapping
6. Prototype Images

Follow this order.

---

# AI Agent Checklist

Before implementing UI:

1. Which feature is being implemented?
2. Which prototype belongs to that feature?
3. Which route owns the feature?
4. Which components are required?
5. Which interactions are required?
6. Can existing components be reused?
7. Does the implementation match the prototype?

If not:

Stop and review documentation.

---

# Anti-Hallucination Rules

Do not invent:

- Additional Pages
- Additional Components
- Additional Navigation
- Additional Workflows
- Additional Interactions

Only implement what is documented.

If prototype information is missing:

Ask for clarification.

Do not guess.

---

# Final Rule

Prototypes are implementation requirements.

Every UI implementation must be traceable to:

Prototype
→ Feature
→ Components
→ Interactions

No UI should exist without a documented mapping.