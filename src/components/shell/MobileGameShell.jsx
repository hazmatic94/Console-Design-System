import { BettingPanel } from "../betting/BetPanel.jsx";
import { MobileMenu } from "../navigation/MobileMenu.jsx";
import { GameHeaderRail } from "./GameHeaderRail.jsx";
import { GameViewport } from "./GameViewport.jsx";

export function MobileGameShell({ children }) {
  return (
    <div className="joker-mobile-game-shell">
      <MobileMenu />
      <main className="joker-mobile-game-content" aria-label="Mobile game content">
        <GameHeaderRail />
        <GameViewport className="joker-mobile-game-stage" label="Mobile game canvas">{children}</GameViewport>
        <div className="joker-mobile-game-betting"><BettingPanel /></div>
      </main>
      <div className="joker-mobile-scroll-cue" aria-hidden="true">
        <span>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
