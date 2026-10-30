/**
 * Central query-key factory. Components and hooks must not build array keys by
 * hand — that is how cache invalidation silently stops working.
 */
export const projectKeys = {
  all: ["projects"] as const,
  list: () => [...projectKeys.all, "list"] as const,
  detail: (id: string) => [...projectKeys.all, "detail", id] as const,
  numbers: () => [...projectKeys.all, "numbers"] as const,
};

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export const contactKeys = {
  all: ["contact"] as const,
};
