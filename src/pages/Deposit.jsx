import { BetAmountInput } from "../components/betting/index.js";
import { WalletControl } from "../components/wallet/index.js";
import { DocPage } from "./pageHelpers.jsx";

export function Deposit() {
  return <DocPage title="Deposit"><WalletControl /><BetAmountInput /></DocPage>;
}
