// Sends the visitor from a Project Quickview card to that project's detailed
// view further down the page, then flashes the destination so it is obvious
// which card they landed on. Mirrors the SlideRef affordance already used in
// MLCaseStudy rather than introducing a second navigation pattern.

const FLASH_MS = 1400;

export function scrollToProject(hash) {
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  target.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Re-adding the class alone will not replay a running CSS animation, so drop
  // it and force a reflow first. Without this, clicking the same card twice in
  // a row scrolls but does not flash.
  target.classList.remove('project-flash');
  void target.offsetWidth;
  target.classList.add('project-flash');

  window.setTimeout(() => target.classList.remove('project-flash'), FLASH_MS);
}
