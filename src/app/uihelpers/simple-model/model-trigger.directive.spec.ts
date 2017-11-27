import { ModelTriggerDirective } from './model-trigger.directive';
import {ElementRef} from '@angular/core';

describe('ModelTriggerDirective', () => {
  it('should create an instance', () => {
    const directive = new ModelTriggerDirective(new ElementRef('span'));
    expect(directive).toBeTruthy();
  });
});
