/**
 * Created by wmcclellan on 8/24/2016.
 */



import {UserService} from './user.service';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class DataService{
    server: string;

    constructor(private http: Http, private userservice: UserService) {

        this.server = environment.host;

    };


    query(obj:any, filter?: datafilter)
    {

        if(!filter) {
            return this.http.get(this.server + '/api/' + obj + '/list')
                .map(this.extractData)
                .catch(this.handleError);
        }else{
            let x = {filter: filter};
            return this.http.post(this.server + '/api/' + obj + '/list', x)
                .map(this.extractData)
                .catch(this.handleError);
        }

    }
    get(obj:string,command:string){
        return this.http.get(this.server + '/api/' + obj + '/' + command)
            .map(this.extractData)
            .catch(this.handleError);
    }


    create(obj:any,data:any) {
        return this.http.post(this.server + '/api/' + obj + '/create',data)
            .map(this.extractData)
            .catch(this.handleError);

    };

    getById(obj:any,id:number) {
        return this.http.get(this.server + '/api/' + obj + '/'  + id)
            .map(this.extractData)
            .catch(this.handleError);

    };
    save(obj:any,object:any) {

        return this.http.post(this.server + '/api/' + obj + '/save', object)
            .map(this.extractData)
            .catch(this.handleError);

    };
    delete(obj:any,id:any) {
        return this.http.delete(this.server + '/api/' + obj + '/' + id )
            .catch(this.handleError);

    };

    extractData(res:any) {

        let body = res.json();

        return body || { };

    };
    handleError(error:any) {
       console.error(error);
       return Observable.throw(error || 'Server error');
    };
}

export class datafilter{
    constructor(public where: object, public order:string)
    {

    }
}

