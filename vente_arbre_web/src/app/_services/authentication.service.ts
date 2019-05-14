import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConnectionInfo, AppConfig } from 'app/_models';
import { MainService } from './main/main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends MainService {

  constructor(injector: Injector) {
    super(injector);
  }

  login(connectionInfo: ConnectionInfo) {
    const url = AppConfig.settings.apiUrl + "Auth/Login";

    return this.http.post(url, JSON.stringify(connectionInfo), { headers: this.headers })
      .pipe(map((data: any) => {
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