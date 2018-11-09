function scrollToTop(scrollDuration) {
  const isIE = false || !!document.documentMode;
  if (typeof performance === "undefined") return;
  const cosParameter = window.scrollY / 2;
  let scrollCount = 0,
    oldTimestamp = performance.now();
  function step(newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
    if (scrollCount >= Math.PI) window.scrollTo(0, 0);
    if (window.scrollY === 0) return;
    window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
    oldTimestamp = newTimestamp;
    !isIE && window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

export { scrollToTop }