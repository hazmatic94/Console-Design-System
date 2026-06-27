import { navigationIconSvg } from "../../data/navigationSvgIcons.js";

function RailNavIcon({ icon, label }) {
  if (!icon) return null;

  if (typeof icon !== "string") {
    return <span className="joker-product-rail-icon" aria-hidden="true">{icon}</span>;
  }

  const svg = navigationIconSvg(icon);

  if (svg) {
    return (
      <span
        className="nav-inline-icon-host"
        dangerouslySetInnerHTML={{ __html: svg }}
        aria-hidden="true"
      />
    );
  }

  return <span className="system-icon nav-custom-icon-missing" aria-hidden="true" />;
}

export function RailNavItem({
  item,
  href,
  icon,
  label,
  selected = false,
  className = "",
  ...props
}) {
  const navLabel = label ?? item?.label;
  const navHref = href ?? item?.href ?? "#";
  const navIcon = icon ?? item?.icon;

  return (
    <a
      className={`joker-product-rail-item ${selected ? "is-selected" : ""} ${className}`.trim()}
      href={navHref}
      aria-label={navLabel}
      aria-current={selected ? "page" : undefined}
      data-product-rail-item
      data-tooltip={navLabel}
      {...props}
    >
      <RailNavIcon icon={navIcon} label={navLabel} />
      <span>{navLabel}</span>
    </a>
  );
}
