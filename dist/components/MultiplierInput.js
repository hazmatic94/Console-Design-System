import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState, } from "react";
function ChevronIcon({ direction }) {
    const path = direction === "up" ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6";
    return (_jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: path, fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3" }) }));
}
function clamp(value, min, max) {
    if (typeof min === "number" && value < min)
        return min;
    if (typeof max === "number" && value > max)
        return max;
    return value;
}
export function MultiplierInput({ label = "Multiplier", helperText, error, message, status, fullWidth = false, value, defaultValue = 1, min, max, step = 0.1, suffix = "x", onChange, className = "", disabled, id, ...props }) {
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
    const commitValue = (nextValue) => {
        const clampedValue = clamp(nextValue, min, max);
        setInternalValue(clampedValue);
        onChange?.(clampedValue);
    };
    const handleInputChange = (event) => {
        const nextValue = Number(event.target.value.replace(suffix, ""));
        if (!Number.isNaN(nextValue))
            commitValue(nextValue);
    };
    return (_jsxs("label", { className: fieldClassName, htmlFor: inputId, children: [label && _jsx("span", { className: "joker-input-label", children: label }), _jsxs("span", { className: "joker-input-control joker-multiplier-control", children: [_jsx("input", { ...props, id: inputId, type: "text", inputMode: "decimal", value: `${numericValue}${suffix}`, disabled: disabled, "aria-describedby": visibleMessage ? messageId : undefined, "aria-invalid": resolvedStatus === "error" || undefined, onChange: handleInputChange }), _jsxs("span", { className: "joker-multiplier-actions", "aria-label": "Multiplier controls", children: [_jsx("button", { className: "joker-multiplier-button", type: "button", disabled: disabled, "aria-label": "Increase multiplier", onClick: () => commitValue(numericValue + step), children: _jsx(ChevronIcon, { direction: "up" }) }), _jsx("button", { className: "joker-multiplier-button", type: "button", disabled: disabled, "aria-label": "Decrease multiplier", onClick: () => commitValue(numericValue - step), children: _jsx(ChevronIcon, { direction: "down" }) })] })] }), visibleMessage && (_jsx("span", { className: "joker-input-message", id: messageId, role: resolvedStatus === "error" ? "alert" : undefined, children: visibleMessage }))] }));
}
