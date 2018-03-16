import { Component, OnInit } from '@angular/core';
import {Transaction, TransactionsService} from '../../services/transactions.service';
import {AccountManagementService} from '../../services/account-management.service';
import {Account, Consignment} from '../../models/models';
import {ConsignmentService} from '../../services/consignment.service';
import {DataService} from '../../services/data.service';
import {UserService} from '../../services/user.service';
import {AlertsService} from '../../services/alerts.service';

@Component({
  selector: 'app-consignment',
  templateUrl: './consignment.component.html',
  styleUrls: ['./consignment.component.less']
})
export class ConsignmentComponent implements OnInit {
  public tx: Consignment;
  public userAccounts: Account[];
  public mode = 'USD' ;
  public receipt: string;
  public selectedAccount: Account;

  public complete: boolean = false;

  constructor(private ams: AccountManagementService,
              private txs: TransactionsService,
              private cs: ConsignmentService,
              private ds: DataService,
              private us: UserService,
              private as: AlertsService) {
    this.tx = new Consignment();
  }

  ngOnInit() {

    this.ams.getUserAccounts().subscribe(( acct: Account[]) => {
      this.userAccounts = acct;
    });
  }
  createNew(){
    const self = this;
    this.tx.fromAddress =  this.selectedAccount.address;
    this.cs.convertToWei(this.mode, this.tx.price).then(resolved => {
      self.tx.price = resolved;
      self.cs.createNew(this.mode, this.tx.fromAddress, this.tx.price, (add: string) => {
        console.log(add);

        self.tx.contractAddress = add;
        self.tx.user = this.us.getCurrentUser().id;
        self.tx.timestamp = Date.now();
        self.tx.state = 'open';
        self.ds.create ('Consignment', this.tx).subscribe(instance =>{
          self.complete = true;
          self.tx = new Consignment();
          self.as.start();
        });
      });

    });

  }

}
