import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EmployeeTimesheet } from 'src/app/type';

@Component({
  selector: 'app-employee-matrics-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  templateUrl: './employee-matrics-card.component.html',
  styleUrl: './employee-matrics-card.component.scss'
})
export class EmployeeMatricsCardComponent {

  @Input() title!: string;
  @Input() employees: EmployeeTimesheet[] = [];
  @Input() type: 'hours' | 'timesheets' = 'hours';

}
