import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleModelComponent } from './simple-model.component';

describe('SimpleModelComponent', () => {
  let component: SimpleModelComponent;
  let fixture: ComponentFixture<SimpleModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
