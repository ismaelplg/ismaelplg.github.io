import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component'),
      },
      {
        path: 'experience',

        loadComponent: () =>
          import('./features/experience/experience.component'),
      },
      {
        path: 'certifications',

        loadComponent: () =>
          import('./features/certifications/certifications.component'),
      },
      {
        path: 'contact',

        loadComponent: () =>
          import('./features/experience/experience.component'),
      },
      {
        path: 'socials',

        loadComponent: () =>
          import('./features/experience/experience.component'),
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
