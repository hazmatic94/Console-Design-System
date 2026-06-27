export function BalanceDisplay({ balance = "150,000" }) {
  return (
    <span className="joker-wallet-balance">
      <span className="joker-wallet-coin" aria-hidden="true"><img src="./assets/jokerCoin.svg" alt="" /></span>
      <span>{balance}</span>
    </span>
  );
}
