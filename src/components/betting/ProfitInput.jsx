import { Input } from "../ui/Input.jsx";

export function ProfitInput({
  label = "Profit on win",
  placeholder = "0.00",
  message,
  ...props
}) {
  return (
    <Input
      label={label}
      placeholder={placeholder}
      message={message}
      readOnly
      {...props}
    />
  );
}
