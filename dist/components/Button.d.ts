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
export type ButtonProps = (BaseButtonProps & {
    variant?: "primary";
    size?: ButtonSize;
}) | (BaseButtonProps & {
    variant: "secondary" | "ghost";
    size?: never;
});
export declare function Button({ children, label, variant, size, fullWidth, loading, selected, disabled, className, type, ...props }: ButtonProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map