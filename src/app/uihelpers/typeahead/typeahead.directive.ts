import {Directive, ElementRef, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';

/**
 * Evaluate https://valor-software.com/ngx-bootstrap/#/typeahead if it doesn't satisfy with your requirements
 * Use this directive if you need more flexibility on how the results look
 */
@Directive({
  selector: '[ifrsTypeahead]'
})
export class TypeaheadDirective implements OnInit, OnDestroy {

  private _element;
  private subscription: Subscription;

  @Input() typeaheadWaitMs: number = 500;

  @Input() typeaheadMinLength: number = 1;

  @Output() typeaheadChange: EventEmitter<string> = new EventEmitter();

  constructor(elementRef: ElementRef) {
    this._element = elementRef.nativeElement;
  }

  ngOnInit(): void {
    const eventStream = Observable.fromEvent(this._element, 'keyup')
      .map(() => this._element.value)
      .filter(value => {
        return value.length > this.typeaheadMinLength;
      })
      .debounceTime(this.typeaheadWaitMs)
      .distinctUntilChanged();

    this.subscription = eventStream.subscribe(input => {
      this.typeaheadChange.emit(input);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
