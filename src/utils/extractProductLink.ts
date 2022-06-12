export const extractProductLink = (productLink: string) => {
  const productURI = productLink.split("/").slice(3).join("/");  // ---> category/productID/

  return productURI
}

export const extractProductCatAndProd = (productLink: string) => {
  const splitted = productLink.split("/"); 

  const category = splitted[3];
  const product = splitted[4];

  return {
    category, product
  }
}