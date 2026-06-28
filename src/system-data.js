export const navGroups = [
  {
    title: "Foundations",
    items: ["Colors", "Typography", "Spacing", "Radius", "Shadows", "Motion", "Icons"],
  },
  {
    title: "Components",
    items: ["Buttons", "Inputs", "Navigation", "Game Header Rail", "Cards", "Modals", "Tables", "Tabs", "Badges"],
  },
  {
    title: "Patterns",
    items: ["Wallet", "Betting Panel", "Transactions", "Promotions", "Rewards", "Leaderboards"],
  },
  {
    title: "Templates",
    items: ["Game Container", "Dashboard", "Deposit", "Withdrawal", "Rewards", "Profile"],
  },
  {
    title: "Flows",
    items: ["Registration", "Login", "Deposit", "Withdrawal", "Purchase Flow"],
  },
  {
    title: "Resources",
    items: ["Changelog", "Contribution Guide"],
  },
];

export const foundationNotes = {
  Colors: "Clean CSS variables for primitive and semantic Joker colour roles, ready for product implementation.",
  Typography: "Reusable type variables for headings and body text, ready for consistent product implementation.",
  Spacing: "Predictable spacing variables for page rhythm, component padding, and dense product layouts.",
  Radius: "Corner radius variables for controls, surfaces, overlays, and product-specific containers.",
  Shadows: "Elevation variables for popovers, modals, menus, layered surfaces, and focused product UI.",
  Motion: "Duration, easing, and interaction variables for fast, subtle, controlled interface movement.",
  Icons: "Icon sizing, stroke weight, and source standards for product navigation, actions, and states.",
};

export const spacingTokens = [
  { name: "space4", value: 4, usage: "Hairline gaps, icon nudges, and tiny control offsets." },
  { name: "space8", value: 8, usage: "Compact gaps inside controls and tight grouped UI." },
  { name: "space12", value: 12, usage: "Small stacked content, labels, and dense card spacing." },
  { name: "space16", value: 16, usage: "Default component padding and common layout rhythm." },
  { name: "space24", value: 24, usage: "Comfortable card padding and section grouping." },
  { name: "space32", value: 32, usage: "Large component gaps and page content separation." },
  { name: "space40", value: 40, usage: "Major layout spacing between content groups." },
  { name: "space64", value: 64, usage: "Large section breaks and high-level page structure." },
];

export const radiusTokens = [
  { name: "radius4", value: 4 },
  { name: "radius8", value: 8 },
  { name: "radius12", value: 12 },
  { name: "radius16", value: 16 },
  { name: "radius28", value: 28 },
  { name: "radius42", value: 42 },
];

export const shadowTokens = [
  { name: "shadow1", value: "inset 0 0 0 1px rgb(255 255 255 / 0.08)", label: "Inset shadow" },
  { name: "shadow2", value: "0 1px 2px rgb(0 0 0 / 0.28), 0 0 0 1px rgb(255 255 255 / 0.06)", label: "Classic panel low" },
  { name: "shadow3", value: "0 8px 18px rgb(0 0 0 / 0.32), 0 0 0 1px rgb(255 255 255 / 0.07)", label: "Classic panel raised" },
  { name: "shadow4", value: "0 14px 30px rgb(0 0 0 / 0.38), 0 0 0 1px rgb(255 255 255 / 0.08)", label: "Small overlay low" },
  { name: "shadow5", value: "0 20px 44px rgb(0 0 0 / 0.44), 0 0 0 1px rgb(255 255 255 / 0.08)", label: "Small overlay raised" },
  { name: "shadow6", value: "0 30px 70px rgb(0 0 0 / 0.52), 0 0 0 1px rgb(255 255 255 / 0.1)", label: "Dialog overlay" },
];

