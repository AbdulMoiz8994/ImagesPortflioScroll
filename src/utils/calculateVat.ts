/**
 * @param price i.e., 200
 * @param vatInPercentage i.e., 17 
 */
interface CalculateVat {
  price: number,
  vatInPercentage: number
}
export function calculateVat({ price, vatInPercentage }: CalculateVat) {
  if (!vatInPercentage || !price) return {
    vat: 0,
    priceExcludeVat: 0,
    priceIncludeVat: 0
  };

  const originalVatFormula = 1 + (24 / 100);  // 1 + (0.24) = 1.24
  const vatFormula = 1 + (vatInPercentage / 100);  // 1 + (0.17) = 1.17

  const priceExcludeVat = price / originalVatFormula;  // 200 / 1.24 = 161.30
  const priceIncludeVat = priceExcludeVat * vatFormula;  // 161 * 1.17 = 188.72

  const calculateVat = priceIncludeVat - priceExcludeVat;  // 188.72 - 161.30 = 27.42

  return {
    vat: calculateVat, // 27.42
    priceExcludeVat,  // 161.30
    priceIncludeVat   // 188.72
  }
}