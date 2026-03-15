import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { LayoutCard } from '~/shared/directives/layout-card';
import { Customer } from '~/shared/types/order';
import { AuthService } from '~/core/services/auth/auth.service';

type CustomerFormControls = {
  [K in keyof Customer]: FormControl<Customer[K]>;
};

@Component({
  selector: 'app-customer-form',
  imports: [LayoutCard, MatIcon, MatFormField, MatInput, MatLabel, MatError, ReactiveFormsModule],
  templateUrl: './customer-form.html',
})
export class CustomerForm implements OnInit {
  authService = inject(AuthService);

  form = new FormGroup<CustomerFormControls>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit() {
    const profile = this.authService.userProfile();
    if (profile) {
      const fullname = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
      this.form.patchValue({
        name: fullname,
        email: profile.email || '',
        phone: profile.phone || '',
      });
    }
  }
}
