import { CashoutInput } from "../components/betting/index.js";
import { WalletControl } from "../components/wallet/index.js";
import { DocPage } from "./pageHelpers.jsx";

export function Withdrawal() {
  return <DocPage title="Withdrawal"><WalletControl /><CashoutInput /></DocPage>;
}
