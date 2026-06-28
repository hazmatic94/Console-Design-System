export function JokerLogo({ href = "#/installation" }) {
  return (
    <a className="joker-logo-component" href={href} aria-label="Console home">
      <img src="./assets/consoleLogo.png" alt="Console" />
    </a>
  );
}
