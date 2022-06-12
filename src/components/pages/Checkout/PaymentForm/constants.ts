export const BANK_TRANSFER = {
  value: "bank transfer",
  payment_method: "bacs",
  payment_method_title: "Direct Bank Transfer",
  paid: false,
  order_status: "on-hold"
};
export const PAY_ON_DELIVERY = {
  value: "pay on delivery",
  payment_method: "cod",
  payment_method_title: "Cash on Delivery",
  paid: false,
  order_status: "processing"
};
export const ALPHA_BANK = {
  value: "alpha bank",
  payment_method: "alphabank_gateway",
  payment_method_title: "Πληρωμή με κάρτα μέσω ασφαλούς περιβάλλοντος της Alpha Bank",
  paid: false,
  order_status: "pending",
}
export const CARD = {
  value: "card",
  payment_method: "card",
  payment_method_title: "Credit / Debit Card",
  paid: true,
  order_status: "processing"
}