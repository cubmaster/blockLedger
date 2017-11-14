import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {  JEService} from './services/je.service';
import {contract} from 'truffle-contract';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {PriceAPIService} from './services/price-api.service';
import { HttpModule} from '@angular/http';
import {UserService} from './services/user.service';
import {RouterModule} from '@angular/router';
import {FrameworkModule} from './framework/framework.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FrameworkModule
  ],
  providers: [
    JEService,
    PriceAPIService,
    UserService
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

