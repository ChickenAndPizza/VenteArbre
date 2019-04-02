import { Injectable, Injector } from '@angular/core';
import { MainService } from '..';
import { User } from 'app/_models';

@Injectable()
export class UserService extends MainService {

    constructor(injector: Injector) {
        super(injector);
    }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}Customer`);
    }

    getById(id: number) {
        return this.http.get(`${this.apiUrl}Customer/` + id);
    }

    register(user: User) {
        return this.http.post(`${this.apiUrl}Customer`, user);
    }

    update(user: User) {
        return this.http.put(`${this.apiUrl}Customer/` + user.id, user);
    }

    delete(id: string) {
        return this.http.delete(`${this.apiUrl}Customer/` + id);
    }
}