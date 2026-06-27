import { navigationIconSvg } from "../../data/navigationSvgIcons.js";

export function AssetIcon({ icon, className = "" }) {
  const svg = navigationIconSvg(icon);

  if (!svg) {
    return <span className={`system-icon nav-custom-icon-missing ${className}`.trim()} aria-hidden="true" />;
  }

  return (
    <span
      className={`nav-inline-icon-host ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-hidden="true"
    />
  );
}
