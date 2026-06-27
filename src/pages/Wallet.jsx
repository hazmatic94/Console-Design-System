import { WalletControl, WalletMenu } from "../components/wallet/index.js";
import { DocPage } from "./pageHelpers.jsx";

export function Wallet() {
  return <DocPage title="Wallet"><WalletControl /><WalletMenu /></DocPage>;
}
