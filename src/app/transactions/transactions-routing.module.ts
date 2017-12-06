import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SendComponent} from './send/send.component';
import {ReceiptComponent} from './receipt/receipt.component';
import {ConsignmentComponent} from './consignment/consignment.component';
import {ConsignmentShopComponent} from './consignment-shop/consignment-shop.component';

const routes: Routes = [
  {path: 'receipt/:id', component: ReceiptComponent},
  {path: 'send', component: SendComponent},
  {path: 'consignment', component: ConsignmentComponent},
  {path: 'consignmentShop', component: ConsignmentShopComponent},
  {path: '', component: SendComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
