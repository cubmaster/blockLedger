


import {EventEmitter, Injectable} from "@angular/core";


@Injectable()
export class EventService {

    dispatcher: EventEmitter<any>;


    constructor() {
        this.dispatcher = new EventEmitter();
    }

    emitMessageEvent(name:string, data:any){

        this.dispatcher.emit(new Message(name,data));

    }

    getEmitter() {
        return this.dispatcher;
    }


}

export class Message {
    constructor( public name:string, public data:any){

    }

}