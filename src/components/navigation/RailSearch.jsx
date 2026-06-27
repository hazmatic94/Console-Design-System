export function RailSearch({ placeholder = "Search" }) {
  return (
    <label className="joker-rail-search-item">
      <span aria-hidden="true" />
      <input type="search" placeholder={placeholder} />
    </label>
  );
}
