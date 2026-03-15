import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { LayoutCard } from '~/shared/directives/layout-card';
import { DeliveryAddress } from '~/shared/types/order';
import { AuthService } from '~/core/services/auth/auth.service';

type DeliveryAddressFormControls = {
  [K in keyof DeliveryAddress]: FormControl<DeliveryAddress[K]>;
};

@Component({
  selector: 'app-shipping-form',
  imports: [LayoutCard, MatIcon, MatFormField, MatInput, MatLabel, MatError, ReactiveFormsModule],
  templateUrl: './shipping-form.html',
})
export class ShippingForm implements OnInit {
  authService = inject(AuthService);

  form = new FormGroup<DeliveryAddressFormControls>({
    addressLine1: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    addressLine2: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    state: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    zipCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    country: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit() {
    const profile = this.authService.userProfile();
    if (profile) {
      this.form.patchValue({
        addressLine1: profile.shippingAddress1 || '',
        addressLine2: profile.shippingAddress2 || '',
        city: profile.shippingCity || '',
        state: profile.shippingState || '',
        zipCode: profile.shippingZipCode || '',
        country: profile.shippingCountry || '',
      });
    }
  }
}
