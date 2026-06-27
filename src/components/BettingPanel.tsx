import type { ButtonHTMLAttributes } from "react";
import jokerCoinSrc from "../../assets/jokerCoin.svg";
import { BetAmountInput } from "./BetAmountInput.js";
import { Button } from "./Button.js";
import { Input } from "./Input.js";
import { MultiplierInput } from "./MultiplierInput.js";

export type BettingPanelMode = "manual" | "auto";

export type BettingPanelProps = {
  mode?: BettingPanelMode;
  onModeChange?: (mode: BettingPanelMode) => void;
  onPlaceBet?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  className?: string;
};

function ModeIcon({ mode }: { mode: BettingPanelMode }) {
  if (mode === "auto") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3 14.1 9.9 21 12l-6.9 2.1L12 21l-2.1-6.9L3 12l6.9-2.1L12 3Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 7h11m0 0-4-4m4 4-4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 17H6m0 0 4-4m-4 4 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CoinIcon() {
  return <img src={jokerCoinSrc} alt="" />;
}

export function BettingPanel({
  mode = "manual",
  onModeChange,
  onPlaceBet,
  className = "",
}: BettingPanelProps) {
  return (
    <aside className={`joker-betting-panel ${className}`.trim()} aria-label="Betting panel">
      <div className="joker-bet-mode-switch" role="group" aria-label="Bet mode">
        {(["manual", "auto"] as const).map((nextMode) => (
          <Button
            key={nextMode}
            variant="secondary"
            fullWidth
            selected={mode === nextMode}
            className={`joker-cta-preview secondary full-width joker-bet-mode ${mode === nextMode ? "is-selected" : ""}`.trim()}
            aria-pressed={mode === nextMode}
            onClick={() => onModeChange?.(nextMode)}
          >
            <ModeIcon mode={nextMode} />
            <span>{nextMode === "manual" ? "Manual" : "Auto"}</span>
          </Button>
        ))}
      </div>

      <span className="joker-betting-divider" aria-hidden="true" />

      <div className="joker-betting-fields">
        <div className="joker-bet-field">
          <div className="joker-bet-field-row">
            <span className="joker-input-label">Bet amount</span>
            <span>$0.00</span>
          </div>
          <BetAmountInput
            aria-label="Bet amount"
            className="full-width currency joker-bet-field"
            leftIcon={<CoinIcon />}
            label={null}
            placeholder="0"
          />
        </div>

        <MultiplierInput
          className="live joker-bet-field"
          defaultValue={2}
          label="Cashout at"
          step={0.1}
        />
      </div>

      <Button fullWidth className="joker-cta-preview default full-width joker-bet-submit" onClick={onPlaceBet}>
        Place Bet
      </Button>

      <span className="joker-betting-spacer" aria-hidden="true" />
      <span className="joker-betting-divider" aria-hidden="true" />

      <Input
        readOnly
        className="full-width currency joker-bet-field"
        label="Profit on Win"
        leftIcon={<CoinIcon />}
        value="0.00"
      />
    </aside>
  );
}
