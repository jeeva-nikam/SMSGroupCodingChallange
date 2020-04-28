import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { SaveRecordComponent } from './save-record/save-record.component';
import { AuthGuard} from './auth_guard/auth_guard'


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Records', component: RecordsComponent,canActivate: [AuthGuard] },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'SaveRecord', component: SaveRecordComponent, canActivate: [AuthGuard]},
  {path: 'SaveRecord/:id', component: RecordsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
