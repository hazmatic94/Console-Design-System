import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Button({ children, label, variant = "primary", size = "medium", fullWidth = false, loading = false, selected = false, disabled = false, className = "", type = "button", ...props }) {
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
    return (_jsxs("button", { ...props, type: type, className: classes, disabled: isDisabled, "aria-busy": loading || undefined, "aria-pressed": selected || undefined, children: [_jsx("span", { className: "joker-button__content", children: content }), loading && _jsx("span", { className: "joker-button__loader", "aria-hidden": "true" })] }));
}
