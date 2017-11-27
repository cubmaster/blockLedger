import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SendComponent} from './send/send.component';

const routes: Routes = [
  {path: 'send', component: SendComponent},
  {path: '', component: SendComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
