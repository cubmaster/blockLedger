import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {FrameworkModule} from '../framework/framework.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FrameworkModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
