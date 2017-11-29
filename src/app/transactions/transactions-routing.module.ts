import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SendComponent} from './send/send.component';
import {ReceiptComponent} from './receipt/receipt.component';

const routes: Routes = [
  {path: 'receipt/:id', component: ReceiptComponent},
  {path: 'send', component: SendComponent},
  {path: '', component: SendComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
