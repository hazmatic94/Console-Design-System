import { Table } from "../components/ui/index.js";
import { DocPage } from "./pageHelpers.jsx";

export function Tables() {
  return <DocPage title="Tables"><Table columns={[{ key: "name", label: "Name" }]} rows={[{ name: "Row" }]} /></DocPage>;
}
