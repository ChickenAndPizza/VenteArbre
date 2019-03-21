import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MainService } from 'app/service/main.service';

@Injectable()
export class AuthenticationService extends MainService {
    
    constructor(injector: Injector) {
        super(injector);
    }

    login(email: string, password: string) {
        console.log(`${this.apiUrl}customer/connection`);
        return this.http.post<any>(`${this.apiUrl}/user/connection`, { email: email, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}