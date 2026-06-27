import type { ReactNode } from "react";
import fairPlaySrc from "../../assets/game-icons/fair-play.svg";
import { navigationIconSvg } from "../data/navigationSvgIcons.js";
import { navigationItemRegistry } from "../data/navigationData.js";

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

function HeaderIcon({ icon, className = "" }: { icon?: string; className?: string }) {
  if (!icon) return null;

  if (icon === "fair-play") {
    return <img className={className} src={fairPlaySrc} alt="" aria-hidden="true" />;
  }

  const svg = navigationIconSvg(icon, className);
  if (!svg) return null;

  return (
    <span
      className={`nav-inline-icon-host ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-hidden="true"
    />
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M12 10v7" stroke="var(--joker-black-800)" strokeLinecap="round" strokeWidth="2" />
      <circle cx="12" cy="7" r="1.2" fill="var(--joker-black-800)" />
    </svg>
  );
}

export function GameHeaderRail({
  game = navigationItemRegistry.crash,
  gameIcon,
  rightLabel = "Fair Play",
  rightIcon = "fair-play",
  className = "",
}: GameHeaderRailProps) {
  const gameLabel = typeof game === "object" && game && "label" in game ? game.label : game;
  const resolvedGameIcon = gameIcon || (typeof game === "object" && game && "icon" in game ? game.icon : navigationItemRegistry.crash.icon);

  return (
    <div className={`joker-game-header-rail ${className}`.trim()} aria-label="Game header">
      <div className="joker-game-header-group">
        <span className="joker-game-header-info" aria-hidden="true"><InfoIcon /></span>
        <span className="joker-game-header-title">
          <HeaderIcon icon={resolvedGameIcon} className="joker-game-header-game-icon" />
          <span>{gameLabel}</span>
        </span>
      </div>
      <div className="joker-game-header-group joker-game-header-fair-play">
        <HeaderIcon icon={rightIcon} className="joker-game-header-fair-play-icon" />
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
