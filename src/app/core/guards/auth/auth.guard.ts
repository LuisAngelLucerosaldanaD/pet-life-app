import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {

  const _router = inject(Router);

  const token = sessionStorage.getItem('access_token');

  if (!token) {
    _router.navigateByUrl('/auth/login');
    return false;
  }

  return true;
};
