import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import fairPlaySrc from "../../assets/game-icons/fair-play.svg";
import { navigationIconSvg } from "../data/navigationSvgIcons.js";
import { navigationItemRegistry } from "../data/navigationData.js";
function HeaderIcon({ icon, className = "" }) {
    if (!icon)
        return null;
    if (icon === "fair-play") {
        return _jsx("img", { className: className, src: fairPlaySrc, alt: "", "aria-hidden": "true" });
    }
    const svg = navigationIconSvg(icon, className);
    if (!svg)
        return null;
    return (_jsx("span", { className: `nav-inline-icon-host ${className}`.trim(), dangerouslySetInnerHTML: { __html: svg }, "aria-hidden": "true" }));
}
function InfoIcon() {
    return (_jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", fill: "currentColor" }), _jsx("path", { d: "M12 10v7", stroke: "var(--joker-black-800)", strokeLinecap: "round", strokeWidth: "2" }), _jsx("circle", { cx: "12", cy: "7", r: "1.2", fill: "var(--joker-black-800)" })] }));
}
export function GameHeaderRail({ game = navigationItemRegistry.crash, gameIcon, rightLabel = "Fair Play", rightIcon = "fair-play", className = "", }) {
    const gameLabel = typeof game === "object" && game && "label" in game ? game.label : game;
    const resolvedGameIcon = gameIcon || (typeof game === "object" && game && "icon" in game ? game.icon : navigationItemRegistry.crash.icon);
    return (_jsxs("div", { className: `joker-game-header-rail ${className}`.trim(), "aria-label": "Game header", children: [_jsxs("div", { className: "joker-game-header-group", children: [_jsx("span", { className: "joker-game-header-info", "aria-hidden": "true", children: _jsx(InfoIcon, {}) }), _jsxs("span", { className: "joker-game-header-title", children: [_jsx(HeaderIcon, { icon: resolvedGameIcon, className: "joker-game-header-game-icon" }), _jsx("span", { children: gameLabel })] })] }), _jsxs("div", { className: "joker-game-header-group joker-game-header-fair-play", children: [_jsx(HeaderIcon, { icon: rightIcon, className: "joker-game-header-fair-play-icon" }), _jsx("span", { children: rightLabel })] })] }));
}
