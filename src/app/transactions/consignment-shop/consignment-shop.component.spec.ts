import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentShopComponent } from './consignment-shop.component';

describe('ConsignmentShopComponent', () => {
  let component: ConsignmentShopComponent;
  let fixture: ComponentFixture<ConsignmentShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignmentShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignmentShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
