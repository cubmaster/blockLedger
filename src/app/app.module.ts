import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ConnectionService} from './services/connection.service';
import {contract} from 'truffle-contract';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
