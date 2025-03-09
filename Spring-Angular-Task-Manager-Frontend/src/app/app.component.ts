import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    DashboardComponent,
    LoaderComponent,
    MatProgressSpinnerModule,
    RouterModule
  ],
  providers: [provideNativeDateAdapter()],
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-loader></app-loader>
`,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}