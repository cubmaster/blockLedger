import { Injectable } from '@angular/core';
import {Web3BaseService} from './web3-base.service';
import {UserService} from './user.service';
import {PriceAPIService} from './price-api.service';
import {Transact} from '../models/models';
import {datafilter, DataService} from './data.service';

@Injectable()
export class TransactionsService extends Web3BaseService {

  constructor(private ds: DataService, private us: UserService,private ps: PriceAPIService) {
    super();
  }

  sendTransaction (mode: string,  obj: Transaction, pass: string,  cb: any){


      if(mode === 'ETH'){
        obj.value = this.conn.toWei(obj.value);
        this.execTrans(obj, pass, cb);
      } else if (mode === 'USD'){
        this.ps.getSpot('ETH-USD').subscribe((val: any) => {
          obj.value = this.conn.toWei(obj.value * (1 / val.data.amount));
          this.execTrans(obj, pass, cb);
        });
      } else if (mode === 'WEI'){
        this.execTrans(obj,pass, cb);
      }
  }
  execTrans(obj: Transaction, pass: string, cb: any) {
    const self = this;
    this.conn.personal.unlockAccount( obj.from, pass);
    this.conn.eth.sendTransaction(obj, function(error, result){
      self.conn.personal.lockAccount(obj.from);
      const tx = new Transact();
      tx.value = obj.value;
      tx.fromAddress = obj.from;
      tx.toAddress = obj.to;
      tx.receipt = result;
      tx.timestamp = Date.now();
      tx.user = self.us.getCurrentUser().id;
      self.ds.create('Transaction', tx).subscribe();

      cb(error, result);
    });
  }
  getReceipt(id: string) {

    return this.ds.query('Transaction', new datafilter({receipt: id}, 'timestamp'));
  }



}
export class Transaction {
  from: string;
  to: string;
  value: number; //wei
  gas: number;  //
  gasPrice: number;
  data: string;
  nounce: number;
}
