import {  
  SimpleGrid, 
  Box, 
  Stack, 
  Text,  
  Divider, 
  Wrap,   
  HStack,
  useBreakpointValue,
  RadioGroup,
  Radio,
} from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { useCart } from 'contexts/cart/use-cart';
import currencyFomatter from 'currency-formatter'
import CouponChakara from 'features/coupon/CouponChakra';
import axios from 'axios';
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import { FormattedMessage, useIntl } from 'react-intl';
import { hasProductSpecialCategory } from 'utils/products-utils';
import { getShippingMethod } from 'utils/orders_utils';

interface Props {
  address?: {
    country?: string,
    postalCode?: string
    email?: string
    viesVat?: {} | null
  }
  paymentMethod?: string
}
const CartDetailSection:FC<Props> = ({ address, paymentMethod }) => {
  const {
    items,
    calculatePrice,
    shippingMethod,
    calculateSubTotalPrice,
    calculateVat,
    transport,
    vatInPercentage,
    applyVatInPercent,
    updateCashOnDeliveryCost,
    cashOnDelivery,
    onChangeShippingMethod
  } = useCart();
  const screenSize = useBreakpointValue({ base: 'mobile', md: 'desktop' });
  const [couponLoading, setCouponLoading] = useState(false);
  const [taxesRates, setTaxesRates] = useState([]);
  const [filteredVatPercentage, setFilteredVatPercentage] = useState("");
  const intl = useIntl();

  useEffect(() => {
    if (paymentMethod === 'pay on delivery') {
      updateCashOnDeliveryCost(2.90)
    } else {
      updateCashOnDeliveryCost(0)
    }
  }, [paymentMethod]);
  
  // STEP: 1- It will fetches all the taxes
  useEffect(() => {
    getAsyncData();
    async function getAsyncData() {
      const { data: taxes } = await axios.get(`${siteURL}/wp-json/wc/v3/taxes?per_page=100&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
      setTaxesRates(taxes);
    }
  }, []);

  // STEP: 2- It will find the appropriate rate
  useEffect(() => {
    if ((!address.postalCode || !address.country) || taxesRates.length === 0) {
      setFilteredVatPercentage("24.0000");
      return;
    };

    const customerCountry = address.country === "gr" ? "GR" : (address.country === "cy" ? "CY" : "");
    const customerPostalCode = address.postalCode;

    // INFO: If there vies_vat is invalid or not given
    if (!address.viesVat) {
      setFilteredVatPercentage("24.0000");
    } 

    // INFO: Check if postal code is restricted
    const shortListedTax = taxesRates.find(tax => tax.country === customerCountry && tax.postcodes.includes(customerPostalCode));

    // INFO: If there vies_vat is invalid or not given
    if (shortListedTax && address.viesVat) {
      setFilteredVatPercentage(shortListedTax.rate)
      return;
    } else {
      setFilteredVatPercentage("24.0000")
    }
    
    // INFO: Assign different rates when postal code is restricted
    if (shortListedTax) {
      setFilteredVatPercentage("24.0000");
      return; 
    }

    // INFO: If there is not restriction then assign the normal rates
    const tax = taxesRates.find(tax => tax.postcodes.length === 0);
    setFilteredVatPercentage(tax.rate);
  }, [address, taxesRates]);

  // STEP: It will assign rate to the context api of cart
  useEffect(() => {
    // INFO: If vat not triggers/changes then do nothing
    applyVatInPercent(filteredVatPercentage);
  }, [filteredVatPercentage]);
    
  return (
    <Box w="22rem">
      <Stack spacing="0" shadow="sm" border="1px" borderColor="gray.200" bg="white"> 
        <SimpleGrid bg="gray.50" columns={2} px="8" py="3">
          <Text fontSize="20"><FormattedMessage id="CheckoutPage.Order" defaultMessage="Order" /></Text>
          <Text align="right" color="#e35453"><FormattedMessage id="CheckoutPage.Processing" defaultMessage="Processing" /></Text>
        </SimpleGrid>
        {items.map((item: any, idx: number) => (
          <React.Fragment key={idx.toString()}>
            <HStack px="8" py="4" justify="space-between">
              <Text w="12rem" lineHeight="short" fontWeight="medium" fontSize="15">
                <Text as="span" fontWeight="bold" fontSize="15">{item.quantity}</Text>
                <Text as="span" fontWeight="bold" fontSize="15" px="3">x</Text>
                <Text as="span" fontSize="14" color="GrayText">{item.name}</Text>
              </Text>
              <Text fontSize="15" color="GrayText" >{currencyFomatter.format(item.quantity * item.price, {})} &euro;</Text>
            </HStack>
            <Divider  />
          </React.Fragment>
        ))}
      </Stack>

      {!!hasProductSpecialCategory(items, "moter-gkarazoportas") && <Stack mt="5" spacing="0" shadow="sm" border="1px" borderColor="gray.200" bg="white">
        <SimpleGrid bg="gray.50" columns={2} px="8" py="3">
          {/* <Text fontSize="20">Shippings</Text> */}
          <Text fontSize="20">Μέθοδος Αποστολής</Text>
        </SimpleGrid>

        <RadioGroup onChange={(value) => onChangeShippingMethod(value)} colorScheme="primary" value={shippingMethod}>
          <Stack p="4" spacing={4}>
            <Radio value='acs_courier'>{getShippingMethod("acs_courier")} (€ 17)</Radio>
            <Radio value='store'>{getShippingMethod("store")}</Radio>
          </Stack>
        </RadioGroup>
      </Stack>}

      <Stack p="8" mt="5" spacing="2" shadow="sm" border="1px" borderColor="gray.200" bg="white"> 
        <Wrap justify="space-between">
          <Text color="GrayText"><FormattedMessage id="CheckoutPage.Total" defaultMessage="Total" /></Text>
          <Text color="GrayText">€ {currencyFomatter.format(calculateSubTotalPrice(), {})}</Text>
        </Wrap>
        <Wrap justify="space-between">
          {/* <Text color="GrayText"><FormattedMessage id="CheckoutPage.CostOfTrasportation" defaultMessage="Cost of transportation" /></Text> */}
          <Text flex={1} color="GrayText">{shippingMethod === "acs_courier" ? "ACS Courier" : "Δωρεάν μεταφορικά στην μεταφορική"}</Text>
          <Text w="30" color="GrayText" align="right">€ {Number(transport.cost).toFixed(2)}</Text>
        </Wrap>
        {cashOnDelivery.cost > 0 && <Wrap justify="space-between">
          <Text color="GrayText"><FormattedMessage id="CheckoutPage.PayOnDelivery" defaultMessage="Pay on delivery" /></Text>
          <Text color="GrayText">€ {cashOnDelivery.cost}</Text>
        </Wrap>}
        <Wrap justify="space-between">
          <Text color="GrayText">{`${intl.formatMessage({ id: 'CartPage.Vat', defaultMessage: 'VAT' })} (${intl.formatMessage({ id: 'CartPage.includesText', defaultMessage: 'included' })} ${Number(vatInPercentage)}%)`}</Text>
          <Text color="GrayText">€ {calculateVat().totalVat}</Text>
        </Wrap>
        {screenSize === "desktop" && <Wrap justify="space-between" pt="3" pb="1">
          <CouponChakara customerAddress={address} />
        </Wrap>}
        <Wrap fontWeight="bold" fontSize="18" justify="space-between">
          <Text fontWeight="bold" fontSize="18"><FormattedMessage id="CheckoutPage.GrandTotal" defaultMessage="Grand Total" /></Text>
          <Text fontWeight="bold" fontSize="18">€ {currencyFomatter.format(calculatePrice(), {})}</Text>
        </Wrap>
      </Stack>
    </Box>
  )
}

export default CartDetailSection
