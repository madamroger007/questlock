# Frontend Architecture Specification

This document defines the architecture, responsibilities, and boundaries of the Frontend Layer.

The Frontend Layer is the presentation layer of QuestLock.

Its responsibility is to present information, collect user input, and visualize system state.

The Frontend does not own business rules, enforcement logic, or system monitoring.

If implementation conflicts with this document:

This document wins.

---

# Purpose

The Frontend exists to:

- Display application state
- Manage user interactions
- Visualize productivity data
- Manage missions
- Configure settings
- Display monitoring information
- Display analytics

The Frontend is a presentation layer.

Business decisions belong to Backend.

System enforcement belongs to Desktop.

---

# Frontend Philosophy

QuestLock follows strict responsibility separation.

Backend decides.

Desktop enforces.

Frontend visualizes.

The Frontend must never become the source of truth.

---

# Technology Stack

Frontend Framework:

- Svelte 5
- SvelteKit
- TypeScript
- TailwindCSS

Deployment Targets:

- Tauri Desktop
- Future Web Deployment (Optional)

The same frontend codebase should be reusable across platforms whenever possible.

---

# Frontend Responsibilities

The Frontend owns:

## Monitoring Views

Purpose:

Display live device status.

Examples:

- Connected Devices
- Current Active Application
- App Guard Status
- Online / Offline State

The Frontend displays monitoring data.

It does not collect monitoring data.

---

## Analytics Views

Purpose:

Display productivity statistics.

Examples:

- Focus Time
- Entertainment Time
- Productivity Score
- Top Applications

The Frontend displays analytics.

The Backend generates analytics data.

---

## Mission Management

Purpose:

Allow users to manage missions.

Examples:

- Create Mission
- Edit Mission
- Complete Mission
- Upload Proof

Mission validation belongs to Backend.

---

## User Settings

Purpose:

Allow users to configure application behavior.

Examples:

- Theme
- Language
- Notifications
- Startup Settings
- Security Settings

The Frontend modifies settings.

Backend and Desktop apply settings.

---

## History & Activity

Purpose:

Display historical records.

Examples:

- Mission History
- Focus Session History
- App Guard Activity
- Audit Logs

The Frontend visualizes historical data.

---

# Frontend Does NOT Own

The Frontend must never own:

## Business Logic

Owned By:

Backend

Examples:

- Reward Calculation
- Credit Calculation
- Mission Validation
- Permission Validation

---

## Process Monitoring

Owned By:

Desktop

Examples:

- Process Detection
- Active Window Tracking
- Focus Tracking

---

## App Guard

Owned By:

Desktop

Examples:

- Game Blocking
- Application Blocking
- Credit Enforcement

---

## Authentication Logic

Owned By:

Backend

The Frontend consumes authentication state.

It does not define authentication behavior.

---

# Application Routes

The following routes are approved.

---

## Dashboard

Route:

/
or

/dashboard

Purpose:

Application Overview

Features:

- Focus Summary
- Today's Statistics
- Gaming Access Status
- Quick Actions

---

## Missions

Route:

/missions

Purpose:

Mission Management

Features:

- Active Missions
- Pending Verification
- Completed Missions
- Mission Creation
- Focus Sessions

---

## App Guard

Route:

/app-guard

Purpose:

Blocked Application Management

Features:

- Registered Applications
- Game Detection
- Active Rules
- Manual Registration

---

## Monitoring

Route:

/monitoring

Purpose:

Live Device Monitoring

Features:

- Device Status
- Active Application
- App Guard Status

---

## Analytics

Route:

/analytics

Purpose:

Productivity Analytics

Features:

- Focus Statistics
- Entertainment Statistics
- Productivity Trends
- Application Usage

---

## History

Route:

/history

Purpose:

Historical Activity

Features:

- Mission History
- Focus Sessions
- Enforcement Logs
- Audit Events

---

## Settings

Route:

/settings

Purpose:

Application Configuration

Features:

- Appearance
- Language
- Notifications
- Security
- Startup Behavior

---

## Account

Route:

/account

Purpose:

User Profile

Features:

- Profile Information
- Connected Devices
- XP & Rewards
- Account Preferences

---

# State Management Rules

Frontend state should be minimal.

Source of truth remains:

Backend

Local state may be used for:

- UI State
- Form State
- Temporary State

Avoid duplicating backend state unnecessarily.

---

# Component Architecture

Prefer:

Small reusable components.

Examples:

- StatCard
- MissionCard
- DeviceCard
- ActivityList
- AppGuardTable

Avoid:

Large monolithic pages.

---

# UI Consistency Rules

All interfaces must:

- Follow prototype references
- Follow design system rules
- Follow shared terminology

Use terms defined in:

shared/glossary.md

Never invent alternative terminology.

---

# Data Fetching Rules

Frontend consumes:

- Backend APIs
- Realtime Events

Frontend should not:

- Recalculate business data
- Recalculate rewards
- Recalculate Gaming Credits

Display only validated backend state.

---

# Realtime Rules

Frontend subscribes to:

- Mission Updates
- Device Updates
- Reward Updates
- Gaming Credit Updates

Realtime events must be documented in:

shared/events.md

---

# AI Agent Checklist

Before implementing Frontend features:

Identify:

1. Which route is affected?
2. Which entity is displayed?
3. Which backend data is required?
4. Which events are consumed?
5. Which prototype applies?
6. Which components can be reused?

Review:

- architecture.md
- web/ui.md
- prototypes/mapping.md
- shared/entities.md
- shared/types.md

Before implementation.

---

# Anti-Hallucination Rules

Do not invent:

- Routes
- Pages
- Business Logic
- Reward Calculations
- Mission Rules
- Enforcement Logic

If requirements are unclear:

Ask for clarification.

Do not guess.

---

# Final Rule

The Frontend exists to visualize and manage QuestLock.

Backend defines the rules.

Desktop enforces the rules.

Frontend displays the results.
