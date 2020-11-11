import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WriteUpComponent } from './write-up/write-up.component';
import { ReadersComponent } from './readers/readers.component';
import { StatisticsComponent } from './statistics/statistics.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'readers', component: ReadersComponent},
  {path: 'status', component: StatisticsComponent},
  {path: 'writeup', component: WriteUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
