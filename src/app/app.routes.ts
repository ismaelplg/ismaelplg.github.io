import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',
        title: 'Home',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'experience',
        title: 'Experience',
        loadComponent: () => import('./pages/experience/experience.component'),
      },
      {
        path: 'contact',
        title: 'Contact',
        loadComponent: () => import('./pages/experience/experience.component'),
      },
      {
        path: 'socials',
        title: 'Socials',
        loadComponent: () => import('./pages/experience/experience.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
