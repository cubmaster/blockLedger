import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Web3BaseService} from '../../services/web3-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public version: string;
  public provider: string;
  constructor(public w3: Web3BaseService) {
    const self = this;
    w3.version(function(error, result){
      if(!!error){
        console.error(error);
      }else{
        self.version = result;
        self.provider = self.w3.conn.currentProvider.host;
      }
    });
  }

  ngOnInit() {
  }

}
