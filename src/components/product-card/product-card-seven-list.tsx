import React, { FC, useEffect, useState } from 'react';
import { Container, Heading, Box, HStack, Image, Square, Stack, Text, Wrap, Button, Tooltip, Icon, useToast } from '@chakra-ui/react'
import NextImage from "next/image"
import { AddItemToCart } from 'components/add-item-to-cart';
import { useComparison } from 'contexts/comparison/use-comparison';
import { useWishlist } from 'contexts/wishlist/use-wishlist';
import useExtractProductURI from 'hooks/useExtractProductURI';
import Link from 'next/link';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { IoIosGitCompare } from 'react-icons/io';
import { IoGitCompareSharp } from 'react-icons/io5'
import { isProductOutOfStock } from 'utils/products-utils';
import { FormattedMessage } from 'react-intl';

interface Props {
  deviceType: any
  data: any
}
const ProductListCard:FC<Props> = ({ deviceType, data }) => {
  const { addItem, isInComparison, removeItem: removeComparisonItem } = useComparison();
  const { addItem: addItemToWishlist, isInWishlist, removeItem: removeWishlisthItem } = useWishlist();
  const productURI = useExtractProductURI(data?.permalink);
  const toast = useToast();

  if (!data?.images?.[0]?.src) return null;
  return (
    <Box position="relative" className="product-card" w="full" bg="white" rounded="md" border="1px solid #f3f3f3" shadow="sm" px="4" py="8">
      <HStack as="a" spacing="4">
        <Square position="relative" size={{ base: "36", sm: "40", md: "44", lg: "52"}}>
          <NextImage 
            alt={data?.images?.[0]?.alt}
            src={data?.images?.[0]?.src}
            layout="fill"
            objectFit='contain'
            className="product-image"
          />
        </Square>

        <Stack alignSelf="flex-start" w="full">
          <Heading as="h2" fontSize="17" textColor="GrayText" fontWeight="bold">{data.categories?.[0].name}</Heading>
          <Link 
            // href="/[category]/[product]" as={`/${productURI}`}
            href={`/${productURI}`}
            passHref
          >
            <Heading as="a" fontSize="22">{data?.name}</Heading>
          </Link>
          {data.short_description && <Text textColor="GrayText" fontSize="16" noOfLines={2} h="3rem" dangerouslySetInnerHTML={{ __html: data.short_description }}></Text>}
          <Wrap justify="space-between" w="full" align="flex-end">
            <Stack>
              {data.price && <HStack spacing="5">
                <Heading as="h1" fontSize="24" textColor="primary.100">{data.price} €</Heading>
                {data.sale_price && <Heading as="h1" fontSize="18" textDecor="line-through">{data.regular_price} €</Heading>}
              </HStack>}
              {/* Translation:: 'Κωδικός Προϊόντος' --> SKU */}
              {data.sku && <Text>Κωδικός Προϊόντος: {data.sku}</Text>}
            </Stack>
            <Stack align="self-end" w={{ base: "full", sm: "10rem", md: "15rem" }}>
              {/* Translation:: 'Σε απόθεμα' --> 'In Stock' */}
              <Text textColor="green" pr="2" fontWeight="bold">{!isProductOutOfStock(data) && 'Σε απόθεμα'}</Text>
              {parseFloat(data.price) > 0 ? <AddItemToCart 
                deviceType={deviceType} 
                data={data} 
                variant="full" 
                buttonText={<FormattedMessage 
                  id="productCard.addToCart"
                  defaultMessage="Add to Cart"
                />} 
              />: <Text color="green">Καλέστε για τιμή</Text>}
            </Stack>
          </Wrap>
        </Stack>  
      </HStack>

      <Box bg="white" px="2" py="3" shadow="base" position="absolute" left="4" top="4" rounded="full">
          <Stack>
            {/* Wishlist icon button */}  
            <Tooltip label="Προσθήκη στα Αγαπημένα" placement="right" hasArrow gutter={20}>
              <span>
              <Icon  
                transition="all .2s"
                fontSize="20" 
                as={isInWishlist(data.id) ? BsHeartFill : BsHeart}
                color={"black"}
                _hover={{
                  transform: 'scale(1.1)',
                }} 
                _active={{
                  transform: 'translateY(2px)'
                }}
                userSelect="none"
                onClick={() => {
                  if (isInWishlist(data.id)) {
                    // Display toast for successful removal
                    toast({
                      title: "Removed from wishlist.",
                      status: 'warning',
                      position: 'top',
                      isClosable: true,
                    });

                    // should remove from wishlist
                    removeWishlisthItem(data.id)
                    
                    return;
                  }

                  addItemToWishlist(data);
                  toast({
                    title: "Added in wishlist",
                    status: 'success',
                    position: 'top',
                    isClosable: true
                  })
                }}
              />
              </span>
            </Tooltip>

            {/* Comparison icon button */}
            <Tooltip label="Προσθήκη στη Σύγκριση" placement="right" hasArrow gutter={20}>
              <span>
                <Icon  
                  transition="all .2s"
                  fontSize="20" 
                  userSelect="none"
                  as={isInComparison(data.id) ? IoGitCompareSharp : IoIosGitCompare}
                  color="black"
                  _hover={{
                    transform: 'scale(1.1)',
                  }} 
                  _active={{
                    transform: 'translateY(2px)'
                  }}
                  onClick={() => {
                    if (isInComparison(data.id)) {
                      // Message for successful removing
                      toast({
                        title: "Removed from comparison.",
                        status: 'warning',
                        position: 'top',
                        isClosable: true,
                      })
                      
                      // remove from comparison list
                      removeComparisonItem(data.id);

                      return; 
                    }

                    addItem(data);
                    toast({
                      title: "Added in comparison",
                      status: 'success',
                      position: 'top',
                      isClosable: true
                    })
                  }}
                />
              </span>
            </Tooltip>
          </Stack>
        </Box>
    </Box>
  )
}

export default ProductListCard
