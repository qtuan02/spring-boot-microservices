import { Directive } from '@angular/core';

@Directive({
  selector: '[appLayoutCard]',
  host: {
    class: 'border border-gray-200 p-4 rounded-xl bg-white',
  },
})
export class LayoutCard {
  constructor() {}
}
