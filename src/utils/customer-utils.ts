export function isCustomerFromManagementTeam(customer: any) {
  if (customer?.role === "administrator" || customer?.role === "shop_manager") {
    return true;
  }

  return false
}