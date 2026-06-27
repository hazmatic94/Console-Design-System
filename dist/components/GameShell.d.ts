import type { ReactNode } from "react";
import { type BettingPanelProps } from "./BettingPanel.js";
import { type GameHeaderRailProps } from "./GameHeaderRail.js";
import { type NavigationProps } from "./Navigation.js";
export type GameShellProps = Omit<NavigationProps, "children"> & {
    children?: ReactNode;
    game?: GameHeaderRailProps["game"];
    gameIcon?: GameHeaderRailProps["gameIcon"];
    fairPlayLabel?: GameHeaderRailProps["rightLabel"];
    bettingPanelProps?: BettingPanelProps;
    className?: string;
};
export declare function GameShell({ children, game, gameIcon, fairPlayLabel, bettingPanelProps, className, defaultValue, ...navigationProps }: GameShellProps): import("react").JSX.Element;
//# sourceMappingURL=GameShell.d.ts.map