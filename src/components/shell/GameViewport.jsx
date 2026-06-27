export function GameViewport({ children, className = "", label = "Game canvas" }) {
  const viewportClassName = ["joker-game-shell-empty-stage", className].filter(Boolean).join(" ");

  return (
    <div className={viewportClassName} aria-label={label}>
      {children}
    </div>
  );
}
