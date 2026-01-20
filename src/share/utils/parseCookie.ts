const parseCookie = (key: string, cookie: string) => {
  return cookie
    .split("; ")
    .find((v) => v.startsWith(key + "="))
    ?.split("=")[1];
};

export default parseCookie;
