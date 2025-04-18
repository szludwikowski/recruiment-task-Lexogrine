import { cx } from "class-variance-authority";
import React from "react";

import styles from "./Input.module.scss";
import type { InputProps } from "./Input.types";

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  className,
  disabled = false,
  required = false,
  autoComplete,
  ariaLabel,
  showError = true,
}) => {
  const hasError = Boolean(error);
  const errorId = hasError ? `${name}-error` : undefined;

  return (
    <div className={styles.inputWrapper}>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        aria-label={ariaLabel}
        aria-invalid={hasError}
        aria-describedby={errorId}
        className={cx(styles.input, hasError && styles.inputError, className)}
      />
      {showError && error && (
        <span className={styles.error} id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
