import {Routes} from "@angular/router";

export const ProductsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products.component').then(c => c.ProductsComponent) // Lazy loading
  }
];
