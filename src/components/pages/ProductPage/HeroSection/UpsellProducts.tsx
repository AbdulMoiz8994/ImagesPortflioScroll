import ImageNext from 'next/image'

import { Box, HStack, Square,  Wrap, Stack, Heading, Link, Text, WrapItem } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react';
import React from 'react'
import { CartIcon } from 'assets/icons/CartIcon';
import { useCart } from 'contexts/cart/use-cart';
import getProductURI from 'utils/getProductURI';
import { AddItemToCart } from 'components/add-item-to-cart';
import { FormattedMessage } from 'react-intl';
import { useMedia } from 'utils/use-media';

const UpsellProducts = ({ product }) => {
  const { addItem } = useCart();
  const mobile = useMedia("(max-width: 580px)");
  const tablet = useMedia("(max-width: 991px)");
  const desktop = useMedia("(min-width: 992px)");

  return (
    <Box position="relative" className="product-card" px="4" py="3" border="1px" borderColor="gray.300" rounded="md">
      <HStack>
        <Square rounded="md" overflow="hidden" border="1px" borderColor="gray.300" size="5rem" position="relative">
          <ImageNext 
            src={product.images?.[0]?.src}
            layout="fill"
            objectFit='cover'
            className="product-image"
          />
        </Square>
        <Wrap pl="4" spacing="4" w="full" justify="space-between">
          <Stack spacing="5" justify="space-between">
            <Heading noOfLines={1} fontSize="16" fontWeight="semibold">
              <Link href={`/${getProductURI(product.permalink)}`}>
                <a>{product.name}</a>
              </Link>
            </Heading>
            <Wrap spacing={{ base: "2", md: "4" }} align="center">
              <Text fontSize="20" fontWeight="semibold">
                {"€ "}
                {product.sale_price ? product.sale_price : product.regular_price}
              </Text>
              <Box w="15rem">
                <AddItemToCart 
                  deviceType={{mobile, tablet, desktop}} 
                  data={product} 
                  variant="full" 
                  buttonText="Πρόσθεσε έξτρα κοντρόλ" 
                />
              </Box>
            </Wrap>
          </Stack>
        </Wrap>
      </HStack>
    </Box>
  )
}

export default UpsellProducts

// LEGACY CODE
// <Box border="1px" borderColor="GrayText" h="5rem">
//   <HStack w="full">
//     <Square position="relative" size="6rem" bg="red">
//       <Image 
//         src="https://admin.sfkshop.gr/wp-content/uploads/2022/03/BFT-PHOBOS-BT-KIT-A25-40-FRA-–-Ηλεκτρομηχανικά-Μπράτσα-Ανοιγόμενης-Πόρτας-.jpg"
//         layout="fill" 
//       />
//     </Square>
//     <Wrap>
//       <Text>Title of the product</Text>
//     </Wrap>
//   </HStack>
// </Box>