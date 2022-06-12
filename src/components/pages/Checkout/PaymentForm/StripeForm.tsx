import { Box, Button, Checkbox, FormControl, FormLabel, HStack, Input, InputGroup, Radio, RadioGroup, Select, SlideFade, Stack, Text, useToast } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useState } from 'react';
import { FC } from 'react';
import { useTheme } from 'styled-components';
import SectionHeading from '../AddressForm/SectionHeading'
import { CardExpiryElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from 'axios';
import { useEffect } from 'react';
import { useCart } from 'contexts/cart/use-cart';
import { CardCvcElement, CardNumberElement } from '@stripe/react-stripe-js'
import { FormattedMessage, useIntl } from 'react-intl'; 
import { stripePrimaryKey } from 'site-settings/site-credentials';
import { CARD } from './constants';
// import ShippingMethods from 'pages/tropoi-apostolis';

interface Props {
  stripe: Stripe
  elements: any
  shouldConfirm?: boolean
  onPaymentConfirm?: (data: any) => void
  setLoading?: (value: boolean) => void
  loading?: boolean
  orderAmount?: string
}
const StripeForm:FC<Props> = ({ stripe, elements, shouldConfirm, onPaymentConfirm, setLoading, loading, orderAmount }) => {
  const toast = useToast()
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice
  } = useCart();
  const [cardHolderName, setCardHolderName] = useState("");

  // console.log({ items, calculatePrice: calculatePrice() });

  useEffect(() => {
    if (shouldConfirm) {
      // console.log({ cardHolderName });
      getAsync();
    }
  }, [shouldConfirm])

  const getAsync = async() => {
    setLoading(true)

    // handle payment request
    if (!stripe || !elements) {
      setLoading(false)
      toast({
        title: "Something went wrong!",
        position: "top",
        isClosable: true,
        status: "error"
      })
      return;
    }

    try {
      // STEP 1
      const { data } = await axios.post("/api/stripe", { data: { 
        amount: !orderAmount ? parseFloat(calculatePrice()) * 100 : parseFloat(orderAmount) * 100
      } }); // Example: 30.50 * 100 --> 3050 (because stripe doesnot accept in decimals)


      if (!data.client_secret) {
        setLoading(false)
        throw new Error()
      };

      // STEP 2
      stripe.confirmCardPayment(
        data.client_secret,
        {
          payment_method: {card: elements.getElement(CardNumberElement)}
        }
      ).then(function(result) {
        setLoading(false);

        if (result.error) {
          // Display error.message in your UI.
          console.log("StripeForm/confirmCardPayment :: ", { error: result.error })
          throw new Error();
        } else {
          onPaymentConfirm({
            payment_method: CARD.payment_method,
            payment_method_title: CARD.payment_method_title,
            paid: CARD.paid,
            order_status: CARD.order_status
          });
        }
      });
    } catch (error) {
      console.log("StripeForm :: ", { error });
      setLoading(false);
      toast({
        title: "Payment declined!",
        position: "top",
        isClosable: true,
        status: "error"
      })
    }
  };
  
  return (
    <Box>
      <Stack pb="3">
        <FormControl>
          <FormLabel><FormattedMessage id="CheckoutPage.StripePaymentName" defaultMessage="Name" /></FormLabel>
          <Input
            mt="-2"  
            p="2"
            bg="white"
            fontSize="15"
            size="sm"
            rounded="md"
            color="gray.800"
            fontWeight="semibold"
            letterSpacing=".1rem"
            _placeholder={{
              fontSize: '20',
              color: "gray.200"
            }}
            value={cardHolderName}
            _focus={{ outline: 'none', borderColor: "transparent" }} 
            borderColor={"transparent"} 
            onChange={(e) => setCardHolderName(e.currentTarget.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel><FormattedMessage id="CheckoutPage.StripePaymentCard" defaultMessage="Card Number" /></FormLabel>
          <Input
            mt="-2"  
            p="2"
            bg="white"
            fontSize="20"
            size="sm"
            rounded="md"
            _placeholder={{
              fontSize: '20'
            }}
            options={{
              style: {
                base: {
                  letterSpacing: '.1rem'
                }
              }
            }}
            as={CardNumberElement}
          />
        </FormControl>
        <HStack>
        <FormControl flex="1">
          <FormLabel><FormattedMessage id="CheckoutPage.StripePaymentExpire" defaultMessage="Expiry Date" /></FormLabel>
          <Input
            mt="-2"  
            p="2"
            bg="white"
            fontSize="20"
            size="sm"
            rounded="md"
            _placeholder={{
              fontSize: '20'
            }}
            options={{
              style: {
                base: {
                  letterSpacing: '.1rem'
                }
              }
            }}
            as={CardExpiryElement}
          />
        </FormControl>
        <FormControl w="20%">
          <FormLabel><FormattedMessage id="CheckoutPage.StripePaymentCVC" defaultMessage="CVC" /></FormLabel>
          <Input
            mt="-2"  
            p="2"
            bg="white"
            fontSize="20"
            size="sm"
            rounded="md"
            _placeholder={{
              fontSize: '20'
            }}
            options={{
              style: {
                base: {
                  letterSpacing: '.1rem'
                }
              }
            }}
            as={CardCvcElement}
          />
        </FormControl>
        </HStack>
      </Stack>
    </Box>
  )
}

export default StripeForm;


// LEGACY CODE
// const { error, token } = await stripe.createToken(card,{
//   name: cardHolderName,
//   address_country: "PK",
//   currency: "eur",
// });

// if (error) return;

// try {
//   const { data } = await axios.post("/api/stripe", { token, data: { 
//     amount: !orderAmount ? parseFloat(calculatePrice()) * 100 : parseFloat(orderAmount) * 100
//   } }); // Example: 30.50 * 100 --> 3050 (because stripe doesnot accept in decimals)

//   setLoading(false)
//   if (data.charges.status === "succeeded") {
//     onPaymentConfirm({
//       payment_method: CARD.payment_method,
//       payment_method_title: CARD.payment_method_title,
//       paid: CARD.paid,
//       order_status: CARD.order_status
//     });
//   }
// } catch (error) {
//   console.log({ error })
//   toast({
//     title: "Payment declined!",
//     position: "top",
//     isClosable: true,
//     status: "error"
//   })
//   setLoading(false)
// }