
import { Injectable } from '@angular/core';
import * as web3 from 'Web3';
import {environment} from '../../environments/environment';




@Injectable()
export class Web3BaseService {
  public conn: web3;

  constructor() {
    if (typeof this.conn  !== 'undefined') {
      this.conn = new web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      this.conn = new web3(new web3.providers.HttpProvider(environment.blockchain));
    }



  }



  getBalance(acct: string, fn: any) {
    const self = this;
    this.conn.eth.getBalance(acct, function(err, bal){
      if (!!err) {
        console.error(err);
      }else {
        fn( self.getEther(bal) );
      }
    });


  }
  getEther(val: any){
  const ret =  this.conn.fromWei(val, 'ether').toNumber();
    console.log(ret);
    return ret;
  }

  isConnected(): boolean {
    return this.conn.isConnected();
  }

  accounts(): any{
    return  this.conn.personal.accounts();
  }
}