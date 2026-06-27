import { type InputHTMLAttributes, type ReactNode } from "react";
import type { InputStatus } from "./Input.js";
export type OtpInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue" | "maxLength"> & {
    label?: ReactNode;
    helperText?: ReactNode;
    error?: ReactNode;
    message?: ReactNode;
    status?: InputStatus;
    fullWidth?: boolean;
    length?: number;
    value?: string;
    defaultValue?: string;
    mask?: boolean;
    onChange?: (value: string) => void;
};
export declare function OtpInput({ label, helperText, error, message, status, fullWidth, length, value, defaultValue, mask, onChange, className, disabled, id, ...props }: OtpInputProps): import("react").JSX.Element;
//# sourceMappingURL=OtpInput.d.ts.map