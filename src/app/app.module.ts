import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import {contract} from 'truffle-contract';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {PriceAPIService} from './services/price-api.service';
import { HttpModule} from '@angular/http';
import {UserService} from './services/user.service';
import {RouterModule} from '@angular/router';
import {FrameworkModule} from './framework/framework.module';
import {AdminModule} from './admin/admin.module';
import {HttpInterceptor} from './services/HttpInterceptor';
import {AccountManagementService} from './services/account-management.service';
import {TransactionsModule} from './transactions/transactions.module';
import {ConsignmentService} from './services/consignment.service';
import {AlertsService} from './services/alerts.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FrameworkModule,
    AdminModule,
    TransactionsModule
  ],
  providers: [
    PriceAPIService,
    UserService,
    HttpInterceptor,
    AccountManagementService,
    ConsignmentService,
    AlertsService

  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

