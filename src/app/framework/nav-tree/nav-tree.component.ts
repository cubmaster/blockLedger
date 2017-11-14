import { Component, OnInit } from '@angular/core';
import {ItreeNode} from '../../uihelpers/tree/tree.component';

@Component({
  selector: 'aot-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.less']
})
export class NavTreeComponent implements OnInit {

  constructor() { }

  private nodes: ItreeNode[];

  ngOnInit() {
      this.nodes = [{text: 'IFRS',hide: false, children: [
                      {text: 'Administration', hide: false, children: []}]},
                    {text: 'My Schedule', hide: false, children: []},
                    {text: 'Roles Accreditation', hide: false, children: []},
                    {text: 'My Workbasket', hide: false, children: [
                      {text: 'IFRS Approvals', hide: false, children: []},
                      {text: 'WRT Approvals', hide: false, children: []},
                      {text: 'Roles Approvals', hide: false, children: []},
                      {text: 'Administration', hide: false, children: []}
                    ]}];
  }

}
