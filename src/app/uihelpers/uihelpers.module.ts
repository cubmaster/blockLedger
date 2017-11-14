import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TreeComponent} from './tree/tree.component';

import {DonutChartComponent} from './donut-chart/donut-chart.component';
import {TypeaheadDirective} from './typeahead/typeahead.directive';

import {RadioSwitchComponent} from './radio-switch/radio-switch.component';
import { SimpleModelComponent } from './simple-model/simple-model.component';
import { ModelTriggerDirective } from './simple-model/model-trigger.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TreeComponent,
    DonutChartComponent,
    TypeaheadDirective,
    RadioSwitchComponent,
    SimpleModelComponent,
    ModelTriggerDirective
  ],
  exports: [
    TreeComponent,
    DonutChartComponent,
    TypeaheadDirective,
    RadioSwitchComponent,
    SimpleModelComponent,
    ModelTriggerDirective
  ],
  entryComponents: [
  ]
})
export class UIHelpersModule {
}
