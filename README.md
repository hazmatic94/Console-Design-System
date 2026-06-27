# Joker Design System Platform

A static internal design system platform inspired by the structure and documentation-first experience of xAI Docs.

Open `index.html` in a browser to use the platform. The app is intentionally data-driven:

- Navigation, routes, active states, search, and page metadata live in `app.js`.
- Visual system and layout live in `src/styles/`.
- The platform currently prioritizes structure and templates over finalized component design.

## Current Platform Areas

- Foundations: colors, typography, spacing, radius, shadows, motion, icons
- Components: buttons, inputs, cards, modals, tables, tabs, badges
- Patterns: wallet, transactions, promotions, rewards, leaderboards
- Templates: dashboard, deposit, withdrawal, rewards, profile
- Flows: registration, login, deposit, withdrawal, purchase flow
- Resources: changelog, contribution guide

## Populating Joker Foundations

Replace placeholder foundation content in `app.js` with real Joker Design System data:

- Primitive color tokens
- Semantic color tokens
- Typography scale
- Spacing scale
- Radius values
- Shadows
- Motion standards

Component pages already include sections for live preview, variants, states, usage guidelines, code examples, and copy-code behavior.

## Added Primitive Tokens

- Solid colors: `jokerWhite50`, `jokerBlack50-900`, `jokerGold50-1000`, `jokerGreen50-900`, `jokerRed50-900`, and `jokerAlert50-900`
- Semantic colors: background, text, border, action, and state tokens mapped to Joker primitives
- Typography: Teko display scale and Inter body scale

## Button Package Slice

The first package slice is intentionally small: Button, Button styles, and tokens.

```tsx
import { Button } from "@joker/design-system";
import "@joker/design-system/styles/button.css";

export function Example() {
  return <Button label="Confirm" />;
}
```

The `styles/button.css` entry imports `tokens.css` before `Button.css`, so Button receives color, spacing, typography, radius, shadow, and motion tokens without pulling in the docs-site CSS.

## Input Package Slice

Inputs can be imported with their focused style entry:

```tsx
import { Input, Select, BetAmountInput, MultiplierInput, OtpInput } from "@joker/design-system";
import "@joker/design-system/styles/inputs.css";

export function Example() {
  return <Input label="Email" placeholder="Enter email" helperText="We'll never share your email" />;
}
```

The `styles/inputs.css` entry imports `tokens.css` before `Input.css`, so inputs inherit the shared foundations and input primitive tokens without pulling in the docs-site CSS.

## Extracting the Game Shell

To start a separate `joker-game-shell` repo, copy these folders and files:

- `src/components/shell`
- `src/components/navigation`
- `src/components/wallet`
- `src/components/actions`
- `src/components/betting`
- `src/components/ui`
- `src/data/navigationData.js`
- `src/data/shellMockData.js`
- `src/styles/tokens.css`
- `src/styles/globals.css`
- `src/styles/shell.css`
- `assets/`
