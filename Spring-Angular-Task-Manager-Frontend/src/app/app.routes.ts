
import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskCreateComponent } from './components/tasks/task-create/task-create.component';
import { AboutComponent } from './components/about/about.component';
import { TaskViewComponent } from './components/tasks/task-view/task-view.component';
import { TaskEditComponent } from './components/tasks/task-edit/task-edit.component';

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   {
//     path: '',
//     component: DashboardComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { 
//         path: 'tasks',
//         children: [
//           { path: '', component: TaskListComponent },
//           { path: 'create', component: TaskCreateComponent }
//         ]
//       },
//       { path: 'about', component: AboutComponent },
//       { path: '', pathMatch: 'full', redirectTo: 'home' }
//     ]
//   },
//   { path: 'home', redirectTo: '', pathMatch: 'full' }, // Add this line
//   { path: '**', redirectTo: '' }
// ];

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'tasks',
        children: [
          { path: '', component: TaskListComponent },
          { path: 'create', component: TaskCreateComponent },
          { path: 'view/:id', component: TaskViewComponent },    // Add view route
          { path: 'edit/:id', component: TaskEditComponent }     // Add edit route
        ]
      },
      { path: 'about', component: AboutComponent },
      { path: '', pathMatch: 'full', redirectTo: 'home' }
    ]
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];