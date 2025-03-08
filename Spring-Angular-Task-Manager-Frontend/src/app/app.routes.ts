import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskCreateComponent } from './components/tasks/task-create/task-create.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'tasks', component: TaskListComponent },
      { path: 'tasks/create', component: TaskCreateComponent }, 
      { path: '', redirectTo: '/tasks', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/tasks' }
];