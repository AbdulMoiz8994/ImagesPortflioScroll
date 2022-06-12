import React, { useEffect } from 'react';
import Link from 'next/link';
import { AddItemToCart } from 'components/add-item-to-cart';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from 'components/box';
import getDiscountPercent from 'utils/getDiscountPercent';
import { useState } from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import { Box as ChakraBox, Icon, Stack, useToast, Text, Tooltip, Wrap, HStack } from '@chakra-ui/react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { IoIosGitCompare } from 'react-icons/io';
import { IoGitCompareSharp } from 'react-icons/io5'
import { useComparison } from 'contexts/comparison/use-comparison';
import { useWishlist } from 'contexts/wishlist/use-wishlist';
import { FormattedMessage, useIntl } from 'react-intl';

const Card = styled.div({
  fontFamily: 'Manrope, sans-serif !important',
  backgroundColor: '#fff',
  overflow: 'hidden',
  borderRadius: 6,
  border: '1px solid #f3f3f3',
  display: 'flex',
  flexDirection: 'column',
  transition: '0.3s ease-in-out',
  cursor: 'pointer',
  position: 'relative',

  ':hover': {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-5px)',
  },
});
const ImageWrapper = styled.div({
  // height: 290,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  overflow: 'hidden',
  height: 270,

  '@media screen and (max-width: 1280px)': {
    height: 250,
  },

  '@media screen and (max-width: 560px)': {
    height: 180,
  },
});

const Image = styled.img({
  maxWidth: '100%',
  maxHeight: '100%',
  height: 'auto',
});
const Discount = styled.div(
  css({
    // fontFamily: 'Manrope, sans-serif !important',
    // position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'primary.regular',
    color: '#fff',
    overflow: 'hidden',
    padding: '0.25rem 0.5rem',
    fontSize: 12,
    borderRadius: 6,
    pointerEvents: 'none',
    width: 'max-content'
  })
);
const Title = styled.h2({
  fontFamily: 'inherit',
  marginBottom: 10,
  color: '#999',
  fontSize: 14,
  fontWeight: 'normal',
  height: "5rem"
});

const PriceWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 10,
});

const Price = styled.span(
  css({
    // color: 'text.bold',
    color: "#292929",
    fontSize: 18,
    fontWeight: 'semiBold',
    lineHeight: 1,
  })
);


interface Props {
  data: any;
  deviceType: any
  productsDataType?: "restapi" | "graphql"
}

export const ProductCard = ({ productsDataType="graphql" ,data, deviceType }: Props) => {
  // console.log({ data })
  const { addItem, isInComparison, removeItem: removeComparisonItem } = useComparison();
  const { addItem: addItemToWishlist, isInWishlist, removeItem: removeWishlisthItem } = useWishlist();
  const toast = useToast();
  const router = useRouter()
  const intl = useIntl();
  let title: string, image: { sourceUrl: string }, price: string, salePrice: string, regularPrice:string, link:string;

  if (productsDataType === "restapi") {
    title = data.name;
    image = { sourceUrl: data?.images[0]?.src };
    price = data.price;
    salePrice = data.sale_price;
    regularPrice = data.regular_price;
    link = data.permalink
  } else {
    title = data.name;
    image = { sourceUrl: data?.image?.sourceUrl };
    price = data.price;
    salePrice = data.salePrice;
    regularPrice = data.regularPrice;
    link = data.link
  }

  const [productURI, setProductURI] = useState("#");
  
  let discountInPercent = salePrice ? getDiscountPercent(regularPrice, salePrice) : undefined;

  useEffect(() => {
    const productURI = link.split("/").slice(3).join("/");  // ---> category/productID/
    setProductURI(productURI);
  }, []);

  if (!image.sourceUrl) return null;
  return (
      <Card className="product-card">
        <Link 
          // href="/[category]/[product]" as={`/${productURI}`}
          href={`/${productURI}`}
        >
          <a>
        <Box>
            <Box>
              <ImageWrapper>
                <NextImage 
                  src={data?.images?.[0]?.src}
                  layout="fill"
                  objectFit="contain"
                  className="product-image"
                />
                {/* {discountInPercent ? (
                  <Discount>{discountInPercent}%</Discount>
                ) : null} */}
              </ImageWrapper>
              <Box px={20} mt="4">
                <HStack pb="3" spacing={4} w="full" alignItems="center">
                  {price && <Wrap alignItems="center" justify="center">
                    <Price>{salePrice ? salePrice : price} &euro;</Price>
                    {discountInPercent ? <Text textDecor="line-through" color="GrayText">{regularPrice} &euro;</Text> : null}
                  </Wrap>}
                  {discountInPercent ? (
                    <Discount>{discountInPercent}%</Discount>
                  ) : null}
                </HStack>
                <ChakraBox h="5rem" w="full">
                  <Text color="secondary" noOfLines={3}>{title}</Text>
                </ChakraBox>
              </Box>
            </Box> 
        </Box>
          </a>
        </Link>
        <Box px={20} pb={20}>
          {price ? <>
            <AddItemToCart 
              deviceType={deviceType} 
              data={data} 
              variant="full" 
              buttonText={
                <FormattedMessage 
                  id="productCard.addToCart"
                  defaultMessage="Add to Cart"
                />
              } 
            />
          </> : <Box>
            <Text textAlign="center" color="green">Καλέστε για τιμή</Text>
          </Box>}
        </Box>

        <ChakraBox bg="white" px="2" py="3" shadow="base" position="absolute" left="4" top="4" rounded="full">
          <Stack>
            {/* Wishlist icon button */}  
            <Tooltip 
              label={<FormattedMessage id="productCard.wishlistIcon.tooltip" defaultMessage="Add to Wishlist" />} 
              placement="right" 
              hasArrow 
              gutter={20}
            >
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
                      title: intl.formatMessage({ id: 'toast.removeFromWishlist', defaultMessage: 'Removed from Wishlist' }),
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
                    title: intl.formatMessage({ id: 'toast.addedInWishlist', defaultMessage: 'Added in Wishlist' }),
                    status: 'success',
                    position: 'top',
                    isClosable: true
                  })
                }}
              />
              </span>
            </Tooltip>

            {/* Comparison icon button */}
            <Tooltip 
              // label="Προσθήκη στη Σύγκριση" 
              label={
                <FormattedMessage 
                  id="productCard.compareIcon.tooltip"
                  defaultMessage="Add to Compare"
                />
              } 
              placement="right" 
              hasArrow 
              gutter={20}
            >
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
                        title: intl.formatMessage({ id: "toast.removedFromComparison", defaultMessage: 'Remove from Comparison' }),
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
                      // title: "Added in comparison",
                      title: intl.formatMessage({ id:"toast.addedInComparison", defaultMessage: 'Added in Comparison' }),
                      status: 'success',
                      position: 'top',
                      isClosable: true
                    })
                  }}
                />
              </span>
            </Tooltip>
          </Stack>
        </ChakraBox>
      </Card>
  );
};
