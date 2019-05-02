import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';
import { AuthService } from './auth-service/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    ManageComponent
  ],
  providers: [
    AuthService
  ]
})
export class AdministrationModule { }
