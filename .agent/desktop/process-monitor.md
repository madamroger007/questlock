# Process Monitoring Specification

This document defines how Process Monitoring works within QuestLock.

Process Monitoring is a core Desktop Layer service.

Its purpose is to observe application activity required for productivity enforcement and focus verification.

Process Monitoring is not intended for surveillance or detailed user behavior tracking.

If implementation conflicts with this document:

This document wins.

---

# Purpose

Process Monitoring exists to:

- Detect running applications
- Detect blocked applications
- Identify active applications
- Support App Guard enforcement
- Support Focus Session verification
- Generate activity events

Process Monitoring provides operational data for the Desktop Layer.

It does not make business decisions.

---

# Related Systems

Process Monitoring supports:

- App Guard
- Focus Sessions
- Activity Tracking
- Analytics
- Realtime Status Updates

Related Documentation:

- desktop/app-guard.md
- architecture.md
- shared/events.md

---

# Core Responsibilities

## Process Scanning

Purpose:

Identify running applications on the device.

Responsibilities:

- Detect active processes
- Track process lifecycle
- Detect process start
- Detect process termination

Examples:

- steam.exe
- valorant.exe
- code.exe
- chrome.exe

---

## Active Window Detection

Purpose:

Identify which application currently has user focus.

Responsibilities:

- Detect foreground window
- Detect active application
- Detect focus changes

Examples:

VS Code
→ Active

Chrome
→ Background

Result:

VS Code receives focus time.

---

## Focus Tracking

Purpose:

Measure productive activity.

Responsibilities:

- Associate active application with focus sessions
- Track productive duration
- Validate application-based missions

Examples:

Mission:

"Study Programming"

Allowed Applications:

- VS Code
- IntelliJ
- Browser Documentation

Only active time inside approved applications contributes toward mission progress.

---

## Application Classification

Purpose:

Categorize applications for enforcement and analytics.

Categories may include:

- Productivity
- Development
- Education
- Entertainment
- Games
- Communication
- Unknown

Classification data supports:

- Analytics
- App Guard
- Mission Validation

Classification rules must be documented.

---

# Monitoring Flow

Application Starts

↓

Process Monitor Detects Process

↓

Application Classified

↓

Active Window Tracked

↓

Focus Time Recorded

↓

Activity Event Generated

↓

Local Cache Updated

↓

Synchronization Queue Updated

---

# Data Collection Rules

Only collect information necessary for:

- Enforcement
- Focus Tracking
- Analytics
- Synchronization

Allowed Data:

- Process Name
- Executable Name
- Window Title
- Start Timestamp
- End Timestamp
- Active Duration
- Application Category

---

# Privacy Rules

Never collect:

- Keystrokes
- Clipboard Data
- Screen Contents
- Screenshots
- Microphone Data
- Camera Data
- Browser History
- File Contents
- User Documents

QuestLock is a productivity enforcement platform.

It is not monitoring software.

---

# Active Window Rules

Only one application can be active at a time.

Focus duration must be attributed to:

Current Active Window

Rules:

- Background applications receive no focus time
- Minimized applications receive no focus time
- Hidden windows receive no focus time

Only foreground activity contributes to focus tracking.

---

# Focus Session Integration

Process Monitoring supports mission validation.

Example:

Mission:

Learn Rust

Approved Applications:

- VS Code
- RustRover
- Browser Documentation

Focus Session receives progress only when:

1. Session is active
2. Approved application is active
3. User focus is detected

---

# App Guard Integration

Process Monitoring provides process information to App Guard.

Flow:

Process Detected

↓

App Guard Evaluation

↓

Rule Validation

↓

Allow OR Block

↓

Event Generated

Process Monitoring never decides whether an application should be blocked.

That decision belongs to App Guard.

---

# Event Generation

Process Monitoring may generate events such as:

- ProcessStarted
- ProcessStopped
- ActiveWindowChanged
- FocusStarted
- FocusEnded

All events must be documented in:

shared/events.md

Do not create undocumented events.

---

# Local Storage

Process Monitoring may store temporary state in SQLite.

Examples:

- Current Active Application
- Recent Focus Activity
- Synchronization Queue

SQLite remains cache only.

PostgreSQL remains the source of truth.

---

# Synchronization Rules

Before synchronization:

Normalize collected data.

Requirements:

- Consistent timestamps
- Standardized application names
- Standardized categories
- Deduplicated records

Raw monitoring data must never be sent directly to backend systems.

---

# Performance Requirements

Process Monitoring runs continuously.

Performance is critical.

Requirements:

CPU Usage:

- Minimal while idle
- Efficient under load

Memory Usage:

- Low memory footprint
- No unbounded growth

Storage Usage:

- Efficient local caching
- Automatic cleanup

---

# Monitoring Frequency

Monitoring should be event-driven whenever possible.

Avoid aggressive polling.

Rules:

- Prefer OS events
- Prefer process lifecycle events
- Minimize polling frequency

Process Monitoring must not negatively impact user experience.

---

# Security Rules

Process Monitoring must:

- Respect user privacy
- Limit collected data
- Protect local records
- Prevent unauthorized access

Monitoring data must never expose sensitive user information.

---

# AI Agent Checklist

Before modifying Process Monitoring:

Ask:

1. Does this support enforcement?
2. Does this support focus tracking?
3. Does this collect unnecessary data?
4. Does this affect privacy?
5. Does this affect performance?
6. Does this affect App Guard?
7. Does this affect synchronization?

If YES:

Review:

- architecture.md
- desktop/app-guard.md
- shared/events.md

Before implementation.

---

# Anti-Hallucination Rules

Do not invent:

- Monitoring categories
- Tracking systems
- Surveillance features
- Data collection methods
- Events

If behavior is not documented:

Ask for clarification.

Do not guess.

---

# Final Rule

Process Monitoring exists to support:

- Focus Verification
- App Guard Enforcement
- Productivity Analytics

Collect only the minimum information necessary.

Performance and privacy are mandatory requirements.
