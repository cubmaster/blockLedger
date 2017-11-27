import { Component, OnInit } from '@angular/core';
import {AccountManagementService} from '../../services/account-management.service';
import {Account} from '../../models/models';
import {Transaction, TransactionsService} from '../../services/transactions.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.less']
})
export class SendComponent implements OnInit {

  public tx: Transaction;
  public userAccounts: Account[];
  public mode = 'WEI' ;

  constructor(private ams: AccountManagementService, private txs: TransactionsService) {
    this.tx = new Transaction();
  }


  ngOnInit() {
    this.ams.getUserAccounts().subscribe(( acct: Account[]) => {
        this.userAccounts = acct;
    });
  }
  send() {
    this.txs.sendTransaction(this.mode, this.tx, function(error: string, ret: string){
      if(!!error) {
        console.error(error);
      }else {
        console.log(ret);
      }
    });

  }
}
