import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { WalletsComponent } from './wallets/wallets.component';
import {FrameworkModule} from '../framework/framework.module';
import { WalletComponent } from './wallets/wallet/wallet.component';
import {UIHelpersModule} from '../uihelpers/uihelpers.module';
import {FormsModule} from '@angular/forms';
import {UserService} from '../services/user.service';
import {DataService} from '../services/data.service';
import {AccountManagementService} from '../services/account-management.service';
import { SettingsComponent } from './settings/settings.component';
import {SettingsService} from '../services/settings.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FrameworkModule,
    UIHelpersModule,
    FormsModule
  ],
  providers: [
    UserService,
    DataService,
    AccountManagementService,
    SettingsService
  ],
  declarations: [WalletsComponent, WalletComponent, SettingsComponent]
})
export class AdminModule { }
