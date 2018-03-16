import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Consignment} from '../../models/models';
import {ConsignmentService} from '../../services/consignment.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {datafilter, DataService} from '../../services/data.service';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.less']
})
export class PickupComponent implements OnInit {

  public trans: Consignment;
  public receiptURL: string;

  constructor(private cs: ConsignmentService,
              private us: UserService,
              private route: ActivatedRoute,
              private ds: DataService
  ) { }

  ngOnInit() {
    const self = this;

    self.cs.getReceipt(self.route.snapshot.paramMap.get('id')).subscribe((t: Consignment) => {
        self.trans = t[0];

        self.receiptURL =  environment.client + '/transactions/consignmentShop/pickup/' + self.trans._id;


    });
  }

  complete() {
    const self = this;

    this.cs.Received(this.trans.contractAddress, this.trans.buyerAddress).then(result=> {

      self.trans.state = 'closed';
      self.ds.save('Consignment', self.trans);

      console.log(result);
    });
  }
}
