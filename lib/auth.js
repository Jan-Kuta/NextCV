import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Strapi from "strapi-sdk-javascript/build/main";
import fetch from 'isomorphic-unfetch'

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export const runGraphQLRequest = (gql, token) => {
  // return strapi.request('POST', 'graphql', {data: { query: gql}});
  return fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `${gql}`
    })
  })
};

export const register = (username, email, password) => {
  if (!process.browser) {
    return undefined;
  }
  return strapi.register(username, email, password).then(res => {
    setToken(res);
  });
};
//use strapi to get a JWT and token object, save
//to approriate cookei for future requests
export const login = (email, password) => {
  if (!process.browser) {
    return;
  }
  // Get a token
  return strapi.login(email, password).then(res => {
    setToken(res);
  });
};

export const getProviderAuthenticationUrl = (provider) => {
  return strapi.getProviderAuthenticationUrl(provider);
};

export const authenticateProvider = (provider, params) => {
  return strapi.authenticateProvider(provider, params);
}

export const forgotPassword = (email) => {
  return strapi.forgotPassword(email, window.location.protocol + '//' + window.location.host + '/auth/reset-password');
}

export const resetPassword = (code, password, passwordConfirmation) => {
  return strapi.resetPassword(code, password, passwordConfirmation);
}

export const setToken = token => {
  /*if (!process.browser) {
    return;
  }
  Cookies.set("username", token.user.username);
  Cookies.set("jwt", token.jwt);
  */
  //strapi.setToken(token.jwt, false);
};

export const unsetToken = () => {
  /*if (!process.browser) {
    return;
  }
  Cookies.remove("jwt");
  Cookies.remove("username");
  
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  */
 strapi.clearToken();
};

export const getTokenFromServerCookie = req => {
  if (!req.headers.cookie || "") {
    return undefined;
  }

  let token = req.headers.cookie
    .split(";")
    .find(token => token.trim().startsWith("jwt="));
  if (! token) {
    return undefined;
  }
  token = token.split("=")[1];

  return jwtDecode(token), token;
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};

export const getUserFromServerCookie = req => {
  if (!req.headers.cookie || "") {
    return undefined;
  }

  let username = req.headers.cookie
    .split(";")
    .find(user => user.trim().startsWith("username="));
  if (username) {
    username = username.split("=")[1];
  }

  const jwtCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwtDecode(jwt), username;
};

export const getUserFromLocalCookie = () => {
  return Cookies.get("username");
};

//these will be used if you expand to a provider such as Auth0
const getQueryParams = () => {
  const params = {};
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3;
    }
  );
  return params;
};
export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined;
  }
  const { id_token, state } = getQueryParams();
  return { token: id_token, secret: state };
};