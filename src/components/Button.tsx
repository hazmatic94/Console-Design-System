import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  label?: string;
  fullWidth?: boolean;
  loading?: boolean;
  selected?: boolean;
};

export type ButtonProps =
  | (BaseButtonProps & {
      variant?: "primary";
      size?: ButtonSize;
    })
  | (BaseButtonProps & {
      variant: "secondary" | "ghost";
      size?: never;
    });

export function Button({
  children,
  label,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  selected = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const content = children ?? label;
  const sizeClass = variant === "primary" ? `joker-button--${size}` : null;
  const classes = [
    "joker-button",
    `joker-button--${variant}`,
    sizeClass,
    fullWidth && "joker-button--full-width",
    loading && "joker-button--loading",
    selected && "joker-button--selected",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-pressed={selected || undefined}
    >
      <span className="joker-button__content">{content}</span>
      {loading && <span className="joker-button__loader" aria-hidden="true" />}
    </button>
  );
}
