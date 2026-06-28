import {
  type ButtonHTMLAttributes,
  type ReactNode,
  useId,
  useMemo,
  useState,
} from "react";
import type { InputStatus } from "./Input.js";

export type SelectOption = {
  value: string;
  label: ReactNode;
};

export type SelectProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> & {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  message?: ReactNode;
  status?: InputStatus;
  fullWidth?: boolean;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: ReactNode;
  onChange?: (value: string) => void;
};

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

export function Select({
  label,
  helperText,
  error,
  message,
  status,
  fullWidth = false,
  options,
  value,
  defaultValue,
  placeholder = "Select",
  onChange,
  className = "",
  disabled,
  id,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const listboxId = `${selectId}-listbox`;
  const messageId = `${selectId}-message`;
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const selectedValue = value ?? internalValue;
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );
  const visibleMessage = error || message || helperText;
  const resolvedStatus = error ? "error" : status;
  const fieldClassName = [
    "joker-input-field",
    "dropdown",
    isOpen && "is-open",
    resolvedStatus,
    disabled && "disabled",
    fullWidth && "full-width",
    className,
  ].filter(Boolean).join(" ");

  const handleSelect = (nextValue: string) => {
    setInternalValue(nextValue);
    setIsOpen(false);
    onChange?.(nextValue);
  };

  return (
    <div className={fieldClassName}>
      {label && <label className="joker-input-label" id={`${selectId}-label`}>{label}</label>}
      <div className="joker-dropdown-anchor">
        <button
          {...props}
          className="joker-input-control joker-dropdown-control"
          type="button"
          disabled={disabled}
          aria-labelledby={label ? `${selectId}-label` : undefined}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-describedby={visibleMessage ? messageId : undefined}
          aria-invalid={resolvedStatus === "error" || undefined}
          onClick={(event) => {
            props.onClick?.(event);
            setIsOpen((open) => !open);
          }}
        >
          <span className="joker-dropdown-value">{selectedOption?.label ?? placeholder}</span>
          <span className="joker-input-icon trailing"><ChevronDownIcon /></span>
        </button>
        <div className="joker-dropdown-menu" id={listboxId} role="listbox" aria-labelledby={label ? `${selectId}-label` : undefined}>
          {options.map((option) => (
            <button
              className="joker-dropdown-option"
              type="button"
              role="option"
              key={option.value}
              aria-selected={option.value === selectedValue}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
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
