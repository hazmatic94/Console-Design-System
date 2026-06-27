import { Table } from "../components/ui/index.js";
import { DocPage } from "./pageHelpers.jsx";

export function Leaderboards() {
  return <DocPage title="Leaderboards"><Table columns={[{ key: "rank", label: "Rank" }]} rows={[{ rank: "1" }]} /></DocPage>;
}
