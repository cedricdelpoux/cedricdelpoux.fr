export const getLocale = (pathname) =>
  /^\/en(\/|$)/.test(pathname) ? "en" : "fr"
