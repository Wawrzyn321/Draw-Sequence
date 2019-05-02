import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountingListComponent } from './counting-list/counting-list/counting-list.component';
import { AboutComponent } from './about/about/about.component';
import { LoginComponent } from './administration/login/login.component';
import { ManageComponent } from './administration/manage/manage.component';
import { ContributeComponent } from './contribute/contribute/contribute.component';
import { DrawComponent } from './contribute/draw/draw.component';
import { UploadComponent } from './contribute/upload/upload.component';
import { RedirectToLoginIfNotAuthenticatedService } from './administration/routeGuardServices/redirect-to-login-if-not-authenticated';
import { RedirectToManageIfAuthenticatedService } from './administration/routeGuardServices/redirect-to-manage-if-authenticated.service';

const aaa: Routes = [
    { path: '', redirectTo: 'draw', pathMatch: 'full' },
    { path: 'draw', component: DrawComponent },
    { path: 'upload', component: UploadComponent }
];

const routes: Routes = [
  { path: '', redirectTo: 'counting-list', pathMatch: 'full' },
  { path: 'counting-list', component: CountingListComponent },
  { path: 'login', component: LoginComponent, canActivate: [ RedirectToManageIfAuthenticatedService ] },
  { path: 'manage', component: ManageComponent, canActivate: [ RedirectToLoginIfNotAuthenticatedService ] },
  { path: 'contribute', component: ContributeComponent, children: aaa },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'counting-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
