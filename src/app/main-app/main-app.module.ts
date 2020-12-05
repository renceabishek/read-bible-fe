import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainAppComponent } from './main-app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../util/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { StatisticsComponent } from './statistics/statistics.component';


@NgModule({
  declarations: [MainAppComponent,DashboardComponent, HeaderComponent,
  StatisticsComponent],
  imports: [
    FormsModule,
    CommonModule,
    MainAppRoutingModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule
  ]
})
export class MainAppModule { }
