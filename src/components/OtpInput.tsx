import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
  useState,
} from "react";
import type { InputStatus } from "./Input.js";

export type OtpInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue" | "maxLength"> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  message?: ReactNode;
  status?: InputStatus;
  fullWidth?: boolean;
  length?: number;
  value?: string;
  defaultValue?: string;
  mask?: boolean;
  onChange?: (value: string) => void;
};

export function OtpInput({
  label = "Verification code",
  helperText,
  error,
  message,
  status,
  fullWidth = false,
  length = 4,
  value = "",
  defaultValue = "",
  mask = false,
  onChange,
  className = "",
  disabled,
  id,
  ...props
}: OtpInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const digits = Array.from({ length }, (_, index) => currentValue[index] ?? "");
  const visibleMessage = error || message || helperText;
  const resolvedStatus = error ? "error" : status;
  const fieldClassName = [
    "joker-input-field",
    "otp",
    resolvedStatus,
    disabled && "disabled",
    fullWidth && "full-width",
    className,
  ].filter(Boolean).join(" ");

  const updateDigit = (index: number, nextDigit: string) => {
    const nextDigits = [...digits];
    nextDigits[index] = nextDigit.slice(-1);
    const nextValue = nextDigits.join("").trim();
    setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <div className={fieldClassName}>
      {label && <label className="joker-input-label" htmlFor={`${inputId}-0`}>{label}</label>}
      <div className="joker-otp-group" aria-label={typeof label === "string" ? label : "Verification code"}>
        {Array.from({ length }).map((_, index) => {
          const digit = digits[index] || "";

          return (
            <input
              {...props}
              id={`${inputId}-${index}`}
              key={index}
              type={mask ? "password" : "text"}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              disabled={disabled}
              data-filled={digit ? "true" : undefined}
              aria-label={`Digit ${index + 1}`}
              aria-describedby={visibleMessage ? messageId : undefined}
              aria-invalid={resolvedStatus === "error" || undefined}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateDigit(index, event.target.value)}
            />
          );
        })}
      </div>
      {visibleMessage && (
        <span
          className="joker-input-message"
          id={messageId}
          role={resolvedStatus === "error" ? "alert" : undefined}
        >
          {visibleMessage}
        </span>
      )}
    </div>
  );
}
