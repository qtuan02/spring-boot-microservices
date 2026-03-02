import { Component, inject, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BackButton } from '~/shared/components/back-button/back-button';
import {
  ConfirmDialog,
  ConfirmDialogData,
} from '~/shared/components/confirm-dialog/confirm-dialog';
import { LayoutContent } from '~/shared/directives/layout-content';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SummarizeOrder } from '../components/summarize-order/summarize-order';
import { CustomerForm } from '../components/customer-form/customer-form';
import { ShippingForm } from '../components/shipping-form/shipping-form';
import { OrderSuccess } from '../components/order-success/order-success';
import { CartStore } from '~/core/stores/cart-store';
import { CreateOrderRequest } from '~/shared/types/order';
import { injectCreateOrder } from '../services/order';

@Component({
  selector: 'app-checkout',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    LayoutContent,
    SummarizeOrder,
    BackButton,
    CustomerForm,
    ShippingForm,
    OrderSuccess,
  ],
  templateUrl: './checkout.html',
})
export class Checkout {
  private dialog = inject(MatDialog);
  cartStore = inject(CartStore);
  orderResource = injectCreateOrder();

  customerForm = viewChild.required(CustomerForm);
  shippingForm = viewChild.required(ShippingForm);
  summarizeOrder = viewChild.required(SummarizeOrder);

  comments = new FormControl('', { nonNullable: true });

  handlePlaceOrder() {
    this.customerForm().form.markAllAsTouched();
    this.shippingForm().form.markAllAsTouched();

    if (this.customerForm().form.invalid || this.shippingForm().form.invalid) return;

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Confirm Order',
        message: 'Please click "Confirm" to place your order.',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      const order: CreateOrderRequest = {
        customer: this.customerForm().form.getRawValue(),
        deliveryAddress: this.shippingForm().form.getRawValue(),
        items: this.cartStore.items().map((item) => ({
          code: item.product.code,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        totalAmount: parseFloat(this.summarizeOrder().subtotal()),
        taxAmount: parseFloat(this.summarizeOrder().tax()),
        finalAmount: parseFloat(this.summarizeOrder().total()),
        comments: this.comments?.value,
      };

      this.orderResource.createOrder(order);
    });
  }
}
