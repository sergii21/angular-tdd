import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SignUpData } from '../interfaces/sign-up-data';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor() { }

  isEmailTaken(email: string): Observable<boolean> {
    return of(true);
  }
  signup(data: SignUpData) {
    return of({ success: true })
  }
}
