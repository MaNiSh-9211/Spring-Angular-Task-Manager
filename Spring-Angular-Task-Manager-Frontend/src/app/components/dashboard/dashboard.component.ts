
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule, DatePipe } from '@angular/common';
// import { MatProgressBarModule } from '@angular/material/progress-bar';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [
//     RouterOutlet,
//     MatCardModule,
//     MatButtonModule,
//     MatIconModule,
//     CommonModule,
//     MatProgressBarModule,
//     DatePipe
//   ],
//   template: `
//     <div class="dashboard-container">
//       <div *ngIf="isHomeRoute()" class="welcome-section">
//         <!-- Animated Background Elements -->
//         <div class="floating-orb"></div>
//         <div class="geometric-pattern"></div>

//         <mat-card class="welcome-card">
//           <!-- Profile Section -->
//           <div class="profile-header">
//             <img [src]="getProfileImage()" class="profile-avatar" alt="Profile">
//             <div class="header-content">
//               <h1 class="welcome-title">
//                 <span class="gradient-text">Welcome Back,</span>
//                 <br>
//                 {{ authService.currentUserValue?.username }}! 🚀
//               </h1>
//               <mat-card-subtitle class="welcome-subtitle">
//                 <mat-icon>calendar_today</mat-icon>
//                 {{ getGreeting() }} • {{ currentDate | date:'fullDate' }}
//               </mat-card-subtitle>
//             </div>
//           </div>

//           <!-- Stats Grid -->
//           <mat-card-content>
//             <div class="stats-grid">
//               <div class="stat-card">
//                 <mat-icon>task_alt</mat-icon>
//                 <h3>Completed Tasks</h3>
//                 <p class="stat-number">15</p>
//                 <div class="progress-bar"></div>
//               </div>
//               <div class="stat-card">
//                 <mat-icon>trending_up</mat-icon>
//                 <h3>Productivity</h3>
//                 <p class="stat-number">84%</p>
//                 <mat-progress-bar mode="determinate" value="84"></mat-progress-bar>
//               </div>
//             </div>

//             <!-- Enhanced Logout Button -->
//             <div class="action-section">
//               <button mat-raised-button 
//                       class="logout-btn" 
//                       (click)="authService.logout()"
//                       (mouseenter)="startSparkle()"
//                       (mouseleave)="stopSparkle()">
//                 <mat-icon>exit_to_app</mat-icon>
//                 Secure Logout
//                 <span class="sparkle" [class.active]="isSparkling">✨</span>
//               </button>
//             </div>
//           </mat-card-content>
//         </mat-card>
//       </div>
      
//       <router-outlet></router-outlet>
//     </div>
//   `,
//   styles: [`
//     .dashboard-container {
//       padding: 2rem;
//       margin-top: 64px;
//       min-height: calc(100vh - 64px);
//       background: linear-gradient(45deg, #f8f9fa 0%, #e9ecef 100%);
//       position: relative;
//       overflow: hidden;
//     }

//     .welcome-section {
//       position: relative;
//       z-index: 1;
//     }

//     .floating-orb {
//       position: absolute;
//       width: 400px;
//       height: 400px;
//       background: radial-gradient(circle at 30% 30%, #2196F3, transparent 60%);
//       border-radius: 50%;
//       top: -200px;
//       right: -200px;
//       opacity: 0.1;
//       animation: float 20s infinite linear;
//     }

//     .geometric-pattern {
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       background-image: 
//         radial-gradient(circle at 10% 20%, rgba(76, 175, 80, 0.1) 1%, transparent 2%),
//         radial-gradient(circle at 90% 80%, rgba(255, 87, 34, 0.1) 1%, transparent 2%);
//       background-size: 50px 50px;
//     }

//     .welcome-card {
//       margin: 2rem;
//       padding: 3rem;
//       border-radius: 25px;
//       backdrop-filter: blur(10px);
//       background: rgba(255, 255, 255, 0.9);
//       box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//       position: relative;
//       overflow: hidden;
//     }

//     .profile-header {
//       display: flex;
//       align-items: center;
//       gap: 2rem;
//       margin-bottom: 3rem;
//     }

