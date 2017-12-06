import { Injectable } from '@angular/core';
import {Web3BaseService} from './web3-base.service';
import * as contract from 'truffle-contract';

import * as  consignment from '../../../build/contracts/Consignment.json';
import {Transaction} from './transactions.service';

@Injectable()
export class ConsignmentService extends Web3BaseService {


  public consignmentContract: any;

  constructor() {
    super();


    this.consignmentContract = contract(consignment);
    this.consignmentContract.setProvider(this.conn.currentProvider);

  }



   createNew(acct: string, price: number, cb: any){

       let params = [];
       params.push(price);
       const trans: Transaction = new Transaction();
       trans.from = acct;
       trans.gas = 4712388;
       trans.gasPrice = 100000000000;

       this.consignmentContract.new(  trans).then(function(instance) {
         // Print the new address
         cb(instance.address);
       }).catch(function(err) {
         console.error(err);
       });
  }


  getByAddress(address: string) {
       return this.consignmentContract.at(address);
  }
  buy(address: string,price: number,  cb){
    let contract = this.consignmentContract.at(address);
    let trans = new Transaction();
    trans.gasPrice = 100;
    trans.gas = 210000;
    trans.value = price;
    trans.from = address;
    trans.to = contract.address;

    contract.purchase.sendTransaction(trans).then(ret => {
        cb(ret);
    });

  }


}
