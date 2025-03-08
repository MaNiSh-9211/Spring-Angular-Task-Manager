// import { Component } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { RouterLink } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     RouterLink
//   ],
//   template: `
//     <div class="login-container">
//       <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
//         <h2>Login</h2>
        
//         <mat-form-field appearance="outline">
//           <mat-label>Username</mat-label>
//           <input matInput formControlName="username" required>
//         </mat-form-field>

//         <mat-form-field appearance="outline">
//           <mat-label>Password</mat-label>
//           <input matInput type="password" formControlName="password" required>
//         </mat-form-field>

//         <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid">
//           Login
//         </button>

//         <p>Don't have an account? <a routerLink="/register">Register here</a></p>
//       </form>
//     </div>
//   `,
//   styles: [`
//     .login-container {
//       max-width: 400px;
//       margin: 2rem auto;
//       padding: 2rem;
//       background: white;
//       border-radius: 8px;
//       box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//     }
    
//     form {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//     }
    
//     button {
//       margin-top: 1rem;
//     }
//   `]
// })
// export class LoginComponent {
//   loginForm = new FormGroup({
//     username: new FormControl('', Validators.required),
//     password: new FormControl('', Validators.required)
//   });

//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {}

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const { username, password } = this.loginForm.value;
//       this.authService.login(username!, password!).subscribe({
//         next: () => {
//           this.router.navigate(['/tasks']);
//         },
//         error: (error) => {
//           this.snackBar.open(error.message || 'Login failed', 'Close', {
//             duration: 3000
//           });
//         }
//       });
//     }
//   }
// }

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <div class="login-container">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h2>Login</h2>
        
        <mat-form-field appearance="outline">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" required>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid">
          Login
        </button>

        <p>Don't have an account? <a routerLink="/register">Register here</a></p>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    button {
      margin-top: 1rem;
    }
  `]
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username!, password!).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (error) => {

          let errorMessage = 'Unknown error occurred';
          
          if (error.error?.message) {

            errorMessage = error.error.message;
          } else if (error.message) {


            errorMessage = error.message;
          }
  
          if (error.status === 401) {
            errorMessage = 'Invalid username or password';
          } else if (error.status === 0) {
            errorMessage = 'Unable to connect to the server';
          }
  
          this.snackBar.open(`Login failed: ${errorMessage}`, 'Close', { 
            duration: 5000 
          });
        }
      });
    }
  }
}