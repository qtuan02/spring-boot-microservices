import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ROOT_PATHS, WISHLIST_PATHS } from '~/core/constants/path';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, MatIconButton, MatIcon, RouterLink],
  templateUrl: './header.html',
})
export class Header {
  readonly ROOT_PATHS = ROOT_PATHS;
  readonly WISHLIST_PATHS = WISHLIST_PATHS;
}
