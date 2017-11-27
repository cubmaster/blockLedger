import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WalletsComponent} from './wallets/wallets.component';

const routes: Routes = [
  {path: 'wallets', component: WalletsComponent},
  {path: '', component: WalletsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
