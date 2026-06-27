import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, } from "react";
export function Input({ label, helperText, error, message, status, fullWidth = false, leftIcon, rightIcon, prefix, suffix, className = "", disabled, id, required, ...props }) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const messageId = `${inputId}-message`;
    const visibleMessage = error || message || helperText;
    const resolvedStatus = error ? "error" : status;
    const leadingIcon = leftIcon || prefix;
    const trailingIcon = rightIcon || suffix;
    const fieldClassName = [
        "joker-input-field",
        resolvedStatus,
        disabled && "disabled",
        fullWidth && "full-width",
        className,
    ].filter(Boolean).join(" ");
    return (_jsxs("label", { className: fieldClassName, htmlFor: inputId, children: [label && _jsx("span", { className: "joker-input-label", children: label }), _jsxs("span", { className: "joker-input-control", children: [leadingIcon && _jsx("span", { className: "joker-input-icon", children: leadingIcon }), _jsx("input", { ...props, id: inputId, disabled: disabled, required: required, "aria-describedby": visibleMessage ? messageId : undefined, "aria-invalid": resolvedStatus === "error" || undefined }), trailingIcon && _jsx("span", { className: "joker-input-icon trailing", children: trailingIcon })] }), visibleMessage && (_jsx("span", { className: "joker-input-message", id: messageId, role: resolvedStatus === "error" ? "alert" : undefined, children: visibleMessage }))] }));
}
