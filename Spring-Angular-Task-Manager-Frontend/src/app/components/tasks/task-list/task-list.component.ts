import { Component } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe, AsyncPipe } from '@angular/common'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
    DatePipe,
    MatPaginatorModule,
    MatSortModule,
    AsyncPipe,
    CommonModule
  ],
  template: `
    <div class="task-list-header">
      <h2>Task List</h2>
      <button mat-raised-button color="primary" routerLink="/tasks/create">
        <mat-icon>add</mat-icon> New Task
      </button>
    </div>

    <table mat-table [dataSource]="tasks$ | async" class="mat-elevation-z8">
      <!-- Title Column -->
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef> Title </th>
        <td mat-cell *matCellDef="let task"> {{task.title}} </td>
      </ng-container>

      <!-- Due Date Column -->
      <ng-container matColumnDef="dueDate">
        <th mat-header-cell *matHeaderCellDef> Due Date </th>
        <td mat-cell *matCellDef="let task"> {{task.dueDate | date}} </td>
      </ng-container>

      <!-- Status Column -->
      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef> Status </th>
        <td mat-cell *matCellDef="let task">
          <span [class]="'status-badge ' + task.status">{{task.status}}</span>
        </td>
      </ng-container>

      <!-- Actions Column -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let task">
          <button mat-icon-button [routerLink]="['/tasks/view', task.id]">
            <mat-icon>visibility</mat-icon>
          </button>
          <button mat-icon-button [routerLink]="['/tasks/edit', task.id]">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button (click)="deleteTask(task.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    .task-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      &.SAVED { background: #e0e0e0; }
      &.IN_PROGRESS { background: #fff3e0; }
      &.COMPLETED { background: #e8f5e9; }
    }
  `]
})
export class TaskListComponent {
  displayedColumns = ['title', 'dueDate', 'status', 'actions'];
  tasks$;

  constructor(private taskService: TaskService) {
    // Initialize tasks$ inside the constructor after taskService is injected
    this.tasks$ = this.taskService.getAllTasks();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks$ = this.taskService.getAllTasks();
    });
  }
}
