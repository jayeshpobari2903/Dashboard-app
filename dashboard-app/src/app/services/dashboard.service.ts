import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ClientTimesheetData } from '../type';

export interface APIResponse<T> {
  status: number;
  statusState: string;
  message: string;
  data: ClientTimesheetData[];
  pages?: number;
  total?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_URL = 'http://localhost:3000/dashboardData';

  constructor(private http: HttpClient) { }

  /**
   *get client sheet data
   *
   * @return {*}  {Observable<ClientTimesheetData[]>}
   * @memberof DashboardService
   */
 getClientSheetData() {
    return this.http.get<ClientTimesheetData[]>(this.API_URL).pipe(
      catchError((error) => {
        console.error('Error fetching dashboard data:', error);
        // Fallback: return empty array so app won’t break
        return of([]);
      })
    );
  }
}
