import {
  spacingTokens,
  radiusTokens,
  shadowTokens,
  motionDurationTokens,
  motionEasingTokens,
  motionPatternTokens,
  iconSourceTokens,
  iconSizeTokens,
  iconStrokeTokens,
  iconUsageTokens,
  buttonFoundationTokens,
  inputVariantRows,
  inputStateRows,
  primitiveColorFamilies,
  semanticColorGroups
} from '../system-data.js?v=package-navigation-refactor';
import {
  navigationItemRegistry
} from '../data/navigationData.js?v=nav-primitives';
import { navigationIconSvg } from '../data/navigationSvgIcons.js?v=nav-primitives';
import { escapeHtml, slug } from '../utils.js';

export const templates = {
  installation: (page) => installationPage(page),

  foundation: (page) => `
    ${pageHero(page)}
    ${page.title === "Colors" ? colorVariablesFoundation() : page.title === "Typography" ? typographyFoundation() : page.title === "Spacing" ? spacingFoundation() : page.title === "Radius" ? radiusFoundation() : page.title === "Shadows" ? shadowsFoundation() : page.title === "Motion" ? motionFoundation() : page.title === "Icons" ? iconsFoundation() : foundationTokenTemplate(page)}
  `,

  component: (page) => page.title === "Buttons" ? buttonsComponent(page) : page.title === "Inputs" ? inputsComponent(page) : page.title === "Navigation" ? navigationComponent(page) : page.title === "Game Header Rail" ? gameHeaderRailComponent(page) : page.title === "Cards" ? cardsComponent(page) : `
    ${pageHero(page)}
    ${section("Live Preview", "A reserved preview area for the production component once Joker component designs are added.", `
      <div class="preview-shell">
        <div class="preview-placeholder">
          <strong>${page.title} preview slot</strong>
          <span>Use this area for live examples, responsive states, and implementation-backed component demos.</span>
        </div>
      </div>
    `)}
    ${section("Variants", "Every component page supports a repeatable variant model.", `
      <div class="variant-grid">
        ${variantTile("Primary", "Main product action or default expression.")}
        ${variantTile("Secondary", "Supporting action or lower emphasis expression.")}
        ${variantTile("Danger", "Destructive or irreversible action pattern.")}
      </div>
    `)}
    ${section("States", "Document interaction, validation, loading, empty, disabled, and error states in one predictable place.", `
      <div class="state-list">
        ${stateRow("Default", "Resting state used for most product contexts.")}
        ${stateRow("Hover and focus", "Interaction states with visible keyboard focus requirements.")}
        ${stateRow("Disabled", "Unavailable state with clear affordance and accessible messaging.")}
        ${stateRow("Loading", "Progress state for asynchronous actions.")}
      </div>
    `)}
    ${section("Usage Guidelines", "Use this area for product rules, accessibility requirements, and implementation constraints.", `
      <div class="card-grid">
        ${guideline("Do", "Describe the intended product use and the strongest default recommendation.")}
        ${guideline("Avoid", "Capture misuse, ambiguous patterns, and cases where another component is better.")}
      </div>
    `)}
    ${section("Code Example", "Production-ready examples can be copied directly from this section.", codePanel("component-code", `${slug(page.title)}.tsx`, sampleComponentCode(page.title), { collapsible: true }))}
  `,

  pattern: (page) => page.title === "Betting Panel" ? bettingPanelPattern(page) : `
    ${pageHero(page)}
    ${section("Pattern Overview", "Patterns capture product decisions that are larger than a single component.", `
      <div class="card-grid">
        ${guideline("Purpose", page.subtitle)}
        ${guideline("Ownership", "Connect this page to design, product, engineering, analytics, and compliance owners as needed.")}
      </div>
    `)}
    ${section("Reusable Sections", "Add recurring screen sections, required data, allowed actions, and edge states.", `
      <div class="resource-list">
        ${resourceItem("Anatomy", "Core regions and required content")}
        ${resourceItem("States", "Empty, loading, partial, success, and error")}
        ${resourceItem("Content rules", "Labels, number formatting, and user-facing language")}
        ${resourceItem("Implementation", "Composable components and data contracts")}
      </div>
    `)}
  `,

  template: (page) => page.title === "Game Container" ? gameContainerTemplate(page) : `
    ${pageHero(page)}
    ${section("Template Structure", "Templates turn system standards into reusable page-level starting points.", `
      <div class="template-grid">
        ${docCard("Header", "Page title, primary context, and key action placement.", "#/components/buttons")}
        ${docCard("Content", "Recommended layout regions and responsive behavior.", "#/foundations/spacing")}
        ${docCard("State handling", "Empty, loading, permission, and error standards.", "#/patterns/transactions")}
        ${docCard("Instrumentation", "Analytics and event naming notes for product consistency.", "#/resources/contribution-guide")}
      </div>
    `)}
    ${section("Starter Code", "Use this slot for future template scaffolds.", codePanel("template-code", `${slug(page.title)}-template.tsx`, sampleTemplateCode(page.title)))}
  `,

  flow: (page) => `
    ${pageHero(page)}
    ${section("Flow Map", "Flows describe user intent, checkpoints, decisions, and recovery paths.", `
      <div class="flow-list">
        ${flowStep("1", "Entry", "Define where users start and what context must be present.")}
        ${flowStep("2", "Decision", "Document choices, validation rules, and branching conditions.")}
        ${flowStep("3", "Review", "Confirm important values, risks, and user intent before commitment.")}
        ${flowStep("4", "Completion", "Show success, next steps, records, and recovery routes.")}
      </div>
    `)}
    ${section("Implementation Notes", "Add analytics events, API states, permissions, and edge case guidance here.", codePanel("flow-code", `${slug(page.title)}-flow.md`, sampleFlowCode(page.title)))}
  `,

  resource: (page) => `
    ${pageHero(page)}
    ${section("Resource Template", "This page is ready for internal standards, governance, and release documentation.", `
      <div class="resource-list">
        ${resourceItem("Purpose", page.subtitle)}
        ${resourceItem("Audience", "Design, engineering, product, and AI coding tools")}
        ${resourceItem("Workflow", "Draft, review, approve, ship, and announce")}
        ${resourceItem("Maintenance", "Owners, review cadence, and deprecation policy")}
      </div>
    `)}
  `,
};
function pageHero(page) {
  return `
    <section class="page-hero">
      <div class="page-hero-main">
        <div class="page-hero-copy">
          <h1>${pageTitle(page)}</h1>
          <p class="lede">${page.subtitle}</p>
          ${pageMetadata(page)}
        </div>
      </div>
    </section>
  `;
}

function pageMetadata(page) {
  const items = page.kind === "installation"
    ? ["React", "Package", "Design Tokens", "Components"]
    : page.kind === "foundation"
    ? ["Foundation", "Stable", "Design Tokens", `${foundationTokenCount(page.title)} Tokens`]
    : page.kind === "component"
      ? ["Component", "Stable", "React", `${componentVariantCount(page.title)} Variants`]
      : page.kind === "pattern"
        ? ["Pattern", "Stable", "Product Guidance"]
        : page.kind === "template"
          ? ["Template", "Stable", "Page Structure"]
          : page.kind === "flow"
            ? ["Flow", "Stable", "User Journey"]
            : ["Resource", "Stable", "Documentation"];

  return `
    <ul class="page-metadata" aria-label="Page metadata">
      ${items.map((item) => `<li class="page-metadata-chip${item === "Stable" ? " status-stable" : ""}">${item === "Stable" ? '<span class="status-pulse" aria-hidden="true"></span>' : ""}${item}</li>`).join("")}
    </ul>
  `;
}

function foundationTokenCount(title) {
  const counts = {
    Colors: primitiveColorFamilies.reduce((total, family) => total + family.tokens.length, 0)
      + semanticColorGroups.reduce((total, group) => total + group.tokens.length, 0),
    Typography: 5,
    Spacing: spacingTokens.length,
    Radius: radiusTokens.length,
    Shadows: shadowTokens.length,
    Motion: motionDurationTokens.length + motionEasingTokens.length + motionPatternTokens.length,
    Icons: iconSizeTokens.length + iconStrokeTokens.length + iconUsageTokens.length,
  };

  return counts[title] || 0;
}

function componentVariantCount(title) {
  if (title === "Buttons") return 3;
  if (title === "Inputs") return inputVariantRows.length;
  if (title === "Navigation") return 4;
  if (title === "Game Header Rail") return 1;
  if (title === "Cards") return 1;
  return 3;
}

function pageTitle(page) {
  return page.title;
}

function section(title, _description, body, className = "") {
  return `
    <section id="${slug(title)}" class="section-block${className ? ` ${className}` : ""}">
      <div class="section-heading">
        <h2>${title}</h2>
      </div>
      ${body}
    </section>
  `;
}

function availability(text) {
  return `<div class="availability">${text}</div>`;
}

function installationPage(page) {
  return `
    ${pageHero(page)}
    ${section("Install Package", "", codePanel("install-package-code", "terminal", sampleInstallCommand()))}
    ${section("Import Global Styles", "", `
      <p class="section-support-copy">Global styles include base tokens, typography, reset styles, and theme variables.</p>
      ${codePanel("global-styles-code", "main.tsx", sampleGlobalStylesImport())}
    `)}
    ${section("Use Components", "", codePanel("use-components-code", "Example.tsx", samplePackageComponentUsage()))}
    ${section("Use Design Tokens", "", codePanel("use-tokens-code", "card.css", sampleDesignTokenUsage()))}
    ${section("Package Structure", "", codePanel("package-structure-code", "@joker/design-system", samplePackageStructure()))}
    ${section("Import Pattern", "", `
      <p class="section-support-copy">Component documentation should use package-style imports so examples match future Joker projects.</p>
      ${codePanel("import-pattern-code", "component-import.tsx", sampleImportPattern())}
    `)}
  `;
}

function foundationTokenTemplate(page) {
  return `
    ${section("Token Model", "Primitive tokens, semantic aliases, and usage standards can be added here without changing the page template.", `
      <div class="token-grid">
        ${tokenCard("Primitive", "--joker-${slug(page.title)}-100", "Raw values imported from the Joker foundation set.")}
        ${tokenCard("Semantic", "--surface-primary", "Meaningful aliases mapped to primitives for product use.")}
        ${tokenCard("Usage", "Product standard", "Guidance for where and how this foundation should be applied.")}
      </div>
    `)}
    ${section("Documentation Slots", "Each foundation page is ready for examples, token tables, accessibility notes, and implementation details.", `
      <div class="resource-list">
        ${resourceItem("Primitive tokens", "Ready for raw token values")}
        ${resourceItem("Semantic tokens", "Ready for product aliases")}
        ${resourceItem("Usage guidelines", "Ready for standards and edge cases")}
        ${resourceItem("Implementation", "Ready for CSS, JSON, or TypeScript exports")}
      </div>
    `)}
    ${section("Code Export", "Example structure for future token export documentation.", codePanel("foundation-code", "tokens.json", sampleTokenCode(page.title)))}
  `;
}

function colorsFoundation() {
  return `
    <section id="primitive-colors" class="section-block color-grid-section">
      <div class="primitive-color-groups">
        <div class="primitive-group-cluster">
          <h3>Core Colors</h3>
          ${primitiveColorFamilies.slice(0, 3).map(colorFamilyGroup).join("")}
        </div>
        <div class="primitive-group-cluster">
          <h3>Alert Colors</h3>
          ${primitiveColorFamilies.slice(3).map(colorFamilyGroup).join("")}
        </div>
      </div>
    </section>
    ${section("Semantic Tokens", "A first-pass intent layer for this documentation platform. These can be renamed or remapped as the product system matures.", `
      <div class="semantic-token-groups">
        ${semanticColorGroups.map(semanticColorGroup).join("")}
      </div>
    `)}
    ${section("Code Export", "Primitive and semantic color tokens are ready for product implementation.", codePanel("color-code", "colors.tokens.json", sampleColorCode()))}
  `;
}

function colorVariablesFoundation() {
  return `
    ${section("Primitives", "", colorVariableTable(primitiveColorFamilies.map(primitiveColorVariableGroup)), "primitive-variable-section")}
    ${section("Semantic Variables", "", colorVariableTable(semanticColorGroups.map(colorVariableGroup)), "semantic-variable-section")}
    ${section("Naming Convention", "", `
      <div class="spacing-guideline-table">
        ${colorNamingRow("Primitive", "--color-primitive-{family}-{step}")}
        ${colorNamingRow("Semantic", "--color-{role}-{name}")}
        ${colorNamingRow("Mapping", "primitive -> semantic -> UI")}
      </div>
    `, "naming-convention-section")}
    ${section("Code Export", "", codePanel("color-variable-code", "color-variables.css", sampleColorVariableCode()))}
  `;
}

function colorNamingRow(title, pattern) {
  return `
    <article class="spacing-guideline-row">
      <strong>${title}</strong>
      <code>${pattern}</code>
    </article>
  `;
}

function colorVariableTable(groupMarkup) {
  return `
    <div class="color-variable-table">
      <div class="color-variable-rows">
        ${groupMarkup.join("")}
      </div>
    </div>
  `;
}

function primitiveColorVariableGroup(family) {
  const title = colorFamilyTitle(family.title);
  return `
    <section class="color-variable-group" id="${slug(`${title} Variables`)}">
      <h3 class="documentation-card-heading">${title}</h3>
      ${family.tokens.map(primitiveColorVariableRow).join("")}
    </section>
  `;
}

function primitiveColorVariableRow(token) {
  const variable = primitiveCssVariableName(token.name);
  const sampleTextClass = token.text === "dark" ? "dark-text" : "light-text";
  return `
    <article class="color-variable-row">
      <div class="color-variable-sample ${sampleTextClass}" style="background: ${token.value}" aria-hidden="true"></div>
      <div class="color-variable-action">
        <code>${variable}</code>
        <button class="variable-copy-button" type="button" data-copy data-copy-value="${variable}" data-copy-label="Copy ${variable}" aria-label="Copy ${variable}">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
      <code class="color-variable-value">${token.value}</code>
    </article>
  `;
}

