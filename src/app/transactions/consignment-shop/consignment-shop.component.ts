import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Account, Consignment} from '../../models/models';
import {ConsignmentService} from '../../services/consignment.service';
import {AccountManagementService} from '../../services/account-management.service';



@Component({
  selector: 'app-consignment-shop',
  templateUrl: './consignment-shop.component.html',
  styleUrls: ['./consignment-shop.component.less']
})
export class ConsignmentShopComponent implements OnInit {

  public consignments: Consignment[] = [];

  public userAccounts: Account[];
  public selectedAccount: Account;
  public selectedItem: Consignment;
  public receipt: string;



  constructor(
    private ds: DataService,
    private cs: ConsignmentService,
    private ams: AccountManagementService
  ) { }

  ngOnInit() {

    this.ds.query('Consignment').subscribe(cons => {
      this.consignments = cons;
    });
    this.ams.getUserAccounts().subscribe(( acct: Account[]) => {
      this.userAccounts = acct;
    });
  }

  Buy(){
      const self = this;
      this.cs.buy(this.selectedAccount.address,  this.selectedItem.contractAddress, this.selectedItem.price).then((result: any) => {
          self.selectedItem.receipt =  result;
          self.selectedItem.buyerAddress = this.selectedAccount.address;
          self.selectedItem.state = 'sold';
          self.receipt = window.location + '/pickup/' + this.selectedItem._id;

          self.ds.save('Consignment', self.selectedItem).subscribe();
      });

  }

  SelectItem(item: Consignment){
    this.selectedItem = item;
  }

  convertToEth(value){
    return this.cs.convertFromWei(value) ;


  }
}
