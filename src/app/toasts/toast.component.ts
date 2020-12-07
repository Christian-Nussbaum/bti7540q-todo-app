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

  // Note, don't use the autohidde option, since this only hides the toast on the DOM.
  // It is still rendered.
  private readonly options = {
    animation: true,
    autohide: false
  };
  private subscription: Subscription | undefined;

  constructor(
    private readonly toastService: ToastService,
  ) {
  }

  public toasts: Array<Toast> = [];

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;

      // SetTimeout is required, in order to let angular update the UI first.
      setTimeout(() => {
        $('.toast').toast(this.options).toast('show');
      }, 0);
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

  getColorClass(toast: Toast): string {
    switch (toast.category) {
      case ToastCategory.Success:
        return 'bg-success';
      case ToastCategory.Information:
        return 'bg-info';
      case ToastCategory.Warning:
        return 'bg-warning';
      case ToastCategory.Error:
        return 'bg-danger';
    }

    return '';
  }

  closeToast(toast: Toast): void {
    this.toastService.removeToast(toast);
  }
}
