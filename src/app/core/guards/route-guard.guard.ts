import { CanActivateFn } from '@angular/router';

export const routeGuardGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user')!) || JSON.parse(sessionStorage.getItem('user')!);
  const roles: string[] = route.data['roles'];

  const find = roles.find(role => role === user?.role);

  if (!find) return false
  return true;
};
