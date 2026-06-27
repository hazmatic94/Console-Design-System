import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useMemo, useState, } from "react";
function ChevronDownIcon() {
    return (_jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "m6 9 6 6 6-6", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3" }) }));
}
export function Select({ label, helperText, error, message, status, fullWidth = false, options, value, defaultValue, placeholder = "Select", onChange, className = "", disabled, id, ...props }) {
    const generatedId = useId();
    const selectId = id || generatedId;
    const listboxId = `${selectId}-listbox`;
    const messageId = `${selectId}-message`;
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value ?? "");
    const selectedValue = value ?? internalValue;
    const selectedOption = useMemo(() => options.find((option) => option.value === selectedValue), [options, selectedValue]);
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
    const handleSelect = (nextValue) => {
        setInternalValue(nextValue);
        setIsOpen(false);
        onChange?.(nextValue);
    };
    return (_jsxs("div", { className: fieldClassName, children: [label && _jsx("label", { className: "joker-input-label", id: `${selectId}-label`, children: label }), _jsxs("button", { ...props, className: "joker-input-control joker-dropdown-control", type: "button", disabled: disabled, "aria-labelledby": label ? `${selectId}-label` : undefined, "aria-haspopup": "listbox", "aria-expanded": isOpen, "aria-controls": listboxId, "aria-describedby": visibleMessage ? messageId : undefined, "aria-invalid": resolvedStatus === "error" || undefined, onClick: (event) => {
                    props.onClick?.(event);
                    setIsOpen((open) => !open);
                }, children: [_jsx("span", { className: "joker-dropdown-value", children: selectedOption?.label ?? placeholder }), _jsx("span", { className: "joker-input-icon trailing", children: _jsx(ChevronDownIcon, {}) })] }), _jsx("div", { className: "joker-dropdown-menu", id: listboxId, role: "listbox", "aria-labelledby": label ? `${selectId}-label` : undefined, children: options.map((option) => (_jsx("button", { className: "joker-dropdown-option", type: "button", role: "option", "aria-selected": option.value === selectedValue, onClick: () => handleSelect(option.value), children: option.label }, option.value))) }), visibleMessage && (_jsx("span", { className: "joker-input-message", id: messageId, role: resolvedStatus === "error" ? "alert" : undefined, children: visibleMessage }))] }));
}
