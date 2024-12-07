import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type ToastType = 'info' | 'error';

const toastDefaultMessages: Record<ToastType, string> = {
  info: 'Copied to Clipboard',
  error: 'An error occurred',
};

@Component({
  selector: 'app-toaster',
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100),
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class ToasterComponent {
  public static toasts: {
    type: ToastType;
    message: string;
    handler: ReturnType<typeof setTimeout>;
  }[] = [];

  public get toasts(): {
    type: ToastType;
    message: string;
    handler: ReturnType<typeof setTimeout>;
  }[] {
    return ToasterComponent.toasts;
  }

  public static addToast(type: ToastType, message?: string): void {
    message = message || toastDefaultMessages[type];

    if (this.findIndexOfToast(type, message) !== -1) {
      return;
    }

    this.closeAlert(type, message);

    this.toasts.push({
      type,
      message,
      handler: this.createToastHandler(type, message),
    });
  }

  private static findIndexOfToast(type: ToastType, message?: string): number {
    let indexOfToast = -1;

    for (let index = 0; index < this.toasts.length; index++) {
      if (
        (this.toasts[index].type === type,
        this.toasts[index].message === message)
      ) {
        indexOfToast = index;
        break;
      }
    }

    return indexOfToast;
  }

  private static closeAlert(type: ToastType, message: string): void {
    const indexOfToast = this.findIndexOfToast(type, message);
    if (indexOfToast !== -1) {
      clearTimeout(this.toasts[indexOfToast].handler);
      this.toasts.splice(indexOfToast, 1);
    }
  }

  private static createToastHandler(
    type: ToastType,
    message: string,
  ): ReturnType<typeof setTimeout> {
    return setTimeout(() => this.closeAlert(type, message), 2500);
  }
}
