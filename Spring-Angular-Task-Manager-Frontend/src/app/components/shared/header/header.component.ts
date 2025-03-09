import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule
  ],
  template: `
    <mat-toolbar color="primary">
      <!-- Logo Section -->
      <div class="logo-section">
        <mat-icon>task_alt</mat-icon>
        <span class="app-name">Task Manager</span>
      </div>

      <!-- Navigation Links -->
      <button mat-button routerLink="/home">Home</button>
      <button mat-button routerLink="/about">About</button>
      <button mat-button routerLink="/tasks">Tasks</button>

      <div class="spacer"></div>

      <!-- User Section -->
      <div *ngIf="authService.isAuthenticated" class="user-section">
        <span class="welcome-message">Welcome, {{ authService.currentUserValue?.username }}!</span>
        <button mat-raised-button color="warn" (click)="logout()">
          <mat-icon>logout</mat-icon>
          Logout
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
    }
    .logo-section {
      display: flex;
      align-items: center;
      margin-right: 2rem;
      mat-icon {
        margin-right: 0.5rem;
      }
      .app-name {
        font-weight: 500;
      }
    }
    .user-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      .welcome-message {
        margin-right: 1rem;
      }
    }
    button.mat-button {
      margin: 0 0.5rem;
    }
  `]
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}