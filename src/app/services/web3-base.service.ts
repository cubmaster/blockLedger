
import { Injectable } from '@angular/core';
import * as web3 from 'Web3';
import {environment} from '../../environments/environment';




@Injectable()
export class Web3BaseService {
  public conn: web3;

  constructor() {

      const w: any = window;

      if (typeof w.web3 !== 'undefined') {
        this.conn = new web3(w.web3.currentProvider);
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
        let balance = bal.toNumber();
        fn( self.getEther(balance) );
      }
    });
  }
  getEther(val: any){
  const ret =  this.conn.fromWei(val, 'ether');
    console.log(ret);
    return ret;
  }

  isConnected(): boolean {
    return this.conn.isConnected();
  }

  accounts(cb) {
    return  this.conn.eth.getAccounts(function(error, result){
      if(!!error){
        console.error(error);
      }else {
        cb(result);
      }
    });
  }

  version(cb) {
    return this.conn.version.getNode(function(error, result){
      console.log(result);
      cb(error, result);
    });

  }

}
