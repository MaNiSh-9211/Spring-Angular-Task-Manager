import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-edit',
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
      <h2>Edit Task</h2>
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
        <!-- Same form fields as create component -->
        <!-- Add ID field if needed -->
        
        <div class="form-actions">
          <button mat-raised-button color="primary" type="submit">Update</button>
          <button mat-raised-button type="button" routerLink="/tasks">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [/* Same as create component */]
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    dueDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  taskId: number = 0; 

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];
    this.taskService.getTaskById(this.taskId).subscribe(task => {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status
      });
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe({
        next: () => {
          this.snackBar.open('Task updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.snackBar.open('Error updating task', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
