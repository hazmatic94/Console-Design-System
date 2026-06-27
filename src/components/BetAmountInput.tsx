import type { InputProps } from "./Input.js";
import { Input } from "./Input.js";

export type BetAmountInputProps = Omit<InputProps, "inputMode" | "pattern">;

export function BetAmountInput({
  label = "Bet amount",
  placeholder = "0",
  ...props
}: BetAmountInputProps) {
  return (
    <Input
      {...props}
      label={label}
      placeholder={placeholder}
      inputMode="decimal"
      pattern="[0-9]*[.]?[0-9]*"
    />
  );
}
