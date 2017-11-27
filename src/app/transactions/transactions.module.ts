import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { SendComponent } from './send/send.component';
import {FrameworkModule} from '../framework/framework.module';
import {AccountManagementService} from '../services/account-management.service';
import {TransactionsService} from '../services/transactions.service';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FrameworkModule,
    FormsModule
  ],
  providers: [
    AccountManagementService,
    TransactionsService
  ],
  declarations: [SendComponent]
})
export class TransactionsModule  { }
