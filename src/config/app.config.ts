interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Cake Designer'],
  customerRoles: ['End Customer'],
  tenantRoles: ['Cake Designer'],
  tenantName: 'Business',
  applicationName: 'CharmingApp',
  addOns: ['chat', 'notifications'],
};
