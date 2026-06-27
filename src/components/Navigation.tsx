import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import jokerCoinSrc from "../../assets/jokerCoin.svg";
import jokerLogoSrc from "../../assets/jokerLogo.svg";
import userAvatarSrc from "../../assets/user.png";
import { navigationIconSvg } from "../data/navigationSvgIcons.js";
import { navigationItemRegistry } from "../data/navigationData.js";

export const NAVIGATION_BREAKPOINTS = {
  mobile: 1024,
  desktop: 1280,
} as const;

export type NavigationMode = "desktop" | "compact" | "mobile";

type NavigationItem = {
  label: string;
  icon: string;
  href?: string;
  value?: string;
  tone?: string;
  badge?: boolean;
};

type NavigationGroup = {
  item: NavigationItem;
  items: NavigationItem[];
};

export type NavigationProps = {
  balance?: string;
  logoHref?: string;
  avatarSrc?: string;
  children?: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string, item: NavigationItem) => void;
  onNavigate?: (item: NavigationItem, event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
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
} satisfies {
  home: NavigationItem[];
  groups: NavigationGroup[];
  gameLinks: NavigationItem[];
  support: NavigationItem[];
  account: NavigationItem[];
};

function getNavigationMode() {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth < NAVIGATION_BREAKPOINTS.mobile) return "mobile";
  if (window.innerWidth < NAVIGATION_BREAKPOINTS.desktop) return "compact";
  return "desktop";
}

function useNavigationMode() {
  const [mode, setMode] = useState<NavigationMode>(getNavigationMode);

  useEffect(() => {
    const updateMode = () => setMode(getNavigationMode());
    updateMode();
    window.addEventListener("resize", updateMode);
    return () => window.removeEventListener("resize", updateMode);
  }, []);

  return mode;
}

function navigationValue(item: NavigationItem) {
  return item.value ?? item.href ?? item.label;
}

