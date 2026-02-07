import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export type ConfirmDialogData = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatButton, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './confirm-dialog.html',
  host: { class: '' },
})
export class ConfirmDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialog>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
