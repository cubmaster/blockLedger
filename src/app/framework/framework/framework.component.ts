import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';
import {UserModel} from '../../models/models';
import {AlertsService} from '../../services/alerts.service';




@Component({
  selector: 'framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.less']
})
export class FrameworkComponent implements OnInit {
  private openMenu:boolean = true;

  private IsAuthenticated: boolean = false;
  public  title: string= '';

  public username: string;
  public password: string;


   public User: UserModel;


  constructor(private user_service: UserService,
              private router: Router,
              private alerts: AlertsService) {
  }


  ngOnInit(){

    //this.title = this.settings.appName;
    //this.user_service.login();



    //this.IsAuthenticated = this.user_service.isLoggedIn();
    //this.User = this.user_service.getCurrentUser();
   // this.user_service.isLoggedIn();
   // this.router.navigate(['/home']);

    this.User = this.user_service.getCurrentUser();
    if(!!this.User) {
      this.IsAuthenticated = true;
    }

    this.alerts.start();
  }
  ngOnDestroy(){

  }



  toggleMenu(event:any) {
    event.preventDefault();
    this.openMenu = !this.openMenu;
    $('#wrapper').toggleClass('toggled');
  }
  logout(){
    console.log('logout');
    this.IsAuthenticated = false;
    this.user_service.logout();
  }

  signin() {
        this.user_service.login(this.username, this.password).subscribe(ret=>
        {
          if (ret === 'Success') {
            this.User = this.user_service.getCurrentUser();
            this.IsAuthenticated = true;
          }
        });
  }



}
