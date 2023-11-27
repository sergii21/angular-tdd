import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SignUpData } from '../interfaces/sign-up-data';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor() { }

  signup(data: SignUpData) {
    return of({ success: true })
  }
}
