import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { map, switchMap, timer } from 'rxjs';
import { SignUpService } from './services/sign-up.service';
import { SignUpData } from './interfaces/sign-up-data';

type SignUpForm<Type> = {
  [Property in keyof Type]: FormControl<Type[Property]>;
};

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  form: FormGroup<SignUpForm<SignUpData>> = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        (control: AbstractControl) =>
          this.forbiddenNameValidator(control.value, /bob/i),
      ],
      (control: AbstractControl) => this.validateEmail(control.value),
    ],
    password: ['', Validators.required],
  });
  submitProgress: 'idle' | 'success' | 'error' = 'idle';

  constructor(private signUpService: SignUpService, private fb: FormBuilder) {
    this.form.valueChanges.subscribe((v) => console.log(this.form.status));
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    console.log('submited', this.form.getRawValue());
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
      map((emailTaken) => (emailTaken ? { taken: true } : null))
    );
  }

  private forbiddenNameValidator(
    controlValue: string,
    nameRe: RegExp
  ): ReturnType<ValidatorFn> {
    // return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(controlValue);
    return forbidden ? { forbiddenName: { value: controlValue } } : null;
    // };
  }
}
