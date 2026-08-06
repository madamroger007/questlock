# User Interface Specification

This document defines the visual and interaction standards for QuestLock.

The purpose of this document is to ensure consistency across all Web and Desktop interfaces.

UI implementation must follow documented prototypes and approved design patterns.

If implementation conflicts with prototypes:

Prototypes win.

If implementation conflicts with assumptions:

Documentation wins.

---

# Purpose

The UI layer exists to:

- Present information clearly
- Support productivity workflows
- Visualize system state
- Minimize user confusion
- Maintain consistency across platforms

QuestLock is a productivity enforcement platform.

The interface should feel:

- Clean
- Focused
- Professional
- Lightweight
- Efficient

Avoid unnecessary complexity.

---

# Design Philosophy

Users should immediately understand:

1. What they need to do
2. What their current progress is
3. Whether entertainment access is locked or unlocked
4. How to earn access

Every screen should support the core product loop:

Mission
→ Focus Session
→ Completion
→ Reward
→ Gaming Credits
→ App Guard Access

UI should reinforce this flow.

---

# Prototype-Driven Development

All UI must be implemented from prototypes.

Before creating or modifying UI:

1. Read prototypes/mapping.md
2. Locate the corresponding prototype
3. Identify required components
4. Identify required interactions
5. Follow documented layout structure

Do not create layouts from assumptions.

Do not redesign screens without approval.

---

# Design System Rules

Use the existing design system.

Prefer:

- Shared Components
- Shared Layouts
- Shared Styles
- Shared Patterns

Avoid:

- One-off Components
- Inconsistent Spacing
- Inconsistent Typography
- Duplicate UI Patterns

---

# Platform Consistency

Web and Desktop share the same visual language.

Reuse whenever possible:

- Components
- Cards
- Tables
- Forms
- Modals
- Navigation

Platform-specific UI should only exist when required by native functionality.

Examples:

Desktop-only:

- System Tray Controls
- Native Notifications

Web-only:

- Browser-specific integrations

---

# Layout Principles

Preferred Layout:

Sidebar

↓

Header

↓

Content Area

↓

Realtime Status Elements

Layout hierarchy must remain consistent across pages.

---

# Dashboard UI

Dashboard is the primary entry point.

Priority Order:

1. App Guard Status
2. Gaming Credits
3. Active Missions
4. Focus Progress
5. Productivity Statistics

Users should understand their current state within a few seconds.

---

# Mission UI

Mission interfaces should display:

- Mission Title
- Progress
- Status
- Duration
- Reward Value

Required States:

- Active
- Completed
- Pending Verification
- Failed
- Archived

---

# Monitoring UI

Monitoring screens should prioritize:

- Device Status
- Active Application
- Focus Status
- App Guard Status
- Connectivity Status

Realtime information should always be visible.

---

# Analytics UI

Analytics should focus on:

- Trends
- Comparisons
- Insights

Preferred Components:

- Summary Cards
- Line Charts
- Bar Charts
- Pie Charts

Avoid overwhelming dashboards.

---

# History UI

History pages should use:

- Activity Feeds
- Tables
- Timelines

Historical information should be easy to scan.

---

# Forms

Every form must include:

- Labels
- Validation Messages
- Loading States
- Error States
- Success Feedback

Never rely on placeholders as labels.

---

# Buttons

Use consistent action hierarchy.

Primary Actions:

Examples:

- Create Mission
- Start Focus Session

Secondary Actions:

Examples:

- Edit
- View Details

Danger Actions:

Examples:

- Delete
- Reset
- Emergency Unlock

---

# Empty States

Every page must support:

- Loading State
- Empty State
- Error State

Blank screens are not allowed.

---

# Responsive Behavior

Minimum Supported Devices:

- Desktop
- Tablet

Desktop experience has priority.

Responsive behavior must not remove critical functionality.

---

# Accessibility

Requirements:

- Keyboard Navigation
- Semantic HTML
- Visible Focus States
- Accessible Forms
- Screen Reader Compatibility

Accessibility is mandatory.

---

# Component Reuse Rules

Before creating a new component:

Ask:

1. Does a similar component already exist?
2. Can an existing component be reused?
3. Can an existing component be extended?

Prefer reuse over duplication.

---

# AI Agent Workflow

Before implementing UI:

1. Read architecture.md
2. Read web/overview.md
3. Read prototypes/mapping.md
4. Review the relevant prototype
5. Identify reusable components
6. Implement according to the design system

Never implement UI directly from assumptions.

---

# Anti-Hallucination Rules

Do not invent:

- New Layouts
- New Navigation Structures
- New Pages
- New Design Systems
- New Interaction Patterns

If UI behavior is not documented:

Ask for clarification.

Do not guess.

---

# Final Rule

Consistency is more important than creativity.

Prototypes are requirements.

The design system is the source of truth.

All UI implementations must follow documented layouts, components, and interactions.
