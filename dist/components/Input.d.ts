import { type InputHTMLAttributes, type ReactNode } from "react";
export type InputStatus = "success" | "warning" | "error";
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> & {
    label?: ReactNode;
    helperText?: ReactNode;
    error?: ReactNode;
    message?: ReactNode;
    status?: InputStatus;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
};
export declare function Input({ label, helperText, error, message, status, fullWidth, leftIcon, rightIcon, prefix, suffix, className, disabled, id, required, ...props }: InputProps): import("react").JSX.Element;
//# sourceMappingURL=Input.d.ts.map