export const motionDurationTokens = [
  { name: "motionInstant", value: "60ms", usage: "Immediate feedback for small UI state changes." },
  { name: "motionFast", value: "100ms", usage: "Hover, focus, press, and compact control transitions." },
  { name: "motionBase", value: "160ms", usage: "Default component transitions and short content changes." },
  { name: "motionMedium", value: "220ms", usage: "Menus, popovers, toasts, and small overlay entrances." },
  { name: "motionSlow", value: "300ms", usage: "Drawers, larger overlays, and page-level UI shifts." },
];

export const motionEasingTokens = [
  { name: "easeStandard", value: "cubic-bezier(0.2, 0, 0, 1)", usage: "Default easing for most interface movement." },
  { name: "easeOut", value: "cubic-bezier(0, 0, 0.2, 1)", usage: "Entrances, reveals, and elements coming into view." },
  { name: "easeIn", value: "cubic-bezier(0.4, 0, 1, 1)", usage: "Exits and elements leaving the current context." },
  { name: "easeEmphasized", value: "cubic-bezier(0.2, 0, 0, 1)", usage: "Controlled emphasis for overlays and high-attention UI." },
];

export const motionPatternTokens = [
  { name: "motionFadeIn", output: "opacity var(--motion-base) var(--ease-out)", usage: "Content appearing after load or state changes.", preview: "fade-in" },
  { name: "motionScalePress", output: "transform var(--motion-fast) var(--ease-standard)", usage: "Button press and small tactile feedback.", preview: "scale-press" },
  { name: "motionSlideUp", output: "transform var(--motion-medium) var(--ease-out)", usage: "Menus, cards, and compact panels entering upward.", preview: "slide-up" },
  { name: "motionDrawerSlide", output: "transform var(--motion-slow) var(--ease-emphasized)", usage: "Side drawers and larger navigation panels.", preview: "drawer-slide" },
  { name: "motionLoadingShimmer", output: "background-position var(--motion-slow) linear infinite", usage: "Skeleton loading states that stay quiet.", preview: "loading-shimmer" },
  { name: "motionToastEntrance", output: "transform var(--motion-medium) var(--ease-out)", usage: "Toast and notification entrances.", preview: "toast-entrance" },
];

export const iconSourceTokens = [
  { sample: "Library", variable: "--icon-source", output: "lucide-icons/lucide.git", usage: "Primary source for production SVG icon assets.", icon: "sparkles" },
  { sample: "Package", variable: "--icon-package", output: "lucide-static", usage: "Static SVG package option for this docs shell and token export.", icon: "package" },
  { sample: "Style", variable: "--icon-style", output: "outline / round caps", usage: "Use Lucide outline icons with consistent stroke and joins.", icon: "circle" },
];

export const iconSizeTokens = [
  { name: "iconSizeXs", value: "12px", usage: "Tiny metadata, dense table cells, and compact labels.", icon: "dot" },
  { name: "iconSizeSm", value: "16px", usage: "Default controls, nav items, copy buttons, and tool actions.", icon: "search" },
  { name: "iconSizeMd", value: "20px", usage: "Medium buttons, menu items, and product actions.", icon: "check" },
  { name: "iconSizeLg", value: "24px", usage: "Empty states, page actions, and larger controls.", icon: "alert-triangle" },
  { name: "iconSizeXl", value: "32px", usage: "Feature callouts and high-emphasis product moments.", icon: "sparkles" },
];

export const iconStrokeTokens = [
  { name: "iconStrokeDefault", value: "1.75px", usage: "Default Joker DS stroke weight for product icons.", icon: "minus" },
  { name: "iconStrokeStrong", value: "2px", usage: "Use when an icon needs stronger visibility at small sizes.", icon: "plus" },
];

