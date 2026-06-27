import { ActionGroup } from "../actions/ActionGroup.jsx";
import { WalletControl } from "../wallet/WalletControl.jsx";
import { JokerLogo } from "./JokerLogo.jsx";
import { SideRail } from "./SideRail.jsx";

export function MobileMenu({ open = false }) {
  return (
    <nav className={`joker-mobile-nav ${open ? "is-open" : ""}`.trim()} data-mobile-nav>
      <div className="joker-mobile-nav-bar">
        <JokerLogo />
        <button className="joker-mobile-nav-toggle" type="button" aria-expanded={open} data-mobile-nav-toggle />
      </div>
      <div className="joker-mobile-nav-panel">
        <div className="joker-mobile-nav-panel-inner">
          <section className="joker-mobile-nav-section joker-mobile-nav-actions">
            <WalletControl />
            <ActionGroup />
          </section>
          <div className="joker-mobile-nav-scroll"><SideRail /></div>
        </div>
      </div>
    </nav>
  );
}
