import {UserService} from './user.service';

import {Http, RequestOptions, XHRBackend} from '@angular/http';
 import {HTTPHelpers} from '../helpers/HTTPHelpers';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpInterceptor extends Http {



    constructor(private backend: XHRBackend, private us: UserService, private  defaultOptions: RequestOptions) {

        super(backend, defaultOptions);


    }

    request(url:any, options:any) {
        return super.request(url, options)
          .retryWhen(error => {
                  console.error('REQUEST ERROR'  + error);
                  return error.delay(500);
          })
          .timeout(10000).onErrorResumeNext();

    }

    getOptions(_method: string,_url:string,_body:string){


        let ret:RequestOptions = new RequestOptions({
            url: _url,
            method: _method,
            headers: HTTPHelpers.GetAPIHeaders(this.us),
            withCredentials: true

        });

        return  ret;

    }

    get(url:any)
    {
            return super.get(url, this.getOptions('get',url,null));
    }
    post(url:any,body:any) {
      return super.post(url, body, this.getOptions('post', url, body));
    }
    delete(url:any){
            return super.delete(url,this.getOptions('delete',url,null));
    }
    put(url:any){
      return super.put(url,this.getOptions('put',url,null));
    }

}
