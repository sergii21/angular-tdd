import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'dashboard', component: DashboardComponent,

},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dynamic-form', component: DynamicFormComponent },
];
