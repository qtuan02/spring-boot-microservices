import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Navigate {
  private readonly router = inject(Router);

  redirect(path: string | string[]): void {
    const commands = Array.isArray(path) ? path : [path];
    this.router.navigate(commands);
  }

  redirectWithQuery(path: string | string[]): void {
    const commands = Array.isArray(path) ? path : [path];
    this.router.navigate(commands, {
      queryParamsHandling: 'preserve',
    });
  }
}
