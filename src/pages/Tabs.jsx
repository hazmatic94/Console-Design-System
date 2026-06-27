import { Tabs as TabsComponent } from "../components/ui/index.js";
import { DocPage } from "./pageHelpers.jsx";

export function Tabs() {
  return <DocPage title="Tabs"><TabsComponent tabs={[{ label: "One", value: "one" }]} activeValue="one" /></DocPage>;
}
