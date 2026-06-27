import { BettingPanel } from "../betting/BetPanel.jsx";
import { SideRail } from "../navigation/SideRail.jsx";
import { TopRail } from "../navigation/TopRail.jsx";
import { GameHeaderRail } from "./GameHeaderRail.jsx";
import { GameViewport } from "./GameViewport.jsx";

export function DesktopGameShell({ children }) {
  return (
    <div className="joker-game-shell">
      <TopRail />
      <div className="joker-game-shell-body">
        <SideRail />
        <main className="joker-game-shell-stage" aria-label="Game stage">
          <GameHeaderRail />
          <div className="joker-game-shell-play-area">
            <aside className="joker-game-shell-betting"><BettingPanel /></aside>
            <GameViewport>{children}</GameViewport>
          </div>
        </main>
      </div>
    </div>
  );
}
