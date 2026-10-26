/**
 * Progressive enhancements, all optional and all off under reduced motion:
 *   1. reveal elements as they scroll into view (with per-group stagger),
 *   2. a shadow on the header once the page has scrolled.
 *
 * Scrolling itself is left to the browser: native scroll (with the OS's own
 * momentum on touch and trackpads) feels better than anything scripted, and a
 * JS wheel hijack dragged then lurched. Anchor jumps still ease via the CSS
 * `scroll-behavior: smooth`.
 *
 * Nothing here is required to read or use the page. The .reveal content is in
 * the DOM and shown immediately when any of this is unavailable.
 */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/** Mark the document so CSS knows JS is live (gates the reveal start state). */
document.documentElement.classList.add("js");

function initReveal(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  if (items.length === 0) return;

  // No observer, or motion is reduced: show everything at once.
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    for (const el of items) el.classList.add("is-visible");
    return;
  }

  // Stagger children within each [data-stagger] container.
  for (const group of document.querySelectorAll<HTMLElement>("[data-stagger]")) {
    const children = group.querySelectorAll<HTMLElement>(":scope > .reveal");
    children.forEach((child, i) => {
      child.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 70}ms`);
    });
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  for (const el of items) observer.observe(el);
}

function initHeaderShadow(): void {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/**
 * Animate the open/close of a native <details>.
 *
 * <details> toggles instantly on its own. Here the click is intercepted and
 * the element's height is tweened between the summary height and the full
 * height, so the FAQ answers slide rather than snap. The open state is still
 * the real `open` attribute, so it stays accessible and keyboard-operable;
 * only the height is animated.
 */
class Accordion {
  private summary: HTMLElement;
  private content: HTMLElement | null;
  private animation: Animation | null = null;
  private isClosing = false;
  private isExpanding = false;

  constructor(private el: HTMLDetailsElement) {
    this.summary = el.querySelector("summary")!;
    this.content = this.summary.nextElementSibling as HTMLElement | null;
    if (this.summary && this.content) {
      this.summary.addEventListener("click", (e) => this.onClick(e));
    }
  }

  private onClick(e: Event): void {
    e.preventDefault();
    this.el.style.overflow = "hidden";
    if (this.isClosing || !this.el.open) this.open();
    else if (this.isExpanding || this.el.open) this.shrink();
  }

  private shrink(): void {
    this.isClosing = true;
    const start = `${this.el.offsetHeight}px`;
    const end = `${this.summary.offsetHeight}px`;
    this.run(start, end, false);
  }

  private open(): void {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    requestAnimationFrame(() => this.expand());
  }

  private expand(): void {
    this.isExpanding = true;
    const start = `${this.el.offsetHeight}px`;
    // Measure the natural height (including the content's bottom margin) by
    // letting it lay out freely for one read, then animate up to it.
    this.el.style.height = "auto";
    const end = `${this.el.offsetHeight}px`;
    this.el.style.height = start;
    this.run(start, end, true);
  }

  private run(start: string, end: string, opening: boolean): void {
    this.animation?.cancel();
    this.animation = this.el.animate(
      { height: [start, end] },
      { duration: 300, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    this.animation.onfinish = () => this.finish(opening);
    this.animation.oncancel = () => {
      this.isExpanding = false;
      this.isClosing = false;
    };
  }

  private finish(opening: boolean): void {
    this.el.open = opening;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = "";
    this.el.style.overflow = "";
  }
}

function initDetails(): void {
  // Reduced motion keeps the instant native toggle.
  if (reduceMotion.matches) return;
  // Needs the Web Animations API; older engines fall back to native toggle.
  if (!("animate" in HTMLElement.prototype)) return;
  for (const el of document.querySelectorAll<HTMLDetailsElement>("details")) {
    new Accordion(el);
  }
}

try {
  initReveal();
  initHeaderShadow();
  initDetails();
} catch {
  // An enhancement failing must never break the page: reveal everything.
  for (const el of document.querySelectorAll(".reveal")) el.classList.add("is-visible");
}
