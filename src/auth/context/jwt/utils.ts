/* eslint-disable no-alert */
import { paths } from "@/routes/paths";

import axios from "@/utils/axios";

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (access: string) => {
  if (!access) {
    return false;
  }

  const decoded = jwtDecode(access);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert("Token expired");

    sessionStorage.removeItem("access");

    window.location.href = paths.auth.jwt.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (access: string | null) => {
  if (access) {
    sessionStorage.setItem("access", access);
    if (access)
      axios.defaults.headers.common.Authorization = `Bearer ${access}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(access); // ~3 days by minimals server
    tokenExpired(exp);
  } else {
    sessionStorage.removeItem("access");

    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export const setCookie = (name: string, value: string, exp?: number) => {
  if (exp) {
    axios.defaults.headers.common.Authorization = `Bearer ${value}`;
    // tokenExpired(exp);
    // Convert the timestamp to a valid date string
    const date = new Date(exp);
    const expires = `; expires=${date.toUTCString()}`;

    document.cookie = `${name}=${value || ""}${expires}; path=/`;
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${value}`;
  }
};

// ----------------------------------------------------------------------

export const getCookie = (name: string) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
};
