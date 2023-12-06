import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import {
  dispatchFakeEvent,
  findEl,
  setFieldValue,
} from '../utilities/spec-helpers/element.spec-helper';
import {
  email,
  password,
  signupData,
} from '../utilities/spec-helpers/signup-data.spec-helper';
import { SignUpService } from './services/sign-up.service';
import { SignUpComponent } from './sign-up.component';
import { SignUpData } from './interfaces/sign-up-data';

// Test plan
// Form submission
// Successful submission
// Do not submit the invalid form
// Submission failure
// Required fields are marked as such and display error messages
// Asynchronous validation of username, email and password
// Dynamic field relations
// Password type toggle
// Accessibility of the form structure, field labels and error messages

// const signupService:
//   Pick<SignUpService, keyof SignUpService> = {
//   isUsernameTaken() {
//     return of(false);
//   },
//   isEmailTaken() {
//     return of(false);
//   },
//   // getPasswordStrength() {
//   //   return of(strongPassword);
//   // },
//   signup() {
//     return of({ success: true });
//   },
// };

const requiredFields: (keyof Pick<SignUpData, 'email' | 'password'>)[] = [
  'email',
  'password',
];

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signupService: jasmine.SpyObj<SignUpService>;

  const setup = async (
    signupServiceReturnValues?: jasmine.SpyObjMethodNames<SignUpService>
  ) => {
    signupService = jasmine.createSpyObj<SignUpService>('SignUpService', {
      // Successful responses per default
      // isUsernameTaken: of(false),
      isEmailTaken: of(false),
      // getPasswordStrength: of(strongPassword),
      signup: of({ success: true }),
      // Overwrite with given return values
      ...signupServiceReturnValues,
    });

    await TestBed.configureTestingModule({
      imports: [SignUpComponent, ReactiveFormsModule],
      providers: [{ provide: SignUpService, useValue: signupService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const fillForm = () => {
    setFieldValue(fixture, 'email', email);
    setFieldValue(fixture, 'password', password);
  };

  const markFieldAsTouched = (element: DebugElement) => {
    dispatchFakeEvent(element.nativeElement, 'blur');
  };

  it('submit the form successfuly', fakeAsync(async () => {
    await setup();
    fillForm();
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(true);

    // Wait for async validators
    tick(1000);
    fixture.detectChanges();

    expect(findEl(fixture, 'submit').properties['disabled']).toBe(false);

    findEl(fixture, 'form').triggerEventHandler('submit');
    // expectText(fixture, 'status', 'Sign-up successful!');
    expect(signupService.isEmailTaken).toHaveBeenCalledWith(email);
    expect(signupService.signup).toHaveBeenCalledWith(signupData);
  }));

  it('does not submit an invalid form', fakeAsync(async () => {
    await setup({ isEmailTaken: of(true) });
    fillForm();

    // Wait for async validators
    tick(1000);

    findEl(fixture, 'form').triggerEventHandler('submit', {});
    expect(signupService.signup).not.toHaveBeenCalled();
  }));

  it('handles signup failure', fakeAsync(async () => {
    await setup({
      // Let the API report a failure
      signup: throwError(new Error('Validation failed')),
    });

    fillForm();

    // Wait for async validators
    tick(1000);

    findEl(fixture, 'form').triggerEventHandler('submit', {});

    // expectText(fixture, 'status', 'Sign-up error');
    expect(signupService.signup).toHaveBeenCalledWith(signupData);
  }));

  it('marks fields as required', async () => {
    await setup();

    // Mark required fields as touched
    requiredFields.forEach((testId) => {
      markFieldAsTouched(findEl(fixture, testId));
    });
    fixture.detectChanges();

    requiredFields.forEach((testId) => {
      const el = findEl(fixture, testId);

      // Check aria-required attribute
      expect(el.attributes['aria-required']).toBe(
        'true',
        `${testId} must be marked as aria-required`
      );

      // Check aria-errormessage attribute
      const errormessageId = el.attributes['aria-errormessage'];
      if (!errormessageId) {
        throw new Error(`Error message id for ${testId} not present`);
      }
      // Check element with error message
      const errormessageEl = document.getElementById(errormessageId);
      if (!errormessageEl) {
        throw new Error(`Error message element for ${testId} not found`);
      }

      expect(errormessageEl.textContent).toContain('must be given');
    });
  });
});
