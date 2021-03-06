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
                      {text: 'Accounts', hide: false,path: '/admin/wallets',  children: []},
                      {text: 'Preferences', hide: false,path: '/admin/settings',  children: []}
                    ]},
                    {text: 'Transactions', hide: false,path: '', children: [
                      {text: 'Send Money', hide: false,path: '/transactions/send',  children: []},
                      {text: 'Consignment', hide: false,path: '/transactions/consignment',  children: []}
                    ]},
                    {text: 'Roles Accreditation', hide: false,path: '', children: []},
                    {text: 'My Basket', hide: false,path: '', children: [
                      {text: 'Consignments', hide: false,path: '/transactions/consignmentShop', children: []},
                      {text: 'Transactions', hide: false,path: '', children: []},
                      {text: 'My Consignments', hide: false,path: '', children: []}
                    ]}];
  }

  selected(node: NavTreeNode){
    const path = [node.path];
    this.router.navigate(path);
  }

}
