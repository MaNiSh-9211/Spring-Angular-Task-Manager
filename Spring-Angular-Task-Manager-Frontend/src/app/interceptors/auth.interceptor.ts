import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const authReq = request.clone({
//       withCredentials: true
//     });

//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           this.authService.logout();
//           this.router.navigate(['/login']);
//         }
//         return throwError(() => error);
//       })
//     );
//   }
// }

intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  const authReq = request.clone({
    withCredentials: true 
  });

  return next.handle(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
}
}