import { Injectable } from '@angular/core';
import { Toast } from '../model/toast';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ToastService {


  public constructor() {
  }

  private toasts: Array<Toast> = [];
  public toasts$ = new BehaviorSubject(this.toasts);

  public addToast(model: Toast): void {
    this.toasts.push(model);
    this.toasts$.next(this.toasts);

    // Disable toast after 5 secs
    setTimeout(() => {
      this.removeToast(model);
    }, 5000);
  }

  public removeToast(model: Toast): void {
    this.toasts = this.toasts.filter(x => x !== model);
    this.toasts$.next(this.toasts);
  }

}
