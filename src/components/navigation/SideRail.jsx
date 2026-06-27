import { useState } from "react";
import { shellGameMenuItems, shellRailSections } from "../../data/shellMockData.js";
import { GameMenuDropdown } from "./GameMenuDropdown.jsx";
import { RailNavItem } from "./RailNavItem.jsx";
import { RailSearch } from "./RailSearch.jsx";

function navigationValue(item) {
  return item.value ?? item.href ?? item.label;
}

export function SideRail({ sections = shellRailSections, gameItems = shellGameMenuItems, defaultValue = "crash" }) {
  const [activeValue, setActiveValue] = useState(defaultValue);

  const renderRailItem = (item, className = "") => {
    const value = navigationValue(item);

    return (
      <RailNavItem
        key={item.label}
        item={item}
        className={className}
        selected={activeValue === value}
        onClick={(event) => {
          event.preventDefault();
          setActiveValue(value);
        }}
      />
    );
  };

  return (
    <aside className="joker-product-rail" aria-label="Game navigation">
      <div className="joker-product-rail-search"><RailSearch /></div>
      <div className="joker-product-rail-scroll">
        <section className="joker-product-rail-section">
          {sections.home.map((item) => renderRailItem(item))}
        </section>
        <section className="joker-product-rail-section">
          <GameMenuDropdown
            label="Originals"
            items={gameItems}
            value={activeValue}
            onValueChange={setActiveValue}
          />
          {sections.games.slice(1).map((item) => renderRailItem(item))}
        </section>
      </div>
      <footer className="joker-product-rail-footer">
        {sections.support.map((item) => renderRailItem(item, item.tone === "danger" ? "joker-product-rail-logout" : ""))}
      </footer>
    </aside>
  );
}
