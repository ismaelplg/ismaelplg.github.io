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
        path: 'work',
        loadComponent: () => import('./pages/work/work.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
