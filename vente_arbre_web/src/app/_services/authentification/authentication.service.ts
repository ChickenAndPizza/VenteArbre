import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConnectionInfo } from 'app/_models';
import { MainService } from '../main/main.service';

@Injectable()
export class AuthenticationService extends MainService {
    constructor(injector: Injector) {
        super(injector);
    }

    login(connectionInfo: ConnectionInfo) {
        return this.http.post<any>( `${this.apiUrl}Auth/Login`, JSON.stringify(connectionInfo), { headers: this.headers })
        .pipe(map((data : any) => {
                if (data) {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                }
                return data;
            })
        );
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}