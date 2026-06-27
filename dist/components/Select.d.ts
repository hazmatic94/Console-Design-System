import { type ButtonHTMLAttributes, type ReactNode } from "react";
import type { InputStatus } from "./Input.js";
export type SelectOption = {
    value: string;
    label: ReactNode;
};
export type SelectProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> & {
    label?: ReactNode;
    helperText?: ReactNode;
    error?: ReactNode;
    message?: ReactNode;
    status?: InputStatus;
    fullWidth?: boolean;
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: ReactNode;
    onChange?: (value: string) => void;
};
export declare function Select({ label, helperText, error, message, status, fullWidth, options, value, defaultValue, placeholder, onChange, className, disabled, id, ...props }: SelectProps): import("react").JSX.Element;
//# sourceMappingURL=Select.d.ts.map