import React, { useEffect, useState } from 'react';
import { Tooltip, Stack, Heading, HStack, Text, Icon, Wrap, Divider, Box, Flex, Center, Button, useToast } from '@chakra-ui/react';
// import { AiOutlineEye } from 'react-icons/ai'
// import StarsRating from 'components/common/StarsRating';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import { IoIosGitCompare } from 'react-icons/io';
import { useCart } from 'contexts/cart/use-cart';
import { useWishlist } from 'contexts/wishlist/use-wishlist';
import { useComparison } from 'contexts/comparison/use-comparison';
import { CustomRadioGroup } from 'components/custom-radio-group';
import { FormattedMessage, useIntl } from 'react-intl';
import { getAvailabilityFromProdAttributes, isProductAbleToAddToCart, isProductAbleToIncrement, isProductOutOfStock } from 'utils/products-utils';
import StockStatus from '../StockStatus';

interface Props {
  product: any
  productVariations: any[]
  onChangeProductVariation: any
  attachment?: any
}
const ActionSection = ({ product, productVariations, onChangeProductVariation, attachment }: Props) => {
  const toast = useToast()
  const [quantity, setQuantity] = useState(1);
  const { addItem, removeItem, getItem, isInCart, toggleCart } = useCart();
  const { addItem: addItemToWishlist, isInWishlist, removeItem: removeWishlisthItem } = useWishlist();
  const { addItem: addItemToComparison, isInComparison, removeItem: removeComparisonItem } = useComparison();
	const [stockStatus, setStockStatus] = useState("");
  const intl = useIntl();
	
	useEffect(() => {
		const { attributes } = product;
		
		const value = getAvailabilityFromProdAttributes(attributes);
		setStockStatus(value);
	}, [product]);

  const handleAddItemToCart = (e) => {
    e.preventDefault();

    const prevQuantity = getItem(product.id)?.quantity || 0;

    if (isProductAbleToAddToCart(product, quantity, prevQuantity)) {
      addItem(product, quantity);              

      // If attachment are available then add them too
      if (attachment !== null && attachment.quantity !== 0) {
        addItem(attachment.product, attachment.quantity);              
      }
    } else {
      toast({
        title: intl.formatMessage({ id: 'toast.productLimitedStockPhrase', defaultMessage: 'This product has limited stock' }),
        position: "top",
        isClosable: true,
        status: 'warning',
      })

      return;
    }


    // addItem(product, quantity);
    if (!isInCart(product.id)) {
      toast({
        title: `${intl.formatMessage({ id: 'toast.productAddedWithQuantity', defaultMessage: `Product added with` })} ${quantity} ${intl.formatMessage({ id: 'toast.productQuantities', defaultMessage: `quantities` })}`,
        position: "top",
        isClosable: true,
        status: 'success',
      })
    } else {
      toast({
        title: `${intl.formatMessage({ id: 'toast.productUpdatedWithQuantity', defaultMessage: `Product updated with` })} ${prevQuantity + quantity} ${intl.formatMessage({ id: 'toast.productQuantities', defaultMessage: `quantities` })}`,
        position: "top",
        isClosable: true,
        status: 'success',
      })
    }   

    setQuantity(1);
  };

  return (
    <Stack spacing={4}>
      {/* Variations */}
      {productVariations.length > 0 && <Stack spacing="1">
        <Text fontWeight="bold">Available in:</Text>
        <CustomRadioGroup 
          options={[...productVariations]}
          onChange={onChangeProductVariation}
        />
      </Stack>}

      <Wrap py="0" spacing="6" align="flex-end">
        <RenderCartButtons 
          product={product}
          quantity={quantity}
          handleAddItemToCart={handleAddItemToCart}
          stockStatus={stockStatus}
          handleMinusButton={() => quantity > 1 && setQuantity(quantity - 1)}
          handlePlusButton={() => isProductAbleToIncrement(product, quantity) && setQuantity(quantity + 1)}
        />
        
        <HStack spacing="4">
          {/* Wishlist icon */}
          <Tooltip label="Προσθήκη στα Αγαπημένα" placement="top" hasArrow gutter={15}>
            <span>
              <Icon  
                cursor="pointer"
                transition="all .2s"
                fontSize="26" 
                as={BsHeart}
                color={isInWishlist(product.id) ? "gray.500" : "black"}
                _hover={{
                    transform: 'scale(1.1)',
                }} 
                _active={{
                    transform: 'translateY(2px)'
                }}
                userSelect="none"
                onClick={() => {
                  if (isInWishlist(product.id)) {
                    // Display toast for successful removal
                    toast({
                      title: intl.formatMessage({ id: 'toast.removeFromWishlist', defaultMessage: 'Removed from wishlist' }),
                      status: 'warning',
                      position: 'top',
                      isClosable: true,
                    });

                    // should remove from wishlist
                    removeWishlisthItem(product.id)
                    
                    return;
                  }

                  addItemToWishlist(product);
                  toast({
                    // title: "Added in wishlist",
                    title: intl.formatMessage({ id: 'toast.addedInWishlist', defaultMessage: 'Added in wishlist' }),
                    status: 'success',
                    position: 'top',
                    isClosable: true
                  })
                }}
              />
            </span> 
          </Tooltip>
          <Tooltip label="Προσθήκη στη Σύγκριση" placement="top" hasArrow gutter={15}>
            <span>
              <Icon  
                transition="all .2s"
                fontSize="30" 
                cursor="pointer"
                userSelect="none"
                as={IoIosGitCompare}
                color={isInComparison(product.id) ? "gray.500" : "black"}
                _hover={{
                  transform: 'scale(1.1)',
                }} 
                _active={{
                  transform: 'translateY(2px)'
                }}
                onClick={() => {
                  if (isInComparison(product.id)) {
                    // Message for successful removing
                    toast({
                      title: intl.formatMessage({ id: 'toast.removedFromComparison', defaultMessage: 'Removed from comparison' }),
                      status: 'warning',
                      position: 'top',
                      isClosable: true,
                    })
                    
                    // remove from comparison list;
                    removeComparisonItem(product.id);

                    return; 
                  }

                  addItemToComparison(product);
                  toast({
                    title: intl.formatMessage({ id: 'toast.addedInComparison', defaultMessage: 'Added in comparison' }),
                    status: 'success',
                    position: 'top',
                    isClosable: true
                  })
                }}
              />
            </span>  
          </Tooltip>
        </HStack>

        <StockStatus product={product} />
      </Wrap>
    </Stack>
    
  )
}

