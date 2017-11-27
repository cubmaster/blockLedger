//import { Injectable } from '@angular/core';
//import { Web3BaseService} from './web3-base.service';
//import Contract from 'truffle-contract';
//import {LedgerAccount, LedgerAccounts, JE} from '../models/LedgerAccounts';
//
//import ledgerArtifact from '../../../build/contracts/Ledger.json';
//
//
//
//@Injectable()
//export class LedgerService extends Web3BaseService {
//
//  private ledger = Contract(ledgerArtifact);
//
//
//
//  constructor() {
//
//    this.ledger.setProvider(this.conn.currentProvider);
//    LedgerAccounts.forEach(( acct: LedgerAccount, i: number) => {
//        acct.accountNumber = this.conn.eth.accounts[i];
//    });
//
//    console.log((LedgerAccounts));
//  }
//
//
//  getDb(){
//
//  }
//
//  hello(fn: any) {
//    this.ledger.deployed().then(deployed => {
//       deployed.Helloworld.call().then(answer => {
//          fn(answer);
//      });
//    });
//
//  }
//  submitJE(je: JE, fn: any){
//    this.conn.eth.defaultAccount = je.db;
//
//    this.ledger.deployed().then(deployed => {
//      deployed.JE.call(je.cr, je.amount).then((ret:any) => {
//         fn(ret[0], ret[1]);
//      });
//    });
//  }
//  getBalance(acct: string, fn: any){
//    const bal = this.conn.eth.getBalance(acct);
//
//    fn(bal.toNumber());
//  }
//  isConnected(): boolean {
//    return this.conn.isConnected();
//  }
//
//  accounts(): LedgerAccount[]{
//     return  LedgerAccounts;
//  }
//
//}

