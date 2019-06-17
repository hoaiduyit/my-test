export function signUp(username, email, password) {
  const register = fetch('https://conduit.productionready.io/api/users', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  })

  return register;
}

export function signIn(email, password) {
  const login = fetch('https://conduit.productionready.io/api/users/login', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  })

  return login;
}