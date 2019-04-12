import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodayComponent } from './today/today.component';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { UtilService } from './shared/services/util/util.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    TodayComponent,
    DigitalClockComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
