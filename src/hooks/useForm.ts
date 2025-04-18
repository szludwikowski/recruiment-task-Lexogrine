import { ValidationErrors } from "@utils/validation/formValidation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

type FieldValues = Record<string, unknown>;
type Validator<T> = (values: T) => ValidationErrors;

interface UseFormProps<T extends FieldValues> {
  initialValues: T;
  validator: Validator<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends FieldValues>({
  initialValues,
  validator,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback(
    (name: string, value: unknown) => {
      const fieldErrors = validator({ ...values, [name]: value });
      return fieldErrors[name as keyof ValidationErrors];
    },
    [values, validator],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setValues((prev) => ({ ...prev, [name]: newValue }));

      if (errors[name as keyof ValidationErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
      setTouched((prev) => ({ ...prev, [name]: true }));

      const fieldError = validateField(name, newValue);
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }
    },
    [errors, validateField],
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === "checkbox" ? checked : value;

      setTouched((prev) => ({ ...prev, [name]: true }));

      const fieldError = validateField(name, fieldValue);
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }
    },
    [validateField],
  );

  const validateForm = useCallback(() => {
    const validationErrors = validator(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [values, validator]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const allTouched = Object.keys(values).reduce<Record<string, boolean>>(
        (acc, key) => ({ ...acc, [key]: true }),
        {},
      );
      setTouched(allTouched);

      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateForm, onSubmit],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setValue = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValue,
  };
}
