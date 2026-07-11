export function getDirection(locale: string) {
  return locale === "ar"
    ? "rtl"
    : "ltr";
}