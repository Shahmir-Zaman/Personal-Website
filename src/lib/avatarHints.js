// Contextual hints spoken by the avatar's speech bubble as the visitor scrolls.
//
// Each one teaches an interaction that is genuinely non-obvious — the site has
// several affordances (cards that jump, phrases that drive a carousel, a
// draggable avatar) that a visitor would otherwise never discover. Keep the
// copy short: the bubble sits in a 120px-wide widget and wraps at 200px.
//
// `target` is a selector already present in the DOM; hints whose target is
// missing are skipped rather than throwing, so removing a section cannot break
// the widget.
export const AVATAR_HINTS = [
  {
    id: 'featured',
    target: '#projects',
    text: 'Every project here has a live site and a public repo',
  },
  {
    id: 'casestudy',
    target: '#mlcasestudy',
    text: 'The underlined phrases jump to that slide — try one',
  },
  {
    id: 'contact',
    target: '#contact',
    text: 'Prefer to ask? I can answer questions right here',
  },
];

// Shown once, on a timer, rather than tied to a section — it is about the
// widget itself, which is on screen the whole time.
export const DRAG_HINT = {
  id: 'drag',
  text: 'You can drag me anywhere',
  delayMs: 12000,
};

export const HINT_VISIBLE_MS = 6000;

/**
 * Watches hint targets and calls `onHint(text)` the first time each becomes
 * meaningfully visible. Returns a cleanup function.
 *
 * `seen` is owned by the caller so the "once per session" guarantee survives
 * re-renders without leaking into module scope (which would also make it
 * un-testable and shared across mounts).
 */
export function observeHints(onHint, seen) {
  if (typeof IntersectionObserver === 'undefined') return () => {};

  const elements = AVATAR_HINTS
    .map((hint) => ({ hint, el: document.querySelector(hint.target) }))
    .filter(({ el }) => el);

  if (!elements.length) return () => {};

  const byElement = new Map(elements.map(({ hint, el }) => [el, hint]));

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const hint = byElement.get(entry.target);
        if (!hint || seen.has(hint.id)) continue;
        seen.add(hint.id);
        observer.unobserve(entry.target);
        onHint(hint.text);
      }
    },
    { threshold: 0.4 },
  );

  for (const { el } of elements) observer.observe(el);
  return () => observer.disconnect();
}
