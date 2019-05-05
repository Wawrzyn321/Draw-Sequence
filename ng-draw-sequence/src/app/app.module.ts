import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountingListComponent } from './counting-list/counting-list/counting-list.component';
import { AboutComponent } from './about/about/about.component';
import { AdministrationModule } from './administration/administration.module';
import { ContributeModule } from './contribute/contribute.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavigationComponent } from './navigation/navigation.component';
import { FootComponent } from './foot/foot.component';
import { PreventDefaultDirective } from './prevent-default.directive/prevent-default.directive';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CountingListComponent,
    AboutComponent,
    NavigationComponent,
    FootComponent,
    PreventDefaultDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdministrationModule,
    ContributeModule,
    HttpClientModule,
    SharedModule
    // !environment.production
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
