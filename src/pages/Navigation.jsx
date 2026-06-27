import {
  GameMenuDropdown,
  MobileMenu,
  RailNavItem,
  RailSearch,
  SideRail,
  TopRail
} from "../components/navigation/index.js";
import { navigationItemRegistry } from "../data/navigationData.js";
import { DocPage } from "./pageHelpers.jsx";

export function Navigation() {
  return (
    <DocPage title="Navigation">
      <TopRail />
      <SideRail />
      <MobileMenu />
      <RailSearch />
      <RailNavItem item={navigationItemRegistry.home} />
      <GameMenuDropdown label="Originals" items={[]} />
    </DocPage>
  );
}
