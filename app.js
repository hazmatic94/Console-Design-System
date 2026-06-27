import {
  navGroups,
  foundationNotes,
  componentSummaries,
  patternSummaries,
  templateSummaries,
  flowSummaries,
  resources
} from './src/system-data.js?v=flush-game-shell';
import {
  hydrateLucideIcons,
  lucideIcon,
  templates
} from './src/pages/runtimeDocs.js?v=flush-game-shell';
import { slug } from './src/utils.js';

const pageRegistry = buildPages();
const pageOrder = [
  "/installation",
  ...navGroups.flatMap((group) => group.items.map((item) => `/${slug(group.title)}/${slug(item)}`)),
];
const state = {
  route: normalizeRoute(location.hash),
  filteredTerm: "",
};

const navRoot = document.querySelector("#primary-nav");
const contentRoot = document.querySelector("#content");
const tocRoot = document.querySelector("#toc");
const topbarPage = document.querySelector("#topbar-page");
const searchInputs = [...document.querySelectorAll("[data-nav-search], #nav-search, #nav-search-mobile")];
const sidebarToggle = document.querySelector("#sidebar-toggle");
const scrollCue = document.querySelector("#scroll-cue");
const scrollCueButton = scrollCue?.querySelector(".scroll-cue-button");

function buildPages() {
  const pages = {
    "/installation": {
      section: "Install",
      title: "Installation",
      subtitle: "Set up Joker Design System components, tokens, and global styles inside a React project.",
      kind: "installation",
    },
  };

  navGroups.forEach((group) => {
    group.items.forEach((item) => {
      const route = `/${slug(group.title)}/${slug(item)}`;
      pages[route] = createPage(group.title, item);
    });
  });

  return pages;
}

function createPage(section, title) {
  if (section === "Foundations") {
    return {
      section,
      title,
      kind: "foundation",
      subtitle: foundationNotes[title],
    };
  }

  if (section === "Components") {
    return {
      section,
      title,
      kind: "component",
      subtitle: componentSummaries[title],
    };
  }

  if (section === "Patterns") {
    return {
      section,
      title,
      kind: "pattern",
      subtitle: patternSummaries[title],
    };
  }

  if (section === "Templates") {
    return {
      section,
      title,
      kind: "template",
      subtitle: templateSummaries[title],
    };
  }

  if (section === "Flows") {
    return {
      section,
      title,
      kind: "flow",
      subtitle: flowSummaries[title],
    };
  }

  return {
    section,
    title,
    kind: "resource",
    subtitle: resources[title],
  };
}

function renderNav() {
  navRoot.innerHTML = "";

  const installSection = document.createElement("section");
  installSection.className = "nav-section";

  const installHeading = document.createElement("div");
  installHeading.className = "nav-section-button";
  installHeading.textContent = "Install";

  const installLinks = document.createElement("div");
  installLinks.className = "nav-links";

  const installVisible = !state.filteredTerm || "install installation getting started package react".includes(state.filteredTerm);
  if (installVisible) {
    installLinks.append(createNavLink("Installation", "/installation"));
  } else {
    installSection.hidden = true;
  }

  installSection.append(installHeading, installLinks);
  navRoot.append(installSection);

  navGroups.forEach((group) => {
    const section = document.createElement("section");
    section.className = "nav-section";

    const heading = document.createElement("div");
    heading.className = "nav-section-button";
    heading.textContent = group.title;

    const links = document.createElement("div");
    links.className = "nav-links";

    const visibleItems = group.items.filter((item) => {
      if (!state.filteredTerm) return true;
      return `${group.title} ${item}`.toLowerCase().includes(state.filteredTerm);
    });

    visibleItems.forEach((item) => {
      const route = `/${slug(group.title)}/${slug(item)}`;
      links.append(createNavLink(item, route, draftStatus(group.title)));
    });

    if (state.filteredTerm && visibleItems.length === 0) {
      section.hidden = true;
    }

    section.append(heading, links);
    navRoot.append(section);
  });
}

