import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/home/home.component'),
        data: {
          id: 'home',
          title: 'Inicio',
        },
      },
      {
        path: 'about',
        loadComponent: () => import('./modules/about/about.component'),
        data: {
          id: 'about',
          title: 'About Me',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
