import React, { useContext, useEffect, useState } from "react";
import { Box, Heading, Stack, Container, Breadcrumb } from "@chakra-ui/react";
import ReactImageGallery from "layouts/ReactImageGallery";
import HeroSection from "components/pages/ProductPage/HeroSection";
import ProductDescription from "components/pages/ProductPage/ProductDescription";
import TechnicalVoucher from "components/pages/ProductPage/TechnicalVoucher";
import ReviewsSection from "components/pages/ProductPage/ReviewsSection";
import ProductFeatures from "components/pages/ProductPage/ProductFeatures";
import BundledProducts from "components/pages/ProductPage/BundledProducts";
import useProductVariationCodes from "hooks/useProductVariationCodes";
import axios from "axios";
import {
  consumerKey,
  consumerSecret,
  siteURL,
} from "site-settings/site-credentials";
import RelatedProducts from "./RelatedProducts";
import { getBreadcrumbListFromCategory } from "utils/category-utils";
import ProductBreadcrumb from "./Breadcrumb.tsx";
import { trackViewedProductActivity } from "services/klaviyo";
import { AuthContext } from "contexts/auth/auth.context";

const ProductPage = ({ product: originalProduct, category }) => {
  const productVariations = useProductVariationCodes(originalProduct);
  const [product, setProduct] = useState(originalProduct);
  const [loading, setLoading] = useState(false);
  const { customer } = useContext<any>(AuthContext)
  
  useEffect(() => {
    setProduct(originalProduct)

    // Track product view using klaviyo
    if (!!customer) {
      trackViewedProductActivity(customer.email, originalProduct);
    }

    // Integration of eshopwithiq
    <script dangerouslySetInnerHTML={{__html: `
      (function(a,b,c,d,e,f,g){a['EshopsWithIQObject']=e;a[e]= a[e] || function(){
        (a[e].q = a[e].q || []).push(arguments);};f=b.createElement(c);f.async=true;
        f.src=d;g=b.getElementsByTagName(c)[0];g.parentNode.insertBefore(f,g);
        })(window,document,'script','//cts.eshopswithiq.com/analytics.js','eshopswithiq_analytics');
        eshopswithiq_analytics('connect');
        //(if it is a product page you may optionally include the ID of the product like this: 
        eshopswithiq_analytics('connect', {'product_id': '${product.id}'});
    `}}/>
  }, [originalProduct])

  const handleChangeProductVariation = async (productCode) => {
    if (productCode === "") {
      setProduct(originalProduct);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.get(
        `${siteURL}/wp-json/wc/v3/products?sku=${productCode}&consumer_secret=${consumerSecret}&consumer_key=${consumerKey}`
      );
      setLoading(false);
      const variationProduct = data[0];
      setProduct({
        ...product,
        id: variationProduct.id,
        name: variationProduct.name,
        price: variationProduct.price,
        short_description: variationProduct.short_description,
        stock_quantity: variationProduct.stock_quantity,
        stock_status: variationProduct.stock_status,
        downloads: variationProduct.downloads,
        images: variationProduct.images,
      });
    } catch (error) {
      setLoading(false);
      console.log("/productPage :: ", { error });
    }
  };
  
  return (
    <Box bg="white">
      {!!category && <Box bg={{ base: "white", md: "#f1f1f1"}} pt={{ base: "4", md: "8", lg: '10'}}>
        <Container maxW="1440px" px={{ base: "4", md: "6" }}>
          <ProductBreadcrumb 
            pb={{ base: "2", md: "4"}}
            data={[
              ...getBreadcrumbListFromCategory(category),
              { name: product.name }
            ]} 
          />
        </Container>
      </Box>}
      <Container maxW="1440px" pt={!category ? { base: "4", md: "8", lg: '10'} : "2"} px={{ base: "4", md: "6" }}>
        <Stack spacing="6" align="center" justify="center">
          <HeroSection
            loading={loading}
            product={product}
            onNameChange={value => console.log({ value })}
            productVariations={productVariations}
            onChangeProductVariation={handleChangeProductVariation}
          />
          <ProductDescription product={product} />
          
          {/* Technical Voucher */}
          {product.downloads.length > 0 && (
            <TechnicalVoucher product={product} />
          )}

          {/* Features section */}
          {product.attributes.length > 0 && <ProductFeatures product={product} />}
          
          <BundledProducts product={product} />
          {/* {product.bundled_by.length > 0 && (
            <BundledProducts product={product} />
          )} */}
          
          <ReviewsSection product={product} />
          <RelatedProducts product={product} />
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductPage;