function colorVariableGroup(group) {
  return `
    <section class="color-variable-group" id="${slug(`${group.title} Variables`)}">
      <h3 class="documentation-card-heading">${group.title}</h3>
      ${group.tokens.map(colorVariableRow).join("")}
    </section>
  `;
}

function colorVariableRow(token) {
  const color = semanticTokenColor(token.value);
  const variable = cssVariableName(token.name);
  const sampleTextClass = color.text === "dark" ? "dark-text" : "light-text";
  return `
    <article class="color-variable-row">
      <div class="color-variable-sample ${sampleTextClass}" style="background: ${color.value}" aria-hidden="true"></div>
      <div class="color-variable-action">
        <code>${variable}</code>
        <button class="variable-copy-button" type="button" data-copy data-copy-value="${variable}" data-copy-label="Copy ${variable}" aria-label="Copy ${variable}">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
      <code class="color-variable-value">${color.value}</code>
    </article>
  `;
}

function cssVariableName(name) {
  return `--${name
    .replace(/^color\./, "color.")
    .replace(/\./g, "-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()}`;
}

function primitiveCssVariableName(name) {
  return `--color-primitive-${name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .toLowerCase()}`;
}

function primitiveColorUsage(token, familyName) {
  if (token.base) return "Base primitive for this ramp.";
  if (familyName === "white") return "Neutral white primitive and inverse surface value.";
  if (familyName === "black") return "Black primitive for dark surfaces, borders, and text mapping.";
  if (familyName === "sage") return "Focus primitive for keyboard focus, primary action emphasis, and selected states.";
  if (familyName === "success") return "Success primitive for positive feedback and completion states.";
  if (familyName === "warning") return "Warning primitive for caution, pending, and attention states.";
  if (familyName === "danger") return "Danger primitive for destructive, failed, and blocking states.";
  return "Primitive colour value.";
}

function spacingFoundation() {
  return `
    ${section("Spacing Scale", "", spacingVariableTable([spacingVariableGroup("Spacing Scale", spacingTokens)]))}
    ${section("Code Export", "Spacing tokens are ready to export into CSS variables, design tokens, or app theme objects.", codePanel("spacing-code", "spacing.css", sampleSpacingCode()))}
  `;
}

function spacingVariableTable(groups) {
  return `
    <div class="color-variable-table spacing-variable-table">
      <div class="color-variable-rows">
        ${groups.join("")}
      </div>
    </div>
  `;
}

function spacingVariableGroup(_title, rows) {
  return rows.map(spacingVariableRow).join("");
}

function spacingVariableRow(token) {
  const variable = spacingCssVariableName(token.name);
  return `
    <article class="color-variable-row spacing-variable-row" style="--space-size: ${token.value}px">
      <div class="spacing-variable-sample">
        <span aria-hidden="true"></span>
      </div>
      <div class="color-variable-action">
        <code>${variable}</code>
        <button class="variable-copy-button" type="button" data-copy data-copy-value="${variable}" data-copy-label="Copy ${variable}" aria-label="Copy ${variable}">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
      <code class="color-variable-value">${token.value}px</code>
    </article>
  `;
}

function spacingCssVariableName(name) {
  return `--${name.replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase()}`;
}

function radiusFoundation() {
  return `
    ${section("Corner Radius", "", radiusVariableTable([radiusVariableGroup("Corner Radius", radiusTokens)]))}
    ${section("Code Export", "Radius tokens are ready to export into CSS variables, design tokens, or app theme objects.", codePanel("radius-code", "radius.css", sampleRadiusCode()))}
  `;
}

function radiusVariableTable(groups) {
  return `
    <div class="color-variable-table radius-variable-table">
      <div class="color-variable-rows">
        ${groups.join("")}
      </div>
    </div>
  `;
}

function radiusVariableGroup(_title, rows) {
  return rows.map(radiusVariableRow).join("");
}

function radiusVariableRow(token) {
  const variable = radiusCssVariableName(token.name);
  return `
    <article class="color-variable-row radius-variable-row" style="--radius-size: ${token.value}px">
      <div class="radius-variable-sample">
        <span aria-hidden="true"></span>
      </div>
      <div class="color-variable-action">
        <code>${variable}</code>
        <button class="variable-copy-button" type="button" data-copy data-copy-value="${variable}" data-copy-label="Copy ${variable}" aria-label="Copy ${variable}">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
      <code class="color-variable-value">${token.value}px</code>
    </article>
  `;
}

function radiusCssVariableName(name) {
  return `--${name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .toLowerCase()}`;
}

function shadowsFoundation() {
  return `
    ${section("Shadow Scale", "", shadowVariableTable([shadowVariableGroup("Shadow Scale", shadowTokens)]))}
    ${section("Code Export", "Shadow tokens are ready to export into CSS variables, design tokens, or app theme objects.", codePanel("shadow-code", "shadows.css", sampleShadowCode()))}
  `;
}

function shadowVariableTable(groups) {
  return `
    <div class="color-variable-table shadow-variable-table">
      <div class="color-variable-rows">
        ${groups.join("")}
      </div>
    </div>
  `;
}

function shadowVariableGroup(_title, rows) {
  return rows.map(shadowVariableRow).join("");
}

function shadowVariableRow(token) {
  const variable = shadowCssVariableName(token.name);
  return `
    <article class="color-variable-row shadow-variable-row" style="--shadow-value: ${token.value}">
      <div class="shadow-variable-sample">
        <span aria-hidden="true"></span>
      </div>
      <div class="color-variable-action">
        <code>${variable}</code>
        <button class="variable-copy-button" type="button" data-copy data-copy-value="${variable}" data-copy-label="Copy ${variable}" aria-label="Copy ${variable}">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
      <code class="color-variable-value">${token.label}</code>
    </article>
  `;
}

function shadowCssVariableName(name) {
  return `--${name.replace(/([a-zA-Z])(\d)/g, "$1-$2").toLowerCase()}`;
}

function motionFoundation() {
  return `
    ${section("Duration Tokens", "Reusable timing values for fast, premium interface motion.", motionTokenTable(motionDurationTokens.map(motionDurationRow)))}
    ${section("Easing Tokens", "Reusable curves for controlled entrances, exits, and default transitions.", motionTokenTable(motionEasingTokens.map(motionEasingRow)))}
    ${section("Interaction Patterns", "Composable motion behaviours for common product interactions.", motionTokenTable(motionPatternTokens.map(motionPatternRow)))}
    ${section("Code Export", "Motion tokens are ready to export into CSS variables, design tokens, or app theme objects.", codePanel("motion-code", "motion.css", sampleMotionCode()))}
  `;
}

function motionTokenTable(rows) {
  return `
    <div class="motion-token-table">
      <div class="motion-token-rows">
        ${rows.join("")}
      </div>
    </div>
  `;
}

function motionDurationRow(token) {
  const variable = motionCssVariableName(token.name);
  return motionTokenRow({
    preview: `<span class="motion-duration-preview" style="--motion-preview-duration: ${token.value}" aria-hidden="true"></span>`,
    variable,
    output: token.value,
  });
}

function motionEasingRow(token) {
  const variable = motionCssVariableName(token.name);
  return motionTokenRow({
    preview: `<span class="motion-easing-preview" style="--motion-preview-ease: ${token.value}" aria-hidden="true"></span>`,
    variable,
    output: token.value,
  });
}

function motionPatternRow(token) {
  const variable = motionCssVariableName(token.name);
  return motionTokenRow({
    preview: `<span class="motion-pattern-preview ${token.preview}" aria-hidden="true"><span></span></span>`,
    variable,
    output: token.output,
  });
}

function motionTokenRow({ preview, variable, output }) {
  return `
    <article class="motion-token-row">
      <div class="motion-token-sample">${preview}</div>
      <div class="color-variable-action">
        <code>${variable}</code>
        <button class="variable-copy-button" type="button" data-copy data-copy-value="${variable}" data-copy-label="Copy ${variable}" aria-label="Copy ${variable}">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
      <code class="motion-token-output">${output}</code>
    </article>
  `;
}

function motionCssVariableName(name) {
  return `--${name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()}`;
}

function iconsFoundation() {
  return `
    ${section("Size Tokens", "Use a small fixed size scale so icons align with controls and dense product layouts.", iconTokenTable(iconSizeTokens.map(iconSizeRow)))}
    ${section("Stroke Tokens", "Stroke weight should stay consistent and quiet. Avoid filled or decorative icon styles.", iconTokenTable(iconStrokeTokens.map(iconStrokeRow)))}
    ${section("Core Icons", "Starter Lucide icons for common system actions and states.", iconTokenTable(iconUsageTokens.map(iconUsageRow)))}
    ${section("Code Export", "Icon tokens and Lucide source notes are ready to export into CSS variables or implementation docs.", codePanel("icons-code", "icons.css", sampleIconCode()))}
  `;
}

function iconTokenTable(rows) {
  return `
    <div class="icon-token-table">
      <div class="icon-token-rows">
        ${rows.join("")}
      </div>
    </div>
  `;
}

function iconSourceRow(token) {
  return iconTokenRow({
    icon: token.icon,
    variable: token.variable,
    output: token.output,
    size: "16px",
  });
}

function iconSizeRow(token) {
  return iconTokenRow({
    icon: token.icon,
    variable: iconCssVariableName(token.name),
    output: token.value,
    size: token.value,
  });
}

function iconStrokeRow(token) {
  return iconTokenRow({
    icon: token.icon,
    variable: iconCssVariableName(token.name),
    output: token.value,
    size: "20px",
    stroke: token.value,
  });
}

function iconUsageRow(token) {
  return iconTokenRow({
    icon: token.icon,
    variable: iconCssVariableName(token.name),
    output: token.value,
    size: "16px",
  });
}

function iconTokenRow({ icon, variable, output, size = "16px", stroke = "1.75px" }) {
  return `
    <article class="icon-token-row" style="--icon-preview-size: ${size}; --icon-preview-stroke: ${stroke};">
      <div class="icon-token-sample">${lucideIcon(icon)}</div>
      <div class="color-variable-action">
        <code>${variable}</code>
        <button class="variable-copy-button" type="button" data-copy data-copy-value="${variable}" data-copy-label="Copy ${variable}" aria-label="Copy ${variable}">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
      <code class="icon-token-output">${output}</code>
    </article>
  `;
}

function iconCssVariableName(name) {
  return `--${name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()}`;
}

function buttonsComponent(page) {
  return `
    ${pageHero(page)}
    ${section("Primary Button", "", primaryButtonExamples(), "button-example-section")}
    ${section("Secondary Button", "", secondaryButtonExamples(), "button-example-section")}
    ${section("Ghost Button", "", ghostButtonExamples(), "button-example-section")}
    ${section("Design Tokens", "", buttonTokenTable(buttonFoundationTokens.map(buttonTokenRow)))}
  `;
}

function primaryButtonExamples() {
  return `
    <div id="primary-default-button" class="button-example" data-toc-title="Default" data-toc-depth="2">
      <div class="button-example-header">
        <h3 class="documentation-card-heading">Default Button</h3>
      </div>
      <div class="button-example-stage">
        <button class="joker-cta-preview default button-example-control" type="button">
          <span>Confirm</span>
        </button>
      </div>
      ${codePanel("button-code", "PrimaryButton.tsx", sampleButtonCode(), { collapsible: true })}
    </div>
    <div id="primary-disabled-button" class="button-example" data-toc-title="Disabled" data-toc-depth="2">
      <div class="button-example-header">
        <h3 class="documentation-card-heading">Disabled Button</h3>
      </div>
      <div class="button-example-stage">
        <button class="joker-cta-preview disabled button-example-control" type="button" disabled>
          <span>Confirm</span>
        </button>
      </div>
      ${codePanel("disabled-button-code", "PrimaryDisabledButton.tsx", sampleDisabledButtonCode(), { collapsible: true })}
    </div>
    <div id="primary-loading-button" class="button-example" data-toc-title="Loading" data-toc-depth="2">
      <div class="button-example-header">
        <h3 class="documentation-card-heading">Loading Button</h3>
      </div>
      <div class="button-example-stage">
        <button class="joker-cta-preview loading button-example-control" type="button" disabled aria-busy="true" aria-label="Loading">
          <span class="button-loading-label">Confirm</span>
          <span class="button-loading-spinner" aria-hidden="true"></span>
        </button>
      </div>
      ${codePanel("loading-button-code", "PrimaryLoadingButton.tsx", sampleLoadingButtonCode(), { collapsible: true })}
    </div>
  `;
}

function secondaryButtonExamples() {
  return `
    <div id="secondary-default-button" class="button-example" data-toc-title="Default" data-toc-depth="2">
      <div class="button-example-header">
        <h3 class="documentation-card-heading">Default Button</h3>
      </div>
      <div class="button-example-stage">
        <button class="joker-cta-preview secondary button-example-control" type="button">
          <span>Cancel</span>
        </button>
      </div>
      ${codePanel("secondary-button-code", "SecondaryButton.tsx", sampleSecondaryButtonCode(), { collapsible: true })}
    </div>
    <div id="secondary-disabled-button" class="button-example" data-toc-title="Disabled" data-toc-depth="2">
      <div class="button-example-header">
        <h3 class="documentation-card-heading">Disabled Button</h3>
      </div>
      <div class="button-example-stage">
        <button class="joker-cta-preview secondary disabled button-example-control" type="button" disabled>
          <span>Cancel</span>
        </button>
      </div>
      ${codePanel("secondary-disabled-button-code", "SecondaryDisabledButton.tsx", sampleSecondaryDisabledButtonCode(), { collapsible: true })}
    </div>
    <div id="secondary-loading-button" class="button-example" data-toc-title="Loading" data-toc-depth="2">
      <div class="button-example-header">
        <h3 class="documentation-card-heading">Loading Button</h3>
      </div>
      <div class="button-example-stage">
        <button class="joker-cta-preview secondary loading button-example-control" type="button" disabled aria-busy="true" aria-label="Loading">
          <span class="secondary-loading-label">Cancel</span>
          <span class="button-loading-spinner" aria-hidden="true"></span>
        </button>
      </div>
      ${codePanel("secondary-loading-button-code", "SecondaryLoadingButton.tsx", sampleSecondaryLoadingButtonCode(), { collapsible: true })}
    </div>
  `;
}

