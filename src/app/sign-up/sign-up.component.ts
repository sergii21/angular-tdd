import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  submitProgress: 'idle' | 'success' | 'error' = 'idle';

  constructor(
    private signUpService: SignUpService,
    private fb: FormBuilder
  ) { 
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
}
