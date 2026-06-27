import { Input } from "../ui/Input.jsx";

export function BetAmountInput({
  label = "Bet amount",
  placeholder = "0",
  message,
  ...props
}) {
  return (
    <Input
      label={label}
      placeholder={placeholder}
      message={message}
      inputMode="decimal"
      pattern="[0-9]*[.]?[0-9]*"
      {...props}
    />
  );
}
