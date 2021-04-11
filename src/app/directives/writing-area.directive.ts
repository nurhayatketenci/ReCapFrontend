import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appWritingArea]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: WritingAreaDirective,
    multi: true
  }]
})
export class WritingAreaDirective implements Validator {
  
  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value && control.value.length != 2) {
      return { 'invalid': true };
    }
    return null;
  }
}
