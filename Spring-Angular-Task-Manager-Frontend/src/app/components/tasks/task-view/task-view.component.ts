// import { Component, OnInit } from '@angular/core';
// import { TaskService } from '../../../services/task.service';
// import { ActivatedRoute } from '@angular/router';
// import { MatCardModule } from '@angular/material/card';
// import { DatePipe } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-task-view',
//   standalone: true,
//   imports: [MatCardModule, DatePipe, MatButtonModule],
//   template: `
//     <mat-card class="task-card">
//       <mat-card-header>
//         <mat-card-title>{{ task?.title }}</mat-card-title>
//         <mat-card-subtitle>
//           Status: {{ task?.status }} | Due: {{ task?.dueDate | date }}
//         </mat-card-subtitle>
//       </mat-card-header>
      
//       <mat-card-content>
//         <p>{{ task?.description }}</p>
//         <div class="meta-data">
//           <small>Created: {{ task?.createdAt | date }}</small>
//           <small>Last Updated: {{ task?.updatedAt | date }}</small>
//         </div>
//       </mat-card-content>
      
//       <mat-card-actions>
//         <button mat-raised-button color="primary" routerLink="/tasks">Back to List</button>
//       </mat-card-actions>
//     </mat-card>
//   `,
//   styles: [`
//     .task-card {
//       max-width: 600px;
//       margin: 2rem auto;
//       padding: 2rem;
//     }
    
//     .meta-data {
//       margin-top: 2rem;
//       display: flex;
//       justify-content: space-between;
//     }
//   `]
// })
// export class TaskViewComponent implements OnInit {
//   task: any;

//   constructor(
//     private taskService: TaskService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     const taskId = this.route.snapshot.params['id'];
//     this.taskService.getTaskById(taskId).subscribe(task => {
//       this.task = task;
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [MatCardModule, DatePipe, MatButtonModule, RouterLink],
  template: `
    <mat-card class="task-card">
      <mat-card-header>
        <mat-card-title>{{ task?.title }}</mat-card-title>
        <mat-card-subtitle>
          Status: {{ task?.status }} | 
          Due: {{ task?.dueDate | date: 'mediumDate' }}
        </mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <p>{{ task?.description || 'No description provided' }}</p>
        <div class="meta-data">
          <small>Created: {{ task?.createdAt | date: 'medium' }}</small>
          <small *ngIf="task?.updatedAt">Updated: {{ task?.updatedAt | date: 'medium' }}</small>
        </div>
      </mat-card-content>
      
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/tasks">Back to List</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .task-card { max-width: 600px; margin: 2rem auto; padding: 2rem; }
    .meta-data { margin-top: 2rem; display: flex; justify-content: space-between; }
  `]
})
export class TaskViewComponent implements OnInit {
  task: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.params['id'];
    this.taskService.getTaskById(taskId).subscribe({
      next: (task) => this.task = task,
      error: (err) => console.error('Error loading task:', err)
    });
  }
}