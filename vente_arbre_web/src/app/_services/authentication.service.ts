import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { MainService } from 'app/service/main.service';
import { ConnectionInfo } from 'app/_models/connectionInfo.model';

@Injectable()
export class AuthenticationService extends MainService {
    constructor(injector: Injector) {
        super(injector);
    }

    login(connectionInfo: ConnectionInfo) {
        return this.http.post<any>( `${this.apiUrl}Auth/Login`, JSON.stringify(connectionInfo), { headers: this.headers })
        .pipe(map((data : any) => {
                if (data && data['validation'].token) {
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