function createNavLink(label, route, status) {
  const link = document.createElement("a");
  link.className = `nav-link${state.route === route ? " active" : ""}`;
  link.href = `#${route}`;
  link.textContent = label;

  if (status) {
    const pill = document.createElement("span");
    pill.className = "status-pill";
    pill.textContent = status;
    link.append(pill);
  }

  return link;
}

function renderPage() {
  const page = pageRegistry[state.route] || pageRegistry["/installation"];
  topbarPage.textContent = page.title;
  contentRoot.dataset.page = slug(page.title);
  contentRoot.innerHTML = `${templates[page.kind](page)}${pageSequenceNavigation(state.route)}`;
  hydrateLucideIcons(contentRoot);
  bindMobileNavigation(contentRoot);
  bindMobileScrollCues(contentRoot);
  renderToc();
  window.scrollTo(0, 0);
  contentRoot.focus({ preventScroll: true });
}

function navigateToRoute(route, { updateHash = true } = {}) {
  const nextRoute = normalizeRoute(route);
  const nextHash = `#${nextRoute}`;
  const shouldRender = state.route !== nextRoute;

  state.route = nextRoute;

  if (updateHash && location.hash !== nextHash) {
    location.hash = nextHash;
  }

  if (shouldRender) {
    renderNav();
    renderPage();
  }

  document.body.classList.remove("sidebar-open");
}

