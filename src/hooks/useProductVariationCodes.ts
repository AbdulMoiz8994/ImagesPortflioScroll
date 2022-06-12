import { useEffect, useState } from 'react';
import { getVariationCodesFromProdAttributes } from 'utils/products-utils';

const useProductVariationCodes = (product) => {
  const [codes, setCodes] = useState<any[]>([]);

  useEffect(() => {
    const variations = getVariationCodesFromProdAttributes(product.attributes);
    setCodes(variations);
  }, [])

  return codes;
};

export default useProductVariationCodes;
