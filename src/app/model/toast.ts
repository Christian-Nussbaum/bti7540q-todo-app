export class Toast {
  category: ToastCategory;
  message: string;

  public constructor(category: ToastCategory, message: string) {
    this.category = category;
    this.message = message;
  }
}

export enum ToastCategory {
  Success,
  Information,
  Warning,
  Error
}
