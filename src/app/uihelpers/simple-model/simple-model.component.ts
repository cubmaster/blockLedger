import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-simple-model',
  templateUrl: './simple-model.component.html',
  styleUrls: ['./simple-model.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SimpleModelComponent implements OnInit {

  @Input() elementId: string;

  constructor() { }

  ngOnInit() {
  }

}
