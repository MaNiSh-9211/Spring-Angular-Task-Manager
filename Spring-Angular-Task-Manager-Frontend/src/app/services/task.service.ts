
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, catchError, throwError, tap } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class TaskService {
//   private apiUrl = 'http://localhost:8080/api/tasks';

//   constructor(private http: HttpClient) {}

//   private handleError(error: HttpErrorResponse) {
//     console.error('API Error:', error);
//     return throwError(() => new Error(
//       error.error?.message || error.message || 'Server error occurred'
//     ));
//   }

//   getAllTasks(): Observable<any> {
//     return this.http.get(this.apiUrl).pipe(
//       catchError(this.handleError)
//     );
//   }

//   getTaskById(id: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   createTask(task: any): Observable<any> {
//     // Format dates and handle data transformation
//     const formattedTask = {
//       ...task,
//       dueDate: task.dueDate?.toISOString() // Convert Date to ISO string
//     };

//     return this.http.post(this.apiUrl, formattedTask).pipe(
//       tap(() => console.log('Task created successfully:', formattedTask)),
//       catchError(this.handleError)
//     );
//   }

//   updateTask(id: number, task: any): Observable<any> {
//     const formattedTask = {
//       ...task,
//       dueDate: task.dueDate?.toISOString()
//     };

//     return this.http.put(`${this.apiUrl}/${id}`, formattedTask).pipe(
//       tap(() => console.log('Task updated successfully:', formattedTask)),
//       catchError(this.handleError)
//     );
//   }

//   deleteTask(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`).pipe(
//       tap(() => console.log('Task deleted successfully:', id)),
//       catchError(this.handleError)
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error(
      error.error?.message || error.message || 'Server error occurred'
    ));
  }


  getAllTasks(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  createTask(task: any): Observable<any> {
    const formattedTask = {
      ...task,
      dueDate: task.dueDate?.toISOString()
    };

    return this.http.post(this.apiUrl, formattedTask, { withCredentials: true }).pipe(
      tap(() => console.log('Task created successfully:', formattedTask)),
      catchError(this.handleError)
    );
  }

  updateTask(id: number, task: any): Observable<any> {
    const formattedTask = {
      ...task,
      dueDate: task.dueDate?.toISOString()
    };

    return this.http.put(`${this.apiUrl}/${id}`, formattedTask, { withCredentials: true }).pipe(
      tap(() => console.log('Task updated successfully:', formattedTask)),
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
      tap(() => console.log('Task deleted successfully:', id)),
      catchError(this.handleError)
    );
  }
}
