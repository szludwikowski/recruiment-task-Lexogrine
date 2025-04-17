import Button from "@components/ui/Button";
import { FORM_CONTENT } from "@constants/form";
import { useAuth } from "@context/AuthContext";
import { useForm } from "@hooks/useForm";
import { signIn, signUp } from "@services/authService";
import { FormData, validateForm } from "@utils/validation/formValidation";
import { useEffect, useState } from "react";
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
  const [mode, setMode] = useState<FormMode>("signup");
  const isSignup = mode === "signup";

  // Use our custom form hook with explicit type parameter
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    initialValues: initialFormState,
    validator: (data) => validateForm(data, isSignup),
    onSubmit: async (data) => {
      try {
        const response = isSignup
          ? await signUp(data)
          : await signIn(data.email, data.password);

        if (response.success) {
          toast.success(response.message);
          login(data.email);
          navigate("/pricing");
        } else {
          toast.error(response.message);
        }
      } catch (error: unknown) {
        console.error("Form submission error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  // Reset form when mode changes
  useEffect(() => {
    reset();
  }, [mode, reset]);

  const content = isSignup ? FORM_CONTENT.signup : FORM_CONTENT.login;
  const commonContent = FORM_CONTENT.common;

  const toggleMode = () => {
    if (isSignup && onSwitchToLogin) {
      onSwitchToLogin();
    } else {
      setMode((prev) => (prev === "signup" ? "login" : "signup"));
    }
  };

  // Show error only if field has been touched or form was submitted
  const shouldShowError = (field: keyof FormData) =>
    touched[field] && errors[field];

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>{content.heading}</h2>

      <div className={styles.inputGroup}>
        <input
          type="email"
          name="email"
          placeholder={commonContent.emailPlaceholder}
          className={`${styles.input} ${shouldShowError("email") ? styles.inputError : ""}`}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {shouldShowError("email") && (
          <span className={styles.error} id="email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <input
          type="password"
          name="password"
          placeholder={commonContent.passwordPlaceholder}
          className={`${styles.input} ${shouldShowError("password") ? styles.inputError : ""}`}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {shouldShowError("password") && (
          <span className={styles.error} id="password-error" role="alert">
            {errors.password}
          </span>
        )}
      </div>

      {isSignup && (
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              name="agreedToTerms"
              className={styles.checkbox}
              checked={values.agreedToTerms}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.agreedToTerms}
              aria-describedby={
                errors.agreedToTerms ? "terms-error" : undefined
              }
            />
            <span>{commonContent.termsText}</span>
          </label>
          {shouldShowError("agreedToTerms") && (
            <span className={styles.error} id="terms-error" role="alert">
              {errors.agreedToTerms}
            </span>
          )}
        </div>
      )}

      <Button type="submit" variant="secondary" isLoading={isSubmitting}>
        {content.submitButton}
      </Button>

      <div className={styles.divider}>{commonContent.dividerText}</div>

      <Button type="button" variant="social">
        {commonContent.socialButton}
      </Button>

      <p className={styles.loginText}>
        {content.switchText}{" "}
        <button
          type="button"
          className={styles.switchButton}
          onClick={toggleMode}
        >
          {content.switchAction}
        </button>
      </p>
    </form>
  );
};

export default Form;