export const iconUsageTokens = [
  { name: "iconSearch", value: "search", usage: "Search inputs, command surfaces, and filtering.", icon: "search" },
  { name: "iconCopy", value: "copy", usage: "Copy actions for code, tokens, and values.", icon: "copy" },
  { name: "iconChevronDown", value: "chevron-down", usage: "Expandable nav sections, menus, and selects.", icon: "chevron-down" },
  { name: "iconCheck", value: "check", usage: "Success, complete, and selected states.", icon: "check" },
  { name: "iconAlertTriangle", value: "alert-triangle", usage: "Warnings, validation, and caution states.", icon: "alert-triangle" },
  { name: "iconSparkles", value: "sparkles", usage: "AI, assistive, or generated-system actions.", icon: "sparkles" },
];

export const buttonStateTokens = [
  {
    label: "Default",
    token: "--button-cta-default",
    output: "primary action bg / inner highlight / on-primary text",
    state: "default",
  },
  {
    label: "Hover",
    token: "--button-cta-hover",
    output: "primary hover bg / lifted shadow / focus border",
    state: "hover",
  },
  {
    label: "Disabled",
    token: "--button-cta-disabled",
    output: "disabled bg / inner shadow / muted text",
    state: "disabled",
  },
];

export const buttonFoundationTokens = [
  { label: "Primary height", token: "--button-height", output: "36px" },
  { label: "Primary min width", token: "--button-primary-min-width", output: "auto" },
  { label: "Secondary height", token: "--button-secondary-height", output: "36px" },
  { label: "Radius", token: "--button-radius", output: "radius 8" },
  { label: "Horizontal padding", token: "--button-padding-inline", output: "space 12" },
  { label: "Primary typography", token: "--text-p1", output: "p1 / Inter 14px / 400" },
  { label: "Secondary typography", token: "--text-p1", output: "p1 / Inter 14px / 400" },
  { label: "Duration", token: "--button-transition-duration", output: "100ms" },
  { label: "Easing", token: "--button-transition-ease", output: "cubic-bezier(0, 0, 0.2, 1)" },
  { label: "Press", token: "--button-press-transform", output: "translateY(1px) scale(0.99)" },
];

export const inputVariantRows = [
  { label: "Input", token: "Input", output: "Single-line value entry with optional prefix and suffix slots.", variant: "text", status: "first-class" },
  { label: "Dropdown", token: "Select", output: "Single-value option selection for constrained field choices.", variant: "dropdown", status: "first-class" },
];

export const inputStateRows = [
  { label: "Default", token: "data-state=default", output: "Base resting style for all variants.", state: "default" },
  { label: "Hover", token: "data-state=hover", output: "Border/surface affordance only. Do not duplicate per variant.", state: "hover" },
  { label: "Focus", token: "data-state=focus", output: "Keyboard-visible focus ring and caret treatment.", state: "focus" },
  { label: "Success", token: "data-status=success", output: "Confirmed value or valid completion feedback.", state: "success" },
  { label: "Warning", token: "data-status=warning", output: "Attention state that does not block submission.", state: "warning" },
  { label: "Error", token: "aria-invalid=true", output: "Blocking validation, field-level error copy, and accessible invalid state.", state: "error" },
  { label: "Disabled", token: "disabled", output: "Unavailable state. No hover/focus interaction.", state: "disabled" },
];