function ghostButtonExamples() {
  return `
    <div id="ghost-default-button" class="button-example" data-toc-title="Default" data-toc-depth="2">
      <div class="button-example-header">
        <h3 class="documentation-card-heading">Default Button</h3>
      </div>
      <div class="button-example-stage">
        <button class="joker-cta-preview ghost button-example-control" type="button">
          <span>Cancel</span>
        </button>
      </div>
      ${codePanel("ghost-button-code", "GhostButton.tsx", sampleGhostButtonCode(), { collapsible: true })}
    </div>
    <div id="ghost-disabled-button" class="button-example" data-toc-title="Disabled" data-toc-depth="2">
      <div class="button-example-header">
        <h3 class="documentation-card-heading">Disabled Button</h3>
      </div>
      <div class="button-example-stage">
        <button class="joker-cta-preview ghost disabled button-example-control" type="button" disabled>
          <span>Cancel</span>
        </button>
      </div>
      ${codePanel("ghost-disabled-button-code", "GhostDisabledButton.tsx", sampleGhostDisabledButtonCode(), { collapsible: true })}
    </div>
  `;
}

function navigationComponent(page) {
  return `
    ${pageHero(page)}
    ${section("Top Rail", "", topRailExamples(), "button-example-section navigation-example-section")}
    ${section("Mobile Navigation", "", mobileNavigationExamples(), "button-example-section navigation-example-section")}
    ${section("Side Rail", "", sideRailExamples(), "button-example-section navigation-example-section")}
    ${section("Inner Components", "", navigationExamples(), "button-example-section navigation-example-section")}
  `;
}

function topRailExamples() {
  return `
    ${navigationExampleCard({
      id: "top-rail-example",
      tocTitle: "Top Rail",
      preview: topRailPreview(),
      codeId: "top-rail-code",
      filename: "TopRail.tsx",
      code: sampleTopRailCode(),
      className: "is-top-rail",
    })}
  `;
}

function mobileNavigationExamples() {
  return `
    ${navigationExampleCard({
      id: "mobile-navigation-example",
      tocTitle: "Mobile Navigation",
      preview: mobileNavigationPreview(),
      codeId: "mobile-navigation-code",
      filename: "MobileNavigation.tsx",
      code: sampleMobileNavigationCode(),
      className: "is-mobile-nav",
    })}
  `;
}

function sideRailExamples() {
  return `
    ${navigationExampleCard({
      id: "side-rail-example",
      tocTitle: "Side Rail",
      preview: sideRailVariantPreview(),
      codeId: "side-rail-code",
      filename: "SideRail.tsx",
      code: sampleSideRailCode(),
      className: "is-side-rail",
    })}
  `;
}

function navigationExamples() {
  return `
    ${navigationExampleCard({
      id: "wallet-control-example",
      tocTitle: "Wallet Control",
      preview: walletControlPreview(),
      codeId: "wallet-control-code",
      filename: "WalletControl.tsx",
      code: sampleWalletControlCode(),
    })}
    ${navigationExampleCard({
      id: "action-group-example",
      tocTitle: "Action Group",
      preview: actionGroupPreview(),
      codeId: "action-group-code",
      filename: "ActionGroup.tsx",
      code: sampleActionGroupCode(),
    })}
    ${navigationExampleCard({
      id: "joker-logo-example",
      tocTitle: "Joker Logo",
      preview: jokerLogoPreview(),
      codeId: "joker-logo-code",
      filename: "JokerLogo.tsx",
      code: sampleJokerLogoCode(),
    })}
    ${navigationExampleCard({
      id: "rail-nav-item-example",
      tocTitle: "Rail Nav Item",
      preview: railNavItemPreview(),
      codeId: "rail-nav-item-code",
      filename: "RailNavItem.tsx",
      code: sampleRailNavItemCode(),
    })}
    ${navigationExampleCard({
      id: "rail-search-example",
      tocTitle: "Rail Search",
      preview: railSearchPreview(),
      codeId: "rail-search-code",
      filename: "RailSearch.tsx",
      code: sampleRailSearchCode(),
    })}
    ${navigationExampleCard({
      id: "game-menu-dropdown-example",
      tocTitle: "Game Menu Dropdown",
      preview: gameMenuDropdownPreview(),
      codeId: "game-menu-dropdown-code",
      filename: "GameMenuDropdown.tsx",
      code: sampleGameMenuDropdownCode(),
    })}
  `;
}

function navigationExampleCard({ id, tocTitle, preview, codeId, filename, code, className = "" }) {
  return `
    <div id="${id}" class="button-example navigation-example${className ? ` ${className}` : ""}" data-toc-title="${tocTitle}" data-toc-depth="2">
      <div class="button-example-stage navigation-example-stage">
        <div class="navigation-example-preview">
          ${preview}
        </div>
      </div>
      ${codePanel(codeId, filename, code, { collapsible: true })}
    </div>
  `;
}

function walletControlPreview() {
  return `
    <div class="joker-wallet-control" aria-label="Wallet balance">
      <div class="joker-wallet-balance">
        <img class="joker-wallet-coin" src="./assets/jokerCoin.svg?v=nav" alt="" />
        <span>150,000</span>
      </div>
      <button class="joker-wallet-action" type="button" aria-label="Open wallet">
        ${lucideIcon("wallet")}
      </button>
    </div>
  `;
}

function actionGroupPreview() {
  return `
    <div class="joker-action-group-set" aria-label="User action shortcuts">
      <button class="joker-action-item" type="button" aria-label="Promotions">
        ${navItemIcon(navigationItemRegistry.promotions.icon, "joker-action-icon")}
      </button>
      <div class="joker-action-cluster" role="group" aria-label="Messages and notifications">
        <button class="joker-action-item joker-action-item--clustered" type="button" aria-label="Messages">
          ${navItemIcon(navigationItemRegistry.messages.icon, "joker-action-icon")}
        </button>
        <span class="joker-action-divider" aria-hidden="true"></span>
        <button class="joker-action-item joker-action-item--clustered" type="button" aria-label="Notifications">
          ${navItemIcon(navigationItemRegistry.notifications.icon, "joker-action-icon")}
          <span class="joker-action-badge" aria-hidden="true"></span>
        </button>
      </div>
      <button class="joker-avatar-item" type="button" aria-label="Open profile">
        <img src="./assets/user.png?v=nav" alt="" />
        <span class="joker-avatar-status" aria-hidden="true"></span>
      </button>
    </div>
  `;
}

function jokerLogoPreview() {
  return `
    <a class="joker-logo-component" href="#/installation" aria-label="Console home">
      <img src="./assets/consoleLogo.png?v=console-logo-v2" alt="Console" />
    </a>
  `;
}

function railNavItemPreview() {
  return `
    <div class="joker-rail-nav-state-demo" aria-label="Rail nav item states">
      ${productRailItem(navigationItemRegistry.favourites, "", { live: true })}
    </div>
  `;
}

function railSearchPreview() {
  return `
    <label class="joker-rail-search-item" aria-label="Search navigation" data-tooltip="Search">
      ${lucideIcon("search-filled")}
      <input type="search" placeholder="Search" />
    </label>
  `;
}

function gameMenuDropdownPreview() {
  const games = [
    { ...navigationItemRegistry.crash, selected: true },
    { ...navigationItemRegistry.chickenCross, selected: false },
    { ...navigationItemRegistry.mines, selected: false },
    { ...navigationItemRegistry.hilo, selected: false },
    { ...navigationItemRegistry.tower, selected: false },
  ];

  return `
    <div class="joker-game-menu is-open" data-game-menu>
      <button class="joker-game-menu-trigger" type="button" aria-expanded="true" data-game-menu-toggle>
        <span class="joker-game-menu-label">
          ${navItemIcon(navigationItemRegistry.originals.icon, "joker-game-menu-trigger-icon")}
          <span>${navigationItemRegistry.originals.label}</span>
        </span>
        <span class="joker-game-menu-chevron" aria-hidden="true">${lucideIcon("chevron-down")}</span>
      </button>
      <div class="joker-game-menu-list" role="menu">
        ${games
          .map((item) => `
            <button class="joker-game-menu-option${item.selected ? " is-selected" : ""}" type="button" role="menuitemradio" aria-checked="${item.selected ? "true" : "false"}" data-game-menu-option>
              <span class="joker-game-menu-option-icon" aria-hidden="true">${navItemIcon(item.icon)}</span>
              <span>${item.label}</span>
            </button>
          `)
          .join("")}
      </div>
    </div>
  `;
}

function sideRailPreview() {
  return productRailPreview({ label: "Joker product navigation" });
}

function sideRailVariantPreview() {
  const expandedRail = productRailPreview({ label: "Expanded Joker product navigation" });
  const collapsedRail = productRailPreview({ label: "Collapsed Joker product navigation", collapsed: true });

  return `
    <div class="joker-side-rail-variant-set">
      <div class="joker-side-rail-variant">
        ${expandedRail}
      </div>
      <div class="joker-side-rail-variant">
        ${collapsedRail}
      </div>
    </div>
  `;
}

function productRailPreview({ label = "Joker product navigation", collapsed = false } = {}) {
  const originalGames = [
    { ...navigationItemRegistry.crash, selected: false },
    { ...navigationItemRegistry.chickenCross, selected: false },
    { ...navigationItemRegistry.mines, selected: false },
    { ...navigationItemRegistry.hilo, selected: false },
    { ...navigationItemRegistry.tower, selected: false },
  ];
  const casinoGames = [
    { ...navigationItemRegistry.slots, selected: false },
    { ...navigationItemRegistry.blackjack, selected: false },
    { ...navigationItemRegistry.roulette, selected: false },
    { ...navigationItemRegistry.liveCasino, selected: false },
  ];
  const promotionItems = [
    { ...navigationItemRegistry.challenges, selected: false },
    { ...navigationItemRegistry.vip, selected: false },
  ];

  return `
    <aside class="joker-product-rail${collapsed ? " is-collapsed" : ""}" aria-label="${label}">
      <div class="joker-product-rail-search">
        ${railSearchPreview()}
      </div>
      <div class="joker-product-rail-scroll">
        <section class="joker-product-rail-section" aria-label="Main navigation">
          ${productRailItem(navigationItemRegistry.home)}
          ${productRailItem(navigationItemRegistry.favourites)}
          ${productRailItem(navigationItemRegistry.recentlyPlayed)}
          ${productRailItem(navigationItemRegistry.newReleases)}
        </section>
        <section class="joker-product-rail-section" aria-label="Games">
          ${productRailGameMenu(navigationItemRegistry.originals, originalGames)}
          ${productRailGameMenu(navigationItemRegistry.casino, casinoGames)}
          ${productRailGameMenu(navigationItemRegistry.promotions, promotionItems)}
          ${productRailItem(navigationItemRegistry.soccer, "joker-product-rail-item--with-ball")}
        </section>
        <section class="joker-product-rail-section" aria-label="Support">
          ${productRailItem(navigationItemRegistry.liveSupport)}
          ${productRailItem(navigationItemRegistry.rewards)}
        </section>
      </div>
      <div class="joker-product-rail-footer">
        ${productRailItem(navigationItemRegistry.logout, "joker-product-rail-logout")}
      </div>
    </aside>
  `;
}

function mobileNavigationPreview({ open = true } = {}) {
  const originalGames = [
    { ...navigationItemRegistry.crash, selected: false },
    { ...navigationItemRegistry.chickenCross, selected: false },
    { ...navigationItemRegistry.mines, selected: false },
    { ...navigationItemRegistry.hilo, selected: false },
    { ...navigationItemRegistry.tower, selected: false },
  ];
  const casinoGames = [
    { ...navigationItemRegistry.slots, selected: false },
    { ...navigationItemRegistry.blackjack, selected: false },
    { ...navigationItemRegistry.roulette, selected: false },
    { ...navigationItemRegistry.liveCasino, selected: false },
  ];
  const promotionItems = [
    { ...navigationItemRegistry.challenges, selected: false },
    { ...navigationItemRegistry.vip, selected: false },
  ];

  return `
    <div class="joker-mobile-nav${open ? " is-open" : ""}" data-mobile-nav>
      <header class="joker-mobile-nav-bar">
        ${jokerLogoPreview()}
        <button class="joker-mobile-nav-toggle" type="button" aria-expanded="${open ? "true" : "false"}" aria-label="Toggle menu" data-mobile-nav-toggle>
          <span class="joker-mobile-nav-toggle-icon joker-mobile-nav-toggle-icon--menu">${lucideIcon("menu")}</span>
          <span class="joker-mobile-nav-toggle-icon joker-mobile-nav-toggle-icon--close">${lucideIcon("x")}</span>
        </button>
      </header>
      <div class="joker-mobile-nav-panel">
        <div class="joker-mobile-nav-panel-inner">
          <section class="joker-mobile-nav-section joker-mobile-nav-actions" aria-label="Wallet and account">
            ${walletControlPreview()}
            ${mobileAvatarPreview()}
          </section>
          <div class="joker-mobile-nav-scroll">
            <section class="joker-mobile-nav-section" aria-label="Main navigation">
              ${productRailItem(navigationItemRegistry.home)}
              ${productRailItem(navigationItemRegistry.favourites)}
              ${productRailItem(navigationItemRegistry.recentlyPlayed)}
              ${productRailItem(navigationItemRegistry.newReleases)}
            </section>
            <section class="joker-mobile-nav-section" aria-label="Games">
              ${productRailGameMenu(navigationItemRegistry.originals, originalGames)}
              ${productRailGameMenu(navigationItemRegistry.casino, casinoGames)}
              ${productRailGameMenu(navigationItemRegistry.promotions, promotionItems)}
              ${productRailItem(navigationItemRegistry.soccer, "joker-product-rail-item--with-ball")}
            </section>
            <section class="joker-mobile-nav-section" aria-label="Support">
              ${productRailItem(navigationItemRegistry.liveSupport)}
              ${productRailItem(navigationItemRegistry.rewards)}
            </section>
          </div>
          <section class="joker-mobile-nav-section joker-mobile-nav-footer" aria-label="Session">
            ${productRailItem(navigationItemRegistry.logout, "joker-product-rail-logout")}
          </section>
        </div>
      </div>
    </div>
  `;
}

