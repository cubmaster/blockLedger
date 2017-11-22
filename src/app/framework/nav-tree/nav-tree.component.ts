import { Component, OnInit } from '@angular/core';

import {NavTreeNode} from '../../models/models';
import {Router} from '@angular/router';

@Component({
  selector: 'aot-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.less']
})
export class NavTreeComponent implements OnInit {

  constructor( private router: Router) { }

  private nodes: NavTreeNode[];

  ngOnInit() {
      this.nodes = [{text: 'Admin',hide: false, path: '', children: [
                      {text: 'Wallets', hide: false,path: '/admin/wallets',  children: []}]},
                    {text: 'My Schedule', hide: false,path: '', children: []},
                    {text: 'Roles Accreditation', hide: false,path: '', children: []},
                    {text: 'My Workbasket', hide: false,path: '', children: [
                      {text: 'IFRS Approvals', hide: false,path: '', children: []},
                      {text: 'WRT Approvals', hide: false,path: '', children: []},
                      {text: 'Roles Approvals', hide: false,path: '', children: []},
                      {text: 'Administration', hide: false,path: '', children: []}
                    ]}];
  }

  selected(node: NavTreeNode){
    const path = [node.path];
    this.router.navigate(path);
  }

}
