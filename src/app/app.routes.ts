import {Routes} from '@angular/router';
import {Authroutes} from './modules/auth/auth.routes';
import {authGuard} from "./core/guards/auth/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    children: Authroutes
  },
  {
    path: 'pets',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/pets/pets.component').then(c => c.PetsComponent)
  }
];
