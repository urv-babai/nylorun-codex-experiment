export function isValidEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  const at = email.indexOf("@");
  if (at <= 0 || at !== email.lastIndexOf("@")) return false;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!domain.includes(".")) return false;

  const plus = local.indexOf("+");
  if (plus >= 0) {
    const tag = local.slice(plus);
    const tagPattern = new RegExp(tag);
    if (!tagPattern.test(local)) return false;
  }

  const base = plus >= 0 ? local.slice(0, plus) : local;
  return (
    /^[A-Za-z0-9._-]+$/.test(base) &&
    /^[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(domain)
  );
}
