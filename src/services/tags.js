export function getListTags() {
  const tags = fetch("https://conduit.productionready.io/api/tags", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data
  });

  return tags
}

export function filterArticlesByTag(tagName) {
  const articles = fetch(`https://conduit.productionready.io/api/articles?tag=${tagName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  })

  return articles
}