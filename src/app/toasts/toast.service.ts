import { Injectable } from '@angular/core';
import {Toast, ToastCategory} from '../model/toast';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ToastService {


  public constructor() {
    this.addToast(new Toast(ToastCategory.Success, 'a'));
    this.addToast(new Toast(ToastCategory.Information, 'b'));
    this.addToast(new Toast(ToastCategory.Warning, 'c'));
    this.addToast(new Toast(ToastCategory.Error, 'd'));
  }

  private toasts: Array<Toast> = [];
  public toasts$ = new BehaviorSubject(this.toasts);

  public addToast(model: Toast): void {
    this.toasts.push(model);
    this.toasts$.next(this.toasts);
  }

  public removeToast(model: Toast): void {
    this.toasts = this.toasts.filter(x => x !== model);
    this.toasts$.next(this.toasts);
  }

}
