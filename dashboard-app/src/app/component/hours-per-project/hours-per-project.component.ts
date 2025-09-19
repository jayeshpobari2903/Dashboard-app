import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjectHours } from 'src/app/type';

@Component({
  selector: 'app-hours-per-project',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  templateUrl: './hours-per-project.component.html',
  styleUrl: './hours-per-project.component.scss'
})
export class HoursPerProjectComponent implements AfterViewInit, OnChanges {
  @Input() projects: ProjectHours[] = [];
  @ViewChild('barChart') barChart!: ElementRef;
  private chart: any;

  /**
   *after view initilize
   *
   * @memberof HoursPerProjectComponent
   */
  async ngAfterViewInit() {
    await this.renderChart();
  }

  /**
   *ng on changes
   *
   * @memberof HoursPerProjectComponent
   */
  ngOnChanges() {
    if (this.chart && this.projects.length > 0) {
      this.chart.data.labels = this.projects.map(p => p.name);
      this.chart.data.datasets[0].data = this.projects.map(p => p.hours);
      this.chart.update();
    }
  }

  /**
   *chart rendering
   *
   * @private
   * @return {*} 
   * @memberof HoursPerProjectComponent
   */
  private async renderChart() {
    if (this.projects.length === 0) return;
    const Chart = (window as any).Chart;
    if (!Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      document.body.appendChild(script);
      await new Promise(r => script.onload = r);
    }

    const ctx = this.barChart.nativeElement.getContext('2d');
    this.chart = new (window as any).Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.projects.map(p => p.name),
        datasets: [{
          label: 'Hours',
          data: this.projects.map(p => p.hours),
          backgroundColor: '#3f51b5'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }
}
