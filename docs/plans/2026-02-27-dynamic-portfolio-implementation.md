# Dynamic Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform static portfolio into dynamic app with public site + admin dashboard, connected to existing Node.js/Express backend.

**Architecture:** Single Angular app with lazy-loaded public and admin routes. Auth guard protects admin. API services singleton. Feature-based organization.

**Tech Stack:** Angular 20, Tailwind CSS 4, Node.js/Express backend (existing)

---

## Pre-requisites

1. Identify backend API URL and endpoints (add to `src/environments/environment.ts`)
2. Confirm auth endpoint (login) and JWT structure

---

## Phase 1: Core Infrastructure

### Task 1: Create Core Auth Service

**Files:**

- Create: `src/app/core/services/auth.service.ts`
- Modify: `src/environments/environment.ts`

**Step 1: Add backend config**

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
};
```

**Step 2: Create AuthService**

```typescript
import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { environment } from "../../environments/environment";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly API_URL = environment.apiUrl;

  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser() {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user");
    if (token && user) {
      this.isAuthenticated.set(true);
      this.currentUser.set(JSON.parse(user));
    }
  }

  login(credentials: LoginRequest) {
    return this.http.post<{ token: string; user: User }>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        this.currentUser.set(response.user);
        this.isAuthenticated.set(true);
      }),
    );
  }

  logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(["/admin/login"]);
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }
}
```

**Step 3: Commit**

```bash
git add src/app/core/services/auth.service.ts src/environments/environment.ts
git commit -m "feat: add auth service with login/logout"
```

---

### Task 2: Create Auth Guard

**Files:**

- Create: `src/app/core/guards/auth.guard.ts`

**Step 1: Write auth guard**

```typescript
import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(["/admin/login"]);
  return false;
};
```

**Step 2: Commit**

```bash
git add src/app/core/guards/auth.guard.ts
git commit -m "feat: add auth guard for protected routes"
```

---

### Task 3: Create Auth Interceptor

**Files:**

- Create: `src/app/core/interceptors/auth.interceptor.ts`

**Step 1: Write auth interceptor**

```typescript
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
```

**Step 2: Update app.config.ts to register interceptor**

```typescript
// src/app/app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";

import { routes } from "./app.routes";
import { authInterceptor } from "./core/interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection(), provideRouter(routes), provideHttpClient(withFetch(), withInterceptors([authInterceptor]))],
};
```

**Step 3: Commit**

```bash
git add src/app/core/interceptors/auth.interceptor.ts src/app/app.config.ts
git commit -m "feat: add auth interceptor and register in app config"
```

---

## Phase 2: API Services

### Task 4: Create Profile Service

**Files:**

- Create: `src/app/services/profile.service.ts`

**Step 1: Create profile service**

```typescript
import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { tap } from "rxjs/operators";

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
}

@Injectable({ providedIn: "root" })
export class ProfileService {
  private readonly API_URL = `${environment.apiUrl}/profile`;

  profile = signal<Profile | null>(null);
  loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getProfile() {
    this.loading.set(true);
    return this.http.get<Profile>(this.API_URL).pipe(
      tap((p) => {
        this.profile.set(p);
        this.loading.set(false);
      }),
    );
  }

  updateProfile(data: Partial<Profile>) {
    return this.http.put<Profile>(this.API_URL, data).pipe(tap((p) => this.profile.set(p)));
  }
}
```

**Step 2: Commit**

```bash
git add src/app/services/profile.service.ts
git commit -m "feat: add profile service"
```

---

### Task 5: Create Projects Service

**Files:**

- Create: `src/app/services/projects.service.ts`

**Step 1: Create projects service**

```typescript
import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { tap } from "rxjs/operators";

export interface Project {
  id: string;
  title: string;
  type: string;
  image: string;
  imageAlt?: string;
  description: string;
  status: "in-progress" | "completed" | "paused" | "canceled" | "in-queue";
  link?: string;
  technologies?: string[];
}

@Injectable({ providedIn: "root" })
export class ProjectsService {
  private readonly API_URL = `${environment.apiUrl}/projects`;

