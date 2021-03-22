import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReadersComponent } from './readers/readers.component';
import { WriteUpComponent } from './write-up/write-up.component';
import { FooterComponent } from './util/footer/footer.component';
import { AutoCompleteDialogComponent } from './util/auto-complete-dialog/auto-complete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomHttpInterceptor } from './service/http.interceptor';
import { SpinnerComponent } from './main-app/util/spinner/spinner.component';
import { AuthenticationService } from './service/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    ReadersComponent,
    WriteUpComponent,
    FooterComponent,
    AutoCompleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    AuthenticationService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
