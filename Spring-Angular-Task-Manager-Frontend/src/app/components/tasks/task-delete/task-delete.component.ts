
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-task-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete this task?</p>
      <p><strong>Title:</strong> {{ data.taskTitle }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content { padding: 16px 24px; }
    mat-dialog-actions { padding: 16px 24px; }
  `]
})
export class TaskDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskTitle: string }
  ) {}
}