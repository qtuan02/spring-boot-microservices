import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '~/core/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private location = inject(Location);

  isEditing = signal(false);
  profileForm!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const profile = this.authService.userProfile();
    
    this.profileForm = this.fb.group({
      customer: this.fb.group({
        fullname: [`${profile?.firstName || ''} ${profile?.lastName || ''}`.trim(), Validators.required],
        phone: [profile?.phone || '', Validators.required],
      }),
      shipping: this.fb.group({
        address1: [profile?.shippingAddress1 || '', Validators.required],
        address2: [profile?.shippingAddress2 || ''],
        city: [profile?.shippingCity || '', Validators.required],
        state: [profile?.shippingState || '', Validators.required],
        country: [profile?.shippingCountry || '', Validators.required],
        zipCode: [profile?.shippingZipCode || '', Validators.required],
      })
    });
  }

  toggleEdit() {
    if (this.isEditing()) {
      this.initForm(); // reset form on cancel
    }
    this.isEditing.set(!this.isEditing());
  }

  updateProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    console.log('Update Profile Data:', this.profileForm.value);
    this.isEditing.set(false);
  }

  goBack() {
    this.location.back();
  }
}
