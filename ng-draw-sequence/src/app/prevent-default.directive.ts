import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[preventDefault]'
})
export class PreventDefaultDirective {

  @HostListener('click', ['$event'])
  public onClick(event: any): void
  {
      event.preventDefault();
  }
}