export const primitiveColorFamilies = [
  {
    title: "white",
    tokens: [{ name: "white50", value: "#ffffff", text: "dark" }],
  },
  {
    title: "black",
    tokens: [
      { name: "black50", value: "#A6A6A6", text: "light" },
      { name: "black100", value: "#5F5F5F", text: "light" },
      { name: "black200", value: "#3D3D3D", text: "light" },
      { name: "black300", value: "#262626", text: "light" },
      { name: "black400", value: "#212121", text: "light", base: true },
      { name: "black500", value: "#1F1F1F", text: "light" },
      { name: "black600", value: "#1B1B1B", text: "light" },
      { name: "black700", value: "#171717", text: "light" },
      { name: "black800", value: "#131313", text: "light" },
      { name: "black900", value: "#000000", text: "light" },
    ],
  },
  {
    title: "sage",
    tokens: [
      { name: "sage50", value: "#F7FAF9", text: "dark" },
      { name: "sage100", value: "#E3F3EF", text: "dark" },
      { name: "sage200", value: "#CBE7DF", text: "dark" },
      { name: "sage300", value: "#B7DBD1", text: "dark" },
      { name: "sage400", value: "#7FB3A4", text: "dark", base: true },
      { name: "sage500", value: "#5F9688", text: "dark" },
      { name: "sage600", value: "#467568", text: "light" },
      { name: "sage700", value: "#33584F", text: "light" },
      { name: "sage800", value: "#243E39", text: "light" },
      { name: "sage900", value: "#243E39", text: "light" },
    ],
  },
  {
    title: "success",
    tokens: [
      { name: "successSubtle", value: "#071A12", text: "light" },
      { name: "successBase", value: "#1FD16C", text: "dark", base: true },
      { name: "successStrong", value: "#74FFAD", text: "dark" },
    ],
  },
  {
    title: "warning",
    tokens: [
      { name: "warningSubtle", value: "#1A1005", text: "light" },
      { name: "warningBase", value: "#FF8A00", text: "dark", base: true },
      { name: "warningStrong", value: "#FFC76B", text: "dark" },
    ],
  },
  {
    title: "danger",
    tokens: [
      { name: "dangerSubtle", value: "#1D0A0D", text: "light" },
      { name: "dangerBase", value: "#FF5B6E", text: "dark", base: true },
      { name: "dangerStrong", value: "#FFA0AA", text: "dark" },
    ],
  },
];

export const semanticColorGroups = [
  {
    title: "Background",
    tokens: [
      { name: "color.bg.canvas", value: "black800", use: "Main documentation canvas" },
      { name: "color.bg.app", value: "black900", use: "Outer app chrome and deepest page areas" },
      { name: "color.bg.sidebar", value: "black900", use: "Left and right navigation rails" },
      { name: "color.bg.surface", value: "black700", use: "Cards, panels, and repeated content blocks" },
      { name: "color.bg.surfaceRaised", value: "black600", use: "Raised or emphasized surfaces" },
      { name: "color.bg.surfaceActive", value: "black400", use: "Selected navigation and active surfaces" },
      { name: "color.bg.code", value: "black900", use: "Code editor backgrounds" },
      { name: "color.bg.inverse", value: "white50", use: "White controls and inverse content" },
    ],
  },
  {
    title: "Text",
    tokens: [
      { name: "color.text.primary", value: "white50", use: "Primary headings and high-emphasis copy" },
      { name: "color.text.secondary", value: "black50", use: "Default body copy and nav labels" },
      { name: "color.text.muted", value: "black100", use: "Subtle metadata, placeholders, and secondary labels" },
      { name: "color.text.inverse", value: "black900", use: "Text on white or pale focus surfaces" },
      { name: "color.text.brand", value: "white50", use: "Brand moments and premium emphasis" },
    ],
  },
  {
    title: "Border",
    tokens: [
      { name: "color.border.subtle", value: "whiteAlpha08", use: "Dividers and low-emphasis outlines" },
      { name: "color.border.default", value: "black300", use: "Default controls, panels, and cards" },
      { name: "color.border.strong", value: "black100", use: "Higher contrast borders and active outlines" },
      { name: "color.border.focus", value: "sage400", use: "Keyboard focus and selected emphasis" },
    ],
  },
  {
    title: "Action",
    tokens: [
      { name: "color.action.primary", value: "sage400", use: "Primary action fill and premium CTA emphasis" },
      { name: "color.action.primaryHover", value: "sage300", use: "Primary action hover" },
      { name: "color.action.primaryActive", value: "sage500", use: "Primary action pressed state" },
      { name: "color.action.onPrimary", value: "black900", use: "Text or icon on primary action fills" },
    ],
  },
  {
    title: "State",
    tokens: [
      { name: "color.selection.bg", value: "black400", use: "Selected navigation and active rows" },
      { name: "color.status.available", value: "successBase", use: "Available, ready, or healthy status indicators" },
      { name: "color.status.successSubtle", value: "successSubtle", use: "Low-emphasis success backgrounds" },
      { name: "color.status.success", value: "successBase", use: "Success states, approvals, completion, and positive feedback" },
      { name: "color.status.successStrong", value: "successStrong", use: "High-emphasis success affordances" },
      { name: "color.status.warningSubtle", value: "warningSubtle", use: "Low-emphasis warning backgrounds" },
      { name: "color.status.warning", value: "warningBase", use: "Warnings, caution, pending, and attention states" },
      { name: "color.status.warningStrong", value: "warningStrong", use: "High-emphasis warning affordances" },
      { name: "color.status.dangerSubtle", value: "dangerSubtle", use: "Low-emphasis danger backgrounds" },
      { name: "color.status.danger", value: "dangerBase", use: "Danger, destructive feedback, failed states, and blocking validation" },
      { name: "color.status.dangerStrong", value: "dangerStrong", use: "High-emphasis danger affordances" },
    ],
  },
];

