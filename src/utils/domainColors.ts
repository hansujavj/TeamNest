export const DOMAIN_COLORS: Record<string, string> = {
  Design: "bg-purple-100 text-purple-800 border-purple-300",
  Dev: "bg-blue-100 text-blue-800 border-blue-300",
  Marketing: "bg-green-100 text-green-800 border-green-300",
  QA: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Research: "bg-pink-100 text-pink-800 border-pink-300",
};

export function getDomainColor(domain: string) {
  return DOMAIN_COLORS[domain] || "bg-gray-100 text-gray-800 border-gray-300";
} 