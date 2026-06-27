export function GameMenuDropdown({ label = "Originals", items = [], value, onValueChange }) {
  return (
    <div className="joker-game-menu" data-game-menu>
      <button className="joker-game-menu-trigger" type="button" aria-expanded="false" data-game-menu-toggle>
        <span className="joker-game-menu-label">{label}</span>
        <span className="joker-game-menu-chevron" aria-hidden="true" />
      </button>
      <div className="joker-game-menu-list" role="menu">
        {items.map((item) => (
          <button
            key={item.value || item.label}
            className={`joker-game-menu-option ${value === item.value ? "is-selected" : ""}`.trim()}
            type="button"
            role="menuitemradio"
            aria-checked={value === item.value}
            data-game-menu-option
            onClick={() => onValueChange?.(item.value)}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
