import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // Exemplo para adicionar token Bearer no cabeçalho das requisições
  // const authToken = 'TOKEN_EXAMPLE';

  // const reqClone = req.clone({
  //   setHeaders: {
  //     Authorization: `Bearer ${authToken}`
  //   }
  // });

  return next(req)
};
