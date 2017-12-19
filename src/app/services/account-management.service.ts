import { Injectable } from '@angular/core';
import {Web3BaseService} from './web3-base.service';
import {Account} from '../models/models';
import {datafilter, DataService} from './data.service';
import {UserService} from './user.service';
import {PriceAPIService} from './price-api.service';


@Injectable()
export class AccountManagementService extends Web3BaseService {

  constructor(private ds: DataService, private us: UserService, public  ps: PriceAPIService) {
    super(ps);
  }
  createAccount(name: string, pwd: string, cb: any): Account {

    return this.conn.personal.newAccount(pwd, function(error: string, result: string ){
      if(!!error){
        console.error(error);
        cb(null);
      } else {
        const acct = new Account();
        acct.name = name;
        acct.privateKey = pwd;
        acct.address = result;
        acct.user = null;
        cb(acct);
      }
    });
  }
  getUserAccounts(){
    return this.ds.query('Account', new datafilter({user: this.us.getCurrentUser().id}, 'name'));
  }

}
