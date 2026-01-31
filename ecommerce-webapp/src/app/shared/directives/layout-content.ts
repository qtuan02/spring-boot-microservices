import { Directive } from '@angular/core';

@Directive({
  selector: '[appLayoutContent]',
  host: {
    class: 'max-w-[1200px] mx-auto w-full',
  },
})
export class LayoutContent {
  constructor() {}
}
