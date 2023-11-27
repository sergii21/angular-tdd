import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

export const routes: Routes = [
    { path: 'sign-up', component: SignUpComponent },
    { path: 'dynamic-form', component: DynamicFormComponent },
];
