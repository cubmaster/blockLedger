import { Component, OnInit } from '@angular/core';
import {AccountManagementService} from '../../services/account-management.service';
import {Account} from '../../models/models';
import {Transaction, TransactionsService} from '../../services/transactions.service';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.less']
})
export class SendComponent implements OnInit {

  public tx: Transaction;
  public userAccounts: Account[];
  public selectedAccount: Account;
  public mode = 'WEI' ;
  public receipt: string;

  public receiptURL: string;



  constructor(private ams: AccountManagementService, private txs: TransactionsService) {
    this.tx = new Transaction();
  }


  ngOnInit() {
    this.ams.getUserAccounts().subscribe(( acct: Account[]) => {
        this.userAccounts = acct;
    });
  }
  send() {
    const self = this;
    this.tx.from = this.selectedAccount.address;
    this.txs.sendTransaction(this.mode, this.tx, this.selectedAccount.privateKey,function(error: string, ret: string){

      if (!!error) {
        console.error(error);
      }else {
        self.receiptURL =  environment.client + '/transactions/receipt/' + ret;
      }
    });
  }
}
