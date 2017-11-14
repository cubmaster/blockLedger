import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ifrs-radio-switch',
  templateUrl: './radio-switch.component.html',
  styleUrls: ['./radio-switch.component.less']
})
export class RadioSwitchComponent implements OnInit {
  @Input() trueValue: string = 'Yes';
  @Input() falseValue: string = 'No';
  @Input() value: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

}
