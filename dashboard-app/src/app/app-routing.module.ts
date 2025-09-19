import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAppComponent } from './component/dashboard-app/dashboard-app.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard-app', pathMatch: 'full' },
  { path: 'dashboard-app', component: DashboardAppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
