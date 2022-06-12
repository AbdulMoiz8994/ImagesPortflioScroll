const useExtractBrandsFromProd = (product: any) => {
  if (!product) return {};
  // const brand = product.attributes.find(att => att.name === "Εταιρεία");
  // return brand
  const brand = product.brands?.[0] || {};
  return brand
}

export default useExtractBrandsFromProd
