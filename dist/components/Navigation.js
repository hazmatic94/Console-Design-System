import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState, } from "react";
import jokerCoinSrc from "../../assets/jokerCoin.svg";
import consoleLogoSrc from "../../assets/consoleLogo.png";
import userAvatarSrc from "../../assets/user.png";
import { navigationIconSvg } from "../data/navigationSvgIcons.js";
import { navigationItemRegistry } from "../data/navigationData.js";
export const NAVIGATION_BREAKPOINTS = {
    mobile: 1024,
    desktop: 1280,
};
const navigationSections = {
    home: [
        navigationItemRegistry.home,
        navigationItemRegistry.favourites,
        navigationItemRegistry.recentlyPlayed,
        navigationItemRegistry.newReleases,
    ],
    groups: [
        {
            item: navigationItemRegistry.originals,
            items: [
                navigationItemRegistry.crash,
                navigationItemRegistry.chickenCross,
                navigationItemRegistry.mines,
                navigationItemRegistry.hilo,
                navigationItemRegistry.tower,
            ],
        },
        {
            item: navigationItemRegistry.casino,
            items: [
                navigationItemRegistry.slots,
                navigationItemRegistry.blackjack,
                navigationItemRegistry.roulette,
                navigationItemRegistry.liveCasino,
            ],
        },
        {
            item: navigationItemRegistry.promotions,
            items: [
                navigationItemRegistry.challenges,
                navigationItemRegistry.vip,
            ],
        },
    ],
    gameLinks: [
        navigationItemRegistry.soccer,
    ],
    support: [
        navigationItemRegistry.liveSupport,
        navigationItemRegistry.rewards,
    ],
    account: [
        navigationItemRegistry.logout,
    ],
};
function getNavigationMode() {
    if (typeof window === "undefined")
        return "desktop";
    if (window.innerWidth < NAVIGATION_BREAKPOINTS.mobile)
        return "mobile";
    if (window.innerWidth < NAVIGATION_BREAKPOINTS.desktop)
        return "compact";
    return "desktop";
}
function useNavigationMode() {
    const [mode, setMode] = useState(getNavigationMode);
    useEffect(() => {
        const updateMode = () => setMode(getNavigationMode());
        updateMode();
        window.addEventListener("resize", updateMode);
        return () => window.removeEventListener("resize", updateMode);
    }, []);
    return mode;
}
function navigationValue(item) {
    return item.value ?? item.href ?? item.label;
}
function AssetIcon({ icon, className = "" }) {
    if (!icon)
        return null;
    if (icon === "search") {
        return (_jsx("svg", { className: `system-icon nav-inline-icon ${className}`.trim(), viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "M10.75 4a6.75 6.75 0 0 1 5.34 10.88l3.52 3.51-1.42 1.42-3.51-3.52A6.75 6.75 0 1 1 10.75 4Zm0 2a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Z", fill: "currentColor" }) }));
    }
    const svg = navigationIconSvg(icon, className);
    if (!svg)
        return _jsx("span", { className: `system-icon nav-custom-icon-missing ${className}`.trim(), "aria-hidden": "true" });
    return (_jsx("span", { className: `nav-inline-icon-host ${className}`.trim(), dangerouslySetInnerHTML: { __html: svg }, "aria-hidden": "true" }));
}
function WalletIcon() {
    return (_jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [_jsx("path", { d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M18 12h.01", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })] }));
}
function MenuIcon({ open }) {
    return (_jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: open ? (_jsxs(_Fragment, { children: [_jsx("path", { d: "M18 6 6 18", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "m6 6 12 12", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })] })) : (_jsxs(_Fragment, { children: [_jsx("path", { d: "M4 6h16", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M4 12h16", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M4 18h16", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })] })) }));
}
function ChevronIcon() {
    return (_jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "m6 9 6 6 6-6", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
function JokerLogo({ href }) {
    return (_jsx("a", { className: "joker-logo-component", href: href, "aria-label": "Console home", children: _jsx("img", { src: consoleLogoSrc, alt: "Console" }) }));
}
function WalletControl({ balance }) {
    return (_jsxs("div", { className: "joker-wallet-control", "aria-label": "Wallet balance", children: [_jsxs("div", { className: "joker-wallet-balance", children: [_jsx("img", { className: "joker-wallet-coin", src: jokerCoinSrc, alt: "" }), _jsx("span", { children: balance })] }), _jsx("button", { className: "joker-wallet-action", type: "button", "aria-label": "Open wallet", children: _jsx(WalletIcon, {}) })] }));
}
function ActionButton({ icon, label, badge, className = "", }) {
    return (_jsxs("button", { className: `joker-action-item ${className}`.trim(), type: "button", "aria-label": label, children: [_jsx(AssetIcon, { icon: icon, className: "joker-action-icon" }), badge && _jsx("span", { className: "joker-action-badge", "aria-hidden": "true" })] }));
}
function ActionGroup({ avatarSrc }) {
    return (_jsxs("div", { className: "joker-action-group-set", "aria-label": "User action shortcuts", children: [_jsx(ActionButton, { icon: navigationItemRegistry.promotions.icon, label: navigationItemRegistry.promotions.label }), _jsxs("div", { className: "joker-action-cluster", role: "group", "aria-label": "Messages and notifications", children: [_jsx(ActionButton, { icon: navigationItemRegistry.messages.icon, label: navigationItemRegistry.messages.label, className: "joker-action-item--clustered" }), _jsx("span", { className: "joker-action-divider", "aria-hidden": "true" }), _jsx(ActionButton, { icon: navigationItemRegistry.notifications.icon, label: navigationItemRegistry.notifications.label, badge: true, className: "joker-action-item--clustered" })] }), _jsxs("button", { className: "joker-avatar-item", type: "button", "aria-label": "Open profile", children: [_jsx("img", { src: avatarSrc, alt: "" }), _jsx("span", { className: "joker-avatar-status", "aria-hidden": "true" })] })] }));
}
function TopRail({ balance, logoHref, avatarSrc }) {
    return (_jsxs("header", { className: "joker-top-rail-demo", "aria-label": "Joker top rail", children: [_jsx("div", { className: "joker-top-rail-lane joker-top-rail-lane--left", children: _jsx(JokerLogo, { href: logoHref }) }), _jsx("div", { className: "joker-top-rail-lane joker-top-rail-lane--center", children: _jsx(WalletControl, { balance: balance }) }), _jsx("div", { className: "joker-top-rail-lane joker-top-rail-lane--right", children: _jsx(ActionGroup, { avatarSrc: avatarSrc }) })] }));
}
function RailSearch({ searchOpen, setSearchOpen, }) {
    return (_jsxs("label", { className: `joker-rail-search-item ${searchOpen ? "is-search-open" : ""}`.trim(), "aria-label": "Search navigation", "data-tooltip": "Search", children: [_jsx(AssetIcon, { icon: "search" }), _jsx("input", { type: "search", placeholder: "Search", onFocus: () => setSearchOpen(true), onKeyDown: (event) => {
                    if (event.key === "Escape") {
                        event.currentTarget.blur();
                        setSearchOpen(false);
                    }
                } })] }));
}
function RailNavItem({ item, selected, className = "", onSelect, onNavigate, }) {
    const handleClick = (event) => {
        event.preventDefault();
        onSelect(item);
        onNavigate?.(item, event);
    };
    return (_jsxs("a", { className: `joker-product-rail-item ${selected ? "is-selected" : ""} ${className}`.trim(), href: item.href ?? "#", "data-product-rail-item": true, "data-tooltip": item.label, "aria-label": item.label, "aria-current": selected ? "page" : undefined, onClick: handleClick, children: [_jsx(AssetIcon, { icon: item.icon }), _jsx("span", { className: "joker-product-rail-item-label", children: item.label })] }));
}
function GameMenuDropdown({ group, selectedValue, open, onToggle, onSelect, }) {
    return (_jsxs("div", { className: `joker-product-rail-game-menu ${open ? "is-open" : ""}`.trim(), "data-game-menu": true, children: [_jsxs("button", { className: "joker-product-rail-menu-trigger", type: "button", "aria-expanded": open, "data-game-menu-toggle": true, "data-tooltip": group.item.label, "aria-label": group.item.label, onClick: onToggle, children: [_jsxs("span", { className: "joker-product-rail-menu-label", children: [_jsx("span", { className: "joker-product-rail-game-icon", "aria-hidden": "true", children: _jsx(AssetIcon, { icon: group.item.icon }) }), _jsx("span", { children: group.item.label })] }), _jsx("span", { className: "joker-product-rail-menu-chevron", "aria-hidden": "true", children: _jsx(ChevronIcon, {}) })] }), _jsx("div", { className: "joker-product-rail-game-list", role: "menu", children: group.items.map((item) => {
                    const itemValue = navigationValue(item);
                    const selected = selectedValue === itemValue;
                    return (_jsxs("button", { className: `joker-product-rail-game-option ${selected ? "is-selected" : ""}`.trim(), type: "button", role: "menuitemradio", "aria-checked": selected, "data-game-menu-option": true, "data-tooltip": item.label, "aria-label": item.label, onClick: () => onSelect(item), children: [_jsx("span", { className: "joker-product-rail-game-icon", "aria-hidden": "true", children: _jsx(AssetIcon, { icon: item.icon }) }), _jsx("span", { children: item.label })] }, itemValue));
                }) })] }));
}
function SideRail({ collapsed = false, selectedValue, setSelectedValue, onNavigate, }) {
    const [openGroup, setOpenGroup] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const selectItem = (item) => {
        setSelectedValue(navigationValue(item), item);
    };
    const renderItem = (item, className = "") => (_jsx(RailNavItem, { item: item, className: className, selected: selectedValue === navigationValue(item), onSelect: selectItem, onNavigate: onNavigate }, navigationValue(item)));
    return (_jsxs("aside", { className: `joker-product-rail ${collapsed ? "is-collapsed" : ""}`.trim(), "aria-label": collapsed ? "Collapsed Joker product navigation" : "Expanded Joker product navigation", children: [_jsx("div", { className: "joker-product-rail-search", children: _jsx(RailSearch, { searchOpen: searchOpen, setSearchOpen: setSearchOpen }) }), _jsxs("div", { className: "joker-product-rail-scroll", children: [_jsx("section", { className: "joker-product-rail-section", "aria-label": "Main navigation", children: navigationSections.home.map((item) => renderItem(item)) }), _jsxs("section", { className: "joker-product-rail-section", "aria-label": "Games", children: [navigationSections.groups.map((group) => (_jsx(GameMenuDropdown, { group: group, selectedValue: selectedValue, open: openGroup === group.item.label, onToggle: () => setOpenGroup((current) => current === group.item.label ? null : group.item.label), onSelect: selectItem }, group.item.label))), navigationSections.gameLinks.map((item) => renderItem(item, "joker-product-rail-item--with-ball"))] }), _jsx("section", { className: "joker-product-rail-section", "aria-label": "Support", children: navigationSections.support.map((item) => renderItem(item)) })] }), _jsx("div", { className: "joker-product-rail-footer", children: navigationSections.account.map((item) => renderItem(item, item.tone === "danger" ? "joker-product-rail-logout" : "")) })] }));
}
function DesktopNavigation(props) {
    return (_jsxs("div", { className: "joker-navigation joker-navigation--desktop", children: [_jsx(TopRail, { balance: props.balance, logoHref: props.logoHref, avatarSrc: props.avatarSrc }), _jsxs("div", { className: "joker-navigation-body", children: [_jsx(SideRail, { selectedValue: props.selectedValue, setSelectedValue: props.setSelectedValue, onNavigate: props.onNavigate }), props.children && _jsx("div", { className: "joker-navigation-content", children: props.children })] })] }));
}
function CompactDesktopNavigation(props) {
    return (_jsxs("div", { className: "joker-navigation joker-navigation--compact", children: [_jsx(TopRail, { balance: props.balance, logoHref: props.logoHref, avatarSrc: props.avatarSrc }), _jsxs("div", { className: "joker-navigation-body", children: [_jsx(SideRail, { collapsed: true, selectedValue: props.selectedValue, setSelectedValue: props.setSelectedValue, onNavigate: props.onNavigate }), props.children && _jsx("div", { className: "joker-navigation-content", children: props.children })] })] }));
}
function MobileNavigationTopBar({ open, setOpen, logoHref, }) {
    return (_jsxs("header", { className: "joker-mobile-nav-bar", children: [_jsx(JokerLogo, { href: logoHref }), _jsx("button", { className: "joker-mobile-nav-toggle", type: "button", "aria-expanded": open, "aria-label": "Toggle menu", "data-mobile-nav-toggle": true, onClick: () => setOpen(!open), children: _jsx("span", { className: "joker-mobile-nav-toggle-icon", "aria-hidden": "true", children: _jsx(MenuIcon, { open: open }) }) })] }));
}
function MobileDrawer({ open, setOpen, balance, avatarSrc, selectedValue, setSelectedValue, onNavigate, }) {
    return (_jsx("div", { className: "joker-mobile-nav-panel", "aria-hidden": !open, children: _jsxs("div", { className: "joker-mobile-nav-panel-inner", children: [_jsxs("section", { className: "joker-mobile-nav-section joker-mobile-nav-actions", "aria-label": "Wallet and account", children: [_jsx(WalletControl, { balance: balance }), _jsx(ActionGroup, { avatarSrc: avatarSrc })] }), _jsx("div", { className: "joker-mobile-nav-scroll", children: _jsx(SideRail, { selectedValue: selectedValue, setSelectedValue: (value, item) => {
                            setSelectedValue(value, item);
                            setOpen(false);
                        }, onNavigate: onNavigate }) })] }) }));
}
function MobileNavigation(props) {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { className: `joker-mobile-nav ${open ? "is-open" : ""}`.trim(), "data-mobile-nav": true, children: [_jsx(MobileNavigationTopBar, { open: open, setOpen: setOpen, logoHref: props.logoHref }), _jsx(MobileDrawer, { open: open, setOpen: setOpen, balance: props.balance, avatarSrc: props.avatarSrc, selectedValue: props.selectedValue, setSelectedValue: props.setSelectedValue, onNavigate: props.onNavigate })] }), props.children && _jsx("div", { className: "joker-navigation-mobile-content", children: props.children })] }));
}
export function Navigation({ balance = "150,000", logoHref = "#/installation", avatarSrc = userAvatarSrc, children, defaultValue, value, onValueChange, onNavigate, className = "", }) {
    const mode = useNavigationMode();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const selectedValue = value ?? internalValue;
    const resolvedProps = useMemo(() => ({
        balance,
        logoHref,
        avatarSrc,
        children,
        value,
        onValueChange,
        onNavigate,
        selectedValue,
        setSelectedValue: (nextValue, item) => {
            setInternalValue(nextValue);
            onValueChange?.(nextValue, item);
        },
    }), [avatarSrc, balance, children, logoHref, onNavigate, onValueChange, selectedValue, value]);
    const content = mode === "mobile"
        ? _jsx(MobileNavigation, { ...resolvedProps })
        : mode === "compact"
            ? _jsx(CompactDesktopNavigation, { ...resolvedProps })
            : _jsx(DesktopNavigation, { ...resolvedProps });
    return (_jsx("div", { className: `joker-navigation-shell ${className}`.trim(), "data-navigation-mode": mode, style: {
            "--navigation-breakpoint-mobile": `${NAVIGATION_BREAKPOINTS.mobile}px`,
            "--navigation-breakpoint-desktop": `${NAVIGATION_BREAKPOINTS.desktop}px`,
        }, children: content }));
}
