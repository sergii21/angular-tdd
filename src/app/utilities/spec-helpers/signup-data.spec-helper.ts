// import { SignupData } from '../services/signup.service';

import { SignUpData } from "../../sign-up/interfaces/sign-up-data";

export const username = 'quickBrownFox';
export const password = 'dog lazy the over jumps fox brown quick the';
export const email = 'quick.brown.fox@example.org';
export const name = 'Mr. Fox';
export const addressLine1 = '';
export const addressLine2 = 'Under the Tree 1';
export const city = 'Farmtown';
export const postcode = '123456';
export const region = 'Upper South';
export const country = 'Luggnagg';

export const signupData: SignUpData = {
  // plan: 'personal',
  email: email,
  // email,
  password,
  // address: { name, addressLine1, addressLine2, city, postcode, region, country },
  // tos: true,
};
