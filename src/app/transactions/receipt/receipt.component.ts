import { Component, OnInit } from '@angular/core';
import {Transact} from '../../models/models';

import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TransactionsService} from '../../services/transactions.service';
import {environment} from '../../../environments/environment';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.less']
})
export class ReceiptComponent implements OnInit {

  public trans: Transact;
  public receiptURL: string;
  constructor(private ts: TransactionsService,
              private route: ActivatedRoute,
              private us: UserService) { }

  ngOnInit() {
    const self = this;
        self.ts.getReceipt(self.route.snapshot.paramMap.get('id')).subscribe((t: Transact) => {
          self.trans = t[0];
          if(self.trans.user === self.us.getCurrentUser().id){
            self.receiptURL =  environment.client + '/transactions/receipt/' + self.trans.receipt;
          }

        });
  }

}
