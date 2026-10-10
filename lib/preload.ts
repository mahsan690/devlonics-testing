// Lets intro animations wait until the preloader has lifted, so visitors
// actually see them. Falls back to running after a short timeout.
export function onPreloaded(cb: () => void) {
  if (typeof document === "undefined") return () => {};
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cb();
  };
  if (document.documentElement.dataset.preloaded === "1") {
    run();
    return () => {};
  }
  window.addEventListener("dv:preloaded", run, { once: true });
  const t = window.setTimeout(run, 4200);
  return () => {
    window.removeEventListener("dv:preloaded", run);
    window.clearTimeout(t);
  };
}
