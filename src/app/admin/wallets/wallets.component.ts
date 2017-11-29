import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Account} from '../../models/models';
import {datafilter, DataService} from '../../services/data.service';
import {UserService} from '../../services/user.service';
import {AccountManagementService} from '../../services/account-management.service';
import {PriceAPIService} from '../../services/price-api.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class WalletsComponent implements OnInit {
  private xrate: number;

  public currentAccount: Account = new Account();
  public accounts: Account[];
  constructor(private ds: DataService,
              private us: UserService,
              private ams: AccountManagementService,
              private price: PriceAPIService
  ) { }

  ngOnInit() {
    const id = this.us.getCurrentUser().id;
    const self = this;
     this.ams.accounts(function(result){
       console.log(result);
     });

    this.price.getSpot('ETH-USD').subscribe(val =>{
      this.xrate = val.data.amount;
      this.ams.getUserAccounts().subscribe((ret: Account[]) => {
        this.accounts = ret;
        this.accounts.forEach(function(acct: Account){
          self.setBalance(acct);
        });
      });
    }) ;



  }

  add() {
    this.addAccount(this.currentAccount);
  }
  create() {
    const self = this;
    this.ams.createAccount(this.currentAccount.name, this.currentAccount.privateKey, function (result: Account){
      self.addAccount(result);
    });
  }

  addAccount(acct: Account){
    const self = this;
    acct.user = this.us.getCurrentUser().id;
    this.ds.create('Account', acct).subscribe(ret => {
      self.setBalance(ret);
      this.accounts.push(ret);
    });
  }

  setBalance(acct: Account){
    const self = this;
    this.ams.getBalance(acct.address, function(bal: any){
      acct.balance = bal;
      acct.xBalance = bal * self.xrate;
    });
  }


  DeleteHandler(account: Account){
    this.DeleteAccount(account);
  }
  DestroyHandler(account: Account){
    this.DeleteAccount(account);
    //kill on blockchain too

  }
  DeleteAccount(account: Account){
    const ix = this.accounts.indexOf(account);
    this.accounts.splice(ix, 1);
    this.ds.delete('Account', account._id).subscribe();
  }

}
