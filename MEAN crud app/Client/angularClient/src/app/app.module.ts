import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { SaveRecordComponent } from './save-record/save-record.component';
import { CookieService } from 'ngx-cookie-service';
import { PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonService } from './common.service';
import { HeaderComponent } from './header/header.component';
import { AuthGuard} from './auth_guard/auth_guard'


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    RecordsComponent,
    SaveRecordComponent,
    HeaderComponent
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
  providers: [CookieService, CommonService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
