import type { ReactNode } from "react";
export type GameHeaderRailGame = {
    label: ReactNode;
    icon?: string;
};
export type GameHeaderRailProps = {
    game?: ReactNode | GameHeaderRailGame;
    gameIcon?: string;
    rightLabel?: ReactNode;
    rightIcon?: string;
    className?: string;
};
export declare function GameHeaderRail({ game, gameIcon, rightLabel, rightIcon, className, }: GameHeaderRailProps): import("react").JSX.Element;
//# sourceMappingURL=GameHeaderRail.d.ts.map