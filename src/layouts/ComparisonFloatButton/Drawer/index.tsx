import React, { useContext, useEffect, useState } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  HStack,
  Text,
  IconButton,
  Icon,
  Wrap,
  Box,
  Stack,
  useBreakpointValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"
import { IoCloseCircleOutline, IoCloseCircleSharp } from 'react-icons/io5';
import Image from 'next/image';
// import ComparisonContext from '../context/comparison/Context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowRightCircle } from 'react-icons/fi';
import { useComparison } from 'contexts/comparison/use-comparison';
import getProductURI from 'utils/getProductURI';
import { FormattedMessage } from 'react-intl';

interface Props {
  placement: any
  isOpen: any
  onClose: any
}

export default function DrawerExample({ placement="left", isOpen, onClose }: Props) { 
  // const { products: compareProducts, onRemoveProduct } = useContext(ComparisonContext);
  const { items: compareProducts, removeItem } = useComparison();
  const router = useRouter();
  const screenSize = useBreakpointValue({ base: "mobile", md: "desktop" });

  const [URLParameters, setURLParameters] = useState([]);

  const handleRemove = (id) => {
    removeItem(id);
  }

  useEffect(() => {
    if (compareProducts.length === 0) onClose()

    const ids = compareProducts.map(product => product.id);
    setURLParameters(ids);
  }, [compareProducts]);

  return (
    <Drawer
      size={screenSize === "mobile" ? "xs" : "sm"}
      isOpen={isOpen}
      placement={placement}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader shadow="md" py="3" bg="white">
          <HStack justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold">
              <FormattedMessage 
                id="comparisonDrawer.title"
                defaultMessage="Product Comparison"
              />  
            </Text>
            <Icon onClick={onClose} cursor="pointer" userSelect="none" fontSize="2xl" as={IoCloseCircleOutline} aria-label="close drawer" />
          </HStack>
        </DrawerHeader>
        <DrawerBody bg="gray.100">
          <Stack>
            {compareProducts.length > 0 && compareProducts.map((product: any, idx: number) => (
              <Card 
                key={idx}
                id={product.id}
                name={product.name}
                imgURL={product?.images[0]?.src}
                price={product.price}
                onRemove={handleRemove}
                product={product}
              />  
            ))}

            {/* <Link href="/comparison?id=121&id=222" passHref> */}
           {compareProducts.length === 1 ? 
              <Alert status="error">
                <AlertIcon />
                <FormattedMessage 
                  id="comparisonDrawer.atLeastOneMoreItemPhrase"
                  defaultMessage="Please add atleast one more item for comparison!"
                />
              </Alert> : 
              <Link href={`/comparison`} passHref>
                <Button 
                  my="10" 
                  w="full" 
                  size="sm" 
                  colorScheme="primary"
                  as="a"
                  rounded="sm"
                  shadow="xl"
                  fontWeight="semibold"
                  fontSize="lg"
                  rightIcon={<Icon as={FiArrowRightCircle} fontSize="xl" fontWeight="bold" />}
                >
                  <FormattedMessage id="comparisonDrawer.button" defaultMessage="Comparison" />  
                </Button>
              </Link>}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

function Card({ id, name, imgURL, price, onRemove, product }) {
  const screenSize = useBreakpointValue({ base: "mobile", md: "desktop" });

  return (
    <HStack position="relative" bg="white" fontSize="12" h="max-content" fontWeight="semibold" border="1px" p="2">
      <Box border="1px" borderColor="gray.200" position="relative" w="14" h="14" >
        <Image 
          src={imgURL}
          layout="fill"
        />
      </Box>
      <Stack overflowX="hidden" pr="1.5" w={screenSize === "mobile" ? "56" : "72"} spacing={1}>
        <Link href={`/${getProductURI(product.permalink)}`}>
          <a>
            <Text noOfLines={2} fontSize="14">{name}</Text>
          </a>
        </Link>
        <Text color="GrayText">{parseFloat(price).toFixed(2)} &euro;</Text>
      </Stack>

      <Icon cursor="pointer" userSelect="none" onClick={() => onRemove(id)} color="primary.100" fontSize="xl" as={IoCloseCircleSharp} />
    </HStack>
  )
}