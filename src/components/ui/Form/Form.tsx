import Button from "@components/ui/Button";
import { FORM_CONTENT } from "@constants/form";
import { useAuth } from "@context/AuthContext";
import { signIn, signUp } from "@services/authService";
import {
  FormData,
  ValidationErrors,
  validateForm,
} from "@utils/validation/formValidation";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./Form.module.scss";
import type { FormMode, FormProps } from "./Form.types";

const initialFormState: FormData = {
  email: "",
  password: "",
  agreedToTerms: false,
};

const Form = ({ onSwitchToLogin }: FormProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<FormMode>("signup");
  const [formState, setFormState] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const isSignup = mode === "signup";
  const content = isSignup ? FORM_CONTENT.signup : FORM_CONTENT.login;
  const commonContent = FORM_CONTENT.common;

  const validateFormData = (): boolean => {
    const validationErrors = validateForm(formState, isSignup);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateFormData()) return;

    setIsLoading(true);
    try {
      const response = isSignup
        ? await signUp(formState)
        : await signIn(formState.email, formState.password);

      if (response.success) {
        toast.success(response.message);
        login();
        navigate("/pricing");
      } else {
        toast.error(response.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    if (isSignup && onSwitchToLogin) {
      onSwitchToLogin();
    } else {
      setMode((prev) => (prev === "signup" ? "login" : "signup"));
    }
    setErrors({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>{content.heading}</h2>

      <input
        type="email"
        name="email"
        placeholder={commonContent.emailPlaceholder}
        className={styles.input}
        value={formState.email}
        onChange={handleInputChange}
      />
      {errors.email && <span className={styles.error}>{errors.email}</span>}

      <input
        type="password"
        name="password"
        placeholder={commonContent.passwordPlaceholder}
        className={styles.input}
        value={formState.password}
        onChange={handleInputChange}
      />
      {errors.password && (
        <span className={styles.error}>{errors.password}</span>
      )}

      {isSignup && (
        <label className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            name="agreedToTerms"
            className={styles.checkbox}
            checked={formState.agreedToTerms}
            onChange={handleInputChange}
          />
          <span>{commonContent.termsText}</span>
        </label>
      )}
      {errors.agreedToTerms && (
        <span className={styles.error}>{errors.agreedToTerms}</span>
      )}

      <Button type="submit" variant="secondary" isLoading={isLoading}>
        {content.submitButton}
      </Button>

      <div className={styles.divider}>{commonContent.dividerText}</div>

      <Button type="button" variant="social">
        {commonContent.socialButton}
      </Button>

      <p className={styles.loginText}>
        {content.switchText}{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleMode();
          }}
        >
          {content.switchAction}
        </a>
      </p>
    </form>
  );
};

export default Form;
