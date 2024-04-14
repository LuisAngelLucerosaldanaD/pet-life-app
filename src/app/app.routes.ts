import {Routes} from '@angular/router';
import {Authroutes} from './modules/auth/auth.routes';
import {authGuard} from "./core/guards/auth/auth.guard";
import {ProductsRoutes} from "./modules/products/products.routes";

export const routes: Routes = [
  {
    path: 'auth',
    children: Authroutes
  },
  {
    path: 'pets',
    canActivate: [authGuard],
    loadComponent: () => import('./modules/pets/pets.component').then(c => c.PetsComponent)
  },
  {
    path: 'products',
    canActivate: [authGuard],
    children: ProductsRoutes
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
