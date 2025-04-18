import { ChangeEvent } from "react";

export interface InputProps {
  name: string;
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  ariaLabel?: string;
  showError?: boolean;
}
