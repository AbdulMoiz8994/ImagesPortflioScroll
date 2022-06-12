import { RelatedProductSection } from 'assets/styles/pages.style'
import React, { useEffect, useState } from 'react'
import Carousel from "components/carousel/product-carousel";
import { useMedia } from 'utils/use-media';
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import axios from 'axios';
import { getAllWCProducts, getAllWCProducts1 } from 'services/products';

const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const mobile = useMedia("(max-width: 580px)");
  const tablet = useMedia("(max-width: 991px)");
  const desktop = useMedia("(min-width: 992px)");

  useEffect(() => {
    getRelatedProducts()
    async function getRelatedProducts() {
      try {
        const products = await Promise.all(product.related_ids.map(async (id) => {
          const { data: product } = await axios.get(`${siteURL}/wp-json/wc/v3/products/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
          return product
        }))
    
        setRelatedProducts(products)
      } catch (error) {
        console.log("/products/relatedProducts :: ", { error })
      }
    }
  }, [product]);

  if (relatedProducts.length === 0) return null; 
  return (
    <RelatedProductSection>
      <Carousel
        infinite={false}
        deviceType={{ mobile, tablet, desktop }}
        data={relatedProducts}
      />
    </RelatedProductSection>
  )
}

export default RelatedProducts