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
    window.scrollTo(
      0,
      Math.round(cosParameter + cosParameter * Math.cos(scrollCount))
    );
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
      return true;
    }
    return false;
  });
  !_.isEmpty(removeDup) &&
    removeDup.map(item => {
      follwingAuthors.push({
        authorName: item.author.username,
        following: true,
      });
    });
  return follwingAuthors;
}

function getPager(totalItems, currentPage = 1, itemPerPage = 10) {
  const totalPages = Math.ceil(totalItems / itemPerPage);
  let startPage, endPage;
  if (totalPages <= 10) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = Math.min(startIndex + itemPerPage - 1, totalItems - 1);
  const pages = [...Array(endPage + 1 - startPage).keys()].map(
    i => startPage + i
  );

  return {
    totalItems,
    currentPage,
    itemPerPage,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  };
}

export { scrollToTop, removeDuplicateElement, getPager };