function mobileAvatarPreview() {
  return `
    <button class="joker-avatar-item joker-mobile-avatar-item" type="button" aria-label="Open profile">
      <img src="./assets/user.png?v=nav" alt="" />
      <span class="joker-avatar-status" aria-hidden="true"></span>
    </button>
  `;
}

function productRailItem(item, className = "", options = {}) {
  const selectedClass = options.selected ? " is-selected" : "";
  const liveAttribute = options.live ? " data-rail-nav-live" : "";

  return `
    <a class="joker-product-rail-item${selectedClass}${className ? ` ${className}` : ""}" href="#/components/navigation" data-product-rail-item${liveAttribute} data-tooltip="${item.label}" aria-label="${item.label}"${options.selected ? ' aria-current="page"' : ""}>
      ${navItemIcon(item.icon)}
      <span>${item.label}</span>
    </a>
  `;
}

function productRailGameMenu(item, games, isOpen = false) {
  return `
    <div class="joker-product-rail-game-menu${isOpen ? " is-open" : ""}" data-game-menu>
      <button class="joker-product-rail-menu-trigger" type="button" aria-expanded="${isOpen ? "true" : "false"}" data-game-menu-toggle data-tooltip="${item.label}" aria-label="${item.label}">
        <span class="joker-product-rail-menu-label">
          <span class="joker-product-rail-game-icon" aria-hidden="true">${navItemIcon(item.icon)}</span>
          <span>${item.label}</span>
        </span>
        <span class="joker-product-rail-menu-chevron" aria-hidden="true">${lucideIcon("chevron-down")}</span>
      </button>
      <div class="joker-product-rail-game-list" role="menu">
        ${games
          .map((game) => `
            <button class="joker-product-rail-game-option${game.selected ? " is-selected" : ""}" type="button" role="menuitemradio" aria-checked="${game.selected ? "true" : "false"}" data-game-menu-option data-tooltip="${game.label}" aria-label="${game.label}">
              <span class="joker-product-rail-game-icon" aria-hidden="true">${navItemIcon(game.icon)}</span>
              <span>${game.label}</span>
            </button>
          `)
          .join("")}
      </div>
    </div>
  `;
}

function topRailPreview() {
  return `
    <header class="joker-top-rail-demo" aria-label="Joker top rail">
      <div class="joker-top-rail-lane joker-top-rail-lane--left">
        ${jokerLogoPreview()}
      </div>
      <div class="joker-top-rail-lane joker-top-rail-lane--center">
        ${walletControlPreview()}
      </div>
      <div class="joker-top-rail-lane joker-top-rail-lane--right">
        ${actionGroupPreview()}
      </div>
    </header>
  `;
}

function topNavigationPreview() {
  return `
    <nav class="joker-nav-preview joker-nav-preview--top" aria-label="Product navigation preview">
      <a class="joker-nav-brand" href="#/installation" aria-label="Joker OS home">
        <span class="joker-nav-brand-mark">J</span>
        <span>Joker OS</span>
      </a>
      <div class="joker-nav-links" aria-label="Primary">
        <a href="#/templates/dashboard">Dashboard</a>
        <a class="is-active" href="#/patterns/wallet">Wallet</a>
        <a href="#/patterns/rewards">Rewards</a>
      </div>
      <a class="joker-cta-preview secondary joker-nav-action" href="#/templates/deposit">
        <span>Deposit</span>
      </a>
    </nav>
  `;
}

function sideNavigationPreview() {
  const items = [
    ["layout-dashboard", "Dashboard"],
    ["wallet", "Wallet"],
    ["receipt-text", "Transactions"],
    ["gift", "Rewards"],
  ];

  return `
    <nav class="joker-nav-preview joker-nav-preview--side" aria-label="Side navigation preview">
      <div class="joker-nav-section-label">Workspace</div>
      <div class="joker-nav-menu">
        ${items.map(([icon, label]) => `
          <a class="${label === "Wallet" ? "is-active" : ""}" href="#/patterns/${label.toLowerCase()}">
            ${lucideIcon(icon)}
            <span>${label}</span>
          </a>
        `).join("")}
      </div>
    </nav>
  `;
}

function sampleWalletControlCode() {
  return `import { WalletControl } from "@joker/design-system";

export function Example() {
  return (
    <WalletControl
      balance="150,000"
      coinIcon="/icons/jokerCoin.svg"
      onWalletClick={() => {}}
    />
  );
}`;
}

function sampleActionGroupCode() {
  return `import { ActionGroup } from "@joker/design-system";

export function Example() {
  return (
    <ActionGroup
      actions={[
        { label: "Promotions", icon: "promotions" },
        { label: "Messages", icon: "messages" },
        { label: "Notifications", icon: "bell", badge: true },
      ]}
      avatar={{
        imageSrc: "/avatars/user.png",
        label: "Open profile",
        status: "online",
      }}
    />
  );
}`;
}

function sampleJokerLogoCode() {
  return `import { JokerLogo } from "@joker/design-system";

export function Example() {
  return (
    <JokerLogo
      href="/"
      ariaLabel="Joker OS home"
    />
  );
}`;
}

function sampleRailNavItemCode() {
  return `import { useState } from "react";
import { RailNavItem } from "./components/navigation";

export function Example() {
  const [activeHref, setActiveHref] = useState("/favourites");

  return (
    <nav aria-label="Primary">
      <RailNavItem
        icon="favourites"
        label="Favourites"
        href="/favourites"
        selected={activeHref === "/favourites"}
        onClick={() => setActiveHref("/favourites")}
      />
    </nav>
  );
}`;
}

function sampleRailSearchCode() {
  return `import { RailSearch } from "@joker/design-system";

export function Example() {
  return (
    <RailSearch
      placeholder="Search"
      value={value}
      onChange={setValue}
    />
  );
}`;
}

function sampleGameMenuDropdownCode() {
  return `import { GameMenuDropdown } from "@joker/design-system";

const games = [
  { value: "crash", label: "Crash", icon: "crash" },
  { value: "chicken-cross", label: "Chicken Cross", icon: "chicken-cross" },
  { value: "mines", label: "Mines", icon: "mines" },
  { value: "hilo", label: "Hilo", icon: "hilo" },
  { value: "tower", label: "Tower", icon: "tower" },
];

export function Example() {
  return (
    <GameMenuDropdown
      label="Originals"
      items={games}
      value="crash"
      onValueChange={setGame}
    />
  );
}`;
}

function sampleSideRailCode() {
  return `import {
  RailSearch,
  RailNavItem,
  GameMenuDropdown,
} from "@joker/design-system";

const originals = [
  { value: "crash", label: "Crash", icon: "crash" },
  { value: "chicken-cross", label: "Chicken Cross", icon: "chicken-cross" },
  { value: "mines", label: "Mines", icon: "mines" },
  { value: "hilo", label: "Hilo", icon: "hi-lo" },
  { value: "tower", label: "Tower", icon: "tower" },
];

export function SideRail({ collapsed = false }) {
  return (
    <aside
      className={["joker-product-rail", collapsed && "is-collapsed"].filter(Boolean).join(" ")}
      aria-label="Product navigation"
    >
      <section className="joker-side-rail__section">
        <RailSearch placeholder="Search" />
      </section>

      <div className="joker-side-rail__scroll">
        <section className="joker-side-rail__section">
          <RailNavItem icon="home" label="Home" />
          <RailNavItem icon="favourites" label="Favourites" />
          <RailNavItem icon="recently-played" label="Recently Played" />
          <RailNavItem icon="new-releases" label="New Releases" />
        </section>

        <section className="joker-side-rail__section">
          <GameMenuDropdown
            label="Originals"
            items={originals}
            value="mines"
          />
          <GameMenuDropdown label="Casino" items={[]} />
          <GameMenuDropdown label="Promotions" items={[]} />
          <RailNavItem icon="soccer" label="Soccer" />
        </section>

        <section className="joker-side-rail__section">
          <RailNavItem icon="live-support" label="Live Support" />
          <RailNavItem icon="rewards" label="Rewards" />
        </section>
      </div>

      <section className="joker-side-rail__section joker-side-rail__footer">
        <RailNavItem icon="log-out" label="Log Out" tone="danger" />
      </section>
    </aside>
  );
}`;
}

function sampleTopRailCode() {
  return `import {
  ActionGroup,
  JokerLogo,
  TopRail,
  WalletControl,
} from "@joker/design-system";

export function Example() {
  return (
    <TopRail>
      <JokerLogo href="/" ariaLabel="Joker OS home" />
      <WalletControl balance="150,000" />
      <ActionGroup
        actions={[
          { label: "Promotions", icon: "promotions" },
          { label: "Messages", icon: "messages" },
          { label: "Notifications", icon: "bell", badge: true },
        ]}
        avatar={{
          imageSrc: "/avatars/user.png",
          label: "Open profile",
          status: "online",
        }}
      />
    </TopRail>
  );
}`;
}

function sampleMobileNavigationCode() {
  return `import { MobileNavigation } from "@joker/design-system";

export function Example() {
  return (
    <MobileNavigation
      logoHref="/"
      balance="150,000"
      searchPlaceholder="Search"
      sections={[
        {
          label: "Main",
          items: [
            { label: "Home", icon: "home", href: "/" },
            { label: "Favourites", icon: "favourites", href: "/favourites" },
            { label: "Recently Played", icon: "recently-played", href: "/recent" },
            { label: "New Releases", icon: "new-releases", href: "/new" },
          ],
        },
        {
          label: "Games",
          items: [
            {
              label: "Originals",
              icon: "originals",
              children: [
                { label: "Crash", icon: "crash", href: "/games/crash" },
                { label: "Chicken Cross", icon: "chicken-cross", href: "/games/chicken-cross" },
                { label: "Mines", icon: "mines", href: "/games/mines" },
              ],
            },
          ],
        },
      ]}
      actions={[
        { label: "Promotions", icon: "promotions" },
        { label: "Messages", icon: "messages" },
        { label: "Notifications", icon: "bell", badge: true },
      ]}
      avatar={{ imageSrc: "/avatars/user.png", status: "online" }}
      logout={{ label: "Log Out", href: "/logout" }}
    />
  );
}`;
}

function sampleTopNavigationCode() {
  return `import { TopNavigation } from "@joker/design-system";

export function Example() {
  return (
    <TopNavigation
      brand="Joker OS"
      activeItem="Wallet"
      items={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Wallet", href: "/wallet" },
        { label: "Rewards", href: "/rewards" },
      ]}
      action={{ label: "Deposit", href: "/deposit" }}
    />
  );
}`;
}

function sampleSideNavigationCode() {
  return `import { SideNavigation } from "@joker/design-system";

export function Example() {
  return (
    <SideNavigation
      label="Workspace"
      activeItem="Wallet"
      items={[
        { label: "Dashboard", icon: "layout-dashboard", href: "/dashboard" },
        { label: "Wallet", icon: "wallet", href: "/wallet" },
        { label: "Transactions", icon: "receipt-text", href: "/transactions" },
        { label: "Rewards", icon: "gift", href: "/rewards" },
      ]}
    />
  );
}`;
}

function cardsComponent(page) {
  return `
    ${pageHero(page)}
    ${section("Promo Card", "", promoCardExamples(), "button-example-section card-example-section")}
  `;
}

function gameHeaderRailComponent(page) {
  return `
    ${pageHero(page)}
    ${section("Game Header Rail", "", gameHeaderRailExamples(), "button-example-section navigation-example-section")}
  `;
}

function gameHeaderRailExamples() {
  return `
    ${navigationExampleCard({
      id: "game-header-rail-component",
      tocTitle: "Default",
      preview: gameHeaderRailPreview(),
      codeId: "game-header-rail-code",
      filename: "GameHeaderRail.tsx",
      code: sampleGameHeaderRailCode(),
      className: "is-game-header-rail",
    })}
  `;
}

function bettingPanelPattern(page) {
  return `
    ${pageHero(page)}
    ${section("Betting Panel", "", bettingPanelExamples(), "button-example-section betting-panel-section navigation-example-section")}
  `;
}

function bettingPanelExamples() {
  return `
    ${navigationExampleCard({
      id: "betting-panel-component",
      tocTitle: "Default",
      preview: bettingPanelPreview(),
      codeId: "betting-panel-code",
      filename: "BettingPanel.tsx",
      code: sampleBettingPanelCode(),
      className: "is-betting-panel",
    })}
  `;
}

function gameContainerTemplate(page) {
  return `
    ${pageHero(page)}
    ${section("Game Shell", "", gameContainerExamples(), "button-example-section game-container-section")}
  `;
}

function gameContainerExamples() {
  return `
    <div id="game-container-default" class="button-example game-container-example" data-toc-title="Default" data-toc-depth="2">
      <div class="button-example-stage game-container-stage">
        <div class="game-container-viewport" tabindex="0" aria-label="Zoomable game shell preview" data-game-zoom-viewport data-zoom="0.29" data-pan-x="0" data-pan-y="0">
          <div class="game-container-preview-set">
            <div class="game-container-preview">
              ${gameContainerPreview()}
            </div>
            <div class="game-container-mobile-preview">
              ${gameContainerMobilePreview()}
            </div>
          </div>
        </div>
      </div>
      ${codePanel("game-container-code", "GameShell.tsx", sampleGameContainerCode(), { collapsible: true })}
    </div>
  `;
}

