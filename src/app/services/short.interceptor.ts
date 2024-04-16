import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const shortInterceptor: HttpInterceptorFn = (req, next) => {
  const TOKEN = "92dc3669ab1aef75d526a2475523eb48819e0c2e";
  req = req.clone({setHeaders: {Authorization: "Bearer " + TOKEN}});
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    return throwError(error);
  }));
};
