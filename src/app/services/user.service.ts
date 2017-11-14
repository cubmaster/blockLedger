/**
 * Created by wmcclellan on 8/24/2016.
 */
import { Http, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import {EventEmitter} from '@angular/core';


import {environment} from '../../environments/environment';
import {HTTPHelpers} from '../helpers/HTTPHelpers';

@Injectable()
export class UserService{

  private loggedIn:boolean = false;
  private IsAuthenticated: EventEmitter<any>;
  private server: string;
  private ls: any = localStorage;

  constructor(private http: Http) {

    this.IsAuthenticated = new EventEmitter();
    this.IsAuthenticated.emit(this.loggedIn);
    this.server = environment.host;

  };
  getOptions(_method: string, _url: string, _body: string) {


    let ret: RequestOptions = new RequestOptions({
      url: _url,
      method: _method,
      headers: HTTPHelpers.GetAPIHeaders(this),
      body: _body,
      withCredentials: true
    });
    return ret;

  }
  public refresh() {

    let token = JSON.parse(this.ls.getItem('auth_token')).refresh_token;

    let url = this.server + '/api/user/refresh';
    return this.http.post(
      url,
      token, this.getOptions('post', url,token))
      .map((res: any) => <string[]> res.json())
      .map((res: any) => {
        if (res.message === 'Success') {
          this.ls.setItem('auth_token', JSON.stringify(res));
          this.loggedIn = true;
          this.IsAuthenticated.emit(this.loggedIn);
        }

      })
      .catch((error:any) => Observable.throw(JSON.stringify((error))|| 'Server error'));

  }

  public login(username: string, password: string) {

    const body = JSON.stringify({username, password});
    return this.http.post(
      this.server + '/api/user/login',
      body,{headers: HTTPHelpers.GetAPIHeaders(this)}
    )
      .map((res: any) => res.json())
      .map((res: any) => {

        if (res.message === 'Success') {

          this.ls.setItem('auth_token', JSON.stringify(res));
          this.loggedIn = true;
          this.IsAuthenticated.emit(this.loggedIn);
        }
        return res.message;

      })
      .catch(this.handleError);
  }

  public logout() {
    this.ls.removeItem('auth_token');
    this.loggedIn = false;

    this.IsAuthenticated.emit(this.loggedIn);

  }

  public isLoggedIn():boolean {
    let token = this.ls.getItem('auth_token');

    if(token){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }


    this.IsAuthenticated.emit(this.loggedIn);

    return this.loggedIn;
  }

  public register (username:string,email:string,password:string, lastName:string, firstName:string) {

    return this.http
      .post(
        this.server +'/api/user/create',
        JSON.stringify({username,email,password, lastName, firstName}),
        {headers: HTTPHelpers.GetAPIHeaders(null)}
      )
      .map((res: any) => res.json())
      .map((res: any) => {
        if (res.success) {
          console.log('login');
          this.ls.setItem('auth_token', res.token);
          this.IsAuthenticated.emit(this.loggedIn);
        }
        console.log(res.success);
        return res.success;
      }).catch(this.handleError);

  }

  private handleError(error:any) {
    console.error(JSON.stringify(error));
    return Observable.throw(error || 'Server error');
  }
  public GetAuthSubscription():boolean{
    return this.loggedIn;
  }
  public getCurrentUser(){
    return JSON.parse(this.ls.getItem('auth_token')).user;
  }
  public getToken(){
    return JSON.parse(this.ls.getItem('auth_token')).access_token;
  }
  public isExpired():boolean{
    var expire: Date = new Date(JSON.parse(this.ls.getItem('auth_token')).expires);
    var edate:Date = new Date(Date.now());
    if(edate>expire){

      return true;
    } else{

      return false;
    }




  }

};