  projects = signal<Project[]>([]);
  loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getProjects() {
    this.loading.set(true);
    return this.http.get<Project[]>(this.API_URL).pipe(
      tap((projects) => {
        this.projects.set(projects);
        this.loading.set(false);
      }),
    );
  }

  getProject(id: string) {
    return this.http.get<Project>(`${this.API_URL}/${id}`);
  }

  createProject(data: Partial<Project>) {
    return this.http.post<Project>(this.API_URL, data).pipe(tap((project) => this.projects.update((p) => [...p, project])));
  }

  updateProject(id: string, data: Partial<Project>) {
    return this.http.put<Project>(`${this.API_URL}/${id}`, data).pipe(tap((project) => this.projects.update((p) => p.map((item) => (item.id === id ? project : item)))));
  }

  deleteProject(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(tap(() => this.projects.update((p) => p.filter((item) => item.id !== id))));
  }
}
```

**Step 2: Commit**

```bash
git add src/app/services/projects.service.ts
git commit -m "feat: add projects service"
```

---

### Task 6: Create Experience Service

**Files:**

- Create: `src/app/services/experience.service.ts`

**Step 1: Create experience service**

```typescript
import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { tap } from "rxjs/operators";

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies?: string[];
}

@Injectable({ providedIn: "root" })
export class ExperienceService {
  private readonly API_URL = `${environment.apiUrl}/experiences`;

  experiences = signal<Experience[]>([]);
  loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getExperiences() {
    this.loading.set(true);
    return this.http.get<Experience[]>(this.API_URL).pipe(
      tap((experiences) => {
        this.experiences.set(experiences);
        this.loading.set(false);
      }),
    );
  }

  createExperience(data: Partial<Experience>) {
    return this.http.post<Experience>(this.API_URL, data).pipe(tap((exp) => this.experiences.update((e) => [...e, exp])));
  }

  updateExperience(id: string, data: Partial<Experience>) {
    return this.http.put<Experience>(`${this.API_URL}/${id}`, data).pipe(tap((exp) => this.experiences.update((e) => e.map((item) => (item.id === id ? exp : item)))));
  }

  deleteExperience(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(tap(() => this.experiences.update((e) => e.filter((item) => item.id !== id))));
  }
}
```

**Step 2: Commit**

```bash
git add src/app/services/experience.service.ts
git commit -m "feat: add experience service"
```

---

### Task 7: Create Messages Service

**Files:**

- Create: `src/app/services/messages.service.ts`

**Step 1: Create messages service**

```typescript
import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { tap } from "rxjs/operators";

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

@Injectable({ providedIn: "root" })
export class MessagesService {
  private readonly API_URL = `${environment.apiUrl}/messages`;

  messages = signal<Message[]>([]);
  loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getMessages() {
    this.loading.set(true);
    return this.http.get<Message[]>(this.API_URL).pipe(
      tap((messages) => {
        this.messages.set(messages);
        this.loading.set(false);
      }),
    );
  }

  deleteMessage(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(tap(() => this.messages.update((m) => m.filter((item) => item.id !== id))));
  }

  markAsRead(id: string) {
    return this.http.patch<Message>(`${this.API_URL}/${id}/read`, {}).pipe(tap((message) => this.messages.update((m) => m.map((item) => (item.id === id ? message : item)))));
  }
}
```

**Step 2: Commit**

```bash
git add src/app/services/messages.service.ts
git commit -m "feat: add messages service"
```

---

## Phase 3: Shared Models

### Task 8: Create TypeScript Models

**Files:**

- Create: `src/app/shared/models/profile.model.ts`
- Create: `src/app/shared/models/project.model.ts`
- Create: `src/app/shared/models/experience.model.ts`
- Create: `src/app/shared/models/message.model.ts`

**Step 1: Create models (export interfaces from services, create barrel file)**

```typescript
// src/app/shared/models/index.ts
export * from "./profile.model";
export * from "./project.model";
export * from "./experience.model";
export * from "./message.model";
```

**Note:** The interfaces are already defined in services. For better organization, move them to shared/models and import from there.

**Step 2: Commit**

```bash
git add src/app/shared/models/
git commit -m "refactor: add shared models"
```

---

## Phase 4: Reorganize Public Site

### Task 9: Move Public Components to Features

**Files:**

- Create: `src/app/features/public/home/`
- Create: `src/app/features/public/about/`
- Create: `src/app/features/public/projects/`
- Create: `src/app/features/public/experience/`
- Create: `src/app/features/public/contact/`
- Move: Move existing components from `src/app/modules/` to `src/app/features/public/`

**Step 1: Move files**

```bash
# Create directories
mkdir -p src/app/features/public/{home,about,projects,experience,contact}

