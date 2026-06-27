import { shellPromos } from "../../data/shellMockData.js";
import { PromoCard } from "./PromoCard.jsx";

export function PromoCarousel({ promos = shellPromos }) {
  return <div className="joker-promo-carousel">{promos.map((promo) => <PromoCard key={promo.title} {...promo} />)}</div>;
}