export const componentSummaries = {
  Buttons: "Action controls for commands, navigation, confirmation, and destructive product flows.",
  Inputs: "Field patterns for value entry, validation, and profile-style form layouts.",
  Navigation: "Product navigation patterns for top bars, side rails, active states, and primary wayfinding.",
  "Game Header Rail": "Game-level header rail for title, game identity, info affordance, and fair play access.",
  Cards: "Contained surfaces for grouped content, summary objects, previews, and repeated product records.",
  Modals: "Focused overlay patterns for decisions, confirmations, blocking tasks, and recovery states.",
  Tables: "Data-dense structures for comparison, filtering, review, and operational product actions.",
  Tabs: "Local navigation patterns for switching related views inside one focused product context.",
  Badges: "Compact label patterns for status, category, counts, metadata, and lightweight state signals.",
};

export const patternSummaries = {
  Wallet: "Reusable standards for balances, payment methods, account value, and funding visibility.",
  "Betting Panel": "Reusable betting controls for wager entry, mode switching, cashout settings, and profit preview.",
  Transactions: "Patterns for transaction lists, detail states, status visibility, and dispute context.",
  Promotions: "Offer patterns for eligibility, expiry, claim actions, reward value, and campaign states.",
  Rewards: "Reward patterns for earned value, redemption, progress tracking, and loyalty messaging.",
  Leaderboards: "Ranking patterns for time windows, tie handling, player safety, and status visibility.",
};

export const templateSummaries = {
  "Game Container": "A reusable game shell template for top rail, side rail, game stage, controls, and responsive play states.",
  Dashboard: "A product overview template for KPI rows, activity streams, alerts, and priority actions.",
  Deposit: "A funding template for payment method selection, amount entry, review, and confirmation.",
  Withdrawal: "A payout template for destination selection, verification, status, and confirmation.",
  Rewards: "A rewards template for discovery, progress, redemption, history, and earned value.",
  Profile: "An account template for identity, preferences, security settings, and account management.",
};

export const flowSummaries = {
  Registration: "Account creation flow for onboarding steps, verification, recovery, and completion states.",
  Login: "Authentication flow for credentials, fallback paths, remembered devices, and security messaging.",
  Deposit: "Funding flow for amount entry, payment selection, review, confirmation, and receipt states.",
  Withdrawal: "Withdrawal flow for destination selection, verification, review, and final status updates.",
  "Purchase Flow": "Commerce flow for selection, review, confirmation, receipt, and post-purchase states.",
};

export const resources = {
  Changelog: "Release notes for token changes, component updates, pattern decisions, and system guidance.",
  "Contribution Guide": "Contribution standards for proposing, reviewing, and shipping design system changes.",
};
