import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {FrameworkModule} from '../framework/framework.module';
import {Web3BaseService} from '../services/web3-base.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FrameworkModule
  ],
  providers:[
    Web3BaseService
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
