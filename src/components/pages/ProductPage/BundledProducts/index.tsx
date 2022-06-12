import React, { useEffect, useState } from 'react'
import { 
  Box, 
  Heading, 
  Wrap, 
  HStack, 
  Divider, 
  Stack, 
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Image,
  Square
} from '@chakra-ui/react';
import useSWR from 'swr';
import WooCommerce from 'lib/woocommerce';
import axios from 'axios';
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import Link from 'next/link'
import { extractProductCatAndProd } from 'utils/extractProductLink';
import { isProductOutOfStock } from 'utils/products-utils';
import { FormattedMessage } from 'react-intl';
import StockStatus from '../StockStatus';

const BundledProducts = ({ product }) => {
  const [bundledByProducts, setBundledByProducts] = useState([]);

  useEffect(() => {
    async function getAsyncData() {
      /* Using 'bundled_items fields */
      const products = await Promise.all(product.bundled_items.map(async (bundledProduct: any) => {
        const { data: product } = await axios.get(`${siteURL}/wp-json/wc/v3/products/${bundledProduct.product_id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)
        return { ...product, ...bundledProduct }
      }))
  
      setBundledByProducts(products)

      /* Using 'bundled_by' fields */
      // const products = await Promise.all(product.bundled_by.map(async (id: string) => {
      //   const { data: product } = await axios.get(`${siteURL}/wp-json/wc/v3/products/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)
      //   return product
      // }))
  
      // setBundledByProducts(products)
    }
    getAsyncData();
  }, [product]);

  if (bundledByProducts.length === 0) return null;
  return (
    <Box px={{base: "5", md: "16"}} rounded="md" shadow="md" border="1px" borderColor="gray.100" w="full" mx="2" mb={10} py={20}>
      <Heading my={5} display="inline-block" fontSize="20" fontWeight="bold" as="h3">Περιέχονται μέσα στο kit: </Heading><span><Text marginLeft={2} fontSize="20" display="inline-block" color="gray.400">{product.name}</Text></span>
      <Table variant="simple">
        <Tbody>
          {bundledByProducts.map((product: any, idx: number) => {
            const { product: productSlug, category: categorySlug } = extractProductCatAndProd(product.permalink)
            return (
              <Tr key={product.id}>
                <Td w="5rem">
                  <Square size="4rem">
                    <Image 
                      w="full"
                      height="auto"
                      objectFit="cover"
                      alt='Img'
                      src={product?.images[0]?.src}
                    />
                  </Square>
                </Td>
                <Td>
                  <Stack>
                    <Link href={`/${categorySlug}/${productSlug}`}>
                      <a>{product.name}</a>
                    </Link>
                    <Text fontSize="sm" color="GrayText">Τεμάχια στο kit: {product.quantity_min}</Text>
                    {/* {<Text textColor="green" pr="2" fontWeight="bold">{!isProductOutOfStock(product) && 'Σε απόθεμα'}</Text>} */}
                    {/* <Text color="whatsapp.600" fontSize="17px" fontWeight="semibold">
                      <FormattedMessage id="ProductPage.onlyleftinstock" defaultMessage="Only left in stock" values={{ productQuantity: product.stock_quantity }} />
                    </Text> */}
                    <StockStatus product={product} />
                  </Stack>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
  </Box>
  )
}

export default BundledProducts
