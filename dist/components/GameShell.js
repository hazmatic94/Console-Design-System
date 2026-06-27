import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BettingPanel } from "./BettingPanel.js";
import { GameHeaderRail } from "./GameHeaderRail.js";
import { Navigation } from "./Navigation.js";
export function GameShell({ children, game, gameIcon, fairPlayLabel, bettingPanelProps, className = "", defaultValue = "crash", ...navigationProps }) {
    return (_jsx("div", { className: `joker-game-shell ${className}`.trim(), children: _jsx(Navigation, { ...navigationProps, defaultValue: defaultValue, className: "joker-game-shell-navigation", children: _jsxs("main", { className: "joker-game-shell-stage", "aria-label": "Game stage", children: [_jsx(GameHeaderRail, { game: game, gameIcon: gameIcon, rightLabel: fairPlayLabel }), _jsxs("div", { className: "joker-game-shell-play-area", children: [_jsx("aside", { className: "joker-game-shell-betting", children: _jsx(BettingPanel, { ...bettingPanelProps }) }), _jsx("div", { className: "joker-game-shell-empty-stage", "aria-label": "Game canvas", children: children })] })] }) }) }));
}
