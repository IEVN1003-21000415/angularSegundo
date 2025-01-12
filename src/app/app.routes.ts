import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren:() => import('./auth/features/auth.rotes')
    },
    {
        path:'formularios',
        loadChildren:() => import('./formularios/formularios.routes')
    },
];
    