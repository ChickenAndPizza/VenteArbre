import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'app/_services';

declare interface ErrorInfo {
    message: string;
    abr: string;
    reload: boolean;
    logout: boolean;
  }
  
  export const ERRORS: ErrorInfo[] = [
    { message: 'Courriel ou mot de passe invalide', abr: 'emailpassword', reload: false, logout: true },
    { message: 'Vous ne pouvez pas supprimer cet administrateur', abr: 'deleteadmin', reload: false, logout: false },
];

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                console.log(err);

                if (err.error){
                    let errorToTreat = ERRORS.find(error => error.message === err.error.message);
                    if (errorToTreat.reload){
                        location.reload(true);
                    }
                    if (errorToTreat.logout){
                        this.authenticationService.logout();
                    }
                }
                
                /*if (err.error && err.error.message != "Courriel ou mot de passe invalide") {
                    if (err.error && err.error.message != "Vous ne pouvez pas supprimer cet administrateur") {
                        location.reload(true);
                    }
                }
                // auto logout if 401 response returned from api
                this.authenticationService.logout();*/
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}