function bindMobileNavigation(root = document) {
  root.querySelectorAll("[data-mobile-nav-toggle]").forEach((toggle) => {
    if (toggle.dataset.mobileNavBound === "true") return;
    toggle.dataset.mobileNavBound = "true";
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const mobileNav = toggle.closest("[data-mobile-nav]");
      if (!mobileNav) return;
      const isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function bindMobileScrollCues(root = document) {
  root.querySelectorAll(".joker-mobile-game-shell").forEach((shell) => {
    const scroller = shell.querySelector(".joker-mobile-game-content");
    const cue = shell.querySelector(".joker-mobile-scroll-cue");
    if (!scroller || !cue) return;

    const updateCue = () => {
      const canScroll = scroller.scrollHeight > scroller.clientHeight + 1;
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
      const shouldHide = !canScroll || atBottom;

      cue.classList.toggle("is-hidden", shouldHide);
      cue.setAttribute("aria-hidden", String(shouldHide));
    };

    scroller.addEventListener("scroll", updateCue, { passive: true });
    requestAnimationFrame(updateCue);
  });
}

function setRailNavigationSelection(target) {
  const rail = target.closest(".joker-product-rail, .joker-mobile-nav");
  if (!rail) return;

  rail.querySelectorAll("[data-product-rail-item]").forEach((item) => {
    const isSelected = item === target;
    item.classList.toggle("is-selected", isSelected);
    if (isSelected) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  rail.querySelectorAll("[data-game-menu-option]").forEach((option) => {
    const isSelected = option === target;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-checked", String(isSelected));
  });
}

function pageSequenceNavigation(route) {
  const currentIndex = pageOrder.indexOf(route);
  const previousRoute = currentIndex > 0 ? pageOrder[currentIndex - 1] : null;
  const nextRoute = currentIndex >= 0 && currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null;
  const navigationLink = (targetRoute, direction) => {
    if (!targetRoute) return `<span class="page-sequence-spacer" aria-hidden="true"></span>`;
    const targetPage = pageRegistry[targetRoute];
    return `
      <a class="page-sequence-link joker-cta-preview ghost ${direction}" href="#${targetRoute}" aria-label="${direction === "previous" ? "Previous" : "Next"}: ${targetPage.title}">
        <span class="page-sequence-arrow" aria-hidden="true">${lucideIcon(direction === "previous" ? "chevron-left" : "chevron-right")}</span>
        <span>${targetPage.title}</span>
      </a>
    `;
  };

  return `
    <nav class="page-sequence-nav" aria-label="Previous and next documentation pages">
      ${navigationLink(previousRoute, "previous")}
      ${navigationLink(nextRoute, "next")}
    </nav>
  `;
}

hydrateLucideIcons(document);
renderNav();
renderPage();
setupInteractions();

function setupInteractions() {
  const gameContainerDefaultZoom = 0.29;
  let activeGameZoomViewport = null;
  let activeGamePan = null;

  const closeCollapsedRailSearch = (activeSearch) => {
    document.querySelectorAll(".joker-product-rail .joker-rail-search-item.is-search-open").forEach((search) => {
      if (search === activeSearch) return;
      search.classList.remove("is-search-open");
    });
  };

  const setActiveGameZoomViewport = (target) => {
    activeGameZoomViewport = target?.closest?.("[data-game-zoom-viewport]") || activeGameZoomViewport;
  };

  const updateGameContainerZoom = (viewport, nextZoom) => {
    if (!viewport) return;
    const zoom = Math.min(1.4, Math.max(0.25, Math.round(nextZoom * 100) / 100));

    viewport.style.setProperty("--game-container-zoom", zoom);
    viewport.dataset.zoom = String(zoom);
  };

  const updateGameContainerPan = (viewport, panX, panY) => {
    if (!viewport) return;
    const nextX = Math.round(panX);
    const nextY = Math.round(panY);
    viewport.style.setProperty("--game-container-pan-x", `${nextX}px`);
    viewport.style.setProperty("--game-container-pan-y", `${nextY}px`);
    viewport.dataset.panX = String(nextX);
    viewport.dataset.panY = String(nextY);
  };

  const stepGameContainerZoom = (viewport, direction) => {
    const currentZoom = Number.parseFloat(viewport?.dataset.zoom || String(gameContainerDefaultZoom));
    updateGameContainerZoom(viewport, currentZoom + direction * 0.08);
  };

  const updateScrollCue = () => {
    const firstViewportComplete = window.scrollY >= window.innerHeight - 1;
    const pageFitsViewport = document.documentElement.scrollHeight <= window.innerHeight + 1;
    const pageEndReached = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
    const shouldHideScrollCue = firstViewportComplete || pageFitsViewport || pageEndReached;
    scrollCue?.classList.toggle("is-hidden", shouldHideScrollCue);
    scrollCue?.setAttribute("aria-hidden", String(shouldHideScrollCue));
  };

  scrollCueButton?.addEventListener("click", () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  });
  window.addEventListener("scroll", updateScrollCue, { passive: true });
  window.addEventListener("resize", updateScrollCue, { passive: true });
  requestAnimationFrame(updateScrollCue);

  window.addEventListener("hashchange", () => {
    navigateToRoute(location.hash, { updateHash: false });
    requestAnimationFrame(updateScrollCue);
  });

  searchInputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      const value = event.target.value;
      state.filteredTerm = value.trim().toLowerCase();
      searchInputs.forEach((otherInput) => {
        if (otherInput !== event.target) otherInput.value = value;
      });
      renderNav();
    });
  });

  sidebarToggle.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-open");
  });

  document.addEventListener("pointerover", (event) => {
    setActiveGameZoomViewport(event.target);
  });

  document.addEventListener("focusin", (event) => {
    setActiveGameZoomViewport(event.target);
  });

  document.addEventListener("pointerout", (event) => {
    const viewport = event.target?.closest?.("[data-game-zoom-viewport]");
    if (!viewport || viewport.contains(event.relatedTarget)) return;
    if (activeGameZoomViewport === viewport && document.activeElement !== viewport) {
      activeGameZoomViewport = null;
    }
  });

  document.addEventListener("wheel", (event) => {
    const viewport = event.target?.closest?.("[data-game-zoom-viewport]");
    if (!viewport || (!event.metaKey && !event.ctrlKey)) return;

    event.preventDefault();
    activeGameZoomViewport = viewport;
    stepGameContainerZoom(viewport, event.deltaY < 0 ? 1 : -1);
  }, { passive: false });

  document.addEventListener("pointerdown", (event) => {
    const viewport = event.target?.closest?.("[data-game-zoom-viewport]");
    const interactiveTarget = event.target?.closest?.("a, button, input, textarea, select, [data-code-toggle], [data-copy]");
    if (!viewport || interactiveTarget || event.button !== 0) return;

    activeGameZoomViewport = viewport;
    activeGamePan = {
      viewport,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX: Number.parseFloat(viewport.dataset.panX || "0"),
      panY: Number.parseFloat(viewport.dataset.panY || "0"),
    };

    viewport.classList.add("is-panning");
    viewport.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  document.addEventListener("pointermove", (event) => {
    if (!activeGamePan) return;

    const deltaX = event.clientX - activeGamePan.startX;
    const deltaY = event.clientY - activeGamePan.startY;
    updateGameContainerPan(activeGamePan.viewport, activeGamePan.panX + deltaX, activeGamePan.panY + deltaY);
  });

  const stopGameContainerPan = (event) => {
    if (!activeGamePan) return;

    activeGamePan.viewport.releasePointerCapture?.(event.pointerId);
    activeGamePan.viewport.classList.remove("is-panning");
    activeGamePan = null;
  };

  document.addEventListener("pointerup", stopGameContainerPan);
  document.addEventListener("pointercancel", stopGameContainerPan);

  document.addEventListener("click", async (event) => {
    const docsRouteLink = event.target.closest(".nav-link, .brand-logo, .mobile-topbar-logo, .page-sequence-link, .doc-card");
    const docsRouteHref = docsRouteLink?.getAttribute("href");
    if (docsRouteHref?.startsWith("#/")) {
      event.preventDefault();
      navigateToRoute(docsRouteHref);
      requestAnimationFrame(updateScrollCue);
      return;
    }

    const railSearch = event.target.closest(".joker-product-rail .joker-rail-search-item");
    const railSearchInput = railSearch?.querySelector("input");
    const rail = railSearch?.closest(".joker-product-rail");
    const isCollapsedRailSearch = Boolean(
      railSearch &&
      rail &&
      (rail.classList.contains("is-collapsed") || window.matchMedia("(max-width: 1000px)").matches)
    );

    closeCollapsedRailSearch(railSearch);

    if (isCollapsedRailSearch) {
      if (event.target !== railSearchInput) {
        event.preventDefault();
        railSearch.classList.add("is-search-open");
        railSearchInput?.focus({ preventScroll: true });
      }
      return;
    }

    const dropdownOption = event.target.closest("[data-dropdown-option]");
    if (dropdownOption) {
      const dropdown = dropdownOption.closest("[data-dropdown-field]");
      const value = dropdownOption.dataset.dropdownOption;
      const label = dropdownOption.textContent.trim();
      dropdown.querySelector("[data-dropdown-value]").textContent = label;
      dropdown.querySelector("[data-dropdown-toggle]").setAttribute("aria-expanded", "false");
      dropdown.classList.remove("is-open");
      dropdown.dataset.value = value;
      dropdown.querySelectorAll("[data-dropdown-option]").forEach((option) => {
        const isSelected = option === dropdownOption;
        option.setAttribute("aria-selected", String(isSelected));
      });
      return;
    }

    const dropdownToggle = event.target.closest("[data-dropdown-toggle]");
    if (dropdownToggle) {
      const dropdown = dropdownToggle.closest("[data-dropdown-field]");
      const isOpen = dropdown.classList.toggle("is-open");
      dropdownToggle.setAttribute("aria-expanded", String(isOpen));
      document.querySelectorAll("[data-dropdown-field].is-open").forEach((otherDropdown) => {
        if (otherDropdown === dropdown) return;
        otherDropdown.classList.remove("is-open");
        otherDropdown.querySelector("[data-dropdown-toggle]")?.setAttribute("aria-expanded", "false");
      });
      return;
    }

    const gameMenuToggle = event.target.closest("[data-game-menu-toggle]");
    if (gameMenuToggle) {
      const gameMenu = gameMenuToggle.closest("[data-game-menu]");
      const isOpen = gameMenu.classList.toggle("is-open");
      gameMenuToggle.setAttribute("aria-expanded", String(isOpen));
      return;
    }

    const mobileNavToggle = event.target.closest("[data-mobile-nav-toggle]");
    if (mobileNavToggle) {
      const mobileNav = mobileNavToggle.closest("[data-mobile-nav]");
      const isOpen = mobileNav.classList.toggle("is-open");
      mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
      return;
    }

    const gameMenuOption = event.target.closest("[data-game-menu-option]");
    if (gameMenuOption) {
      event.preventDefault();
      setRailNavigationSelection(gameMenuOption);
      return;
    }

    const multiplierStep = event.target.closest("[data-multiplier-step]");
    if (multiplierStep) {
      const field = multiplierStep.closest(".joker-input-field.multiplier");
      const input = field?.querySelector("[data-multiplier-input]");
      if (!input) return;

      const direction = multiplierStep.dataset.multiplierStep === "up" ? 1 : -1;
      const currentValue = parseMultiplierValue(input.value);
      const nextValue = Math.max(1, Math.round((currentValue + direction * 0.1) * 10) / 10);
      input.value = formatMultiplierValue(nextValue);
      input.focus();
      input.setSelectionRange(input.value.length - 1, input.value.length - 1);
      return;
    }

    const productRailItem = event.target.closest("[data-product-rail-item]");
    if (productRailItem) {
      event.preventDefault();
      setRailNavigationSelection(productRailItem);
      return;
    }

    if (!event.target.closest("[data-dropdown-field]")) {
      document.querySelectorAll("[data-dropdown-field].is-open").forEach((dropdown) => {
        dropdown.classList.remove("is-open");
        dropdown.querySelector("[data-dropdown-toggle]")?.setAttribute("aria-expanded", "false");
      });
    }

    const codeToggle = event.target.closest("[data-code-toggle]");
    if (codeToggle) {
      const panel = codeToggle.closest("[data-code-collapsible]");
      const expanded = panel?.dataset.codeExpanded === "true";
      const nextExpanded = !expanded;
      panel.dataset.codeExpanded = String(nextExpanded);
      codeToggle.setAttribute("aria-expanded", String(nextExpanded));
      codeToggle.textContent = nextExpanded ? "Hide Code" : "View Code";
      return;
    }

    const copyButton = event.target.closest("[data-copy]");
    if (!copyButton) return;

    const value = copyButton.dataset.copyValue;
    const target = copyButton.dataset.copy ? document.querySelector(copyButton.dataset.copy) : null;
    if (!value && !target) return;

    await copyText(value || target.textContent.trim());
    if (copyButton.classList.contains("copy-icon-button") || copyButton.classList.contains("code-action-button")) {
      const icon = copyButton.querySelector(".copy-icon");
      copyButton.classList.add("is-copied");
      copyButton.dataset.copyFeedback = "Copied to clipboard";
      if (icon) icon.innerHTML = lucideIcon("check");
      copyButton.setAttribute("aria-label", "Copied to clipboard");
      setTimeout(() => {
        copyButton.classList.remove("is-copied");
        delete copyButton.dataset.copyFeedback;
        if (icon) icon.innerHTML = lucideIcon("copy");
        copyButton.setAttribute("aria-label", copyButton.dataset.copyLabel || "Copy color value");
      }, 1400);
      return;
    }

    if (copyButton.classList.contains("variable-copy-button")) {
      copyButton.classList.add("is-copied");
      copyButton.dataset.copyFeedback = "Copied to clipboard";
      copyButton.setAttribute("aria-label", "Copied to clipboard");
      setTimeout(() => {
        copyButton.classList.remove("is-copied");
        delete copyButton.dataset.copyFeedback;
        copyButton.setAttribute("aria-label", copyButton.dataset.copyLabel || "Copy value");
      }, 1400);
      return;
    }

    const previous = copyButton.innerHTML;
    copyButton.textContent = "Copied to clipboard";
    setTimeout(() => {
      copyButton.innerHTML = previous;
    }, 1400);
  });

  document.addEventListener("input", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const multiplierInput = target?.closest("[data-multiplier-input]");
    if (multiplierInput) {
      const numericValue = multiplierInput.value.replace(/[^\d.]/g, "");
      multiplierInput.value = numericValue ? `${numericValue}x` : "";
      return;
    }

    const otpInput = target?.closest("[data-otp-input]");
    if (!otpInput) return;

    const digit = otpInput.value.replace(/\D/g, "").slice(-1);
    otpInput.value = digit;

    if (!digit) {
      otpInput.removeAttribute("data-filled");
      delete otpInput.dataset.rawValue;
      return;
    }

    otpInput.dataset.rawValue = digit;
    otpInput.setAttribute("data-filled", "true");

    window.setTimeout(() => {
      if (otpInput.dataset.rawValue === digit) otpInput.value = "*";
    }, 220);

    const group = otpInput.closest(".joker-otp-group");
    const inputs = [...group.querySelectorAll("[data-otp-input]")];
    const nextInput = inputs[inputs.indexOf(otpInput) + 1];
    nextInput?.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCollapsedRailSearch();
      const activeRailSearch = document.activeElement?.closest?.(".joker-product-rail .joker-rail-search-item");
      if (activeRailSearch) document.activeElement.blur();
    }

    if ((event.metaKey || event.ctrlKey) && activeGameZoomViewport) {
      const zoomIn = event.key === "+" || event.key === "=";
      const zoomOut = event.key === "-" || event.key === "_";
      const resetZoom = event.key === "0";

      if (zoomIn || zoomOut || resetZoom) {
        event.preventDefault();
        if (resetZoom) {
          updateGameContainerZoom(activeGameZoomViewport, gameContainerDefaultZoom);
          updateGameContainerPan(activeGameZoomViewport, 0, 0);
        } else {
          stepGameContainerZoom(activeGameZoomViewport, zoomIn ? 1 : -1);
        }
        return;
      }
    }

    const target = event.target instanceof Element ? event.target : null;
    const multiplierInput = target?.closest("[data-multiplier-input]");
    if (multiplierInput && event.key === "Enter") {
      multiplierInput.value = formatMultiplierValue(parseMultiplierValue(multiplierInput.value));
      multiplierInput.blur();
      return;
    }

    const otpInput = target?.closest("[data-otp-input]");
    if (!otpInput || event.key !== "Backspace") return;

    if (otpInput.value && otpInput.value !== "*") return;
    event.preventDefault();
    otpInput.value = "";
    otpInput.removeAttribute("data-filled");
    delete otpInput.dataset.rawValue;

    const group = otpInput.closest(".joker-otp-group");
    const inputs = [...group.querySelectorAll("[data-otp-input]")];
    const previousInput = inputs[inputs.indexOf(otpInput) - 1];
    previousInput?.focus();
  });

  document.addEventListener("focusout", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const multiplierInput = target?.closest("[data-multiplier-input]");
    if (!multiplierInput) return;

    multiplierInput.value = formatMultiplierValue(parseMultiplierValue(multiplierInput.value));
  });

}

