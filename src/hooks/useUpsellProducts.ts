import React, { useEffect, useState } from 'react'
import { fetchProductBySlug } from 'services/products';

const useUpsellProducts = (product) => {
  const [upsellProduct, setUpSellProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tag = product.tags.find(tag => tag.name === "mittorb4" || tag.name === "mittorb2" || tag.name === "pn46t" || tag.name === "XT4" || tag.name === "HS5" || tag.name === "KEYPOP")
    if (!tag) return;

    if (tag.name === "mittorb4") {
      getAsyncData({ productSlug: "bft-mitto-b-rcb4" });
    } else if (tag.name === "mittorb2") {
      getAsyncData({ productSlug: "bft-mitto-b-rcb02-r1" });
    } else if (tag.name === "pn46t") {
      getAsyncData({ productSlug: "kontrol-profelmnet-43392-mhz-pn-46t" });
    } else if (tag.name === "XT4") {
      getAsyncData({ productSlug: "faac-xt4-433rc" });
    } else if (tag.name === "HS5") {
      getAsyncData({ productSlug: "hormann-hs5-868-bs-black-kontrol" })
    } else if (tag.name === "KEYPOP") {
      getAsyncData({ productSlug: "somfy-keypop-κοντρόλ-γκαραζόπορτας" })
    }


    async function getAsyncData({ productSlug }) {
      setLoading(true);
      const { product, error } = await fetchProductBySlug(productSlug);
      setLoading(false);

      if (error) return;
      setUpSellProduct(product);
    }
  }, [product]);

  return { upsellProduct, loading }
}

export default useUpsellProducts