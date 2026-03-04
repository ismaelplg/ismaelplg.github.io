import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./public/layout/layout.component'),
    },
    {
        path: 'sign-in',
        loadComponent: () => import('./public/modules/sign-in/sign-in'),
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin/layout/layout'),
    },
    {
        path: '**',
        redirectTo: '',
    },
]
