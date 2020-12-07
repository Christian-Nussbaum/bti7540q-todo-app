import { Component, OnDestroy, OnInit } from '@angular/core';
import {ToastService} from './toast.service';
import {Toast, ToastCategory} from '../model/toast';
import {Subscription} from 'rxjs';

// @ts-ignore
declare var $;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html'
})
export class ToastComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;

  constructor(
    private readonly toastService: ToastService,
  ) {
  }

  public toasts: Array<Toast> = [];

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  getCategoryString(toast: Toast): string {
    return ToastCategory[toast.category];
  }

  getColorClass(toast: Toast, prefix = ''): string {
    switch (toast.category) {
      case ToastCategory.Success:
        return prefix + 'success';
      case ToastCategory.Information:
        return prefix + 'info';
      case ToastCategory.Warning:
        return prefix + 'warning';
      case ToastCategory.Error:
        return prefix + 'danger';
    }

    return '';
  }

  closeToast(toast: Toast): void {
    this.toastService.removeToast(toast);
  }
}
