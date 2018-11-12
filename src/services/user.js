export function getUserInfo(token) {
  const user = fetch(`https://conduit.productionready.io/api/user`, {
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

  return user;
}

export function updateUserInfo(email, username, password, image, bio, token) {
  const user = fetch(`https://conduit.productionready.io/api/user`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      email,
      username,
      password,
      image,
      bio
    })
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  });

  return user
}

export function followAuthor(authorName, token) {
  const authorProfile = fetch(`https://conduit.productionready.io/api/profiles/${authorName}/follow`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  });

  return authorProfile
}

export function unfollowAuthor(authorName, token) {
  const authorProfile = fetch(`https://conduit.productionready.io/api/profiles/${authorName}/follow`, {
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

  return authorProfile
}