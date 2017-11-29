import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WalletsComponent} from './wallets/wallets.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {path: 'settings', component: SettingsComponent},
  {path: 'wallets', component: WalletsComponent},
  {path: '', component: WalletsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
