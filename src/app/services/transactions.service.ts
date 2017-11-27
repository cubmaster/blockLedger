import { Injectable } from '@angular/core';
import {Web3BaseService} from './web3-base.service';
import {UserService} from './user.service';
import {PriceAPIService} from './price-api.service';

@Injectable()
export class TransactionsService extends Web3BaseService {

  constructor(private us: UserService,private ps: PriceAPIService) {
    super();
  }

  sendTransaction (mode: string,  obj: Transaction,  cb: any){
      if(mode === 'ETH'){
        obj.value = this.conn.toWei(obj.value);
        return this.conn.eth.sendTransaction(obj, cb);
      } else if (mode === 'USD'){
        this.ps.getSpot('ETH-USD').subscribe((val: any) => {
          obj.value = this.conn.toWei(obj.value * (1 / val.data.amount));
          return this.conn.eth.sendTransaction(obj, cb);
        });
      } else if (mode === 'WEI'){
        return this.conn.eth.sendTransaction(obj, cb);
      }
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
