import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/card-gallery/card-gallery').then((m) => m.CardGallery),
  },
  {
    path: 'editor',
    loadComponent: () =>
      import('./features/card-editor/card-editor').then((m) => m.CardEditor),
  },
  { path: '**', redirectTo: '' },
];
