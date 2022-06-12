import Icon from '@chakra-ui/icon';
import { Box, Center, Flex, HStack, Stack, Text, Wrap } from '@chakra-ui/layout'
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { FaCartArrowDown, FaClosedCaptioning } from 'react-icons/fa';
import { BiGitCompare } from 'react-icons/bi'
// import CartContext from '../../../context/cart/Context';
import _ from 'lodash';
import useExtractProductLink from 'utils/useExractProductLink';
import Link from 'next/link';
import { useCart } from 'contexts/cart/use-cart';
import currencyFormatter from 'currency-formatter'
import { Button, IconButton, Square, useToast } from '@chakra-ui/react';
import { useComparison } from 'contexts/comparison/use-comparison';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useWishlist } from 'contexts/wishlist/use-wishlist';
import { FormattedMessage, useIntl } from 'react-intl';

interface CardProps {
  product: any
  isBordered?: boolean
}

export default function Card({ product, isBordered }: CardProps) {
  const { addItem, getItem, isInCart,} = useCart();
  const { addItem: AddItemInComparison, isInComparison } = useComparison();
  const { removeItem } = useWishlist()
  const router = useRouter();
  const [availability, setAvailability] = useState("");
  const [quantity, setQuantity] = useState(getItem(product.id)?.quantity || 1);
  const [price, setPrice] = useState(parseFloat(product.price) || 0);
  const [subTotal, setSubTotal] = useState(parseFloat(product.price) || 0);
  const { productURI } = useExtractProductLink(product.permalink);
  const toast = useToast();
  const intl = useIntl();

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

  const handleAddToCompare = () => {
    if (isInComparison(product.id)) return; 

    AddItemInComparison(product);
    toast({
      title: intl.formatMessage({ id: 'toast.addedInComparison', defaultMessage: "Added in Comparison" }),
      status: "success",
      position: "top",
      isClosable: true
    })
  }

  const handleAddToCart = () => {
    if (isInCart(product.id)) {
      toast({
        title: intl.formatMessage({ id: 'toast.productQuantityUpdate', defaultMessage: 'Product quantity updated!' }),
        status: "success",
        position: 'top',
        isClosable: true
      })
      return
    }

    addItem(product);
    toast({
      title: intl.formatMessage({ id: 'toast.productAddedInCart', defaultMessage: 'Product added in cart!' }),
      status: "success",
      position: 'top',
      isClosable: true
    })
  }

  const handleRemoveItemFromWishlist = () => {
    removeItem(product.id);
  }

  return (
    <Box w="full" py="4" px="2" borderTop={isBordered ? "1px" : "transparent"} borderBottom="1px" borderColor="gray.400">  
      <HStack align="flex-start">
      <Icon my="auto" onClick={handleRemoveItemFromWishlist} cursor="pointer" userSelect="none" _active={{ transform: 'translateY(2px)' }} color="primary.100" fontSize="2xl" as={IoCloseCircleSharp} />
        <Square mr="2" size="16" position="relative">
          <Image 
            src={product?.images[0]?.src}
            layout="fill"
            objectFit="contain"
          />
        </Square>
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
          {/* <Text color="primary.100" fontWeight="semibold">{availability}</Text> */}
          <Wrap       
            direction={{ base: "column", md: "row" }} 
            spacing="3" 
            justify="flex-start" 
            justifyItems="flex-start" 
            align={{ base: "flex-start", md: "center"}}
          >
            <Wrap h="full">
              {/* <Button 
                leftIcon={<FaCartArrowDown />} 
                size="xs" 
                alignSelf="flex-end" 
                colorScheme="primary"
                onClick={handleAddToCart}
              >
                <FormattedMessage 
                  id="wishlistPage.addToCart"
                  defaultMessage="Add to cart"
                />  
              </Button> */}
              <Button 
                leftIcon={<BiGitCompare />} 
                size="xs" 
                alignSelf="flex-end" 
                colorScheme="gray"
                _hover={{
                  color: "primary.100"
                }}
                disabled={isInComparison(product.id)}
                onClick={handleAddToCompare}
              >
                <FormattedMessage 
                  id="wishlistPage.addToCompare"
                  defaultMessage="Add to compare"
                />  
              </Button>
            </Wrap>
          </Wrap>
        </Stack>
      </HStack>
    </Box>
  )
}