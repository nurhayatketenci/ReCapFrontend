import { HostListener, Input } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {
  @Input() appColor: string;
  @Input() appKey:string
  constructor(private el:ElementRef) { }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('black');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
  @HostListener('keypress',['$event']) onkeypres(event:KeyboardEvent){
    const IS_LETTER= /^[a-zA-Z]+$/.test(event.key);
    if (!IS_LETTER){
      event.preventDefault();
    }
  }
}
