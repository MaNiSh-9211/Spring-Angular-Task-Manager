// // components/about/about.component.ts
// import { Component } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatGridListModule } from '@angular/material/grid-list';

// @Component({
//   selector: 'app-about',
//   standalone: true,
//   imports: [MatCardModule, MatIconModule, MatGridListModule],
//   template: `
//     <div class="about-container">
//       <mat-card class="about-card">
//         <mat-card-header>
//           <mat-card-title class="about-title">
//             <mat-icon>info</mat-icon>
//             About Task Manager
//           </mat-card-title>
//         </mat-card-header>

//         <mat-card-content>
//           <mat-grid-list cols="2" rowHeight="200px">
//             <mat-grid-tile>
//               <div class="feature-card">
//                 <mat-icon class="feature-icon">check_circle</mat-icon>
//                 <h3>Task Management</h3>
//                 <p>Organize your tasks efficiently with our intuitive interface</p>
//               </div>
//             </mat-grid-tile>
            
//             <mat-grid-tile>
//               <div class="feature-card">
//                 <mat-icon class="feature-icon">security</mat-icon>
//                 <h3>Secure Platform</h3>
//                 <p>Your data is protected with enterprise-grade security</p>
//               </div>
//             </mat-grid-tile>
            
//             <mat-grid-tile>
//               <div class="feature-card">
//                 <mat-icon class="feature-icon">group</mat-icon>
//                 <h3>Team Collaboration</h3>
//                 <p>Coming soon: Collaborate with your team in real-time</p>
//               </div>
//             </mat-grid-tile>
            
//             <mat-grid-tile>
//               <div class="feature-card">
//                 <mat-icon class="feature-icon">insights</mat-icon>
//                 <h3>Analytics</h3>
//                 <p>Track your productivity with detailed statistics</p>
//               </div>
//             </mat-grid-tile>
//           </mat-grid-list>

//           <div class="team-section">
//             <h2>Our Team</h2>
//             <div class="team-members">
//               <div class="member-card">
//                 <img src="https://i.pravatar.cc/100?img=1" alt="Team member">
//                 <h4>John Doe</h4>
//                 <p>CEO & Founder</p>
//               </div>
//               <div class="member-card">
//                 <img src="https://i.pravatar.cc/100?img=2" alt="Team member">
//                 <h4>Jane Smith</h4>
//                 <p>Lead Developer</p>
//               </div>
//             </div>
//           </div>
//         </mat-card-content>
//       </mat-card>
//     </div>
//   `,
//   styles: [`
//     .about-container {
//       padding: 2rem;
//     }

//     .about-card {
//       padding: 2rem;
//       border-radius: 15px;
//     }

//     .about-title {
//       font-size: 2rem;
//       color: #2c3e50;
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//     }

//     .feature-card {
//       text-align: center;
//       padding: 1.5rem;
//       background: #f8f9fa;
//       border-radius: 10px;
//       height: 100%;
//       transition: transform 0.3s;

//       &:hover {
//         transform: translateY(-5px);
//       }
//     }

//     .feature-icon {
//       font-size: 3rem;
//       width: 100%;
//       height: auto;
//       color: #3498db;
//       margin-bottom: 1rem;
//     }

//     .team-section {
//       margin-top: 3rem;
//       text-align: center;

//       h2 {
//         color: #2c3e50;
//         margin-bottom: 2rem;
//       }
//     }

//     .team-members {
//       display: flex;
//       justify-content: center;
//       gap: 2rem;
//       flex-wrap: wrap;
//     }

//     .member-card {
//       padding: 1.5rem;
//       border-radius: 10px;
//       background: #f8f9fa;
//       width: 200px;

