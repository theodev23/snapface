import { Routes } from '@angular/router';

export const faceSnapsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./face-snap-list/face-snap-list').then((m) => m.FaceSnapListComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./single-face-snap/single-face-snap').then((m) => m.SingleFaceSnapComponent),
  },
];
