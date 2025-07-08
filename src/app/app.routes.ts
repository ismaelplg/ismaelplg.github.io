import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',
        title: 'Home',
        data: {
          icon: 'fa-house',
        },
        loadComponent: () => import('./features/home/home.component'),
      },
      {
        path: 'experience',
        title: 'Experience',
        data: {
          icon: 'fa-suitcase',
        },
        loadComponent: () =>
          import('./features/experience/experience.component'),
      },
      {
        path: 'certifications',
        title: 'Certifications',
        data: {
          icon: 'fa-certificate',
        },
        loadComponent: () =>
          import('./features/certifications/certifications.component'),
      },
      // {
      //   path: 'contact',
      //   title: 'Contact',
      //   data: {
      //     icon: 'fa-certificate',
      //   },
      //   loadComponent: () =>
      //     import('./features/experience/experience.component'),
      // },
      // {
      //   path: 'socials',
      //   title: 'Socials',
      //   loadComponent: () =>
      //     import('./features/experience/experience.component'),
      // },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];
