import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainAppComponent } from './main-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../util/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { StatisticsComponent } from './statistics/statistics.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { DataComponent } from './admin/data/data.component';
import { DatatableComponent } from './admin/data/datatable/datatable.component';
import { SpinnerComponent } from './util/spinner/spinner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SpinnerMainComponent } from './util/spinner/spinner-main/spinner-main.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SettingComponent } from './setting/setting.component';


@NgModule({
  declarations: [MainAppComponent,DashboardComponent, HeaderComponent,
  StatisticsComponent, AdminComponent, ProfileComponent, DataComponent, DatatableComponent, SpinnerComponent, SpinnerMainComponent, MyProfileComponent, SettingComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
    MatButtonToggleModule,
    MatTabsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [SpinnerComponent]
})
export class MainAppModule { }
