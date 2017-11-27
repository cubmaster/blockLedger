import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PriceAPIService {

  constructor(private http: Http) { }

  public getSpot(cx: string){

    // cx = 'USD_ETH'

    return this.http.get('https://api.coinbase.com/v2/prices/' + cx + '/spot')
      .map(this.extractData)
      .catch(this.handleError);


  }
  extractData(res: any) {

    let body = res.json();

    return body || { };

  };
  handleError(error: any) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  };

}
