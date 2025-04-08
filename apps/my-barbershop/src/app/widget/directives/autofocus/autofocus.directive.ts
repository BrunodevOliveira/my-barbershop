import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[mbAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  @Input('mbAutofocus') autoFocus?: boolean = true;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    if (!this.autoFocus) return;

    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 500);
  }
}
