import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@domain/auth/services/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //Só acessa as rotas de Auth se não estiver logado
  if (authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
