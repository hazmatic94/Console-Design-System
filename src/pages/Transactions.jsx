import { Table } from "../components/ui/index.js";
import { DocPage } from "./pageHelpers.jsx";

export function Transactions() {
  return <DocPage title="Transactions"><Table columns={[{ key: "status", label: "Status" }]} rows={[{ status: "Complete" }]} /></DocPage>;
}
