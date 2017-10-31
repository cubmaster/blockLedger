import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { ConnectionService} from './services/connection.service';
import {JE, LedgerAccount} from './services/LedgerAccounts';

declare var window: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public isConnected: boolean;
    public je: JE;
    constructor(public myconnection: ConnectionService) {
      this.isConnected = myconnection.isConnected();

      this.je = new JE();
      this.je.amount = 0;
    }

    ngOnInit(){


    }

  submit() {
      console.log(this.je);
      this.myconnection.submitJE(this.je,(dbBal: any, crBal: any) => {
        console.log(dbBal.toString(10));
        console.log(crBal.toString(10));

      });
  }
  refreshBalances(){
      this.myconnection.accounts().forEach((la: LedgerAccount) => {
          this.myconnection.getBalance(la.accountNumber,(result: any) => {
              la.balance = result;
          });
      });
  }

}

