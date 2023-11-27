import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, switchMap, timer } from 'rxjs';
import { SignUpService } from './services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  form = this.fb.nonNullable.group({
    email: ['', Validators.required,
      (control: AbstractControl) => this.validateEmail(control.value)
    ],
    password: ['', Validators.required],
  });
  submitProgress: 'idle' | 'success' | 'error' = 'idle';

  constructor(
    private signUpService: SignUpService,
    private fb: FormBuilder
  ) {
    this.form.valueChanges.subscribe(v =>
      console.log(this.form)
      )
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.signUpService.signup(this.form.getRawValue()).subscribe({
      complete: () => {
        this.submitProgress = 'success';
      },
      error: () => {
        this.submitProgress = 'error';
      },
    });
  }

  private validateEmail(username: string): ReturnType<AsyncValidatorFn> {
    return timer(1000).pipe(
      switchMap(() => this.signUpService.isEmailTaken(username)),
      map((emailTaken) => (emailTaken ? { taken: true } : null)),
    );
  }

}

