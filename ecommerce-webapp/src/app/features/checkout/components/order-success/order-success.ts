import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ROOT_PATHS } from '~/core/constants/path';

@Component({
  selector: 'app-order-success',
  imports: [MatButton, MatIcon, RouterLink],
  templateUrl: './order-success.html',
})
export class OrderSuccess {
  ROOT_PATHS = ROOT_PATHS;
}
