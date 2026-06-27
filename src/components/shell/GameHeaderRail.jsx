import { navigationIconSvg } from "../../data/navigationSvgIcons.js";
import { navigationItemRegistry } from "../../data/navigationData.js";

function HeaderIcon({ icon, className = "" }) {
  if (icon === "fair-play") {
    return <img className={className} src="./assets/game-icons/fair-play.svg" alt="" aria-hidden="true" />;
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
      <path d="M12 10v7" stroke="var(--color-primitive-black-800)" strokeLinecap="round" strokeWidth="2" />
      <circle cx="12" cy="7" r="1.2" fill="var(--color-primitive-black-800)" />
    </svg>
  );
}

export function GameHeaderRail({
  game = navigationItemRegistry.crash,
  rightLabel = "Fair Play",
  rightIcon = "fair-play",
}) {
  const gameLabel = game.label || "Crash";
  const gameIcon = game.icon || "crash";

  return (
    <div className="joker-game-header-rail" aria-label={`${gameLabel} game header`}>
      <div className="joker-game-header-group">
        <span className="joker-game-header-info" aria-hidden="true"><InfoIcon /></span>
        <span className="joker-game-header-title">
          <HeaderIcon icon={gameIcon} className="joker-game-header-game-icon" />
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
