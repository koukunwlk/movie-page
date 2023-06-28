import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login, RegisterUser, User } from 'src/app/shared';
import { HttpClient, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticated: boolean = false;
  private user!: User;
  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<User | null> {
    return this.http.post<User>(
      'http://localhost:3000/auth/login',
      credentials
    );
  }

  register(newUser: RegisterUser) {
    return this.http.post('http://localhost:3000/users', newUser);
  }

  userIsAuthenticated(): Observable<boolean> {
    return of(this.isAuthenticated);
  }

  setUser(user: User) {
    this.user = user;
    this.isAuthenticated = true;
  }

  getUser(): User {
    return this.user;
  }
}
