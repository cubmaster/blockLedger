import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';


@Injectable()
export class SettingsService {
  private ls: any = localStorage;


  constructor() { }

  getNetwork(){

    let nw = null;

    if(!!this.ls.getItem('settings')){
      nw = this.ls.getItem('settings').network;
    }
    if(!nw){
      return environment.blockchain;
    } else {
      return nw;
    }

  }
  setNetwork( network: string){
    this.writeToStorage('network', network);
  }
  writeToStorage(name: string, value: string){
    let obj = JSON.parse(this.ls.getItem('settings'));
    if(!obj){
      obj = {};
    }

    obj[name] = value;
    this.ls.setItem('settings', JSON.stringify(obj));
  }
}
