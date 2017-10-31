import { BrowserXhr } from '@angular/http';

export class CustomBrowserXhr extends BrowserXhr {
    constructor() {
        super();
    };
    build(){
        let xhr = super.build();
        xhr.withCredentials = true;
        return (xhr);
    };
}