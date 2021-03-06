import { required } from 'vuelidate/lib/validators';

export const loginValidations = {
  username: {
    required,
  },
  password: {
    required,
  },
};
