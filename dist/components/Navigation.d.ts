import { type MouseEvent, type ReactNode } from "react";
export declare const NAVIGATION_BREAKPOINTS: {
    readonly mobile: 1024;
    readonly desktop: 1280;
};
export type NavigationMode = "desktop" | "compact" | "mobile";
type NavigationItem = {
    label: string;
    icon: string;
    href?: string;
    value?: string;
    tone?: string;
    badge?: boolean;
};
export type NavigationProps = {
    balance?: string;
    logoHref?: string;
    avatarSrc?: string;
    children?: ReactNode;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string, item: NavigationItem) => void;
    onNavigate?: (item: NavigationItem, event: MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
};
export declare function Navigation({ balance, logoHref, avatarSrc, children, defaultValue, value, onValueChange, onNavigate, className, }: NavigationProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Navigation.d.ts.map