import {AfterViewChecked, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from './toast.service';
import {Toast, ToastCategory} from '../model/toast';
import {Subscription} from 'rxjs';

// @ts-ignore
declare var $;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html'
})
export class ToastComponent implements OnInit, OnDestroy, AfterViewChecked {

  private readonly options = {
    animation: true,
    autohide: true,
    delay: 5000
  };
  private subscription: Subscription | undefined;

  constructor(
    private readonly zone: NgZone,
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


  ngAfterViewChecked(): void {
    $('.toast').toast(this.options).toast('show');
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
