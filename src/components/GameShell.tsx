import type { ReactNode } from "react";
import { BettingPanel, type BettingPanelProps } from "./BettingPanel.js";
import { GameHeaderRail, type GameHeaderRailProps } from "./GameHeaderRail.js";
import { Navigation, type NavigationProps } from "./Navigation.js";

export type GameShellProps = Omit<NavigationProps, "children"> & {
  children?: ReactNode;
  game?: GameHeaderRailProps["game"];
  gameIcon?: GameHeaderRailProps["gameIcon"];
  fairPlayLabel?: GameHeaderRailProps["rightLabel"];
  bettingPanelProps?: BettingPanelProps;
  className?: string;
};

export function GameShell({
  children,
  game,
  gameIcon,
  fairPlayLabel,
  bettingPanelProps,
  className = "",
  defaultValue = "crash",
  ...navigationProps
}: GameShellProps) {
  return (
    <div className={`joker-game-shell ${className}`.trim()}>
      <Navigation {...navigationProps} defaultValue={defaultValue} className="joker-game-shell-navigation">
        <main className="joker-game-shell-stage" aria-label="Game stage">
          <GameHeaderRail game={game} gameIcon={gameIcon} rightLabel={fairPlayLabel} />
          <div className="joker-game-shell-play-area">
            <aside className="joker-game-shell-betting">
              <BettingPanel {...bettingPanelProps} />
            </aside>
            <div className="joker-game-shell-empty-stage" aria-label="Game canvas">
              {children}
            </div>
          </div>
        </main>
      </Navigation>
    </div>
  );
}
