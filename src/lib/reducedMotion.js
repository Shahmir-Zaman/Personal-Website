// Read once at load: the OS setting rarely changes mid-visit, and a static value
// keeps render paths and useFrame loops free of subscriptions.
export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
