export function JokerLogo({ href = "#/installation" }) {
  return (
    <a className="joker-logo-component" href={href} aria-label="Joker">
      <img src="./assets/jokerLogo.svg" alt="Joker" />
    </a>
  );
}
