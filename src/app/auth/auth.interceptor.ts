import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

// L'intercepteur est enregistré une seule fois dans app.config.ts.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const modifiedReq = req.clone({
    setHeaders: { Authorization: `Bearer ${authService.getToken()}` },
  });
  return next(modifiedReq);
};
