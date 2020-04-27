import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { SaveRecordComponent } from './save-record/save-record.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';
import { CookieService } from 'ngx-cookie-service';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonService } from './common.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    LoginComponent,
    RecordsComponent,
    SaveRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    PanelModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true}, CookieService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
