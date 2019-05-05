import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiConfig, API_CONFIG } from './apiConfig';
import { AboutComponent } from '../about/about.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { FootComponent } from '../foot/foot.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdministrationModule } from '../administration/administration.module';
import { ContributeModule } from '../contribute/contribute.module';
import { HttpClientModule } from '@angular/common/http';
import { CountingListModule } from '../counting-list/counting-list.module';

const apiConfig: ApiConfig = {
  mainUrl: 'https://drawsequence.azurewebsites.net',
  auth: '/Auth',
  image: '/Image'
};

@NgModule({
  declarations: [
    AboutComponent,
    NavigationComponent,
    FootComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AdministrationModule,
    ContributeModule,
    HttpClientModule,
    CountingListModule
  ],
  providers: [
    { provide: API_CONFIG, useValue: apiConfig },
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    AdministrationModule,
    ContributeModule,
    HttpClientModule,
    AboutComponent,
    NavigationComponent,
    FootComponent,
    CountingListModule
  ]
})
export class CoreModule { }
