import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

import {Account} from '../../../models/models';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class WalletComponent implements OnInit {

  @Input() account: Account;
  @Output() onDelete:  EventEmitter<any> = new EventEmitter();
  @Output() onDestroy:  EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  Delete(){
      this.onDelete.emit(this.account);
  }
  Destroy(){
    this.onDelete.emit(this.account);
  }
}
