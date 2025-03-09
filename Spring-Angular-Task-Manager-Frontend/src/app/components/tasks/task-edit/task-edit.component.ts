

// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatSelectModule } from '@angular/material/select';
// import { TaskService } from '../../../services/task.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-task-edit',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatDatepickerModule,
//     MatSelectModule,
//     DatePipe
//   ],
//   template: `
//     <div class="edit-container">
//       <h2>Edit Task</h2>
//       <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
//         <mat-form-field>
//           <input matInput placeholder="Title" formControlName="title">
//           <mat-error *ngIf="editForm.get('title')?.hasError('required')">Title is required</mat-error>
//         </mat-form-field>

//         <mat-form-field>
//           <textarea matInput placeholder="Description" formControlName="description" rows="4"></textarea>
//         </mat-form-field>

//         <mat-form-field>
//           <input matInput [matDatepicker]="picker" placeholder="Due Date" formControlName="dueDate">
//           <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
//           <mat-datepicker #picker></mat-datepicker>
//           <mat-error *ngIf="editForm.get('dueDate')?.hasError('required')">Due Date is required</mat-error>
//         </mat-form-field>

//         <mat-form-field>
//           <mat-select placeholder="Status" formControlName="status">
//             <mat-option value="SAVED">Saved</mat-option>
//             <mat-option value="IN_PROGRESS">In Progress</mat-option>
//             <mat-option value="COMPLETED">Completed</mat-option>
//           </mat-select>
//         </mat-form-field>

//         <div class="button-group">
//           <button mat-raised-button color="primary" type="submit">Update Task</button>
//           <button mat-raised-button type="button" (click)="cancel()">Cancel</button>
//         </div>
//       </form>
//     </div>
//   `,
//   styles: [`
//     .edit-container { max-width: 600px; margin: 2rem auto; padding: 2rem; }
//     form { display: flex; flex-direction: column; gap: 1rem; }
//     .button-group { display: flex; gap: 1rem; justify-content: flex-end; }
//   `]
// })
// export class TaskEditComponent implements OnInit {
//   editForm = new FormGroup({
//     title: new FormControl('', [Validators.required]),
//     description: new FormControl(''),
//     dueDate: new FormControl<Date | null>(null, [Validators.required]),
//     status: new FormControl('', [Validators.required])
//   });

//   taskId!: number;

//   constructor(
//     private taskService: TaskService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit() {
//     this.taskId = this.route.snapshot.params['id'];
//     this.taskService.getTaskById(this.taskId).subscribe({
//       next: (task) => {
//         this.editForm.patchValue({
//           ...task,
//           dueDate: new Date(task.dueDate)
//         });
//       },
//       error: (err) => this.snackBar.open('Error loading task', 'Close')
//     });
//   }

//   onSubmit() {
//     if (this.editForm.valid) {
//       const formData = {
//         ...this.editForm.value,
//         dueDate: this.editForm.value.dueDate?.toISOString()
//       };

//       this.taskService.updateTask(this.taskId, formData).subscribe({
//         next: () => {
//           this.snackBar.open('Task updated successfully', 'Close', { duration: 3000 });
//           this.router.navigate(['/tasks']);
//         },
//         error: (err) => this.snackBar.open('Error updating task', 'Close')
//       });
//     }
//   }

//   cancel() {
//     this.router.navigate(['/tasks']);
//   }
// }

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
import { DatePipe } from '@angular/common';

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
    <div class="edit-container">
      <h2>Edit Task</h2>
      <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
          <input matInput placeholder="Title" formControlName="title">
          <mat-error *ngIf="editForm.get('title')?.hasError('required')">Title is required</mat-error>
        </mat-form-field>

        <mat-form-field>
          <textarea matInput placeholder="Description" formControlName="description" rows="4"></textarea>
        </mat-form-field>

        <mat-form-field>
          <input matInput [matDatepicker]="picker" placeholder="Due Date" formControlName="dueDate">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="editForm.get('dueDate')?.hasError('required')">Due Date is required</mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-select placeholder="Status" formControlName="status">
            <mat-option value="SAVED">Saved</mat-option>
            <mat-option value="IN_PROGRESS">In Progress</mat-option>
            <mat-option value="COMPLETED">Completed</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="button-group">
          <button mat-raised-button color="primary" type="submit">Update Task</button>
          <button mat-raised-button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .edit-container { max-width: 600px; margin: 2rem auto; padding: 2rem; }
    form { display: flex; flex-direction: column; gap: 1rem; }
    .button-group { display: flex; gap: 1rem; justify-content: flex-end; }
  `]
})
export class TaskEditComponent implements OnInit {
  editForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    dueDate: new FormControl<Date | null>(null, [Validators.required]),
    status: new FormControl('', [Validators.required])
  });

  taskId!: number;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.editForm.patchValue({
          ...task,
          dueDate: this.convertToDate(task.dueDate) // Ensures proper date format
        });
      },
      error: () => this.snackBar.open('Error loading task', 'Close', { duration: 3000 })
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const formData = {
        ...this.editForm.value,
        dueDate: this.convertToDate(this.editForm.value.dueDate)?.toISOString() || null
      };

      this.taskService.updateTask(this.taskId, formData).subscribe({
        next: () => {
          this.snackBar.open('Task updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/tasks']);
        },
        error: () => this.snackBar.open('Error updating task', 'Close', { duration: 3000 })
      });
    }
  }

  // Helper function for date conversion
  convertToDate(date: any): Date | null {
    if (!date) return null;
    return typeof date === 'string' ? new Date(date) : date;
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
