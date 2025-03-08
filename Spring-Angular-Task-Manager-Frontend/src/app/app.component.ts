// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from './services/auth.service';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],

  imports: [
    RouterOutlet,
    MatProgressSpinnerModule,
    LoaderComponent
  ],
  template: `
    <app-loader></app-loader>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}