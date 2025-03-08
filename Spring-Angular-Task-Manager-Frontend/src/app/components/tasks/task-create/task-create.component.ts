import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  template: `
    <div class="task-form">
      <h2>Create New Task</h2>
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="4"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Due Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="dueDate">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option value="SAVED">Saved</mat-option>
            <mat-option value="IN_PROGRESS">In Progress</mat-option>
            <mat-option value="COMPLETED">Completed</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="form-actions">
          <button mat-raised-button color="primary" type="submit">Create</button>
          <button mat-raised-button type="button" routerLink="/tasks">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .task-form {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }
  `]
})
export class TaskCreateComponent {
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    dueDate: new FormControl<Date | null>(null),
    status: new FormControl('SAVED')
  });

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

//   onSubmit() {
//     if (this.taskForm.valid) {
//       this.taskService.createTask(this.taskForm.value).subscribe({
//         next: () => {
//           this.snackBar.open('Task created successfully', 'Close', { duration: 3000 });
//           this.router.navigate(['/tasks']);
//         },
//         error: (error) => {
//           this.snackBar.open('Error creating task', 'Close', { duration: 3000 });
//         }
//       });
//     }
//   }
// }

onSubmit() {
  if (this.taskForm.valid) {
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.snackBar.open('Task created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Creation error:', error);
        this.snackBar.open(
          error.message || 'Error creating task', 
          'Close', 
          { duration: 5000 }
        );
      }
    });
  }
}
}