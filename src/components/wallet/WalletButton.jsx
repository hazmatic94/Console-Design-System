export function WalletButton({ children = "Wallet", ...props }) {
  return (
    <button className="joker-wallet-action" type="button" {...props}>
      <span>{children}</span>
    </button>
  );
}
