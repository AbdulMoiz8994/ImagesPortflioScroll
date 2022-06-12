import Icon from '@chakra-ui/icon';
import { Box, Center, Flex, HStack, Stack, Text, Wrap } from '@chakra-ui/layout'
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa';
// import CartContext from '../../../context/cart/Context';
import _ from 'lodash';
import useExtractProductLink from 'utils/useExractProductLink';
import Link from 'next/link';
import { useCart } from 'contexts/cart/use-cart';
import currencyFormatter from 'currency-formatter'
import { useComparison } from 'contexts/comparison/use-comparison';
import { useWishlist } from 'contexts/wishlist/use-wishlist';
import { useToast } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isProductAbleToIncrement } from 'utils/products-utils';

interface CardProps {
  product: any
  isBordered?: boolean
}

export default function Card({ product, isBordered }: CardProps) {
  const { addItem, removeItem, getItem, isInCart, toggleCart, removeItemFromCart } = useCart();
  const { addItem: addItemToComparison, isInComparison, removeItem: removeComparisonItem } = useComparison();
  const { addItem: addItemToWishlist, isInWishlist, removeItem: removeWishlistItem } = useWishlist();
  const router = useRouter();
  const [availability, setAvailability] = useState("");
  // const [quantity, setQuantity] = useState(product.cartQuantity); // it is from backorder
  // const [quantity, setQuantity] = useState(product.quantity);
  const [quantity, setQuantity] = useState(getItem(product.id)?.quantity || 1);
  const [price, setPrice] = useState(parseFloat(product.price) || 0);
  const [subTotal, setSubTotal] = useState(parseFloat(product.price) || 0);
  const { productURI } = useExtractProductLink(product.permalink);
  const toast = useToast();
  const intl = useIntl()

  // console.log({ checking });
  useEffect(() => {
    // setQuantity(product.cartQuantity)
    setQuantity(product.quantity)
  }, [product])

  // const { onRemoveCartProduct, onUpdateProductQuantity } = useContext(CartContext);

  useEffect(() => {
    if (product.attributes.length === 0) {
      setAvailability("Not available")
      return;
    };

    const { options } = product.attributes.find((attr: any) => attr.name === "Διαθεσιμότητα");
    setAvailability(options[0]);
  }, [])

  useEffect(() => {
    const totalPrice = quantity * price;
    setSubTotal(totalPrice)
  }, [quantity])

  return (
    <Box w="full" pt="2" borderTop={isBordered ? "1px" : "transparent"} borderBottom="1px" borderColor="gray.400">  
      <HStack align="flex-start">
        <Box mr="2" w="32" h="32" position="relative">
          <Image 
            src={product?.images[0]?.src}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Stack flex="1" spacing={2}>
          <Wrap justify="space-between" direction={{ base: "column", md: "row" }}>
            <Link
              href="/[category]/[product]" as={`/${productURI}`}
            >
              <a>
                <Text noOfLines={2} flex="1" mr="4" fontSize='lg' fontWeight="normal">{product.name}</Text>
              </a>
            </Link>
            {/* <Text fontWeight="bold" fontSize="lg" w="28" align="right">&euro; {subTotal.toFixed(2)}</Text> */}
            <Text fontWeight="bold" fontSize="lg" w="28" align="right">&euro; {currencyFormatter.format(subTotal, {})}</Text>
          </Wrap>
          <Text color="primary.100" fontWeight="semibold">{availability}</Text>
          <Wrap direction={{ base: "column", md: "row" }} spacing="3" justify="flex-start" justifyItems="flex-start" align={{ base: "flex-start", md: "center"}}>
            <HStack py="1" w="max-content" >
              <Flex direction="row" border="1px" borderColor="gray.300" bg="white">
                <Center 
                  cursor="pointer" 
                  userSelect="none" 
                  _hover={{ bg: "#99CC00" }} 
                  w="8" 
                  h="8" 
                  borderRight="1px" 
                  borderColor="gray.300"
                  color="black" 
                  onClick={() => {
                    if (quantity === 1) {
                      setQuantity(quantity - 1)
                    }
                    
                    removeItem(product);
                  }} 
                >
                  <Icon as={FaMinus} />
                </Center>
                <Center px="5" h="8" borderRight="1px" borderColor="gray.300" fontSize="md" fontWeight="bold">{quantity}</Center>
                <Center 
                  cursor="pointer" 
                  userSelect="none" 
                  _hover={{ bg: "#99CC00" }} 
                  w="8" 
                  h="8"
                  color={(isProductAbleToIncrement(product, quantity)) ? "black" : "gray.400"} 
                  onClick={() => {
                    if (isProductAbleToIncrement(product, quantity)) {
                      addItem(product)
                      setQuantity(quantity + 1)
                    }
                  }} 
                >
                  <Icon as={FaPlus} />
                </Center>
              </Flex>
            </HStack>

            <Wrap>
              <Box borderRight="1px" h="6" borderColor="gray.400" />
              <Text 
                cursor="pointer" 
                userSelect="none" 
                fontWeight="medium" 
                color="#0066C0"
                onClick={() => removeItemFromCart(product)}
              >
                <FormattedMessage 
                  id="CartPage.delete"
                  defaultMessage="Delete"
                />
              </Text>
              <Box borderRight="1px" h="6" borderColor="gray.400" />
              {/* Comparison */}
              <Text onClick={() => {
                if (isInComparison(product.id)) {
                  // Message for successful removing
                  toast({
                    title: intl.formatMessage({ id: 'toast.removedFromComparison' }),
                    status: 'warning',
                    position: 'top',
                    isClosable: true,
                  })
                  
                  // remove from comparison list
                  removeComparisonItem(product.id);

                  return; 
                }

                addItemToComparison(product);
                toast({
                  title: intl.formatMessage({ id: "toast.addedInComparison", defaultMessage: "Added in Comparison" }),
                  status: 'success',
                  position: 'top',
                  isClosable: true
                })
              }} cursor="pointer" userSelect="none" fontWeight="medium" color="#0066C0">{isInComparison(product.id) ? intl.formatMessage({ id: 'CartPage.removeFromComparison', defaultMessage: 'Remove from comparison' }) : intl.formatMessage({ id: 'CartPage.addtocomparison', defaultMessage: 'Add to comparison' })}</Text>
              <Box borderRight="1px" h="6" borderColor="gray.400" />
              
              {/* Wishlist */}
              <Text onClick={() => {
                if (isInWishlist(product.id)) {
                  // Display toast for successful removal
                  toast({
                    title: intl.formatMessage({ id: 'toast.removeFromWishlist', defaultMessage: 'Removed from wishlist' }),
                    status: 'warning',
                    position: 'top',
                    isClosable: true,
                  });

                  // should remove from wishlist
                  removeWishlistItem(product.id)
                  
                  return;
                }

                addItemToWishlist(product);
                toast({
                  title: intl.formatMessage({ id: 'toast.addedInWishlist', defaultMessage: 'Added in wishlist' }),
                  status: 'success',
                  position: 'top',
                  isClosable: true
                })
              }} cursor="pointer" userSelect="none" fontWeight="medium" color="#0066C0">{isInWishlist(product.id) ? intl.formatMessage({ id: 'CartPage.removeFromWishlist', defaultMessage: 'Remove from wishlist' }) : intl.formatMessage({ id: 'CartPage.addtowishlist', defaultMessage: 'Add to wishlist' })}</Text>
            </Wrap>
          </Wrap>
        </Stack>
      </HStack>
    </Box>
  )
}