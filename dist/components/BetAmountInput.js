import { jsx as _jsx } from "react/jsx-runtime";
import { Input } from "./Input.js";
export function BetAmountInput({ label = "Bet amount", placeholder = "0", ...props }) {
    return (_jsx(Input, { ...props, label: label, placeholder: placeholder, inputMode: "decimal", pattern: "[0-9]*[.]?[0-9]*" }));
}