# Move (assuming existing files)
# home.component.ts → src/app/features/public/home/home.component.ts
# about.component.ts → src/app/features/public/about/about.component.ts
# etc.
```

**Step 2: Update component decorators to new paths**

Update `templateUrl` and `styleUrl` paths in each component.

**Step 3: Commit**

```bash
git add src/app/features/public/
git commit -m "refactor: reorganize public components into features folder"
```

---

### Task 10: Update Public Routes

**Files:**

- Modify: `src/app/app.routes.ts`

**Step 1: Update routes**

```typescript
import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadComponent: () => import("./features/public/home/home.component"),
        data: { id: "home", title: "Inicio" },
      },
      {
        path: "about",
        loadComponent: () => import("./features/public/about/about.component"),
        data: { id: "about", title: "About Me" },
      },
      {
        path: "projects",
        loadComponent: () => import("./features/public/projects/projects.component"),
        data: { id: "projects", title: "Projects" },
      },
      {
        path: "experience",
        loadComponent: () => import("./features/public/experience/experience.component"),
        data: { id: "experience", title: "Experience" },
      },
      {
        path: "contact",
        loadComponent: () => import("./features/public/contact/contact.component"),
        data: { id: "contact", title: "Contact" },
      },
    ],
  },
  {
    path: "**",
    redirectTo: "",
  },
];
```

**Step 2: Commit**

```bash
git add src/app/app.routes.ts
git commit -m "feat: add public routes for all pages"
```

---

## Phase 5: Admin Dashboard

### Task 11: Create Admin Layout

**Files:**

- Create: `src/app/features/admin/layout/admin-layout.component.ts`
- Create: `src/app/features/admin/layout/admin-layout.component.html`
- Create: `src/app/features/admin/layout/admin-layout.component.css`

**Step 1: Create admin layout**

```typescript
import { Component } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-admin-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./admin-layout.component.html",
})
export class AdminLayoutComponent {
  navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "home" },
    { path: "/admin/profile", label: "Profile", icon: "user" },
    { path: "/admin/projects", label: "Projects", icon: "folder" },
    { path: "/admin/experiences", label: "Experiences", icon: "briefcase" },
    { path: "/admin/messages", label: "Messages", icon: "mail" },
  ];

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
```

**Step 2: Create template**

```html
<div class="admin-layout">
  <aside class="sidebar">
    <h2>Admin</h2>
    <nav>
      @for (item of navItems; track item.path) {
      <a [routerLink]="item.path" routerLinkActive="active">{{ item.label }}</a>
      }
    </nav>
    <button (click)="logout()">Logout</button>
  </aside>
  <main class="content">
    <router-outlet></router-outlet>
  </main>
