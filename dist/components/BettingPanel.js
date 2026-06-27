import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import jokerCoinSrc from "../../assets/jokerCoin.svg";
import { BetAmountInput } from "./BetAmountInput.js";
import { Button } from "./Button.js";
import { Input } from "./Input.js";
import { MultiplierInput } from "./MultiplierInput.js";
function ModeIcon({ mode }) {
    if (mode === "auto") {
        return (_jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "M12 3 14.1 9.9 21 12l-6.9 2.1L12 21l-2.1-6.9L3 12l6.9-2.1L12 3Z", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }) }));
    }
    return (_jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [_jsx("path", { d: "M7 7h11m0 0-4-4m4 4-4 4", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M17 17H6m0 0 4-4m-4 4 4 4", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })] }));
}
function CoinIcon() {
    return _jsx("img", { src: jokerCoinSrc, alt: "" });
}
export function BettingPanel({ mode = "manual", onModeChange, onPlaceBet, className = "", }) {
    return (_jsxs("aside", { className: `joker-betting-panel ${className}`.trim(), "aria-label": "Betting panel", children: [_jsx("div", { className: "joker-bet-mode-switch", role: "group", "aria-label": "Bet mode", children: ["manual", "auto"].map((nextMode) => (_jsxs(Button, { variant: "secondary", fullWidth: true, selected: mode === nextMode, className: `joker-cta-preview secondary full-width joker-bet-mode ${mode === nextMode ? "is-selected" : ""}`.trim(), "aria-pressed": mode === nextMode, onClick: () => onModeChange?.(nextMode), children: [_jsx(ModeIcon, { mode: nextMode }), _jsx("span", { children: nextMode === "manual" ? "Manual" : "Auto" })] }, nextMode))) }), _jsx("span", { className: "joker-betting-divider", "aria-hidden": "true" }), _jsxs("div", { className: "joker-betting-fields", children: [_jsxs("div", { className: "joker-bet-field", children: [_jsxs("div", { className: "joker-bet-field-row", children: [_jsx("span", { className: "joker-input-label", children: "Bet amount" }), _jsx("span", { children: "$0.00" })] }), _jsx(BetAmountInput, { "aria-label": "Bet amount", className: "full-width currency joker-bet-field", leftIcon: _jsx(CoinIcon, {}), label: null, placeholder: "0" })] }), _jsx(MultiplierInput, { className: "live joker-bet-field", defaultValue: 2, label: "Cashout at", step: 0.1 })] }), _jsx(Button, { fullWidth: true, className: "joker-cta-preview default full-width joker-bet-submit", onClick: onPlaceBet, children: "Place Bet" }), _jsx("span", { className: "joker-betting-spacer", "aria-hidden": "true" }), _jsx("span", { className: "joker-betting-divider", "aria-hidden": "true" }), _jsx(Input, { readOnly: true, className: "full-width currency joker-bet-field", label: "Profit on Win", leftIcon: _jsx(CoinIcon, {}), value: "0.00" })] }));
}
