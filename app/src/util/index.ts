export const parseCVE = (cve: string): string => {
  const stripped = cve.replace(/[^\d]/g, '');

  if (stripped.length > 4) {
    return `CVE-${stripped.slice(0, 4)}-${stripped.slice(4, 11)}`;
  }
  return `CVE-${stripped}`;
};
