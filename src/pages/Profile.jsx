import { ActionGroup, UserAvatar } from "../components/actions/index.js";
import { DocPage } from "./pageHelpers.jsx";

export function Profile() {
  return <DocPage title="Profile"><UserAvatar /><ActionGroup /></DocPage>;
}
