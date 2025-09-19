import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {
  @Input() clientName!: string;
  @Input() fiscalYears: number[] = [];
  @Input() selectedYear!: number;
  @Output() yearChange = new EventEmitter<number>();
}
