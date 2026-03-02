import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-back-button',
  imports: [MatButton, MatIcon],
  templateUrl: './back-button.html',
  host: { class: 'block' },
})
export class BackButton {
  location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
