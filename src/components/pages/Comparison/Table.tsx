import React, { useContext, useMemo } from 'react'
import { Box, Button, Checkbox, Container, Heading, HStack, Icon, Stack, Text, useToast, Wrap } from '@chakra-ui/react';
import Image from 'next/image';
import { FaRegHeart, FaSearch } from 'react-icons/fa';
import _ from 'lodash';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useCart } from 'contexts/cart/use-cart';
import { useComparison } from 'contexts/comparison/use-comparison';
import Link from 'next/link'
import getProductURI from 'utils/getProductURI';
import { useWishlist } from 'contexts/wishlist/use-wishlist';
import { BsHeartFill } from 'react-icons/bs';

export default function Table({ mainData, OVERVIEW, CHARACTERISTICS_COLUMNS, onChangeOnlyDifferences }) {
  const data = mainData

  console.log({ data, OVERVIEW })

  return (
    <Box py="24" px={{ base: "0", md: "10" }} w="full" display="flex" justifyContent="center">
  
      <Box overflowX="auto" className="sectionScrollbar">
        <Stack spacing={0} pb="5">
          <Heading size='lg' mb="5" textAlign="center">Σύγκριση Προϊόντων</Heading>
        </Stack>
    
        <HStack w="max-content" border="1px" borderColor="gray.400">
          <Wrap justify="center" align="center" w="40" p="2">
            <Checkbox justifySelf="center" colorScheme="primary" onChange={(e) => onChangeOnlyDifferences(e.target.checked)}>Προβολή των διαφορών</Checkbox>
          </Wrap>
    
          <Box as="table">
            {data.map((product: any, idx: number) => (
              <ProductHeader 
                key={idx}
                id={product.id}
                name={product.name}  
                price={product.price}
                imgURL={product?.images[0]?.src} 
                product={product}
              />
            ))}
          </Box>
        </HStack>
    
        <Heading size="sm" m="4">
          Επισκόπηση
        </Heading>
        {OVERVIEW.map((column: any, idx: number) => {
          const isLast = OVERVIEW.length - 1 === idx;

    
          return (
            <HStack w="max-content" h="max-content" key={idx} border="1px" bg="gray.100" borderBottom={!isLast && "0"} align="flex-start" borderColor="gray.400">
              <Wrap w="40" p="2">
                <Text w="full" textAlign="right" colorScheme="primary">{column.Header}</Text>
              </Wrap>
    
              <Box as="table" bg="white">
                {data.map((product: any, idx: number) => {
                  const cell = _.get(product, column.accessor)
    
                  const element = column.Cell?.(_.get(product, column.accessor)) ?? cell
    
                  // console.log({ product, column })

                  return (
                    <ProductDetails 
                      key={idx}
                      data={element} 
                      // htmlData={column.accessor === "short_description"}
                    />
                  )
                })}
              </Box>
            </HStack>
          )
        })}


        {CHARACTERISTICS_COLUMNS.length > 0 && <>
          <Heading size="sm" m="4">
            {/* Characteristics */}
            Διαφορές
          </Heading>
          {CHARACTERISTICS_COLUMNS.map((column: any, idx: number) => {
            const isLast = CHARACTERISTICS_COLUMNS.length - 1 === idx; 
      
            return (
              <HStack as="tr" w="max-content" bg="gray.100" key={idx} border="1px" borderBottom={!isLast && "0"} align="flex-start" borderColor="gray.400">
                <Wrap as="td" w="40" p="2">
                  <Text w="full" textAlign="right" colorScheme="primary">{column.Header}</Text>
                </Wrap>
      
                <Box as="td" bg="white">
                  {data.map((product: any, idx: number) => {                
                    const attribute = product.attributes.find(attribute => attribute.name === column.Header);
                    const element = _.get(attribute, column.accessor)
                    return (
                      <CharacteristicsDetails 
                        key={idx}
                        data={element} 
                        // htmlData={column.accessor === "short_description"}
                      />
                    )
                  })}
                </Box>
              </HStack>
            )
          })}
        </>}
      </Box>

    </Box>
  )
}

function CharacteristicsDetails({ data }) {
  return (
    <Box as="td" h="full" borderLeft="1px" borderColor="gray.300" p="3" w="56">
      {data?.length > 0 ? data.map(item => <Text textAlign="center">{item}</Text>) : <Text textAlign="center">{"-"}</Text>}
    </Box> 
  )
}

function ProductDetails({ data }) {
return (
  <Box as="td" borderLeft="1px" borderColor="gray.300" p="3" w="56">
    <Text textAlign="center">{data || "-"}</Text>
  </Box>
)
}

interface Props {
  id: any,
  name?: string
  price?: string
  imgURL?: string
  product?: any
}

function ProductHeader({ id, imgURL, name, price, product }: Props) {
  const router = useRouter();
  const toast = useToast();
  const { removeItem } = useComparison();
  const { addItem } = useCart();
  const { addItem: addItemToWishlist, isInWishlist, removeItem: removeWishlisthItem } = useWishlist();

  async function handleRemoveProduct() {
    removeItem(id);
  }

  function handleAddToCart() {
    addItem(product);
    toast({
      title: "Product added in cart!",
      status: 'success',
      isClosable: true,
      position: 'top'
    })
  };

  function handleAddToWhishlist() {
    if (isInWishlist(product.id)) {
      // Display toast for successful removal
      toast({
        title: "Removed from wishlist.",
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
      title: "Added in wishlist",
      status: 'success',
      position: 'top',
      isClosable: true
    })
  }

  return (
    // <Wrap as={Sticky} borderLeft="1px" borderColor="gray.300" direction="column" align="center" justify="center" p="3" w="56">
    <Wrap spacing="4" position="relative" as="td" borderLeft="1px" borderColor="gray.300" direction="column" align="center" justify="center" p="3" w="56">
      {/* <Icon onClick={() => onRemoveProduct(id)} color="primary.100" fontSize="xl" as={IoCloseCircleSharp} /> */}
      <Icon cursor="pointer" userSelect="none" _active={{ transform: 'translateY(2px)' }} onClick={handleRemoveProduct} color="primary.100" fontSize="2xl" as={IoCloseCircleSharp} />
      <Wrap justify="center">
        <Image 
          src={imgURL}
          width={150}
          height={150}
          quality={100}
        />
      </Wrap>
      <Link href={`/${getProductURI(product.permalink)}`} passHref>
        <Heading as="a" size="sm" textAlign="center">{name}</Heading>
      </Link>
      <Heading size="md" textAlign="center">{price} &euro;</Heading>
      {/* <Button onClick={handleAddToCart} colorScheme="primary" size="sm" fontWeight="semibold" textTransform="uppercase" py="1" px="3" fontSize="sm">Προσθήκη στο Καλάθι</Button> */}
      <HStack color={isInWishlist(product.id) ? 'primary.100' : ''} onClick={handleAddToWhishlist} _hover={{ color: "primary.100" }} cursor="pointer" userSelect="none" justify="center" align="center">
        <Icon as={isInWishlist(product.id) ? BsHeartFill : FaRegHeart} />
        <Text>Προσθήκη στα Αγαπημένα</Text>
      </HStack>
    </Wrap>
  )
}