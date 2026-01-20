const COOKIE_MAX_AGE = "31536000";

const setCookie = (
  key: string,
  value: string,
  maxAge: string = COOKIE_MAX_AGE,
) => {
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=None; Secure`;
};

export default setCookie;