function gameContainerPreview() {
  return `
    <div class="joker-game-shell joker-game-shell-preview-frame" aria-label="Joker game container preview">
      <div class="joker-game-shell-top-rail">
        ${topRailPreview()}
      </div>
      <div class="joker-game-shell-body">
        <div class="joker-game-shell-side">
          ${sideRailPreview()}
        </div>
        <main class="joker-game-shell-stage" aria-label="Game stage">
          ${gameHeaderRailPreview()}
          <div class="joker-game-shell-play-area">
            <div class="joker-game-shell-betting">
              ${bettingPanelPreview()}
            </div>
            <div class="joker-game-shell-empty-stage" aria-label="Game canvas"></div>
          </div>
        </main>
      </div>
    </div>
  `;
}

function gameContainerMobilePreview() {
  return `
    <div class="joker-mobile-game-shell joker-mobile-game-shell-preview-frame" aria-label="Joker mobile game container preview">
      ${mobileNavigationPreview({ open: false })}
      <main class="joker-mobile-game-content" aria-label="Mobile game content">
        ${gameHeaderRailPreview()}
        <div class="joker-mobile-game-stage" aria-label="Mobile game canvas"></div>
        <div class="joker-mobile-game-betting">
          ${bettingPanelPreview()}
        </div>
      </main>
      <div class="joker-mobile-scroll-cue" aria-hidden="true">
        <span>${lucideIcon("chevron-down")}</span>
      </div>
    </div>
  `;
}

function gameHeaderRailPreview({
  game = navigationItemRegistry.crash,
  rightLabel = "Fair Play",
  rightIcon = "fair-play",
} = {}) {
  const gameLabel = game.label || "Crash";
  const gameIcon = game.icon || "crash";

  return `
    <div class="joker-game-header-rail" aria-label="${escapeHtml(gameLabel)} game header">
      <div class="joker-game-header-group">
        <span class="joker-game-header-info" aria-hidden="true">${lucideIcon("info-filled")}</span>
        <span class="joker-game-header-title">
          ${navItemIcon(gameIcon, "joker-game-header-game-icon")}
          <span>${escapeHtml(gameLabel)}</span>
        </span>
      </div>
      <div class="joker-game-header-group joker-game-header-fair-play">
        ${gameHeaderRailIcon(rightIcon, "joker-game-header-fair-play-icon")}
        <span>${escapeHtml(rightLabel)}</span>
      </div>
    </div>
  `;
}

function gameHeaderRailIcon(name, className = "") {
  if (name === "fair-play") {
    return `<img class="${className}" src="./assets/game-icons/fair-play.svg?v=game-header-rail" alt="" aria-hidden="true" />`;
  }

  return navItemIcon(name, className);
}

function bettingPanelPreview() {
  return `
    <aside class="joker-betting-panel" aria-label="Crash betting panel">
      <div class="joker-bet-mode-switch" role="group" aria-label="Bet mode">
        <button class="joker-button joker-button--secondary joker-button--selected joker-button--full-width joker-cta-preview secondary full-width joker-bet-mode is-selected" type="button" aria-pressed="true">
          <span class="joker-button__content">
            ${lucideIcon("arrow-left-right")}
            <span>Manual</span>
          </span>
        </button>
        <button class="joker-button joker-button--secondary joker-button--full-width joker-cta-preview secondary full-width joker-bet-mode" type="button" aria-pressed="false">
          <span class="joker-button__content">
            ${lucideIcon("sparkles")}
            <span>Auto</span>
          </span>
        </button>
      </div>

      <span class="joker-betting-divider" aria-hidden="true"></span>

      <div class="joker-betting-fields">
        <label class="joker-input-field full-width currency joker-bet-field" for="betting-panel-bet-amount">
          <div class="joker-bet-field-row">
            <span class="joker-input-label">Bet amount</span>
            <span>$0.00</span>
          </div>
          <div class="joker-input-control joker-bet-control">
            <span class="joker-input-icon"><img src="./assets/jokerCoin.svg?v=nav" alt="" /></span>
            <input id="betting-panel-bet-amount" type="text" inputmode="decimal" value="" aria-label="Bet amount" />
          </div>
        </label>

        <div class="joker-input-field live multiplier joker-bet-field">
          <label class="joker-input-label" for="betting-panel-cashout">Cashout at</label>
          <div class="joker-input-control joker-multiplier-control">
            <input
              id="betting-panel-cashout"
              data-multiplier-input
              type="text"
              inputmode="decimal"
              value="3.03x"
              aria-label="Cashout multiplier"
            />
            <span class="joker-multiplier-actions" aria-label="Cashout controls">
              <button class="joker-multiplier-button" type="button" data-multiplier-step="up" aria-label="Increase cashout">
                ${lucideIcon("chevron-up")}
              </button>
              <button class="joker-multiplier-button" type="button" data-multiplier-step="down" aria-label="Decrease cashout">
                ${lucideIcon("chevron-down")}
              </button>
            </span>
          </div>
        </div>
      </div>

      <button class="joker-button joker-button--primary joker-button--medium joker-button--full-width joker-cta-preview default full-width joker-bet-submit" type="button">
        <span class="joker-button__content">Place Bet</span>
      </button>

      <span class="joker-betting-spacer" aria-hidden="true"></span>
      <span class="joker-betting-divider" aria-hidden="true"></span>

      <div class="joker-input-field full-width currency joker-bet-field">
        <div class="joker-bet-field-row">
          <span class="joker-input-label" id="betting-panel-profit-label">Profit on Win</span>
        </div>
        <div class="joker-input-control joker-bet-control is-readonly" role="status" aria-labelledby="betting-panel-profit-label">
          <span class="joker-input-icon"><img src="./assets/jokerCoin.svg?v=nav" alt="" /></span>
          <span class="joker-bet-output-value">0.00</span>
        </div>
      </div>
    </aside>
  `;
}

function gameStagePreview() {
  return `
    <div class="joker-game-stage-component" aria-label="Game stage">
      <span class="joker-game-stage-orbit" aria-hidden="true"></span>
      <div class="joker-game-round">
        <span>2.40x</span>
      </div>
    </div>
  `;
}

function gameControlsPreview() {
  return `
    <div class="joker-game-controls-component" aria-label="Game controls">
      <button class="joker-cta-preview secondary" type="button"><span>Bet $10</span></button>
      <button class="joker-cta-preview default" type="button"><span>Play</span></button>
    </div>
  `;
}

function promoCardExamples() {
  const defaultPromo = {
    title: "Pragmatic Play",
    description: "Drops & Wins event",
    ctaLabel: "Play Now",
    imageSrc: "./assets/bigbass-banner.png?v=nav",
    variant: "bronze",
    href: "/promotions/drops-and-wins",
  };
  const welcomePromo = {
    title: "Welcome Package",
    description: "Unlock rewards up to $2,500",
    ctaLabel: "How it works",
    imageSrc: "./assets/welcome-rewards.png?v=nav",
    variant: "sage",
    href: "/promotions/welcome-package",
  };

  return `
    ${cardExampleCard({
      id: "promo-card-default-example",
      tocTitle: "Default",
      preview: promoCardPreview(defaultPromo),
      codeId: "promo-card-default-code",
      filename: "PromoCard.tsx",
      code: samplePromoCardCode(defaultPromo, "/images/bigbass.png"),
    })}
    ${cardExampleCard({
      id: "promo-card-welcome-example",
      tocTitle: "Welcome Package",
      preview: promoCardPreview(welcomePromo),
      codeId: "promo-card-welcome-code",
      filename: "PromoCard.tsx",
      code: samplePromoCardCode(welcomePromo, "/images/welcome-rewards.png"),
    })}
  `;
}

function cardExampleCard({ id, tocTitle, preview, codeId, filename, code }) {
  return `
    <div id="${id}" class="button-example card-example" data-toc-title="${tocTitle}" data-toc-depth="2">
      <div class="button-example-stage card-example-stage">
        <div class="card-example-preview">
          ${preview}
        </div>
      </div>
      ${codePanel(codeId, filename, code, { collapsible: true })}
    </div>
  `;
}

function promoCardPreview(promo) {
  const imageTypeClass = promo.imageType ? ` joker-promo-media--${promo.imageType}` : "";
  return `
    <a class="joker-promo-card joker-promo-card--${promo.variant}" href="${promo.href}" aria-label="${promo.title} ${promo.description}">
      <div class="joker-promo-frame">
        <div class="joker-promo-inner">
          <span class="joker-promo-glow" aria-hidden="true"></span>
          <span class="joker-promo-shapes" aria-hidden="true"></span>
          <div class="joker-promo-copy">
            <h3>${promo.title}</h3>
            <p>${promo.description}</p>
            <span class="joker-promo-action">
              <span class="joker-cta-preview secondary">
                <span>${promo.ctaLabel}</span>
              </span>
            </span>
          </div>
        </div>
        <div class="joker-promo-media${imageTypeClass}" aria-hidden="true">
          <img class="joker-promo-character" src="${promo.imageSrc}" alt="" />
        </div>
      </div>
    </a>
  `;
}

function samplePromoCardCode(promo, imageSrc) {
  return `import { PromoCard } from "@joker/design-system";

export function Example() {
  return (
    <PromoCard
      title="${promo.title}"
      description="${promo.description}"
      ctaLabel="${promo.ctaLabel}"
      imageSrc="${imageSrc}"
      variant="${promo.variant}"
      backgroundPattern="curved-bands"
      href="${promo.href}"
    />
  );
}`;
}

function sampleGameContainerCode() {
  return `import {
  GameShell,
} from "@joker/design-system";

export function CrashGamePage() {
  return (
    <GameShell>
      <CrashGameCanvas />
    </GameShell>
  );
}`;
}

function sampleGameShellTopRailCode() {
  return `import { TopRail } from "@joker/design-system";

export function Example() {
  return (
    <TopRail
      balance="150,000"
      activeWallet
      avatarSrc="/avatars/user.png"
    />
  );
}`;
}

function sampleGameShellSideRailCode() {
  return `import { SideRail } from "@joker/design-system";

export function Example() {
  return (
    <SideRail
      activeItem="crash"
      defaultOpenSection="originals"
      onNavigate={(item) => console.log(item)}
    />
  );
}`;
}

function sampleGameHeaderRailCode() {
  return `import { GameHeaderRail } from "@joker/design-system";

export function Example() {
  const originalsGames = [
    { label: "Crash", icon: "crash" },
    { label: "Mines", icon: "mines" },
    { label: "Hilo", icon: "hi-lo" },
    { label: "Tower", icon: "tower" },
    { label: "Chicken Cross", icon: "chicken-cross" },
  ];

  const selectedGame = originalsGames[0];

  return (
    <GameHeaderRail
      game={selectedGame.label}
      gameIcon={selectedGame.icon}
      rightLabel="Fair Play"
      rightIcon="fair-play"
    />
  );
}`;
}

function sampleBettingPanelCode() {
  return `import { BettingPanel } from "@joker/design-system";

export function Example() {
  return (
    <BettingPanel
      mode="manual"
      betAmount=""
      cashoutAt={3.03}
      profitOnWin={0}
      onPlaceBet={() => {}}
    />
  );
}`;
}

function sampleGameStageCode() {
  return `import { GameStage } from "@joker/design-system";

export function Example() {
  return (
    <GameStage>
      <div className="game-round">
        2.40x
      </div>
    </GameStage>
  );
}`;
}

function sampleGameControlsCode() {
  return `import { Button, GameControls } from "@joker/design-system";

export function Example() {
  return (
    <GameControls>
      <Button variant="secondary">Bet $10</Button>
      <Button variant="primary">Play</Button>
    </GameControls>
  );
}`;
}

function buttonTokenTable(rows) {
  return `
    <div class="button-token-table">
      <div class="button-token-rows">
        ${rows.join("")}
      </div>
    </div>
  `;
}

function buttonTokenRow({ label, token, output, state }) {
  return `
    <article class="button-token-row${state ? "" : " simple"}">
      <div class="button-token-sample">
        ${state ? `<button class="joker-cta-preview ${state}" type="button" ${state === "disabled" ? "disabled" : ""}>Confirm</button>` : `<span class="button-token-label">${label}</span>`}
      </div>
      <div class="color-variable-action">
        <code>${token}</code>
        <button class="variable-copy-button" type="button" data-copy data-copy-value="${token}" data-copy-label="Copy ${token}" aria-label="Copy ${token}">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
      <code class="button-token-output">${output}</code>
    </article>
  `;
}

function inputsComponent(page) {
  return `
    ${pageHero(page)}
    ${section("Profile Settings", "", profileSettingsExamples(), "button-example-section input-example-section")}
  `;
}

function profileSettingsExamples() {
  return inputExampleCard({
    id: "profile-settings-example",
    tocTitle: "Profile Settings",
    preview: liveProfileSettingsPreview(),
    codeId: "profile-settings-code",
    filename: "ProfileSettingsForm.tsx",
    code: sampleProfileSettingsCode(),
    stageClass: "is-form",
    previewClass: "is-form",
  });
}

function selectFieldExamples() {
  return inputExampleCard({
    id: "dropdown-input-example",
    preview: liveDropdownInputPreview(),
    codeId: "dropdown-input-code",
    filename: "SelectInput.tsx",
    code: sampleDropdownInputCode(),
  });
}

function productNumericFieldExamples() {
  return `
    ${inputExampleCard({
      id: "bet-amount-input-example",
      tocTitle: "Bet Amount",
      preview: liveBetAmountInputPreview(),
      codeId: "bet-amount-input-code",
      filename: "BetAmountInput.tsx",
      code: sampleBetAmountInputCode(),
    })}
    ${inputExampleCard({
      id: "multiplier-input-example",
      tocTitle: "Multiplier",
      preview: liveMultiplierInputPreview(),
      codeId: "multiplier-input-code",
      filename: "MultiplierInput.tsx",
      code: sampleMultiplierInputCode(),
    })}
  `;
}

