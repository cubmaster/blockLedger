
import { Injectable } from '@angular/core';
import * as web3 from 'Web3';
import {environment} from '../../environments/environment';

import * as TruffleContract from 'truffle-contract';
import {PriceAPIService} from './price-api.service';


@Injectable()
export class Web3BaseService {
  public conn: web3;

  constructor(public ps: PriceAPIService) {

      const w: any = window;

      if (typeof w.web3 !== 'undefined') {
        this.conn = new web3(w.web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        this.conn = new web3(new web3.providers.HttpProvider(environment.blockchain));
      }


  }
  public  artifactsToContract(artifact: any) {
      const contractAbstraction = TruffleContract(artifact);
      contractAbstraction.setProvider(this.conn.currentProvider);
      return contractAbstraction;
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
  convertToWei (mode: string,  value: any ): Promise<string> {
    const self = this;

    if (mode === 'ETH'){
       return new Promise<string>(resolve =>{
         resolve(this.conn.toWei(value, 'ether'));
       });
    } else if (mode === 'USD') {
      return new Promise<string>(resolve =>{
        this.ps.getSpot('ETH-USD').subscribe((val: any) => {
          resolve(self.conn.toWei(value * (1 / val.data.amount)));
         });
      });
    } else if (mode === 'WEI') {
      return new Promise<string>(resolve => {
        resolve(self.conn.toBigNumber(value));
      });
    }

  }
  convertFromWei(value:any) : number {
    return this.conn.fromWei(value)
  }

}