//     .profile-avatar {
//       width: 120px;
//       height: 120px;
//       border-radius: 50%;
//       border: 4px solid #fff;
//       box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
//       transition: transform 0.3s ease;
//       &:hover {
//         transform: rotate(8deg) scale(1.05);
//       }
//     }

//     .header-content {
//       flex: 1;
//     }

//     .welcome-title {
//       font-size: 2.8rem;
//       margin: 0;
//       line-height: 1.2;
//       color: #2c3e50;
//       .gradient-text {
//         background: linear-gradient(45deg, #2196F3, #4CAF50);
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//       }
//     }

//     .welcome-subtitle {
//       font-size: 1.4rem;
//       color: #7f8c8d;
//       display: flex;
//       align-items: center;
//       gap: 0.8rem;
//       margin-top: 1rem;
//     }

//     .stats-grid {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//       gap: 2rem;
//       margin: 3rem 0;
//     }

//     .stat-card {
//       padding: 2rem;
//       background: rgba(255, 255, 255, 0.95);
//       border-radius: 15px;
//       text-align: center;
//       transition: transform 0.3s ease;
//       &:hover {
//         transform: translateY(-5px);
//       }
//       mat-icon {
//         font-size: 2.5rem;
//         color: #2196F3;
//         margin-bottom: 1rem;
//       }
//       .stat-number {
//         font-size: 2.2rem;
//         font-weight: bold;
//         margin: 1rem 0;
//         color: #2c3e50;
//       }
//     }

//     .action-section {
//       text-align: center;
//       margin-top: 3rem;
//     }

//     .logout-btn {
//       padding: 1.2rem 2.5rem;
//       font-size: 1.1rem;
//       border-radius: 30px;
//       transition: all 0.3s ease;
//       position: relative;
//       overflow: hidden;
//       .sparkle {
//         position: absolute;
//         right: -20px;
//         opacity: 0;
//         transition: all 0.3s ease;
//         &.active {
//           right: 15px;
//           opacity: 1;
//         }
//       }
//       &:hover {
//         padding-right: 3.5rem;
//         box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3);
//       }
//     }

//     @keyframes float {
//       0% { transform: translateY(0) rotate(0deg); }
//       50% { transform: translateY(-20px) rotate(180deg); }
//       100% { transform: translateY(0) rotate(360deg); }
//     }
//   `]
// })
// export class DashboardComponent {
//   currentDate = new Date();
//   isSparkling = false;

//   constructor(public authService: AuthService) {}

//   isHomeRoute(): boolean {
//     return window.location.pathname === '/';
//   }

//   getProfileImage() {
//     const seed = this.authService.currentUserValue?.username || 'default';
//     return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${seed}&size=120&backgroundType=gradientLinear`;
//   }

//   getGreeting() {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Rise and shine!';
//     if (hour < 18) return 'Afternoon boost!';
//     return 'Evening serenity!';
//   }

//   startSparkle() {
//     this.isSparkling = true;
//   }