function inputStateExamples() {
  return inputExampleCard({
    id: "input-states-example",
    preview: `
      <div class="input-state-grid">
        ${inputPreview("text", "default")}
        ${inputPreview("text", "focus")}
        ${inputPreview("text", "success")}
        ${inputPreview("text", "error")}
        ${inputPreview("text", "disabled")}
      </div>
    `,
    codeId: "input-states-code",
    filename: "InputStates.tsx",
    code: sampleInputStatesCode(),
  });
}

function inputExampleCard({ id, tocTitle, preview, codeId, filename, code, stageClass = "", previewClass = "" }) {
  const tocAttributes = tocTitle ? ` data-toc-title="${tocTitle}" data-toc-depth="2"` : "";

  return `
    <div id="${id}" class="button-example input-example"${tocAttributes}>
      <div class="button-example-stage input-example-stage${stageClass ? ` ${stageClass}` : ""}">
        <div class="input-example-preview${previewClass ? ` ${previewClass}` : ""}">
          ${preview}
        </div>
      </div>
      ${codePanel(codeId, filename, code, { collapsible: true })}
    </div>
  `;
}

function liveProfileSettingsPreview() {
  const timezones = [
    { value: "Australia/Brisbane", label: "Australia/Brisbane" },
    { value: "Australia/Sydney", label: "Australia/Sydney" },
    { value: "Pacific/Auckland", label: "Pacific/Auckland" },
  ];

  return `
    <div class="joker-profile-settings">
      <div class="joker-input-field live text full-width">
        <label class="joker-input-label" for="profile-display-name">Display Name</label>
        <div class="joker-input-control">
          <input id="profile-display-name" type="text" value="Harry Maher" autocomplete="name" />
        </div>
      </div>

      <div class="joker-profile-settings-row">
        <div class="joker-input-field live text full-width">
          <label class="joker-input-label" for="profile-username">Username</label>
          <div class="joker-input-control">
            <input id="profile-username" type="text" value="@hazmatic94" autocomplete="username" />
          </div>
          <p class="joker-input-message joker-input-support">This will be visible publicly.</p>
        </div>

        <div class="joker-input-field live dropdown full-width" data-dropdown-field data-value="Australia/Brisbane">
          <label class="joker-input-label" id="profile-timezone-label">Timezone</label>
          <div class="joker-dropdown-anchor">
            <button
              class="joker-input-control joker-dropdown-control"
              type="button"
              data-dropdown-toggle
              aria-labelledby="profile-timezone-label"
              aria-haspopup="listbox"
              aria-expanded="false"
            >
              <span class="joker-dropdown-value" data-dropdown-value>${timezones[0].label}</span>
              <span class="joker-input-icon trailing">${lucideIcon("chevron-down")}</span>
            </button>
            <div class="joker-dropdown-menu" role="listbox" aria-labelledby="profile-timezone-label">
              ${timezones.map((option, index) => `
                <button
                  class="joker-dropdown-option"
                  type="button"
                  role="option"
                  data-dropdown-option="${option.value}"
                  aria-selected="${index === 0 ? "true" : "false"}"
                >${option.label}</button>
              `).join("")}
            </div>
          </div>
          <p class="joker-input-message joker-input-support" aria-hidden="true"></p>
        </div>
      </div>

      <div class="joker-input-field live textarea full-width">
        <label class="joker-input-label" for="profile-bio">Bio</label>
        <div class="joker-input-control">
          <textarea id="profile-bio" rows="3">Building systems and products...</textarea>
        </div>
      </div>

      <label class="joker-profile-checkbox">
        <input type="checkbox" checked />
        <span>Public profile</span>
      </label>

      <div class="joker-profile-settings-actions">
        <button class="joker-cta-preview default" type="button">
          <span>Save Changes</span>
        </button>
        <button class="joker-cta-preview secondary" type="button">
          <span>Cancel</span>
        </button>
      </div>
    </div>
  `;
}

