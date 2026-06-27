import type { ButtonHTMLAttributes } from "react";
export type BettingPanelMode = "manual" | "auto";
export type BettingPanelProps = {
    mode?: BettingPanelMode;
    onModeChange?: (mode: BettingPanelMode) => void;
    onPlaceBet?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    className?: string;
};
export declare function BettingPanel({ mode, onModeChange, onPlaceBet, className, }: BettingPanelProps): import("react").JSX.Element;
//# sourceMappingURL=BettingPanel.d.ts.map