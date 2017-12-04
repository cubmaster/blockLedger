import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { SendComponent } from './send/send.component';
import {FrameworkModule} from '../framework/framework.module';
import {AccountManagementService} from '../services/account-management.service';
import {TransactionsService} from '../services/transactions.service';
import {FormsModule} from '@angular/forms';
import { QRCodeModule } from 'angular2-qrcode';
import { ReceiptComponent } from './receipt/receipt.component';
import { ConsignmentComponent } from './consignment/consignment.component';

@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FrameworkModule,
    FormsModule,
    QRCodeModule
  ],
  providers: [
    AccountManagementService,
    TransactionsService
  ],
  declarations: [SendComponent, ReceiptComponent, ConsignmentComponent]
})
export class TransactionsModule  { }
