import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';
  private currentUser: string | null = null;

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string, username: string }>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
        this.currentUser = response.username;
        return response;
      }));
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
