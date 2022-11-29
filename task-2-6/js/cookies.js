export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options,
  };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  for (let optionKey in options) {
    cookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      cookie += "=" + optionValue;
    }
  }
  document.cookie = cookie;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
  });
}
