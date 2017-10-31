import { Headers } from '@angular/http';
import {UserService} from '../services/user.service';



export class HTTPHelpers{


  static GetAPIHeaders(userservice: UserService){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');

    if(!!userservice && userservice.isLoggedIn()){
      headers.append('Authorization', 'Bearer ' +  userservice.getToken());
    }

    return headers;
  };



}
