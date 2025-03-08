import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe,CommonModule ],
  template: `
    <div class="overlay" *ngIf="authService.loading | async">
      <mat-spinner diameter="50"></mat-spinner>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.1);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class LoaderComponent {
  constructor(public authService: AuthService) {}
}