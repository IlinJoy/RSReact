export type UserFormData = {
  firstName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  tc: boolean;
  gender: 'male' | 'female';
  picture?: unknown;
  country: string[];
};
