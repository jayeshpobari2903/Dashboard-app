import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subscription, tap } from 'rxjs';
import { DashboardHeaderComponent } from "../dashboard-header/dashboard-header.component";
import { MatricsCardComponent } from "../matrics-card/matrics-card.component";
import { HoursPerProjectComponent } from "../hours-per-project/hours-per-project.component";
import { EmployeeMatricsCardComponent } from "../employee-matrics-card/employee-matrics-card.component";
import { ClientTimesheetData } from 'src/app/type';

/**
 *Function to dynamically load the Chart.js script from a CDN
 *
 * @return {*}  {Promise<void>}
 */
function loadChartScript(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector('script[src*="chart.js"]')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Chart.js'));
    document.body.appendChild(script);
  });
}

@Component({
  selector: 'app-dashboard-app',
  templateUrl: './dashboard-app.component.html',
  styleUrls: ['./dashboard-app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatOptionModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatProgressBarModule,
    CommonModule,
    ReactiveFormsModule,
    DashboardHeaderComponent,
    MatricsCardComponent,
    HoursPerProjectComponent,
    EmployeeMatricsCardComponent
  ]
})
export class DashboardAppComponent implements OnInit, OnDestroy {
  
  private subs = new Subscription();
  dataLoaded = signal(false);
  clientData = signal<ClientTimesheetData>({
    clientName: '',
    fiscalYears: [],
    activeIntegrations: [],
    timesheetData: {}
  });
  selectedYear = signal<number>(new Date().getFullYear());
  selectedIntegration = signal<string>('All');

  fiscalYears = computed(() => this.clientData()?.fiscalYears ?? []);
  integrations = computed(() => ['All', ...(this.clientData()?.activeIntegrations ?? [])]);

  timesheetData = computed(() =>
    this.clientData()?.timesheetData?.[this.selectedYear()] ?? null
  );
  
  /**
   * filter data
   *
   * @memberof DashboardAppComponent
   */
  filteredData = computed(() => {
    const data = this.timesheetData();
    if (!data) return null;

    const integration = this.selectedIntegration();
    const projects = integration === 'All' ? data.hoursPerProject : data.hoursPerProject.filter((p: any) => p.integration === integration);
    const employees = integration === 'All' ? data.employees : data.employees.filter((e: any) => e.integration === integration);

    const overallHours = {
      tracked: employees.reduce((s: number, e: any) => s + e.hours.tracked, 0),
      expected: employees.reduce((s: number, e: any) => s + e.hours.expected, 0)
    };

    const timesheetSummary = {
      created: employees.reduce((s: number, e: any) => s + e.timesheets.created, 0),
      expected: employees.reduce((s: number, e: any) => s + e.timesheets.expected, 0)
    };

    return { overallHours, timesheetSummary, projects, employees };
  });

  overallHours = computed(() => this.filteredData()?.overallHours ?? { tracked: 0, expected: 0 });
  timesheetSummary = computed(() => this.filteredData()?.timesheetSummary ?? { created: 0, expected: 0 });
  projects = computed(() => this.filteredData()?.projects ?? []);
  employees = computed(() => this.filteredData()?.employees ?? []);

  /**
   * Creates an instance of DashboardAppComponent.
   * @param {DashboardService} dashboardService
   * @memberof DashboardAppComponent
   */
  constructor(private dashboardService: DashboardService) { }
  
  /**
   *intialixze value
   *
   * @memberof DashboardAppComponent
   */
  ngOnInit(): void {
    const s = this.dashboardService.getClientSheetData().pipe(
      tap(res => {
        this.clientData.set(res[0]);
        const years = res[0]?.fiscalYears ?? [];
        if (years.length > 0) {
          this.selectedYear.set(years[years.length - 1]);
        }
        this.dataLoaded.set(true);
      })
    ).subscribe();
    this.subs.add(s);
  }

  /**
   *change year
   *
   * @param {number} year
   * @memberof DashboardAppComponent
   */
  changeYear(year: number) {
    this.selectedYear.set(year);
  }

  /**
   *change integration
   *
   * @param {string} integration
   * @memberof DashboardAppComponent
   */
  changeIntegration(integration: string) {
    this.selectedIntegration.set(integration);
  }
  
  /**
   *destorye the components
   *
   * @memberof DashboardAppComponent
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
