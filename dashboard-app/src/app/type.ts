export interface ClientTimesheetData {
  clientName: string;
  fiscalYears: number[];
  activeIntegrations: string[];
  timesheetData: {
    [year: string]: YearlyData;
  };
};

export interface YearlyData {
  hoursPerProject: ProjectHours[];
  employees: EmployeeTimesheet[];
}

export interface ProjectHours {
  name: string;
  hours: number;
  integration: string;
}

export interface EmployeeTimesheet {
  name: string;
  hours: {
    tracked: number;
    expected: number;
  };
  timesheets: {
    created: number;
    expected: number;
  };
  integration: string;
}
