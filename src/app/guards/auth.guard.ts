import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = ( route, state ) =>
{
  const router = inject( Router );
  const manager = inject( LoginService ).Manager;
  if ( !manager ) {
    return router.navigate( [ "/login" ] )
  }
  return true;
};

export const redirectLoginIfNotAuth: CanActivateFn = ( route, state ) =>
{
  const router = inject( Router );
  const manager = inject( LoginService ).Manager;
  if ( manager ) {
    return router.navigate( [ "/" ] )
  }
  return true;
};
