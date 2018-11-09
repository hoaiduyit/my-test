export function getArticleList() {
  const articles = fetch("https://conduit.productionready.io/api/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data
  });

  return articles
}

export function getAuthorProfile(author) {
  const profile = fetch(`https://conduit.productionready.io/api/profiles/${author}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  });

  return profile
}

export function filterByAuthor(author) {
  const articles = fetch(`https://conduit.productionready.io/api/articles?author=${author}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  });

  return articles
}

export function favoriteArticles(favorites) {
  const articles = fetch(`https://conduit.productionready.io/api/articles?favorited=${favorites}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  });

  return articles
}

export function articleDetail(articleId) {
  const detail = fetch(`https://conduit.productionready.io/api/articles/${articleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  });

  return detail;
}

export function addComment(articleId, body, token) {
  const comment = fetch(`https://conduit.productionready.io/api/articles/${articleId}/comments`, {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      comment: {
        body
      }
    })
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  })

  return comment
}

export function articleComment(articleId) {
  const comment = fetch(`https://conduit.productionready.io/api/articles/${articleId}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  });

  return comment;
}

export function deleteComment(articleId, token, commentId) {
  const comment = fetch(`https://conduit.productionready.io/api/articles/${articleId}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  });

  return comment;
}

export function addNewArticle(title, description, body, tagList, token) {
  const article = fetch(`https://conduit.productionready.io/api/articles`, {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList
      }
    })
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  })

  return article
}

export function updateArticle(title, description, body, tagList, token, articleId) {
  const article = fetch(`https://conduit.productionready.io/api/articles/${articleId}`, {
    credentials: "same-origin",
    method: "PUT",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList
      }
    })
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  })

  return article
}

export function deleteUserArticle(token, articleId) {
  const article = fetch(`https://conduit.productionready.io/api/articles/${articleId}`, {
    credentials: "same-origin",
    method: "DELETE",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  })

  return article
}

export function getUserFeed(token) {
  const articles = fetch("https://conduit.productionready.io/api/articles/feed", {
    method: "GET",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  })

  return articles;
}