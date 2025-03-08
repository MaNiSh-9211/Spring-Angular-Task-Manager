// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { Router } from '@angular/router';

// export interface User {
//   username: string;
//   password: string;
// }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private apiUrl = 'http://localhost:8080/api/auth';
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   public loading = new BehaviorSubject<boolean>(false);

//   constructor(private http: HttpClient, private router: Router) {
//     // Initialize auth state
//     const storedUser = localStorage.getItem('currentUser');
//     if (storedUser) {
//       this.currentUserSubject.next(JSON.parse(storedUser));
//     }
//   }

//   login(username: string, password: string): Observable<User> {
//     this.loading.next(true);
//     return this.http.post<User>(`${this.apiUrl}/login`, { username, password }, { withCredentials: true })
//       .pipe(
//         tap({
//           next: (user) => {
//             localStorage.setItem('currentUser', JSON.stringify(user));
//             this.currentUserSubject.next(user);
//             this.router.navigate(['/']);
//             this.loading.next(false);
//           },
//           error: () => {
//             this.loading.next(false);
//             this.logout();
//           }
//         })
//       );
//   }

//   register(username: string, password: string): Observable<any> {
//     this.loading.next(true);
//     return this.http.post(`${this.apiUrl}/register`, { username, password })
//       .pipe(
//         tap({
//           next: () => this.loading.next(false),
//           error: () => this.loading.next(false)
//         })
//       );
//   }

//   logout() {
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/login']);
//   }

//   get currentUserValue(): User | null {
//     return this.currentUserSubject.value;
//   }

//   get isAuthenticated(): boolean {
//     return !!this.currentUserValue;
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  username: string;
  password?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // login(username: string, password: string): Observable<any> {
  //   this.loading.next(true);
  //   return this.http.post(
  //     `${this.apiUrl}/login`, 
  //     { username, password }, 
  //     { 
  //       responseType: 'text',
  //       withCredentials: true 
  //     }
  //   ).pipe(
  //     tap({
  //       next: (response) => {
  //         const user = { username };
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //         this.router.navigate(['/']);
  //         this.loading.next(false);
  //       },
  //       error: (error) => {
  //         this.loading.next(false);
  //         this.logout();
  //       }
  //     })
  //   );
  // }

  login(username: string, password: string): Observable<any> {
    this.loading.next(true);
    return this.http.post(
      `${this.apiUrl}/login`, 
      { username, password }, 
      { 
        observe: 'response', 
        withCredentials: true 
      }
    ).pipe(
      tap({
        next: (response) => {
          localStorage.setItem('currentUser', JSON.stringify({ username }));
          this.currentUserSubject.next({ username });
          this.router.navigate(['/tasks']); 
          this.loading.next(false);
        },
        error: (error) => {
          this.loading.next(false);
          this.logout();
        }
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    this.loading.next(true);
    return this.http.post(
      `${this.apiUrl}/register`,
      { username, password },
      { responseType: 'text' }
    ).pipe(
      tap({
        next: () => {
          this.loading.next(false);
          this.router.navigate(['/login']);
        },
        error: () => this.loading.next(false)
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}