//       img {
//         width: 100px;
//         height: 100px;
//         border-radius: 50%;
//         margin-bottom: 1rem;
//       }
//     }
//   `]
// })
// export class AboutComponent {}

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// Base64 encoded images
const TASK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiMwMDc4ZmYiPjxwYXRoIGQ9Ik0xOSAzSDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnptLTkgMTRIM3YtMmg3djJ6bTQtMEg3di0yaDd2MnptNC0zSDd2LTJoMTF2MnpNNyA4aDEwdjJIN3YtMnoiLz48L3N2Zz4=';
const SECURITY_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiMwMDc4ZmYiPjxwYXRoIGQ9Ik0xMiAxTDMgNWw5IDQgOS00LTktNHptMCAxN2MtMy44Ny0yLjU3LTctNS40OC03LTkuNXYtNGw3LTMgNyAzdjQuM2MwIDQuMDMtMy4xMyA2Ljk4LTcgOS41eiIvPjwvc3ZnPg==';
const COLLAB_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiMwMDc4ZmYiPjxwYXRoIGQ9Ik0xNiAxMWMxLjY2IDAgMi45OS0xLjM0IDIuOTktM0wxOSA0YzAtMS42Ni0xLjM0LTMtMy0zVjJjMC0xLjE0LS45LTIuMDItMi0yLjAyaC0xQzEwLjkgMCAxMCAuODggMTAgMnYxYy0xLjY2IDAtMyAxLjM0LTMgM2wtLjAxIDRjMCAxLjY2IDEuMzQgMyAzIDNoNnYyaC0yYy0yIDAtNCAxLjA0LTQgM3YyaC04di0ySDRjLTEuMSAwLTItLjktMi0ydi02aDJ2NEg4VjhoLDFjMS4xIDAgMi0uOSAyLTJWN2gxdjFjMCAxLjEuOSAyIDIgMmg0YzEuMSAwIDItLjkgMi0yVjdoMXYxYzAgMS4xLjkgMiAyIDJoM3Y0aC0ydjJoNHYtMmgtMnYtMmg0eiIvPjwvc3ZnPg==';
const ANALYTICS_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiMwMDc4ZmYiPjxwYXRoIGQ9Ik0xOSAzSDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnptLTkgMTRIM3YtMmg3djJ6bTQtMEg3di0yaDd2MnptNC0zSDd2LTJoMTF2MnpNNyA4aDEwdjJIN3YtMnoiLz48L3N2Zz4=';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <section class="about-container">
      <mat-card class="about-card">
        <mat-card-header>
          <mat-card-title class="about-title">
            <mat-icon>info</mat-icon>
            About Task Manager
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="features-section">
            <h2>Features</h2>
            <div class="features-container">
              <!-- Feature 1 -->
              <div class="big-feature">
                <div class="feature-content">
                  <h3>Task Management</h3>
                  <p>Organize your tasks efficiently with our intuitive interface.</p>
                </div>
                <img [src]="TASK_IMAGE" alt="Task Management" class="feature-image">
              </div>

              <!-- Feature 2 -->
              <div class="big-feature">
                <img [src]="SECURITY_IMAGE" alt="Security" class="feature-image">
                <div class="feature-content">
                  <h3>Secure Platform</h3>
                  <p>Your data is protected with enterprise-grade security.</p>
                </div>
              </div>

              <!-- Feature 3 -->
              <div class="big-feature">
                <div class="feature-content">
                  <h3>Team Collaboration</h3>
                  <p>Coming soon: Collaborate with your team in real-time.</p>
                </div>
                <img [src]="COLLAB_IMAGE" alt="Collaboration" class="feature-image">
              </div>

              <!-- Feature 4 -->
              <div class="big-feature">
                <img [src]="ANALYTICS_IMAGE" alt="Analytics" class="feature-image">
                <div class="feature-content">
                  <h3>Analytics</h3>
                  <p>Track your productivity with detailed statistics.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="upcoming-features">
            <h2>Upcoming Features</h2>
            <ul class="no-bullets">
              <li>Advanced Reporting Tools</li>
              <li>AI-based Task Recommendations</li>
              <li>Enhanced Calendar Integration</li>
            </ul>
          </div>

          <section class="creator-section">
            <h2>Meet the Creator</h2>
            <div class="creator-content">
              <img src="https://api.dicebear.com/5.x/adventurer/svg?seed=Ninja" 
                   alt="Cartoon Ninja" 
                   class="creator-image">
              <div class="creator-info">
                <h3>Manish</h3>
                <p class="title">Full Stack Developer & UI/UX Designer</p>
                <div class="blue-line"></div>
                <p class="description">
                  Passionate about creating intuitive task management solutions
                  that enhance productivity and user experience.
                </p>
              </div>
            </div>
          </section>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [`
    .about-container {
      padding: 2rem;
      background: #ffffff;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .about-card {
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      max-width: 1200px;
      width: 100%;
      background: #fff;
    }

    .features-container {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      margin-top: 2rem;
    }

    .big-feature {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 15px;
      transition: all 0.3s ease;
      min-height: 250px;
    }

    .big-feature:hover {
      transform: scale(1.02);
      box-shadow: 0 0 20px rgba(0, 120, 255, 0.2);
    }

    .feature-content {
      flex: 1;
      padding: 0 2rem;
      min-width: 300px;
    }

    .feature-image {
      width: 200px;
      height: 200px;
      object-fit: contain;
      padding: 20px;
      background: #0078ff10;
      border-radius: 15px;
    }

    .big-feature:nth-child(even) {
      flex-direction: row-reverse;
    }

    .upcoming-features {
      margin-top: 2rem;
      text-align: center;
      background: #eef;
      padding: 1.5rem;
      border-radius: 10px;
    }

    .no-bullets {
      list-style-type: none;
      padding-left: 0;
      margin: 0;
    }

    .creator-section {
      margin-top: 3rem;
      text-align: center;
    }

    .creator-content {
      display: flex;
      align-items: center;
      gap: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .creator-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 3px solid #0078ff;
      box-shadow: 0 0 15px rgba(0, 120, 255, 0.3);
    }

    .blue-line {
      width: 50px;
      height: 2px;
      background: #0078ff;
      margin: 1rem auto;
    }

    .description {
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class AboutComponent {
  // Embedded images
  TASK_IMAGE = TASK_IMAGE;
  SECURITY_IMAGE = SECURITY_IMAGE;
  COLLAB_IMAGE = COLLAB_IMAGE;
  ANALYTICS_IMAGE = ANALYTICS_IMAGE;
}