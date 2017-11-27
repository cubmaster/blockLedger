import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  @Input() pagetitle:string;
  @Input() subtitle:string;
  @Input() type:string;
  @Input() tabs:string;
  @Input() icon:string;

  private returnUrl:string;

  constructor(private route: ActivatedRoute,
              private router: Router,) {

  }

  ngOnInit(){
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  goBack(){
    this.router.navigate([this.returnUrl]);
  }

}
