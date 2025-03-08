import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { AuthService } from '../../services/auth.service';
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    HeaderComponent,
    RouterOutlet
  ],
  template: `
    <div class="dashboard-container">
      <!-- Missing router-outlet -->
      <router-outlet></router-outlet> <!-- Add this -->
    </div>
  `,
  styles: [/* Keep existing styles */]

})
export class DashboardComponent {
  constructor(public authService: AuthService) {}
}