function liveDropdownInputPreview() {
  const options = Array.from({ length: 12 }, (_, index) => ({
    value: String(index + 1),
    label: `${index + 1} ${index === 0 ? "Mine" : "Mines"}`,
  }));

  return `
    <div class="joker-input-field live dropdown" data-dropdown-field data-value="1">
      <label class="joker-input-label" id="joker-dropdown-label">Number of mines</label>
      <div class="joker-dropdown-anchor">
        <button
          class="joker-input-control joker-dropdown-control"
          type="button"
          data-dropdown-toggle
          aria-labelledby="joker-dropdown-label"
          aria-haspopup="listbox"
          aria-expanded="false"
        >
          <span class="joker-dropdown-value" data-dropdown-value>${options[0].label}</span>
          <span class="joker-input-icon trailing">${lucideIcon("chevron-down")}</span>
        </button>
        <div class="joker-dropdown-menu" role="listbox" aria-labelledby="joker-dropdown-label">
          ${options.map((option, index) => `
            <button
              class="joker-dropdown-option"
              type="button"
              role="option"
              data-dropdown-option="${option.value}"
              aria-selected="${index === 0 ? "true" : "false"}"
            >${option.label}</button>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function liveMultiplierInputPreview() {
  return `
    <div class="joker-input-field live multiplier">
      <label class="joker-input-label" for="joker-live-multiplier-input">Multiplier</label>
      <div class="joker-input-control joker-multiplier-control">
        <input
          id="joker-live-multiplier-input"
          data-multiplier-input
          type="text"
          inputmode="decimal"
          value="1x"
          autocomplete="off"
          aria-label="Multiplier"
        />
        <span class="joker-multiplier-actions" aria-label="Multiplier controls">
          <button class="joker-multiplier-button" type="button" data-multiplier-step="up" aria-label="Increase multiplier">
            ${lucideIcon("chevron-up")}
          </button>
          <button class="joker-multiplier-button" type="button" data-multiplier-step="down" aria-label="Decrease multiplier">
            ${lucideIcon("chevron-down")}
          </button>
        </span>
      </div>
    </div>
  `;
}

function liveTextInputPreview() {
  return `
    <div class="joker-input-field live text">
      <label class="joker-input-label" for="joker-live-text-input">Field Label</label>
      <div class="joker-input-control">
        <input id="joker-live-text-input" type="text" placeholder="Placeholder" autocomplete="off" />
      </div>
    </div>
  `;
}

function liveBetAmountInputPreview() {
  return `
    <div class="joker-input-field live prefix">
      <label class="joker-input-label" for="joker-live-icon-input">Bet amount</label>
      <div class="joker-input-control">
        <span class="joker-input-icon"><img src="./assets/jokerCoin.svg" alt="" /></span>
        <input
          id="joker-live-icon-input"
          type="text"
          inputmode="decimal"
          pattern="[0-9]*[.]?[0-9]*"
          placeholder="0"
          autocomplete="off"
        />
      </div>
    </div>
  `;
}

function inputRowTable(rows) {
  return `
    <div class="input-token-table">
      <div class="input-token-rows">
        ${rows.join("")}
      </div>
    </div>
  `;
}

function inputTextRowTable(rows) {
  return inputRowTable(rows.map(inputTextRow));
}

function inputVariantRow(row) {
  return inputTokenRow({
    sample: inputPreview(row.variant),
    token: row.token,
    output: row.output,
    label: row.status,
  });
}

function inputStateRow(row) {
  return inputTokenRow({
    sample: inputPreview("text", row.state),
    token: row.token,
    output: row.output,
    label: row.label,
  });
}

function inputTextRow(row) {
  return inputTokenRow({
    sample: `<span class="input-row-label">${row.label}</span>`,
    token: row.token,
    output: row.output,
  });
}

function inputTokenRow({ sample, token, output, label = "" }) {
  return `
    <article class="input-token-row">
      <div class="input-token-sample">${sample}</div>
      <div class="color-variable-action">
        <code>${token}</code>
        <button class="variable-copy-button" type="button" data-copy data-copy-value="${token}" data-copy-label="Copy ${token}" aria-label="Copy ${token}">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
      <code class="input-token-output">${label ? `${label} / ` : ""}${output}</code>
    </article>
  `;
}

function inputPreview(variant, state = "default") {
  const label = variant === "currency" || variant === "prefix" ? "Bet amount" : variant === "password" || variant === "suffix" ? "Password" : variant === "search" ? "Search" : "Field Label";
  const value = state === "default" || state === "hover" || state === "focus" || state === "disabled" ? "Placeholder" : state === "warning" ? "Check amount" : state === "error" ? "Invalid value" : "Valid value";
  const message = state === "warning" ? "Review before continuing" : state === "error" ? "Error message" : state === "success" ? "Looks good" : "";
  const prefix = variant === "currency" || variant === "prefix" ? "coin" : variant === "password" || variant === "suffix" ? "lock" : variant === "search" ? "search" : "";
  const suffix = variant === "password" || variant === "suffix" ? "eye" : "";
  const control = `<div class="joker-input-control">
    ${prefix ? `<span class="joker-input-icon">${prefix === "coin" ? '<img src="./assets/jokerCoin.svg" alt="" />' : lucideIcon(prefix)}</span>` : ""}
    <span class="joker-input-placeholder">${value}</span>
    ${suffix ? `<span class="joker-input-icon trailing">${lucideIcon(suffix)}</span>` : ""}
  </div>`;

  return `
    <div class="joker-input-field ${state} ${variant}">
      <label class="joker-input-label">${label}</label>
      ${control}
      ${message ? `<p class="joker-input-message">${message}</p>` : ""}
    </div>
  `;
}

export function hydrateLucideIcons(root = document) {
  root.querySelectorAll("[data-lucide]").forEach((placeholder) => {
    placeholder.innerHTML = lucideIcon(placeholder.dataset.lucide);
  });
}

function navItemIcon(name, className = "") {
  const svg = navigationIconSvg(name, className);

  if (svg) {
    return svg;
  }

  return `<span class="system-icon nav-custom-icon-missing${className ? ` ${className}` : ""}" aria-hidden="true"></span>`;
}

export function lucideIcon(name, className = "") {
  const paths = {
    "alert-triangle": '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>',
    "arrow-left": '<path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path>',
    "arrow-left-right": '<path d="M8 7H3l3-3"></path><path d="M3 7h14"></path><path d="M16 17h5l-3 3"></path><path d="M21 17H7"></path>',
    "arrow-right": '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>',
    bomb: '<path d="M14.5 6.5 17 4"></path><path d="M18 2l4 4"></path><path d="M20 4h-3"></path><path d="M20 4v3"></path><circle cx="10" cy="14" r="7"></circle>',
    castle: '<path d="M4 22V9h3V4h3v5h4V4h3v5h3v13Z"></path><path d="M9 22v-6a3 3 0 0 1 6 0v6"></path>',
    check: '<path d="M20 6 9 17l-5-5"></path>',
    "chevron-down": '<path d="m6 9 6 6 6-6"></path>',
    "chevron-left": '<path d="m15 18-6-6 6-6"></path>',
    "chevron-right": '<path d="m9 18 6-6-6-6"></path>',
    "chevron-up": '<path d="m18 15-6-6-6 6"></path>',
    "chevrons-up-down": '<path d="m7 8 5-5 5 5Z"></path><path d="m7 16 5 5 5-5Z"></path>',
    circle: '<circle cx="12" cy="12" r="8"></circle>',
    "circle-alert": '<circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>',
    crown: '<path d="m2 7 4.4 3.3L9 4l3 6 3-6 2.6 6.3L22 7l-2 11H4L2 7Z"></path><path d="M4 21h16"></path>',
    dot: '<circle cx="12" cy="12" r="2"></circle>',
    egg: '<path d="M19 14.5c0 4.14-3.13 7.5-7 7.5s-7-3.36-7-7.5C5 9.9 8.1 2 12 2s7 7.9 7 12.5Z"></path><path d="M7.5 14.5c1 .8 1.9.8 2.8 0s1.8-.8 2.7 0 1.8.8 3 0"></path>',
    eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"></path><circle cx="12" cy="12" r="3"></circle>',
    headphones: '<path d="M3 14v3a3 3 0 0 0 3 3h1v-8H6a3 3 0 0 0-3 2Z"></path><path d="M21 14v3a3 3 0 0 1-3 3h-1v-8h1a3 3 0 0 1 3 2Z"></path><path d="M3 14a9 9 0 0 1 18 0"></path>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
    "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path>',
    "loader-circle": '<path d="M21 12a9 9 0 1 1-6.219-8.56"></path>',
    bell: '<path d="M18 16v-5a6 6 0 0 0-12 0v5l-2 2v1h16v-1l-2-2Z"></path><path d="M10.25 21a2 2 0 0 0 3.5 0Z"></path>',
    menu: '<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',
    gift: '<path d="M20 7h-2.17A3.001 3.001 0 0 0 12.5 4.1L12 5l-.5-.9A3.001 3.001 0 0 0 6.17 7H4a1 1 0 0 0-1 1v3h18V8a1 1 0 0 0-1-1Z"></path><path d="M5 13v6a2 2 0 0 0 2 2h4v-8H5Z"></path><path d="M13 13v8h4a2 2 0 0 0 2-2v-6h-6Z"></path>',
    house: '<path d="M3 10.75 12 3l9 7.75V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.25Z"></path>',
    "info-filled": '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"></path>',
    "message-square": '<path d="M7 3h10a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4Z"></path>',
    minus: '<path d="M5 12h14"></path>',
    package: '<path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path>',
    plus: '<path d="M5 12h14"></path><path d="M12 5v14"></path>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 4-2 4s2.74-.5 4-2c.7-.84.69-2.12-.08-2.9a2.18 2.18 0 0 0-2.92-.1Z"></path><path d="m12 15-3-3a22 22 0 0 1 2-5.1A11 11 0 0 1 21 2a11 11 0 0 1-4.9 10 22 22 0 0 1-5.1 2Z"></path><path d="M9 12H4l3-3"></path><path d="M12 15v5l3-3"></path><circle cx="16" cy="7" r="1.5"></circle>',
    search: '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>',
    "search-filled": '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM2 10.5a8.5 8.5 0 1 1 15.18 5.24l4.04 4.04a1 1 0 1 1-1.42 1.42l-4.04-4.04A8.5 8.5 0 0 1 2 10.5Z"></path>',
    "shield-check-filled": '<path d="M12 2 4.5 5.2v5.9c0 4.65 3.18 8.98 7.5 10.17 4.32-1.19 7.5-5.52 7.5-10.17V5.2L12 2Zm3.65 7.75-4.2 4.2a1 1 0 0 1-1.4 0l-1.7-1.7 1.4-1.4.99.99 3.51-3.5 1.4 1.41Z"></path>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"></path>',
    timer: '<path d="M10 2h4"></path><path d="M12 14v-4"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M20 13a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z"></path>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5"></path><path d="M18 12h.01"></path>',
    x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  };
  return `
    <svg class="system-icon${className ? ` ${className}` : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="var(--icon-preview-stroke, 1.75)" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${paths[name] || paths.circle}
    </svg>
  `;
}

function spacingGuidelineRow(scope, tokens, guidance) {
  return `
    <article class="spacing-guideline-row">
      <strong>${scope}</strong>
      <code>${tokens}</code>
      <p>${guidance}</p>
    </article>
  `;
}

function spacingTokenRow(token) {
  return `
    <article class="spacing-token-row" style="--space-size: ${token.value}px">
      <div class="spacing-value">
        <strong>${token.value}px</strong>
        <span aria-hidden="true"></span>
      </div>
      <button class="spacing-token-chip" type="button" data-copy data-copy-value="${token.value}px" data-copy-label="Copy ${token.name} value" aria-label="Copy ${token.name} ${token.value}px">
        ${token.name}
      </button>
      <p>${token.usage}</p>
    </article>
  `;
}

function primitiveColorTokens() {
  return primitiveColorFamilies.flatMap((family) =>
    family.tokens.map((token) => ({
      ...token,
      family: family.title,
    }))
  );
}

function colorFamilyGroup(family) {
  const title = colorFamilyTitle(family.title);
  return `
    <section id="${slug(title)}" class="primitive-color-group" aria-label="${title}">
      <h3>${title}</h3>
      <div class="primitive-color-grid">
        ${family.tokens.map((token) => colorSwatch({ ...token, family: family.title })).join("")}
      </div>
    </section>
  `;
}

function colorFamilyTitle(title) {
  if (title === "white") return "Neutral White";
  if (title === "black") return "Black";
  if (title === "sage") return "Sage";
  if (title === "success") return "Success";
  if (title === "warning") return "Warning";
  if (title === "danger") return "Danger";
  return title;
}

function colorSwatch(token) {
  const textClass = token.text === "dark" ? "dark-text" : "light-text";
  return `
    <article class="color-swatch-card ${textClass}" style="background: ${token.value}">
      ${token.base ? '<span class="base-tag">base</span>' : ""}
      <button class="copy-icon-button" type="button" data-copy data-copy-value="${token.value}" data-copy-label="Copy ${token.name} hex value" aria-label="Copy ${token.name} hex value">
        <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
      </button>
      <div class="color-swatch-content">
        <span class="color-family-label">${token.family}</span>
        <strong>${token.name}</strong>
        <code>${token.value}</code>
      </div>
    </article>
  `;
}

function semanticColorGroup(group) {
  return `
    <section id="${slug(group.title)}" class="semantic-token-group" aria-label="${group.title}">
      <h3>${group.title}</h3>
      <div class="semantic-token-grid">
        ${group.tokens.map(semanticTokenCard).join("")}
      </div>
    </section>
  `;
}

function semanticTokenCard(token) {
  const color = semanticTokenColor(token.value);
  const textClass = color.text === "dark" ? "dark-text" : "light-text";
  return `
    <article class="semantic-token-card">
      <div class="semantic-token-swatch ${textClass}" style="background: ${color.value}">
        <button class="copy-icon-button" type="button" data-copy data-copy-value="${color.value}" data-copy-label="Copy ${token.name} value" aria-label="Copy ${token.name} value">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
      <div class="semantic-token-content">
        <strong>${token.name}</strong>
        <code>${token.value}</code>
        <p>${token.use}</p>
      </div>
    </article>
  `;
}

function semanticTokenColor(value) {
  if (value === "whiteAlpha08") return { value: "rgb(255 255 255 / 0.08)", text: "light" };
  const primitive = primitiveColorTokens().find((token) => token.name === value);
  return primitive || { value: "var(--color-primitive-white-50)", text: "dark" };
}

function typographyFoundation() {
  const typeScaleRows = [
    { sample: "h1", token: "--text-h1", output: "600 32px/1.5 Inter / -0.5px", kind: "heading", size: 32, weight: 600, lineHeight: 1.5, letterSpacing: "-0.5px" },
    { sample: "h2", token: "--text-h2", output: "600 24px/1.5 Inter / -0.5px", kind: "heading", size: 24, weight: 600, lineHeight: 1.5, letterSpacing: "-0.5px" },
    { sample: "p1", token: "--text-p1", output: "400 14px/1.5 Inter", kind: "body", size: 14, weight: 400, lineHeight: 1.5, letterSpacing: "0px" },
    { sample: "p2", token: "--text-p2", output: "400 16px/1.5 Inter", kind: "body", size: 16, weight: 400, lineHeight: 1.5, letterSpacing: "0px" },
    { sample: "p3", token: "--text-p3", output: "400 12px/1.5 Inter", kind: "body", size: 12, weight: 400, lineHeight: 1.5, letterSpacing: "0px" },
  ];

  return `
    ${section("Type Scale", "", typographyVariableTable([typographyVariableGroup("Type Scale", typeScaleRows)]))}
    ${section("Code Export", "", codePanel("typography-code", "typography.css", sampleTypographyCode()))}
  `;
}

function typographyVariableTable(groups) {
  return `
    <div class="color-variable-table typography-variable-table">
      <div class="color-variable-rows">
        ${groups.join("")}
      </div>
    </div>
  `;
}

function typographyVariableGroup(_title, rows) {
  return rows.map(typographyVariableRow).join("");
}

function typographyVariableRow(row) {
  return `
    <article class="color-variable-row typography-variable-row" style="--type-size: ${row.size}px; --type-weight: ${row.weight}; --type-line-height: ${row.lineHeight}; --type-letter-spacing: ${row.letterSpacing};">
      <div class="typography-variable-sample ${row.kind}">
        <span class="typography-sample-label">${row.sample}</span>
        ${row.description ? `<span class="typography-sample-description">${row.description}</span>` : ""}
      </div>
      <div class="color-variable-action typography-variable-action">
        <code>${row.token}</code>
        <button class="variable-copy-button" type="button" data-copy data-copy-value="${row.token}" data-copy-label="Copy ${row.token}" aria-label="Copy ${row.token}">
          <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
        </button>
      </div>
    </article>
  `;
}

function typographyScaleTable(kind, rows) {
  return `
    <div class="type-spec-table ${kind}">
      <div class="type-spec-header" aria-hidden="true">
        <span>Aa Example</span>
        <span>Class name</span>
        <span>Usage</span>
      </div>
      <div class="type-spec-rows">
        ${rows.map((row) => typographySpecRow(kind, row)).join("")}
      </div>
    </div>
  `;
}

function typographySpecRow(kind, row) {
  return `
    <article class="type-spec-row${row.featured ? " featured" : ""}" style="--type-size: ${row.size}px; --type-weight: ${row.weight};">
      <div class="type-spec-example ${kind}${row.mono ? " mono" : ""}">
        ${row.sample}${row.subtle ? ` <span>${row.subtle}</span>` : ""}${row.strong ? ` <strong>${row.strong}</strong>` : ""}
      </div>
      <code>${row.className}</code>
      <p>${row.usage}</p>
    </article>
  `;
}

function stat(value, label, description) {
  return `<article class="stat-card"><strong>${value}</strong><h3>${label}</h3><span>${description}</span></article>`;
}

function docCard(title, description, href) {
  return `
    <a class="doc-card" href="${href}">
      <header>
        <h3>${title}</h3>
        <span class="status-pill">Open</span>
      </header>
      <p>${description}</p>
    </a>
  `;
}

function guideline(title, description) {
  return `<article class="guideline-card"><h3>${title}</h3><p>${description}</p></article>`;
}

function tokenCard(title, token, description) {
  return `
    <article class="token-card">
      <div class="token-swatch" style="background: ${tokenBackground(title)}"></div>
      <h3>${title}</h3>
      <div class="token-meta">${token}</div>
      <p>${description}</p>
    </article>
  `;
}

function tokenBackground(title) {
  if (title === "Primitive") return "var(--color-primitive-sage-500)";
  if (title === "Semantic") return "var(--color-primitive-black-600)";
  return "linear-gradient(135deg, var(--color-primitive-white-50) 0 50%, var(--color-primitive-black-300) 50% 100%)";
}

function variantTile(title, description) {
  return `<article class="variant-tile"><strong>${title}</strong><span>${description}</span></article>`;
}

function stateRow(title, description) {
  return `<article class="state-row"><h3>${title}</h3><p>${description}</p></article>`;
}

function resourceItem(title, description) {
  return `<article class="resource-item"><strong>${title}</strong><span>${description}</span></article>`;
}

function flowStep(number, title, description) {
  return `<article class="flow-step"><h3>${number}. ${title}</h3><p>${description}</p></article>`;
}

function codePanel(id, label, code, { collapsible = false } = {}) {
  const highlightedCode = highlightCode(code);
  return `
    <div class="code-panel${collapsible ? " code-panel-collapsible" : ""}"${collapsible ? ' data-code-collapsible data-code-expanded="false"' : ""}>
      <div class="code-header">
        <div class="code-file-name">${label}</div>
        <div class="code-actions" aria-label="Code actions">
          <button class="code-action-button" type="button" data-copy="#${id}" data-copy-label="Copy ${label}" aria-label="Copy ${label}">
            <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <div class="code-body">
        <pre><code id="${id}">${highlightedCode}</code></pre>
        ${collapsible ? `
          <div class="code-reveal-overlay">
            <button class="code-toggle-button code-view-button" type="button" data-code-toggle aria-expanded="false">
              <span>View Code</span>
            </button>
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

function highlightCode(code) {
  const keywords = new Set([
    "as", "async", "await", "break", "case", "catch", "class", "const", "continue",
    "default", "else", "export", "extends", "false", "finally", "for", "from", "function",
    "if", "implements", "import", "in", "instanceof", "interface", "let", "new", "null",
    "of", "return", "static", "switch", "throw", "true", "try", "type", "typeof", "undefined",
    "var", "void", "while", "with", "yield",
  ]);
  let output = "";
  let index = 0;
  let inJsxTag = false;
  let expectTagName = false;

  while (index < code.length) {
    const remainder = code.slice(index);

    if (remainder.startsWith("//")) {
      const lineEnd = code.indexOf("\n", index);
      const end = lineEnd === -1 ? code.length : lineEnd;
      output += `<span class="syntax-comment">${escapeHtml(code.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    if (remainder.startsWith("/*")) {
      const commentEnd = code.indexOf("*/", index + 2);
      const end = commentEnd === -1 ? code.length : commentEnd + 2;
      output += `<span class="syntax-comment">${escapeHtml(code.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    const character = code[index];
    if (character === '"' || character === "'" || character === "`") {
      const quote = character;
      let end = index + 1;
      while (end < code.length) {
        if (code[end] === "\\") {
          end += 2;
          continue;
        }
        if (code[end] === quote) {
          end += 1;
          break;
        }
        end += 1;
      }
      output += `<span class="syntax-string">${escapeHtml(code.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    if (character === "<" && /^<\/?[A-Za-z]/.test(remainder)) {
      const closingTag = remainder.startsWith("</");
      output += closingTag ? "&lt;/" : "&lt;";
      index += closingTag ? 2 : 1;
      inJsxTag = true;
      expectTagName = true;
      continue;
    }

    if (inJsxTag && character === ">") {
      output += "&gt;";
      index += 1;
      inJsxTag = false;
      expectTagName = false;
      continue;
    }

    const customProperty = remainder.match(/^--[a-z0-9-]+/i);
    if (customProperty) {
      output += `<span class="syntax-property">${escapeHtml(customProperty[0])}</span>`;
      index += customProperty[0].length;
      continue;
    }

    const hexColor = remainder.match(/^#[0-9a-fA-F]{3,8}\b/);
    if (hexColor) {
      output += `<span class="syntax-color">${escapeHtml(hexColor[0])}</span>`;
      index += hexColor[0].length;
      continue;
    }

    const number = remainder.match(/^\d+(?:\.\d+)?(?:px|ms|rem|em|%)?/);
    if (number) {
      output += `<span class="syntax-number">${escapeHtml(number[0])}</span>`;
      index += number[0].length;
      continue;
    }

    const identifier = remainder.match(/^[A-Za-z_$][\w$-]*/);
    if (identifier) {
      const token = identifier[0];
      const following = code.slice(index + token.length);
      let tokenClass = "";

      if (inJsxTag && expectTagName) {
        tokenClass = "syntax-tag";
        expectTagName = false;
      } else if (inJsxTag) {
        tokenClass = "syntax-attribute";
      } else if (keywords.has(token)) {
        tokenClass = "syntax-keyword";
      } else if (/^\s*:/.test(following)) {
        tokenClass = "syntax-property";
      } else if (/^\s*\(/.test(following)) {
        tokenClass = "syntax-function";
      }

      output += tokenClass ? `<span class="${tokenClass}">${escapeHtml(token)}</span>` : escapeHtml(token);
      index += token.length;
      continue;
    }

    output += escapeHtml(character);
    index += 1;
  }

  return output;
}

function renderToc() {
  const headings = collectTocHeadings();

  if (!headings.length) {
    tocRoot.innerHTML = "";
    return;
  }

  const firstLinkIndex = headings.findIndex((heading) => heading.type !== "label");

  tocRoot.innerHTML = `
    <div class="toc-title">
      <span>On this page</span>
      <span class="toc-title-icon" aria-hidden="true">${lucideIcon("list")}</span>
    </div>
    <div class="toc-list">
      ${headings.map((heading, index) => heading.type === "label"
        ? `<div class="toc-label">${heading.title}</div>`
        : `<a class="toc-link depth-${heading.depth}${index === firstLinkIndex ? " active" : ""}" href="#${state.route}/${heading.id}">${heading.title}</a>`).join("")}
    </div>
  `;

  tocRoot.querySelectorAll(".toc-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const id = link.getAttribute("href").split("/").pop();
      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  setupTocSpy(headings.filter((heading) => heading.type !== "label"));
}

function collectTocHeadings() {
  const sectionHeadings = [...contentRoot.querySelectorAll(".section-block, [data-toc-title]")]
    .map((section) => ({
      depth: Number(section.dataset.tocDepth || 1),
      id: section.id,
      title: section.dataset.tocTitle || section.querySelector("h2")?.textContent,
    }))
    .filter((heading) => heading.id && heading.title);

  const nestedHeadings = [...contentRoot.querySelectorAll(".primitive-color-group, .semantic-token-group, .color-variable-group")]
    .map((section) => ({
      depth: 2,
      id: section.id,
      title: section.querySelector("h3")?.textContent,
    }))
    .filter((heading) => heading.id && heading.title);

  const headings = [...nestedHeadings, ...sectionHeadings].sort((a, b) => {
    const aNode = document.getElementById(a.id);
    const bNode = document.getElementById(b.id);
    if (!aNode || !bNode) return 0;
    return aNode.getBoundingClientRect().top - bNode.getBoundingClientRect().top;
  });

  if (state.route === "/foundations/colors") {
    return headings.reduce((items, heading) => {
      if (heading.title === "Color Variables") return items;
      if (heading.title === "Neutral White" && !items.some((item) => item.type === "label" && item.title === "Primitives")) {
        const primitivesHeading = headings.find((item) => item.title === "Primitives");
        if (primitivesHeading && !items.some((item) => item.title === "Primitives")) items.push(primitivesHeading);
      }
      items.push(heading);
      return items;
    }, []);
  }

  if (state.route === "/components/inputs") {
    const hiddenInputAnchors = new Set(["input-states-example"]);
    return headings.filter((heading) => !hiddenInputAnchors.has(heading.id));
  }

  return headings;
}

function setupTocSpy(headings) {
  const links = [...tocRoot.querySelectorAll(".toc-link")];
  if (!links.length) return;

  const setActive = () => {
    const current = headings.reduce((active, heading) => {
      const node = document.getElementById(heading.id);
      if (!node) return active;
      const top = node.getBoundingClientRect().top;
      return top < 150 ? heading : active;
    }, headings[0]);

    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href").endsWith(`/${current.id}`));
    });
  };

  setActive();
  window.removeEventListener("scroll", window.__jokerTocSpy);
  window.__jokerTocSpy = setActive;
  window.addEventListener("scroll", window.__jokerTocSpy, { passive: true });
}

function sampleTokenCode(title) {
  return `{
  "$schema": "https://tokens.studio/schemas/tokens.json",
  "${slug(title)}": {
    "primitive": {},
    "semantic": {},
    "usage": "Add Joker ${title.toLowerCase()} standards here"
  }
}`;
}

function sampleColorCode() {
  const primitive = primitiveColorFamilies.reduce((families, family) => {
    families[family.title] = family.tokens.reduce((tokens, token) => {
      tokens[token.name] = {
        value: token.value,
        type: "color",
        ...(token.base ? { base: true } : {}),
      };
      return tokens;
    }, {});
    return families;
  }, {});

  const semantic = semanticColorGroups.reduce((groups, group) => {
    groups[group.title.toLowerCase()] = group.tokens.reduce((tokens, token) => {
      tokens[token.name] = {
        value: `{${token.value}}`,
        type: "color",
        use: token.use,
      };
      return tokens;
    }, {});
    return groups;
  }, {});

  return JSON.stringify({ primitive, semantic }, null, 2);
}

function sampleColorVariableCode() {
  const primitiveRows = primitiveColorTokens();
  const semanticRows = semanticColorGroups.flatMap((group) => group.tokens);
  return `:root {\n  /* Primitive */\n${primitiveRows
    .map((token) => `  ${primitiveCssVariableName(token.name)}: ${token.value};`)
    .join("\n")}\n\n  /* Semantic */\n${semanticRows
    .map((token) => {
      const color = semanticTokenColor(token.value);
      return `  ${cssVariableName(token.name)}: ${color.value};`;
    })
    .join("\n")}\n}`;
}

function sampleTypographyCode() {
  return `:root {
  --font-family-body: "Inter", ui-sans-serif, system-ui, sans-serif;

  --text-h1: 32px;
  --text-h1-weight: 600;
  --text-h1-line-height: 1.5;
  --text-h1-letter-spacing: -0.5px;

  --text-h2: 24px;
  --text-h2-weight: 600;
  --text-h2-line-height: 1.5;
  --text-h2-letter-spacing: -0.5px;

  --text-p1: 14px;
  --text-p1-weight: 400;
  --text-p1-line-height: 1.5;
  --text-p1-letter-spacing: 0px;

  --text-p2: 16px;
  --text-p2-weight: 400;
  --text-p2-line-height: 1.5;
  --text-p2-letter-spacing: 0px;

  --text-p3: 12px;
  --text-p3-weight: 400;
  --text-p3-line-height: 1.5;
  --text-p3-letter-spacing: 0px;
}`;
}

function sampleSpacingCode() {
  return `:root {
${spacingTokens.map((token) => `  ${spacingCssVariableName(token.name)}: ${token.value}px;`).join("\n")}
}`;
}

function sampleRadiusCode() {
  return `:root {
${radiusTokens.map((token) => `  ${radiusCssVariableName(token.name)}: ${token.value}px;`).join("\n")}
}`;
}

function sampleShadowCode() {
  return `:root {
${shadowTokens.map((token) => `  ${shadowCssVariableName(token.name)}: ${token.value};`).join("\n")}
}`;
}

function sampleMotionCode() {
  return `:root {
${motionDurationTokens.map((token) => `  ${motionCssVariableName(token.name)}: ${token.value};`).join("\n")}

${motionEasingTokens.map((token) => `  ${motionCssVariableName(token.name)}: ${token.value};`).join("\n")}

${motionPatternTokens.map((token) => `  ${motionCssVariableName(token.name)}: ${token.output};`).join("\n")}
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-instant: 0ms;
    --motion-fast: 0ms;
    --motion-base: 0ms;
    --motion-medium: 0ms;
    --motion-slow: 0ms;
  }
}`;
}

function sampleIconCode() {
  return `:root {
  --icon-source: "https://github.com/lucide-icons/lucide.git";
  --icon-package: "lucide-static";
  --icon-style: "outline-round";

${iconSizeTokens.map((token) => `  ${iconCssVariableName(token.name)}: ${token.value};`).join("\n")}

${iconStrokeTokens.map((token) => `  ${iconCssVariableName(token.name)}: ${token.value};`).join("\n")}
}

.joker-icon {
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);
  stroke-width: var(--icon-stroke-default);
  stroke-linecap: round;
  stroke-linejoin: round;
}`;
}

function sampleInstallCommand() {
  return `npm install @joker/design-system`;
}

function sampleGlobalStylesImport() {
  return `import "@joker/design-system/styles.css";`;
}

function samplePackageComponentUsage() {
  return `import { Button } from "@joker/design-system";

export function Example() {
  return (
    <Button variant="primary">
      Confirm
    </Button>
  );
}`;
}

function sampleDesignTokenUsage() {
  return `.card {
  background: var(--color-surface-primary);
  color: var(--color-text-primary);
  border-radius: var(--radius-4);
  padding: var(--space-16);
}`;
}

function samplePackageStructure() {
  return `@joker/design-system
├─ components
│  ├─ Button
│  ├─ Input
│  ├─ Card
│  └─ Modal
├─ tokens
│  ├─ colors
│  ├─ typography
│  ├─ spacing
│  ├─ radius
│  └─ motion
└─ styles.css`;
}

function sampleImportPattern() {
  return `import { Button } from "@joker/design-system";`;
}

function sampleButtonCode() {
  return `import { Button } from "@joker/design-system";

export function PrimaryButton() {
  return <Button label="Confirm" />;
}

export function PrimaryFullWidthButton() {
  return <Button label="Confirm" fullWidth />;
}`;
}

function sampleDisabledButtonCode() {
  return `import { Button } from "@joker/design-system";

export function PrimaryDisabledButton() {
  return <Button label="Confirm" disabled />;
}`;
}

function sampleSecondaryButtonCode() {
  return `import { Button } from "@joker/design-system";

export function SecondaryButton() {
  return <Button label="Cancel" variant="secondary" />;
}

export function SecondaryFullWidthButton() {
  return <Button label="Cancel" variant="secondary" fullWidth />;
}`;
}

function sampleSecondaryDisabledButtonCode() {
  return `import { Button } from "@joker/design-system";

export function SecondaryDisabledButton() {
  return <Button label="Cancel" variant="secondary" disabled />;
}`;
}

function sampleSecondaryLoadingButtonCode() {
  return `import { Button } from "@joker/design-system";

export function SecondaryLoadingButton() {
  return <Button label="Cancel" variant="secondary" loading />;
}`;
}

function sampleGhostButtonCode() {
  return `import { Button } from "@joker/design-system";

export function GhostButton() {
  return <Button label="Cancel" variant="ghost" />;
}`;
}

function sampleGhostDisabledButtonCode() {
  return `import { Button } from "@joker/design-system";

export function GhostDisabledButton() {
  return <Button label="Cancel" variant="ghost" disabled />;
}`;
}

function sampleLoadingButtonCode() {
  return `import { Button } from "@joker/design-system";

export function PrimaryLoadingButton() {
  return <Button loading>DEPOSIT</Button>;
}`;
}

function sampleInputCode() {
  return `import { BetAmountInput } from "@joker/design-system";

export function AmountField() {
  return <BetAmountInput placeholder="0" />;
}`;
}

function sampleProfileSettingsCode() {
  return `import { Button, Input } from "@joker/design-system";

export function ProfileSettingsForm() {
  return (
    <form className="joker-profile-settings">
      <Input label="Display Name" defaultValue="Harry Maher" fullWidth autoComplete="name" />
      <div className="joker-profile-settings-row">
        <Input
          label="Username"
          defaultValue="@hazmatic94"
          helperText="This will be visible publicly."
          fullWidth
          autoComplete="username"
        />
        <Input label="Timezone" defaultValue="Australia/Brisbane" fullWidth />
      </div>
      <Input label="Bio" defaultValue="Building systems and products..." fullWidth />
      <label className="joker-profile-checkbox">
        <input type="checkbox" defaultChecked />
        <span>Public profile</span>
      </label>
      <div className="joker-profile-settings-actions">
        <Button label="Save Changes" variant="primary" />
        <Button label="Cancel" variant="secondary" />
      </div>
    </form>
  );
}`;
}

function sampleTextInputCode() {
  return `import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Input } from "@joker/design-system";

export function TextInputExample() {
  const [email, setEmail] = useState("");
  const emailError = email ? "" : "This field is required";
  const isSubmitting = false;

  return (
    <Input
      label="Email"
      placeholder="Enter email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      helperText="We'll never share your email"
      error={emailError}
      required
      disabled={isSubmitting}
      fullWidth
      leftIcon={<Mail />}
      rightIcon={<Check />}
      status={emailError ? "error" : "success"}
    />
  );
}`;
}

function sampleDropdownInputCode() {
  return `import { Select } from "@joker/design-system";

export function SelectInputExample() {
  return (
    <Select
      label="Number of mines"
      defaultValue="1"
      options={[
        { value: "1", label: "1 Mine" },
        { value: "2", label: "2 Mines" },
        { value: "3", label: "3 Mines" },
        { value: "4", label: "4 Mines" },
        { value: "5", label: "5 Mines" },
        { value: "6", label: "6 Mines" },
        { value: "7", label: "7 Mines" },
        { value: "8", label: "8 Mines" },
        { value: "9", label: "9 Mines" },
        { value: "10", label: "10 Mines" },
        { value: "11", label: "11 Mines" },
        { value: "12", label: "12 Mines" },
      ]}
    />
  );
}`;
}

function sampleMultiplierInputCode() {
  return `import { MultiplierInput } from "@joker/design-system";

export function MultiplierInputExample() {
  return (
    <MultiplierInput
      label="Multiplier"
      defaultValue={1}
      min={1}
      step={0.1}
      suffix="x"
    />
  );
}`;
}

function sampleBetAmountInputCode() {
  return `import { BetAmountInput } from "@joker/design-system";

export function BetAmountInputExample() {
  return (
    <BetAmountInput
      label="Bet amount"
      placeholder="0"
      message="Numbers only"
    />
  );
}`;
}

function sampleInputStatesCode() {
  return `import { Input } from "@joker/design-system";

export function InputStatesExample() {
  return (
    <>
      <Input label="Default" placeholder="Placeholder" />
      <Input label="Focused" placeholder="Placeholder" autoFocus />
      <Input label="Success" value="Valid value" status="success" helperText="Looks good" />
      <Input label="Error" value="Invalid value" error="Error message" />
      <Input label="Disabled" placeholder="Placeholder" disabled />
    </>
  );
}`;
}

function sampleComponentCode(title) {
  const componentName = title.replace(/\s+/g, "");
  return `import { ${componentName} } from "@joker/design-system";

export function Example() {
  return (
    <${componentName} />
  );
}`;
}

function sampleTemplateCode(title) {
  const templateName = title.replace(/\s+/g, "");
  return `export const ${templateName}Template = {
  regions: ["header", "content", "supporting-panel"],
  foundations: ["spacing", "typography", "color"],
  patterns: [],
  components: []
};`;
}

function sampleFlowCode(title) {
  return `# ${title} Flow

- Entry:
- Decision:
- Review:
- Completion:
- Recovery:
- Analytics:
- API states:`;
}
