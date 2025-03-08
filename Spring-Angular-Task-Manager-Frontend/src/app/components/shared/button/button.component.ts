import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button mat-raised-button [color]="color" [disabled]="disabled"><ng-content></ng-content></button>`,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() color: string = 'primary';
  @Input() disabled: boolean = false;
}
