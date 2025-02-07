export function getInitials(fullName?: string) {
  if (!fullName || fullName.length === 0) {
    return "N/A";
  }
  const parts = fullName.split(" ");

  if (parts.length === 1) {
    return parts.at(0)?.slice(0, 2).toUpperCase();
  }
  if (parts.length >= 2) {
    const first = parts.at(0);
    const last = parts.at(-1);
    return `${first?.slice(0, 1)}${last?.slice(0, 1)}`.toUpperCase();
  }

  return "N/A";
}
