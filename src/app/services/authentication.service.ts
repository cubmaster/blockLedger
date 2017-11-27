import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpInterceptor} from './HttpInterceptor';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  server: string;

  constructor(private http: HttpInterceptor) {

    this.server = environment.host;

  };

  login(){
    ///api/user
    return this.http.get(this.server + '/api/user/login')
      .map(this.extractData)
      .catch(this.handleError);

  }
  extractData(res:any) {

    let body = res.json();

    return body || { };

  };
  handleError(error: any) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  };


}
