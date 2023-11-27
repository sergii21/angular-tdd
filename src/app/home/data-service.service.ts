import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  getHomes$() {
   return  of([
      {
        title: 'Home 1'
      },
      {
        title: 'Home 1'
      },
      {
        title: 'Home 1'
      },
  ])
  }

  constructor() { }
}