function RenderCartButtons({ product, quantity, handleAddItemToCart, stockStatus, handleMinusButton, handlePlusButton }) {
  if (!product.price) return <Text color="green" fontWeight="bold">Καλέστε για τιμή</Text>

  return (
    <>
      {(!isProductOutOfStock(product)) ? <>
          <Stack spacing="1">
            <Text fontSize="16px">
              <FormattedMessage 
                id="ProductPage.quantity"
                defaultMessage="Quantity"
              />  
            </Text>
            <HStack w="max-content" >
              <Flex direction="row" border="1px" borderColor="gray.300" bg="white">
                <Center 
                  cursor="pointer" 
                  userSelect="none" 
                  _hover={{ bg: "primary.100", color: "white" }} 
                  w="8" 
                  h="8" 
                  borderRight="1px" 
                  borderColor="gray.300"
                  color="black" 
                  // onClick={() => quantity > 1 && setQuantity(quantity - 1)} 
                  onClick={handleMinusButton} 
                >
                  <Icon as={FaMinus} />
                </Center>
                <Center px="5" h="8" borderRight="1px" borderColor="gray.300" fontSize="md" fontWeight="bold">{quantity}</Center>
                <Center 
                  cursor="pointer" 
                  userSelect="none" 
                  _hover={{ bg: "primary.100", color: "white" }} 
                  w="8" 
                  h="8"
                  color={isProductAbleToIncrement(product, quantity) ? "black" : "gray.400"} 
                  onClick={handlePlusButton}
                >
                  <Icon as={FaPlus} />
                </Center>
              </Flex>
            </HStack>
          </Stack>
          <Button 
            w="max" 
            colorScheme="primary"
            size="md"
            onClick={handleAddItemToCart} 
            alignSelf="flex-end"
          ><FormattedMessage id="ProductPage.addtocart" defaultMessage="Add to cart" /></Button>
        </> : <Box px="3">
          <Text fontSize="lg" fontWeight="bold" color="red.500">{stockStatus}</Text>
        </Box>}
    </>
  )
}

export default ActionSection
