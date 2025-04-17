export interface ValidationErrors {
  email?: string;
  password?: string;
  agreedToTerms?: string;
}

export interface FormData {
  email: string;
  password: string;
  agreedToTerms: boolean;
}

export const validateEmail = (email: string): string | undefined => {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Please enter a valid email";
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return undefined;
};

export const validateTerms = (agreedToTerms: boolean): string | undefined => {
  if (!agreedToTerms) return "You must agree to the Terms of Service";
  return undefined;
};

export const validateForm = (
  data: FormData,
  isSignup: boolean,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  if (isSignup) {
    const termsError = validateTerms(data.agreedToTerms);
    if (termsError) errors.agreedToTerms = termsError;
  }

  return errors;
};
