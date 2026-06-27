import {
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from "react";

export type InputStatus = "success" | "warning" | "error";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  message?: ReactNode;
  status?: InputStatus;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export function Input({
  label,
  helperText,
  error,
  message,
  status,
  fullWidth = false,
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  className = "",
  disabled,
  id,
  required,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const visibleMessage = error || message || helperText;
  const resolvedStatus = error ? "error" : status;
  const leadingIcon = leftIcon || prefix;
  const trailingIcon = rightIcon || suffix;
  const fieldClassName = [
    "joker-input-field",
    resolvedStatus,
    disabled && "disabled",
    fullWidth && "full-width",
    className,
  ].filter(Boolean).join(" ");

  return (
    <label className={fieldClassName} htmlFor={inputId}>
      {label && <span className="joker-input-label">{label}</span>}
      <span className="joker-input-control">
        {leadingIcon && <span className="joker-input-icon">{leadingIcon}</span>}
        <input
          {...props}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-describedby={visibleMessage ? messageId : undefined}
          aria-invalid={resolvedStatus === "error" || undefined}
        />
        {trailingIcon && <span className="joker-input-icon trailing">{trailingIcon}</span>}
      </span>
      {visibleMessage && (
        <span
          className="joker-input-message"
          id={messageId}
          role={resolvedStatus === "error" ? "alert" : undefined}
        >
          {visibleMessage}
        </span>
      )}
    </label>
  );
}
