import { Routes } from '@angular/router';
import { CART_PATHS, PRODUCT_PATHS, ROOT_PATHS } from './core/constants/path';

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
    path: CART_PATHS.cart,
    loadComponent: () => import('./features/cart/pages/cart').then((m) => m.Cart),
  },
  {
    path: PRODUCT_PATHS.productDetail,
    loadComponent: () =>
      import('./features/product/pages/product-detail').then((m) => m.ProductDetail),
  },
];
