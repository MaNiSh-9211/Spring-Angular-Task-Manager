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
//   selector: 'app-register',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     RouterLink
//   ],
//   template: `
//     <div class="register-container">
//       <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
//         <h2>Register</h2>
        
//         <mat-form-field appearance="outline">
//           <mat-label>Username</mat-label>
//           <input matInput formControlName="username" required>
//         </mat-form-field>

//         <mat-form-field appearance="outline">
//           <mat-label>Password</mat-label>
//           <input matInput type="password" formControlName="password" required>
//         </mat-form-field>

//         <button mat-raised-button color="primary" type="submit" [disabled]="!registerForm.valid">
//           Register
//         </button>

//         <p>Already have an account? <a routerLink="/login">Login here</a></p>
//       </form>
//     </div>
//   `,
//   styles: [`
//     .register-container {
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
// export class RegisterComponent {
//   registerForm = new FormGroup({
//     username: new FormControl('', [Validators.required, Validators.minLength(3)]),
//     password: new FormControl('', [Validators.required, Validators.minLength(6)])
//   });

//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {}

//   onSubmit() {
//     if (this.registerForm.valid) {
//       const { username, password } = this.registerForm.value;
//       this.authService.register(username!, password!).subscribe({
//         next: () => {
//           this.snackBar.open('Registration successful! Please login', 'Close', {
//             duration: 3000
//           });
//           this.router.navigate(['/login']);
//         },
//         error: (error) => {
//           this.snackBar.open(error.message || 'Registration failed', 'Close', {
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
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <div class="register-container">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2>Register</h2>
        
        <mat-form-field appearance="outline">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" required>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="!registerForm.valid">
          Register
        </button>

        <p>Already have an account? <a routerLink="/login">Login here</a></p>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
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
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.authService.register(username!, password!).subscribe({
        next: () => {
          this.snackBar.open('Registration successful! Please login', 'Close', {
            duration: 3000
          });
        },
        error: (error) => {
          const errorMessage = error.error?.includes('User registration failed') 
            ? 'Username already exists' 
            : 'Registration failed';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
        }
      });
    }
  }
}