function AssetIcon({ icon, className = "" }: { icon?: string; className?: string }) {
  if (!icon) return null;

  if (icon === "search") {
    return (
      <svg className={`system-icon nav-inline-icon ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M10.75 4a6.75 6.75 0 0 1 5.34 10.88l3.52 3.51-1.42 1.42-3.51-3.52A6.75 6.75 0 1 1 10.75 4Zm0 2a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Z" fill="currentColor" />
      </svg>
    );
  }

  const svg = navigationIconSvg(icon, className);
  if (!svg) return <span className={`system-icon nav-custom-icon-missing ${className}`.trim()} aria-hidden="true" />;

  return (
    <span
      className={`nav-inline-icon-host ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-hidden="true"
    />
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 12h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ open }: { open?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {open ? (
        <>
          <path d="M18 6 6 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m6 6 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d="M4 6h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 12h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 18h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function JokerLogo({ href }: { href: string }) {
  return (
    <a className="joker-logo-component" href={href} aria-label="Joker OS home">
      <img src={jokerLogoSrc} alt="Joker OS" />
    </a>
  );
}

function WalletControl({ balance }: { balance: string }) {
  return (
    <div className="joker-wallet-control" aria-label="Wallet balance">
      <div className="joker-wallet-balance">
        <img className="joker-wallet-coin" src={jokerCoinSrc} alt="" />
        <span>{balance}</span>
      </div>
      <button className="joker-wallet-action" type="button" aria-label="Open wallet">
        <WalletIcon />
      </button>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  badge,
  className = "",
}: {
  icon: string;
  label: string;
  badge?: boolean;
  className?: string;
}) {
  return (
    <button className={`joker-action-item ${className}`.trim()} type="button" aria-label={label}>
      <AssetIcon icon={icon} className="joker-action-icon" />
      {badge && <span className="joker-action-badge" aria-hidden="true" />}
    </button>
  );
}

function ActionGroup({ avatarSrc }: { avatarSrc: string }) {
  return (
    <div className="joker-action-group-set" aria-label="User action shortcuts">
      <ActionButton icon={navigationItemRegistry.promotions.icon} label={navigationItemRegistry.promotions.label} />
      <div className="joker-action-cluster" role="group" aria-label="Messages and notifications">
        <ActionButton icon={navigationItemRegistry.messages.icon} label={navigationItemRegistry.messages.label} className="joker-action-item--clustered" />
        <span className="joker-action-divider" aria-hidden="true" />
        <ActionButton icon={navigationItemRegistry.notifications.icon} label={navigationItemRegistry.notifications.label} badge className="joker-action-item--clustered" />
      </div>
      <button className="joker-avatar-item" type="button" aria-label="Open profile">
        <img src={avatarSrc} alt="" />
        <span className="joker-avatar-status" aria-hidden="true" />
      </button>
    </div>
  );
}

function TopRail({ balance, logoHref, avatarSrc }: Pick<ResolvedNavigationProps, "balance" | "logoHref" | "avatarSrc">) {
  return (
    <header className="joker-top-rail-demo" aria-label="Joker top rail">
      <div className="joker-top-rail-lane joker-top-rail-lane--left">
        <JokerLogo href={logoHref} />
      </div>
      <div className="joker-top-rail-lane joker-top-rail-lane--center">
        <WalletControl balance={balance} />
      </div>
      <div className="joker-top-rail-lane joker-top-rail-lane--right">
        <ActionGroup avatarSrc={avatarSrc} />
      </div>
    </header>
  );
}

function RailSearch({
  searchOpen,
  setSearchOpen,
}: {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}) {
  return (
    <label className={`joker-rail-search-item ${searchOpen ? "is-search-open" : ""}`.trim()} aria-label="Search navigation" data-tooltip="Search">
      <AssetIcon icon="search" />
      <input
        type="search"
        placeholder="Search"
        onFocus={() => setSearchOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.currentTarget.blur();
            setSearchOpen(false);
          }
        }}
      />
    </label>
  );
}

function RailNavItem({
  item,
  selected,
  className = "",
  onSelect,
  onNavigate,
}: {
  item: NavigationItem;
  selected: boolean;
  className?: string;
  onSelect: (item: NavigationItem) => void;
  onNavigate?: NavigationProps["onNavigate"];
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onSelect(item);
    onNavigate?.(item, event);
  };

  return (
    <a
      className={`joker-product-rail-item ${selected ? "is-selected" : ""} ${className}`.trim()}
      href={item.href ?? "#"}
      data-product-rail-item
      data-tooltip={item.label}
      aria-label={item.label}
      aria-current={selected ? "page" : undefined}
      onClick={handleClick}
    >
      <AssetIcon icon={item.icon} />
      <span className="joker-product-rail-item-label">{item.label}</span>
    </a>
  );
}

function GameMenuDropdown({
  group,
  selectedValue,
  open,
  onToggle,
  onSelect,
}: {
  group: NavigationGroup;
  selectedValue?: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (item: NavigationItem) => void;
}) {
  return (
    <div className={`joker-product-rail-game-menu ${open ? "is-open" : ""}`.trim()} data-game-menu>
      <button
        className="joker-product-rail-menu-trigger"
        type="button"
        aria-expanded={open}
        data-game-menu-toggle
        data-tooltip={group.item.label}
        aria-label={group.item.label}
        onClick={onToggle}
      >
        <span className="joker-product-rail-menu-label">
          <span className="joker-product-rail-game-icon" aria-hidden="true">
            <AssetIcon icon={group.item.icon} />
          </span>
          <span>{group.item.label}</span>
        </span>
        <span className="joker-product-rail-menu-chevron" aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>
      <div className="joker-product-rail-game-list" role="menu">
        {group.items.map((item) => {
          const itemValue = navigationValue(item);
          const selected = selectedValue === itemValue;

          return (
            <button
              key={itemValue}
              className={`joker-product-rail-game-option ${selected ? "is-selected" : ""}`.trim()}
              type="button"
              role="menuitemradio"
              aria-checked={selected}
              data-game-menu-option
              data-tooltip={item.label}
              aria-label={item.label}
              onClick={() => onSelect(item)}
            >
              <span className="joker-product-rail-game-icon" aria-hidden="true">
                <AssetIcon icon={item.icon} />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

type ResolvedNavigationProps = Required<Pick<NavigationProps, "balance" | "logoHref" | "avatarSrc">> &
  Pick<NavigationProps, "children" | "value" | "onValueChange" | "onNavigate"> & {
    selectedValue?: string;
    setSelectedValue: (value: string, item: NavigationItem) => void;
  };

function SideRail({
  collapsed = false,
  selectedValue,
  setSelectedValue,
  onNavigate,
}: {
  collapsed?: boolean;
  selectedValue?: string;
  setSelectedValue: (value: string, item: NavigationItem) => void;
  onNavigate?: NavigationProps["onNavigate"];
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const selectItem = (item: NavigationItem) => {
    setSelectedValue(navigationValue(item), item);
  };

  const renderItem = (item: NavigationItem, className = "") => (
    <RailNavItem
      key={navigationValue(item)}
      item={item}
      className={className}
      selected={selectedValue === navigationValue(item)}
      onSelect={selectItem}
      onNavigate={onNavigate}
    />
  );

  return (
    <aside className={`joker-product-rail ${collapsed ? "is-collapsed" : ""}`.trim()} aria-label={collapsed ? "Collapsed Joker product navigation" : "Expanded Joker product navigation"}>
      <div className="joker-product-rail-search">
        <RailSearch searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      </div>
      <div className="joker-product-rail-scroll">
        <section className="joker-product-rail-section" aria-label="Main navigation">
          {navigationSections.home.map((item) => renderItem(item))}
        </section>
        <section className="joker-product-rail-section" aria-label="Games">
          {navigationSections.groups.map((group) => (
            <GameMenuDropdown
              key={group.item.label}
              group={group}
              selectedValue={selectedValue}
              open={openGroup === group.item.label}
              onToggle={() => setOpenGroup((current) => current === group.item.label ? null : group.item.label)}
              onSelect={selectItem}
            />
          ))}
          {navigationSections.gameLinks.map((item) => renderItem(item, "joker-product-rail-item--with-ball"))}
        </section>
        <section className="joker-product-rail-section" aria-label="Support">
          {navigationSections.support.map((item) => renderItem(item))}
        </section>
      </div>
      <div className="joker-product-rail-footer">
        {navigationSections.account.map((item) => renderItem(item, item.tone === "danger" ? "joker-product-rail-logout" : ""))}
      </div>
    </aside>
  );
}

function DesktopNavigation(props: ResolvedNavigationProps) {
  return (
    <div className="joker-navigation joker-navigation--desktop">
      <TopRail balance={props.balance} logoHref={props.logoHref} avatarSrc={props.avatarSrc} />
      <div className="joker-navigation-body">
        <SideRail selectedValue={props.selectedValue} setSelectedValue={props.setSelectedValue} onNavigate={props.onNavigate} />
        {props.children && <div className="joker-navigation-content">{props.children}</div>}
      </div>
    </div>
  );
}

function CompactDesktopNavigation(props: ResolvedNavigationProps) {
  return (
    <div className="joker-navigation joker-navigation--compact">
      <TopRail balance={props.balance} logoHref={props.logoHref} avatarSrc={props.avatarSrc} />
      <div className="joker-navigation-body">
        <SideRail collapsed selectedValue={props.selectedValue} setSelectedValue={props.setSelectedValue} onNavigate={props.onNavigate} />
        {props.children && <div className="joker-navigation-content">{props.children}</div>}
      </div>
    </div>
  );
}

function MobileNavigationTopBar({
  open,
  setOpen,
  logoHref,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  logoHref: string;
}) {
  return (
    <header className="joker-mobile-nav-bar">
      <JokerLogo href={logoHref} />
      <button
        className="joker-mobile-nav-toggle"
        type="button"
        aria-expanded={open}
        aria-label="Toggle menu"
        data-mobile-nav-toggle
        onClick={() => setOpen(!open)}
      >
        <span className="joker-mobile-nav-toggle-icon" aria-hidden="true">
          <MenuIcon open={open} />
        </span>
      </button>
    </header>
  );
}

function MobileDrawer({
  open,
  setOpen,
  balance,
  avatarSrc,
  selectedValue,
  setSelectedValue,
  onNavigate,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
} & Pick<ResolvedNavigationProps, "balance" | "avatarSrc" | "selectedValue" | "setSelectedValue" | "onNavigate">) {
  return (
    <div className="joker-mobile-nav-panel" aria-hidden={!open}>
      <div className="joker-mobile-nav-panel-inner">
        <section className="joker-mobile-nav-section joker-mobile-nav-actions" aria-label="Wallet and account">
          <WalletControl balance={balance} />
          <ActionGroup avatarSrc={avatarSrc} />
        </section>
        <div className="joker-mobile-nav-scroll">
          <SideRail selectedValue={selectedValue} setSelectedValue={(value, item) => {
            setSelectedValue(value, item);
            setOpen(false);
          }} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

function MobileNavigation(props: ResolvedNavigationProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className={`joker-mobile-nav ${open ? "is-open" : ""}`.trim()} data-mobile-nav>
        <MobileNavigationTopBar open={open} setOpen={setOpen} logoHref={props.logoHref} />
        <MobileDrawer
          open={open}
          setOpen={setOpen}
          balance={props.balance}
          avatarSrc={props.avatarSrc}
          selectedValue={props.selectedValue}
          setSelectedValue={props.setSelectedValue}
          onNavigate={props.onNavigate}
        />
      </nav>
      {props.children && <div className="joker-navigation-mobile-content">{props.children}</div>}
    </>
  );
}

export function Navigation({
  balance = "150,000",
  logoHref = "#/installation",
  avatarSrc = userAvatarSrc,
  children,
  defaultValue,
  value,
  onValueChange,
  onNavigate,
  className = "",
}: NavigationProps) {
  const mode = useNavigationMode();
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const selectedValue = value ?? internalValue;

  const resolvedProps = useMemo<ResolvedNavigationProps>(() => ({
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
    ? <MobileNavigation {...resolvedProps} />
    : mode === "compact"
      ? <CompactDesktopNavigation {...resolvedProps} />
      : <DesktopNavigation {...resolvedProps} />;

  return (
    <div
      className={`joker-navigation-shell ${className}`.trim()}
      data-navigation-mode={mode}
      style={{
        "--navigation-breakpoint-mobile": `${NAVIGATION_BREAKPOINTS.mobile}px`,
        "--navigation-breakpoint-desktop": `${NAVIGATION_BREAKPOINTS.desktop}px`,
      } as Record<string, string>}
    >
      {content}
    </div>
  );
}