//   stopSparkle() {
//     this.isSparkling = false;
//   }
// }


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatProgressBarModule,
    DatePipe
  ],
  template: `
    <div class="dashboard-container">
      <div *ngIf="isHomeRoute()" class="welcome-section">
        <div class="floating-orb"></div>
        <div class="geometric-pattern"></div>

        <mat-card class="welcome-card">
          <div class="profile-header">
            <img [src]="getProfileImage()" class="profile-avatar" alt="Profile">
            <div class="header-content">
              <h1 class="welcome-title">
                <span class="gradient-text">Welcome Back,</span>
                <br>
                {{ authService.currentUserValue?.username }}! 🚀
              </h1>
              <mat-card-subtitle class="welcome-subtitle">
                <mat-icon>calendar_today</mat-icon>
                {{ getGreeting() }} • {{ currentDate | date:'fullDate' }}
              </mat-card-subtitle>
            </div>
          </div>

          <mat-card-content>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon-container">
                  <mat-icon class="stat-icon">task_alt</mat-icon>
                </div>
                <h3>Completed Tasks</h3>
                <p class="stat-number">15</p>
                <div class="progress-container">
                  <div class="progress-bar" style="width: 75%"></div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon-container">
                  <mat-icon class="stat-icon">trending_up</mat-icon>
                </div>
                <h3>Productivity</h3>
                <p class="stat-number">84%</p>
                <div class="progress-container">
                  <mat-progress-bar mode="determinate" value="84"></mat-progress-bar>
                </div>
              </div>
            </div>

            <div class="action-section">
              <button mat-raised-button 
                      class="logout-btn" 
                      (click)="authService.logout()"
                      (mouseenter)="startSparkle()"
                      (mouseleave)="stopSparkle()">
                <mat-icon>exit_to_app</mat-icon>
                Secure Logout
                <span class="sparkle" [class.active]="isSparkling">✨</span>
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
      
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      margin-top: 64px;
      min-height: calc(100vh - 64px);
      background: linear-gradient(45deg, #f8f9fa 0%, #e9ecef 100%);
      position: relative;
      overflow: hidden;
    }

    .welcome-section {
      position: relative;
      z-index: 1;
    }

    .floating-orb {
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle at 30% 30%, #2196F3, transparent 60%);
      border-radius: 50%;
      top: -200px;
      right: -200px;
      opacity: 0.1;
      animation: float 20s infinite linear;
    }

    .geometric-pattern {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle at 10% 20%, rgba(76, 175, 80, 0.1) 1%, transparent 2%),
        radial-gradient(circle at 90% 80%, rgba(255, 87, 34, 0.1) 1%, transparent 2%);
      background-size: 50px 50px;
    }

    .welcome-card {
      margin: 2rem;
      padding: 3rem;
      border-radius: 25px;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .profile-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid #fff;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      &:hover {
        transform: rotate(8deg) scale(1.05);
      }
    }

    .header-content {
      flex: 1;
    }

    .welcome-title {
      font-size: 2.8rem;
      margin: 0;
      line-height: 1.2;
      color: #2c3e50;
      .gradient-text {
        background: linear-gradient(45deg, #2196F3, #4CAF50);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .welcome-subtitle {
      font-size: 1.4rem;
      color: #7f8c8d;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-top: 1rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 3rem 0;
    }

    .stat-card {
      padding: 2rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 15px;
      text-align: center;
      transition: transform 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      &:hover {
        transform: translateY(-5px);
      }
    }

    .stat-icon-container {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      background: rgba(33, 150, 243, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: #2196F3;
    }

    .stat-number {
      font-size: 2.2rem;
      font-weight: bold;
      margin: 1rem 0;
      color: #2c3e50;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 3px;
        background: #2196F3;
        border-radius: 2px;
      }
    }

    .progress-container {
      margin-top: 1.5rem;
      height: 8px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      overflow: hidden;
      ::ng-deep .mat-progress-bar {
        height: 100%;
        .mat-progress-bar-fill::after {
          background: linear-gradient(90deg, #2196F3, #4CAF50);
        }
      }
    }

    .action-section {
      text-align: center;
      margin-top: 3rem;
    }

    .logout-btn {
      padding: 1.2rem 2.5rem;
      font-size: 1.1rem;
      border-radius: 30px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      .sparkle {
        position: absolute;
        right: -20px;
        opacity: 0;
        transition: all 0.3s ease;
        &.active {
          right: 15px;
          opacity: 1;
        }
      }
      &:hover {
        padding-right: 3.5rem;
        box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3);
      }
    }

    @keyframes float {
      0% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
      100% { transform: translateY(0) rotate(360deg); }
    }
  `]
})
export class DashboardComponent {
  currentDate = new Date();
  isSparkling = false;

  constructor(public authService: AuthService) {}

  isHomeRoute(): boolean {
    return window.location.pathname === '/';
  }

  getProfileImage() {
    const seed = this.authService.currentUserValue?.username || 'default';
    return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${seed}&size=120&backgroundType=gradientLinear`;
  }

  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Rise and shine!';
    if (hour < 18) return 'Afternoon boost!';
    return 'Evening serenity!';
  }

  startSparkle() {
    this.isSparkling = true;
  }

  stopSparkle() {
    this.isSparkling = false;
  }
}