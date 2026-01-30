import { Routes } from '@angular/router';
import { ROOT_PATHS, WISHLIST_PATHS } from './core/constants/path';

export const routes: Routes = [
  //   {
  //     path: '',
  //     pathMatch: 'full',
  //     redirectTo: '/home',
  //   },
  {
    path: ROOT_PATHS.home,
    loadComponent: () => import('./features/home/pages/home').then((m) => m.Home),
  },
  {
    path: WISHLIST_PATHS.wishList,
    loadComponent: () => import('./features/wishlist/wishlist').then((m) => m.Wishlist),
  },
];