</div>
```

**Step 3: Commit**

```bash
git add src/app/features/admin/layout/
git commit -m "feat: create admin layout component"
```

---

### Task 12: Create Admin Routes

**Files:**

- Modify: `src/app/app.routes.ts`

**Step 1: Add admin routes**

```typescript
import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  // Public routes (existing)
  {
    path: "",
    component: LayoutComponent,
    children: [
      /* ... */
    ],
  },

  // Admin routes
  {
    path: "admin",
    canActivate: [authGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "login",
        loadComponent: () => import("./features/admin/login/login.component"),
      },
      {
        path: "",
        loadComponent: () => import("./features/admin/layout/admin-layout.component"),
        children: [
          {
            path: "dashboard",
            loadComponent: () => import("./features/admin/dashboard/dashboard.component"),
          },
          {
            path: "profile",
            loadComponent: () => import("./features/admin/profile/profile-form/profile-form.component"),
          },
          {
            path: "projects",
            loadComponent: () => import("./features/admin/projects/projects-list/projects-list.component"),
          },
          {
            path: "projects/new",
            loadComponent: () => import("./features/admin/projects/project-form/project-form.component"),
          },
          {
            path: "projects/:id/edit",
            loadComponent: () => import("./features/admin/projects/project-form/project-form.component"),
          },
          {
            path: "experiences",
            loadComponent: () => import("./features/admin/experiences/experiences-list/experiences-list.component"),
          },
          {
            path: "experiences/new",
            loadComponent: () => import("./features/admin/experiences/experience-form/experience-form.component"),
          },
          {
            path: "experiences/:id/edit",
            loadComponent: () => import("./features/admin/experiences/experience-form/experience-form.component"),
          },
          {
            path: "messages",
            loadComponent: () => import("./features/admin/messages/messages-list/messages-list.component"),
          },
        ],
      },
    ],
  },

  {
    path: "**",
    redirectTo: "",
  },
];
```

**Step 2: Commit**

```bash
git add src/app/app.routes.ts
git commit -m "feat: add admin routes with auth guard"
```

---

### Task 13: Create Admin Components

**Files to create:**

- `src/app/features/admin/login/login.component.ts`
- `src/app/features/admin/dashboard/dashboard.component.ts`
- `src/app/features/admin/projects/projects-list/projects-list.component.ts`
- `src/app/features/admin/projects/project-form/project-form.component.ts`
- `src/app/features/admin/experiences/experiences-list/experiences-list.component.ts`
- `src/app/features/admin/experiences/experience-form/experience-form.component.ts`
- `src/app/features/admin/messages/messages-list/messages-list.component.ts`
- `src/app/features/admin/profile/profile-form/profile-form.component.ts`

**Note:** These are CRUD components - each follows similar pattern:

- List: table with data from service, add/edit/delete buttons
- Form: reactive form with validation, save/cancel buttons

**For each component:**

1. Inject relevant service
2. Use signals to manage state
3. Connect to API
4. Use shared UI components where possible

**Commit after creating all admin components:**

```bash
git add src/app/features/admin/
git commit -m "feat: add all admin dashboard components"
```

---

## Phase 6: Connect Public Site to API

### Task 14: Update Public Components to Use API

**Files:**

- Modify: Public components in `src/app/features/public/`

**Step 1: Update home component to fetch profile**

```typescript
import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileService } from "../../../services/profile.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  profileService = inject(ProfileService);

  profile = this.profileService.profile;
  loading = this.profileService.loading;

  ngOnInit() {
    this.profileService.getProfile().subscribe();
  }
}
```

**Step 2: Similar updates for about, projects, experience, contact**

**Step 3: Commit**

```bash
git add src/app/features/public/
git commit -m "feat: connect public components to API"
```

---

## Phase 7: Testing & Verification

### Task: Test Full Flow

**Steps:**

1. Start backend: `npm run dev` ( 18in backend project)
2. Start frontend: `npm start`
3. Test public site loads
4. Test `/admin/login` loads
5. Test login with credentials
6. Test CRUD operations in admin
7. Test logout

**Step: Commit**

```bash
git add .
git commit -m "feat: complete dynamic portfolio with admin dashboard"
```

---

## Summary

| Phase | Tasks | Description              |
| ----- | ----- | ------------------------ |
| 1     | 1-3   | Core auth infrastructure |
| 2     | 4-7   | API services             |
| 3     | 8     | Shared models            |
| 4     | 9-10  | Reorganize public site   |
| 5     | 11-13 | Admin dashboard          |
| 6     | 14    | Connect to API           |
| 7     | 15-18 | Testing & cleanup        |

**Total: 18 tasks**
