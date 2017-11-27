import {Directive, ElementRef, Input, OnInit} from '@angular/core';
declare let $: any;


@Directive({
  selector: '[model-trigger]'
})
export class ModelTriggerDirective implements OnInit  {
  private el: HTMLElement;


  @Input('model-trigger') modalId: string;

  constructor(ref: ElementRef) {
    this.el = ref.nativeElement;
  }

  ngOnInit(){
      this.el.addEventListener('click',e=>{
        $('#' + this.modalId).modal({});
      });
  }
}
