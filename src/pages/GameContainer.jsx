import { DesktopGameShell, MobileGameShell } from "../components/shell/index.js";
import { DocPage } from "./pageHelpers.jsx";

export function GameContainer() {
  return (
    <DocPage title="Game Container">
      <DesktopGameShell />
      <MobileGameShell />
    </DocPage>
  );
}
