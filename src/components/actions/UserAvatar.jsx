export function UserAvatar({ src = "./assets/avatar.png", label = "User" }) {
  return (
    <button className="joker-avatar-item" type="button" aria-label={label}>
      <img src={src} alt="" />
      <span className="joker-avatar-status" aria-hidden="true" />
    </button>
  );
}
