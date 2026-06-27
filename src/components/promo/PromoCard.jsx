import { Button } from "../ui/Button.jsx";

export function PromoCard({ title, body, image, tone = "sage" }) {
  return (
    <article className={`joker-promo-card joker-promo-card--${tone}`.trim()}>
      <div className="joker-promo-frame">
        <div className="joker-promo-inner">
          <div className="joker-promo-copy">
            <h3>{title}</h3>
            <p>{body}</p>
            <div className="joker-promo-action"><Button variant="secondary">Claim</Button></div>
          </div>
          {image && <img className="joker-promo-character" src={image} alt="" />}
        </div>
      </div>
    </article>
  );
}
