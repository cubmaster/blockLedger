import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  public network: string;

  constructor(private ss: SettingsService){
    this.network = ss.getNetwork();
  }

  ngOnInit() {
  }

  updateSettings(){
    this.ss.setNetwork(this.network);
  }


}
