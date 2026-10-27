import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

// Les pages standalone sont chargées à la demande.
export const routes: Routes = [
  {
    path: 'facesnaps',
    loadChildren: () => import('./face-snaps/face-snaps.routes').then((m) => m.faceSnapsRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./landing-page/landing-page').then((m) => m.LandingPageComponent),
  },
  {
    path: 'create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./face-snaps/new-face-snap/new-face-snap').then((m) => m.NewFaceSnap),
  },
];
