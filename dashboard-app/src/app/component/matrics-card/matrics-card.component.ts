import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-matrics-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  templateUrl: './matrics-card.component.html',
  styleUrl: './matrics-card.component.scss'
})
export class MatricsCardComponent {
  
  @Input() title!: string;
  @Input() tracked!: number;
  @Input() expected!: number;
  @Input() color: string = '#3f51b5';

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart: any;

  /**
   *after view initilized
   *
   * @memberof MatricsCardComponent
   */
  async ngAfterViewInit() {
    await this.renderChart();
  }

  /**
   *ng on changes
   *
   * @param {SimpleChanges} changes
   * @memberof MatricsCardComponent
   */
  async ngOnChanges(changes: SimpleChanges) {
    if (this.chart) {
      this.chart.data.datasets[0].data = [
        this.tracked,
        Math.max(0, this.expected - this.tracked)
      ];
      this.chart.update();
    }
  }

  /**
   *chart rendering
   *
   * @private
   * @memberof MatricsCardComponent
   */
  private async renderChart() {
    const Chart = (window as any).Chart;
    if (!Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      document.body.appendChild(script);
      await new Promise(r => script.onload = r);
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new (window as any).Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Tracked', 'Remaining'],
        datasets: [{
          data: [this.tracked, Math.max(0, this.expected - this.tracked)],
          backgroundColor: [this.color, '#e0e0e0'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        plugins: { legend: { display: false } },
        maintainAspectRatio: false
      }
    });
  }
}
