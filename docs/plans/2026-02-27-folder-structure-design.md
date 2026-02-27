# Dynamic Portfolio Website - Folder Structure Design

**Date:** 2026-02-27  
**Status:** Approved

## Overview

Reorganize the existing static portfolio website into a dynamic application with a public-facing site and an admin dashboard, powered by an existing Node.js/Express backend.

## Architecture Decision

**Single Angular app with lazy-loaded routes** for public and admin sections.

| Reason               | Benefit                |
| -------------------- | ---------------------- |
| Shared UI components | No code duplication    |
| Reusable auth guards | Single auth flow       |
| Lazy loading         | Smaller initial bundle |
| Single deployment    | One pipeline           |

## Proposed Folder Structure

```
src/app/
├── core/                           # Authentication & security
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   └── services/
│       └── auth.service.ts
│
├── shared/                         # Reusable UI (existing)
│   ├── components/
│   │   ├── navbar/
│   │   ├── sidepanel/
│   │   ├── logotype/
│   │   └── container/
│   ├── models/
│   │   └── contact.interface.ts   # + new: profile, project, experience models
│   └── services/
│       ├── theme.service.ts
│       ├── sidepanel.service.ts
│       └── email.service.ts
│
├── services/                       # API services (singletons)
│   ├── profile.service.ts
│   ├── projects.service.ts
│   ├── experience.service.ts
│   └── messages.service.ts
│
├── features/
│   ├── public/                     # Public site (lazy loaded)
│   │   ├── home/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── experience/
│   │   └── contact/
│   │
│   └── admin/                      # Dashboard (lazy loaded, guarded)
│       ├── layout/
│       │   ├── admin-layout.component.ts
│       │   └── admin-layout.component.html
│       ├── dashboard/
│       ├── profile/
│       ├── projects/
│       │   ├── projects-list/
│       │   └── project-form/
│       ├── experiences/
│       │   ├── experiences-list/
│       │   └── experience-form/
│       └── messages/
│
├── layout/                         # Main app layout (existing)
│   └── layout.component.ts
│
└── app.routes.ts                   # Route configuration
```

## Key Design Decisions

### 1. Services at Root Level

API services use `providedIn: 'root'` for true singleton behavior across features.

### 2. Feature-based Organization

Each admin feature (projects, experiences, messages) has its own folder with list and form components.

### 3. Lazy Loading

- `/` → Public site
- `/admin/**` → Dashboard (lazy loaded, auth guarded)

### 4. Auth Flow

- `AuthService` manages token storage and user state
- `AuthGuard` protects admin routes
- `AuthInterceptor` adds JWT to API requests

## API Endpoints (Expected)

| Entity      | Methods                |
| ----------- | ---------------------- |
| Profile     | GET, PUT               |
| Projects    | GET, POST, PUT, DELETE |
| Experiences | GET, POST, PUT, DELETE |
| Messages    | GET, DELETE            |

## Next Steps

1. Move/create core auth infrastructure
2. Create API services
3. Reorganize existing public components into `features/public/`
4. Create admin layout and routes
5. Create admin feature components
6. Connect to backend API
