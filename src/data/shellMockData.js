import { gameMenuItems, navigationItemRegistry } from "./navigationData.js";

export const shellBalance = "150,000";

export const shellGameMenuItems = gameMenuItems.map((item, index) => ({
  ...item,
  selected: index === 0,
}));

export const shellRailSections = {
  home: [
    navigationItemRegistry.home,
    navigationItemRegistry.favourites,
    navigationItemRegistry.recentlyPlayed,
    navigationItemRegistry.newReleases,
  ],
  games: [
    navigationItemRegistry.originals,
    navigationItemRegistry.casino,
    navigationItemRegistry.promotions,
    navigationItemRegistry.soccer,
  ],
  support: [
    navigationItemRegistry.liveSupport,
    navigationItemRegistry.rewards,
  ],
};

export const shellPromos = [
  {
    title: "Weekly Cashback",
    body: "Claim bonus credit on eligible game play.",
    tone: "sage",
    image: "./assets/promo-vip.png",
  },
  {
    title: "Originals Boost",
    body: "Extra rewards on Joker Originals this week.",
    tone: "blue",
    image: "./assets/promo-originals.png",
  },
];
