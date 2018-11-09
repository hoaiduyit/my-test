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