import { useId } from "react";

export function Input({
  label,
  helperText,
  error,
  prefix,
  suffix,
  leftIcon,
  rightIcon,
  message,
  status,
  fullWidth = false,
  className = "",
  disabled,
  id,
  required,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const visibleMessage = typeof error === "string" ? error : message || helperText;
  const resolvedStatus = error ? "error" : status;
  const fieldClassName = [
    "joker-input-field",
    resolvedStatus,
    disabled && "disabled",
    fullWidth && "full-width",
    className,
  ].filter(Boolean).join(" ");
  const leadingIcon = leftIcon || prefix;
  const trailingIcon = rightIcon || suffix;

  return (
    <label className={fieldClassName} htmlFor={inputId}>
      {label && <span className="joker-input-label">{label}</span>}
      <span className="joker-input-control">
        {leadingIcon && <span className="joker-input-icon">{leadingIcon}</span>}
        <input
          id={inputId}
          aria-describedby={visibleMessage ? messageId : undefined}
          aria-invalid={resolvedStatus === "error" ? true : undefined}
          disabled={disabled}
          required={required}
          {...props}
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
