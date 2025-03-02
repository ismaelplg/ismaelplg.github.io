import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',

        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'experience',

        loadComponent: () => import('./pages/experience/experience.component'),
      },
      {
        path: 'contact',

        loadComponent: () => import('./pages/experience/experience.component'),
      },
      {
        path: 'socials',

        loadComponent: () => import('./pages/experience/experience.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