function parseMultiplierValue(value) {
  const parsed = Number.parseFloat(String(value).replace(/[^\d.]/g, ""));
  if (!Number.isFinite(parsed)) return 1;
  return Math.max(1, Math.round(parsed * 10) / 10);
}

function formatMultiplierValue(value) {
  const rounded = Math.max(1, Math.round(value * 10) / 10);
  return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1)}x`;
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall through to the textarea fallback for local previews and restricted browsers.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function draftStatus() {
  return "";
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
      if (heading.title === "Joker White" && !items.some((item) => item.type === "label" && item.title === "Primitives")) {
        const primitivesHeading = headings.find((item) => item.title === "Primitives");
        if (primitivesHeading && !items.some((item) => item.title === "Primitives")) items.push(primitivesHeading);
      }
      items.push(heading);
      return items;
    }, []);
  }

  if (state.route === "/components/inputs") {
    const hiddenInputAnchors = new Set(["otp-input-example", "input-states-example"]);
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

function normalizeRoute(hash) {
  const clean = hash.replace(/^#/, "").split("/").slice(0, 3).join("/");
  if (clean === "/foundations/color-variables") return "/foundations/colors";
  if (!clean || clean === "/" || clean === "/overview") return "/installation";
  return pageRegistry[clean] ? clean : "/installation";
}
