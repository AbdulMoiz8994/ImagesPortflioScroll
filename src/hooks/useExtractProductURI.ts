import { useEffect, useState } from 'react';
const useExtractProductURI = (link) => {
  const [productURI, setProductURI] = useState("#");

  if (!link) return productURI;
  
  useEffect(() => {
    // console.log({ link });
    const productURI = link.split("/").slice(3).join("/");  // ---> category/productID/
    // console.log({ link, productURI });
    setProductURI(productURI);
  }, [link])
  
  return productURI;
}

export default useExtractProductURI
