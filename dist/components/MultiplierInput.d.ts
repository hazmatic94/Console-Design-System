import { type InputHTMLAttributes, type ReactNode } from "react";
import type { InputStatus } from "./Input.js";
export type MultiplierInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue"> & {
    label?: ReactNode;
    helperText?: ReactNode;
    error?: ReactNode;
    message?: ReactNode;
    status?: InputStatus;
    fullWidth?: boolean;
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    suffix?: string;
    onChange?: (value: number) => void;
};
export declare function MultiplierInput({ label, helperText, error, message, status, fullWidth, value, defaultValue, min, max, step, suffix, onChange, className, disabled, id, ...props }: MultiplierInputProps): import("react").JSX.Element;
//# sourceMappingURL=MultiplierInput.d.ts.map