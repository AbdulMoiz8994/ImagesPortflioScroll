export function getBillingTypeFromMetaData(meta_data: any[]) {
  const billing = meta_data.find(item => item.key === "_billing_timologio");
  
  // STEP-1: If billing meta object doesn't exist then just show "Receipt"
  if (!billing) return "Απόδειξη"; // Απόδειξη -> Receipt
  
  // Retrieve value, should be either "N" or "Y"
  const billingValue = billing.value;

  // STEP-2 If billing meta object exist but value is "N" then show "Receipt"
  if (billingValue === "N") return "Απόδειξη"; // Απόδειξη -> Receipt

  return "Τιμολόγιο"; // Τιμολόγιο -> Invoice
}

export function getVoucherNumberFromMetaData(meta_data: any[]) {
  return meta_data.find(item => item.key === "wpslash_voucher_courier_tracking")?.value || "";
}

export function getTranslatedPaymentMethod(method_title: string) {
  if (method_title === 'Direct Bank Transfer') return 'Άμεση Τραπεζική Κατάθεση';
  if (method_title === 'Cash on Delivery') return 'Αντικαταβολή';
  if (method_title === 'Credit / Debit Card') return 'Πληρωμή με Πιστωτική/Χρεωστική Κάρτα';
  if (method_title === 'Πληρωμή με κάρτα μέσω ασφαλούς περιβάλλοντος της Alpha Bank') return 'Πληρωμή με Πιστωτική/Χρεωστική Κάρτα μέσω Alpha Bank';

  return method_title
}

export function getShippingMethod(method_title: string) {
  if (method_title === "flat_rate" || method_title === "acs_courier") return "ACS Courier";
  if (method_title === "store") return "Δωρεάν παράδοση μέχρι την μεταφορική"
}

export function getShippingMethodCustom(shipping_method_title: string) {
  if (shipping_method_title === 'Flat Rate') return 'ACS Courier';
  if (shipping_method_title === "")

  return shipping_method_title
}