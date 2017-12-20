import { Injectable } from '@angular/core';
import {datafilter, DataService} from './data.service';
import {UserService} from './user.service';
import {Consignment} from '../models/models';
import {Web3BaseService} from './web3-base.service';
import * as  consignment from '../../../build/contracts/Consignment.json';
import {PriceAPIService} from './price-api.service';
import * as contract from 'truffle-contract';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {errorHandler} from '@angular/platform-browser/src/browser';


@Injectable()
export class AlertsService extends Web3BaseService  {
 // public events: Observable<any>[] = [];
  public allEvents: any[];
  private consignmentContract: any;

  constructor(private ds: DataService,
              private us: UserService,
              public ps: PriceAPIService) {

    super(ps);
    this.consignmentContract = contract(consignment);
    this.consignmentContract.setProvider(this.conn.currentProvider);
    this.consignmentContract.defaults({
      gas: 300000,
      gasPrice: 100
    });
  }

 //start(){
 //  const tick$ = Observable.interval(1000);
 //  const subject = new Subject();

 //  this.ds.query('Consignment', new datafilter({user: this.us.getCurrentUser().id}, 'timestamp')).subscribe(ret =>{
 //    ret.forEach( (val: Consignment) =>{
 //      const myContract = this.consignmentContract.at(val.contractAddress);
 //      const OnPurchase = myContract.OnPurchase(this.eventHandler);
 //      const OnItemReceived = myContract.OnItemReceived(this.eventHandler);
 //      subject.subscribe(OnPurchase);
 //      subject.subscribe(OnItemReceived);

 //    });
 //    tick$.subscribe(subject);

 //  });

 //}

  start(){
    this.allEvents = [];
    this.ds.query('Consignment', new datafilter({user: this.us.getCurrentUser().id}, 'timestamp')).subscribe(ret =>{
          ret.forEach( (val: Consignment) => {
                  const myContractInstance = this.consignmentContract.at(val.contractAddress);
                  const events = myContractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
                  events.watch(this.eventHandler);
                  this.allEvents.push(events);
          });

      });



  }




  eventHandler(error, response)
  {
    console.log('EVENT', response);
  };

}
