import { Input } from "../ui/Input.jsx";

export function CashoutInput({
  label = "Cashout",
  placeholder = "2.00x",
  message,
  ...props
}) {
  return (
    <Input
      label={label}
      placeholder={placeholder}
      message={message}
      inputMode="decimal"
      {...props}
    />
  );
}
