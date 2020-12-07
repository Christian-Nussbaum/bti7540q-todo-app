import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  public constructor(
  ) {
  }

  public getCurrentDateString(): string {
    const currentDateString = (new Date()).toISOString().split('T')[0];
    return currentDateString ;
  }

}
