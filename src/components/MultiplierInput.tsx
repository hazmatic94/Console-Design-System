import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
  useState,
} from "react";
import type { InputStatus } from "./Input.js";

export type MultiplierInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue"> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  message?: ReactNode;
  status?: InputStatus;
  fullWidth?: boolean;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  onChange?: (value: number) => void;
};

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  const path = direction === "up" ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6";

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={path} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function clamp(value: number, min?: number, max?: number) {
  if (typeof min === "number" && value < min) return min;
  if (typeof max === "number" && value > max) return max;
  return value;
}

export function MultiplierInput({
  label = "Multiplier",
  helperText,
  error,
  message,
  status,
  fullWidth = false,
  value,
  defaultValue = 1,
  min,
  max,
  step = 0.1,
  suffix = "x",
  onChange,
  className = "",
  disabled,
  id,
  ...props
}: MultiplierInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const numericValue = value ?? internalValue;
  const visibleMessage = error || message || helperText;
  const resolvedStatus = error ? "error" : status;
  const fieldClassName = [
    "joker-input-field",
    "multiplier",
    resolvedStatus,
    disabled && "disabled",
    fullWidth && "full-width",
    className,
  ].filter(Boolean).join(" ");

  const commitValue = (nextValue: number) => {
    const clampedValue = clamp(nextValue, min, max);
    setInternalValue(clampedValue);
    onChange?.(clampedValue);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value.replace(suffix, ""));
    if (!Number.isNaN(nextValue)) commitValue(nextValue);
  };

  return (
    <label className={fieldClassName} htmlFor={inputId}>
      {label && <span className="joker-input-label">{label}</span>}
      <span className="joker-input-control joker-multiplier-control">
        <input
          {...props}
          id={inputId}
          type="text"
          inputMode="decimal"
          value={`${numericValue}${suffix}`}
          disabled={disabled}
          aria-describedby={visibleMessage ? messageId : undefined}
          aria-invalid={resolvedStatus === "error" || undefined}
          onChange={handleInputChange}
        />
        <span className="joker-multiplier-actions" aria-label="Multiplier controls">
          <button className="joker-multiplier-button" type="button" disabled={disabled} aria-label="Increase multiplier" onClick={() => commitValue(numericValue + step)}>
            <ChevronIcon direction="up" />
          </button>
          <button className="joker-multiplier-button" type="button" disabled={disabled} aria-label="Decrease multiplier" onClick={() => commitValue(numericValue - step)}>
            <ChevronIcon direction="down" />
          </button>
        </span>
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
