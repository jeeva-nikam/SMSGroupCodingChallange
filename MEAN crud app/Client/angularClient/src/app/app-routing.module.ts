import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { SaveRecordComponent } from './save-record/save-record.component';


const appRoutes: Routes = [
// { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },
// { path: 'facility-material', loadChildren: './facility/facility.module#FacilityModule', canActivate: [AuthGuardGuard] },
// { path: 'power-bi', loadChildren: './power-bi/power-bi.module#PowerBiModule', canActivate: [AuthGuardAdmin] },
// { path: 'carrier-management', loadChildren: './carrier/carrier.module#CarrierModule', canActivate: [AuthGuardAdmin] },
// { path: 'effective-date-ex', loadChildren: './effective-date-ex/effective-date-ex.module#EffectiveDateExModule', canActivate: [AuthGuardAdmin] },
// { path: 'barcode', component: BarcodeComponent, canActivate: [AuthGuardGuard] },
// { path: '**', component: PageNotFoundComponent }
{ path: '', component: LoginComponent },
{ path: 'Login', component: LoginComponent },
{ path: 'Records', component: RecordsComponent },
{ path: 'SignUp', component: SignUpComponent },
{ path: 'SaveRecord', component: SaveRecordComponent },
{path: 'SaveRecord/:id', component: RecordsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
