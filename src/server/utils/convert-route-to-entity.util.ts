const mapping: Record<string, string> = {
  businesses: 'business',
  'cake-designs': 'cake_design',
  'customized-cakes': 'customized_cake',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
