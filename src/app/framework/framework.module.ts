import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameworkRoutingModule } from './framework-routing.module';
import { FrameworkComponent } from './framework/framework.component';
import { LayoutComponent } from './layout/layout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

import {NavTreeComponent} from './nav-tree/nav-tree.component';
import {UIHelpersModule} from '../uihelpers/uihelpers.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FrameworkRoutingModule,
    UIHelpersModule,
    FormsModule
  ],

  declarations: [FrameworkComponent, LayoutComponent, DefaultLayoutComponent, NavTreeComponent],
  exports: [FrameworkComponent, LayoutComponent, DefaultLayoutComponent]
})
export class FrameworkModule { }
