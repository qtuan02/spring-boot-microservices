import { Product } from '~/shared/types/product';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { CartItem } from '~/shared/types/cart';
import { produce } from 'immer';
import { computed, inject } from '@angular/core';
import { Toaster } from '../services/storage/toaster';

export type CartState = {
  items: CartItem[];
};

export const CART_STORAGE_KEY = 'ecommerce-webapp-cart';

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState<CartState>({
    items: [],
  }),
  withStorageSync({
    key: CART_STORAGE_KEY,
    autoSync: true,
  }),
  withComputed((store) => ({
    count: computed(() => store.items().length),
  })),
  withMethods((store, toaster = inject(Toaster)) => ({
    addToCart: (product: Product, quantity: number = 1) => {
      const existingItemIndex = store
        .items()
        .findIndex((item) => item.product.code === product.code);

      const updatedCartList = produce(store.items(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
          return;
        }

        draft.push({ product, quantity });
      });

      patchState(store, { items: updatedCartList });
      toaster.success(
        existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart',
      );
    },

    updateQuantityItem: (params: { productCode: string; quantity: number }) => {
      const existingItemIndex = store
        .items()
        .findIndex((item) => item.product.code === params.productCode);

      const updatedItem = produce(store.items(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity = params.quantity;
          return;
        }
      });

      patchState(store, { items: updatedItem });
    },

    removeFromCart: (productCode: string) => {
      patchState(store, {
        items: store.items().filter((item) => item.product.code !== productCode),
      });
    },

    clearCart: () => {
      patchState(store, { items: [] });
    },
  })),
);
