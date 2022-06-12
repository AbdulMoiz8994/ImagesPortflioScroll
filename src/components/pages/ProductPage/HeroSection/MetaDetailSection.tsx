import React, { useEffect, useState } from 'react'
import { Image, Box, Stack, HStack, Text, Wrap, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, ModalOverlay, Button, Select } from '@chakra-ui/react'
import Link from 'next/link';
import currencyFormatter from 'currency-formatter';
import { 
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { getProductsByIds, getWarrantyFromProdAttributes } from 'utils/products-utils';
import { FormattedMessage } from 'react-intl';
// import Image from 'next/image'

const CATEGORIES = [{ name: "Consumer Electronics" }, { name: "Refrigerator" }, { name: "Babies & Mom" }]

const MetaDetailSection = ({ product, onNameChange }) => {
  const [category, ] = useState(product.categories?.[0] || undefined);
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Stack spacing="1">
      {/* INFO: Price disclaimer popup */}
      <>
        <Text w="max" onClick={() => setIsOpen(true)} userSelect="none" cursor="pointer" textDecor="underline">Αποποίηση ευθυνών τιμής προϊόντος</Text>
        <Modal isCentered isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
          {/* <ModalHeader>Price Disclaimer</ModalHeader> */}
          <ModalHeader>Αποποίηση ευθυνών τιμής προϊόντος</ModalHeader>
            <ModalBody>
              <Text>
                {/* This estimate is an approximation and is not guaranteed. The estimate is based on information provided from the client regarding project requirements. Actual cost may change once all project elements are finalized or negotiated. */}
                Οι τιμές ενδέχεται να παρουσιάζουν διακυμάνσεις λόγω της προσωρινής αποθήκευσης της σελίδας (caching), των ενημερώσεων ή του τερματισμού των πωλήσεων του προϊόντος.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='primary' mr={3} onClick={() => setIsOpen(false)}>
                {/* Close */}
                Εντάξει
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      
      <Stack spacing="0.5">
        <HStack>
          <Text fontWeight="semibold"><FormattedMessage id="ProductPage.SKU" defaultMessage="SKU" />: </Text>
          <Text>{product.sku}</Text>
        </HStack>
        {category && <HStack align="flex-start">
          <Text fontWeight="semibold"><FormattedMessage id="ProductPage.Category" defaultMessage="Category" />: </Text>
          <Text color="linkedin.600">
            <Link href={`/${category.slug}`}>
                <a>{category.name}</a>
            </Link>
          </Text>
        </HStack>}
        <HStack>
          <Text fontWeight="semibold" mr="2"><FormattedMessage id="ProductPage.Warranty" defaultMessage="Warranty" />: </Text>
          {!!getWarrantyFromProdAttributes(product.attributes)?.options?.[0] ? <Text>
            {getWarrantyFromProdAttributes(product.attributes)?.options?.[0]}
          </Text> : <FormattedMessage id="ProductPage.twoyearswarranty" defaultMessage="2 years supplier warranty" />}
        </HStack>
      </Stack>
    </Stack>
  )
}

export default MetaDetailSection
