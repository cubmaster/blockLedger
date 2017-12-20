import { Injectable } from '@angular/core';
import {Web3BaseService} from './web3-base.service';
import * as contract from 'truffle-contract';

import * as  consignment from '../../../build/contracts/Consignment.json';
import {Transaction} from './transactions.service';
import {datafilter, DataService} from './data.service';
import {PriceAPIService} from './price-api.service';
import {promise} from 'selenium-webdriver';
import {AlertsService} from './alerts.service';

@Injectable()
export class ConsignmentService extends Web3BaseService {


  public consignmentContract: any;

  constructor(
    private ds: DataService,
    public ps: PriceAPIService

    ) {
    super(ps);


    this.consignmentContract = contract(consignment);
    this.consignmentContract.setProvider(this.conn.currentProvider);
    this.consignmentContract.defaults({
      gas: 300000,
      gasPrice: 100
    });

  }



   createNew(mode: string, acct: string, price: string, cb: any) {
      const self = this;
      const trans: Transaction = new Transaction();
       trans.from = acct;


       self.consignmentContract.new(trans).then(function(instance) {
          // Print the new address
            instance.setPrice.call(price);
            cb(instance.address);
          });


  }


  getByAddress(address: string) {
       const contract =  this.consignmentContract.at(address);



  }
  buy  (buyerAccount: string, contractAddress: string, price: any): Promise <any>
  {
    const self = this;

    const contract = this.consignmentContract.at(contractAddress);
    const trans = new Transaction();

      trans.gas =   300000;
      trans.gasPrice = 1000;
      trans.value =  price ;
      trans.from = buyerAccount;
    //  trans.to = contractAddress;
      return new Promise<string>(resolve => {
       //   this.conn.eth.sendTransaction(trans, function(error, result){
          contract.purchase(trans).then((result) => {
           const error = null;
          if(!!error){
            console.error((error));
          }  else {
            console.log(result);
            resolve(result);
          }
        });
      });
  }
  getReceipt(id: string) {

    return this.ds.query('Consignment', new datafilter({_id: id}, 'timestamp'));
  }


  Received(  contractAddress: string,  buyer: string): Promise <any> {
    return new Promise<string>(resolve => {

        const consignment = this.consignmentContract.at(contractAddress);
      const trans = new Transaction();

          trans.gas =   300000;
          trans.gasPrice = 1000;
          trans.from = buyer;

        consignment.confirmReceived.sendTransaction(trans).then((result) => {
            resolve(result);
        });
    });
  }
}
