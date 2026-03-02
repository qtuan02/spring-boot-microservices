import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { LayoutCard } from '~/shared/directives/layout-card';
import { DeliveryAddress } from '~/shared/types/order';

type DeliveryAddressFormControls = {
  [K in keyof DeliveryAddress]: FormControl<DeliveryAddress[K]>;
};

@Component({
  selector: 'app-shipping-form',
  imports: [LayoutCard, MatIcon, MatFormField, MatInput, MatLabel, MatError, ReactiveFormsModule],
  templateUrl: './shipping-form.html',
})
export class ShippingForm {
  form = new FormGroup<DeliveryAddressFormControls>({
    addressLine1: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    addressLine2: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    state: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    zipCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    country: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
}
