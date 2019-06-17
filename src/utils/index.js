import _ from 'lodash';

function scrollToTop(scrollDuration) {
  const isIE = false || !!document.documentMode;
  if (typeof performance === 'undefined') return;
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

function removeDuplicateElement(myArray) {
  const array = [];
  const follwingAuthors = [];
  const removeDup = myArray.filter(item => {
    if (array.indexOf(item.author.username) === -1) {
      array.push(item.author.username);
      return true
    }
    return false
  })
  !_.isEmpty(removeDup) && removeDup.map(item => {
    follwingAuthors.push({ authorName: item.author.username, following: true });
  })
  return follwingAuthors;
}

function getPageFromUrl(page) {
  if (page) {
    return (parseInt(page, 10) / 10) + 1
  }
  return 1;
}

export { scrollToTop, removeDuplicateElement, getPageFromUrl }