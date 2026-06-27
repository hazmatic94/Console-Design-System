export function Button({ children, label, variant = "primary", size = "medium", fullWidth = false, loading = false, selected = false, className = "", ...props }) {
  const sizeClass = variant === "primary" ? size : null;
  const classes = ["joker-cta-preview", variant, sizeClass, fullWidth && "full-width", loading && "is-loading", selected && "is-selected", className].filter(Boolean).join(" ");
  const content = children ?? label;

  return (
    <button className={classes} type="button" aria-busy={loading || undefined} aria-pressed={selected || undefined} {...props}>
      <span>{content}</span>
    </button>
  );
}
