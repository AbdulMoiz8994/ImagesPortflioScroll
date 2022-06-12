import { Box, Button, Checkbox, FormControl, FormLabel, HStack, Input, InputGroup, Radio, RadioGroup, Select, SlideFade, Stack, Text, useToast } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useState } from 'react';
import { FC } from 'react';
import { useTheme } from 'styled-components';
import SectionHeading from '../AddressForm/SectionHeading'
import { CardExpiryElement, Elements, ElementsConsumer, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { useEffect } from 'react';
import { useCart } from 'contexts/cart/use-cart';
import { CardCvcElement, CardNumberElement, CardElement } from '@stripe/react-stripe-js'
import { FormattedMessage, useIntl } from 'react-intl';
import { stripePrimaryKey } from 'site-settings/site-credentials';
import StripeForm from './StripeForm';
// import ShippingMethods from 'pages/tropoi-apostolis';

const stripePromise = loadStripe(stripePrimaryKey)

const PaymentForm = ({ orderLoading, onBack, onPaymentConfirm, onChangePaymentMethod }) => {
  const [paymentOptionValue, setPaymentOptionValue] = useState("bank transfer");
  const [shouldStripeConfirm, setShouldStripeConfirm] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const { calculatePrice, shippingMethod } = useCart();
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [noOfInstallments, setNoOfInstallments] = useState('');
  const [isTermsAndConditionsAgree, setIsTermsAndConditionsAgree] = useState(false);

  useEffect(() => {
    onChangePaymentMethod(paymentOptionValue);
  }, [paymentOptionValue])

  // useEffect for calculation the installments
  useEffect(() => {
    // price < 30
    if (calculatePrice() < 30) return;

    // 30 >= price < 150
    if (calculatePrice() >= 30 && calculatePrice() < 150) {
      setInstallmentOptions(['2']);
      return;
    }

    // price >= 150
    setInstallmentOptions(['2', '3', '4']);
  }, [calculatePrice])

  useEffect(() => {
    if (!paymentDone) return;

    // logic here on payment confirm
  }, [paymentDone])

  const handleSubmitForm = () => {
    if (paymentOptionValue === "card") {
      console.log("Hey, card is triggered!");
      setShouldStripeConfirm(true);

      setTimeout(() => {
        setShouldStripeConfirm(false);
      }, 3000);
    }

    if (paymentOptionValue === "bank transfer") {
      onPaymentConfirm({
        payment_method: "bacs",
        payment_method_title: "Direct Bank Transfer",
        paid: false,
        order_status: "on-hold"
      });
    }

    if (paymentOptionValue === "pay on delivery") {
      onPaymentConfirm({
        payment_method: "cod",
        payment_method_title: "Cash on Delivery",
        paid: false,
        order_status: "processing"
      });
    }

    // Basit work
    if (paymentOptionValue === "alpha bank") {
      onPaymentConfirm({
        // payment_method: "card",
        // payment_method_title: "Credit / Debit Card (Alpha Bank)",
        payment_method: "alphabank_gateway",
        payment_method_title: "Πληρωμή με κάρτα μέσω ασφαλούς περιβάλλοντος της Alpha Bank",
        paid: false,
        order_status: "pending",
        installments: noOfInstallments
      })

    }
  }

  return (
    <Box shadow="sm" border="1px" borderColor="gray.200" pt="2" pb="10" w="42rem" bg="white">
      <Stack spacing="10" mx="10" py="5">
        <SectionHeading text="Τρόποι Πληρωμής" />

        <RadioGroup colorScheme="primary" defaultValue="bank transfer">
          <Stack spacing="7">
            {/* Bank transfer */}
            <Stack spacing="4">
              <Radio onChange={() => setPaymentOptionValue("bank transfer")} value="bank transfer">
                <FormattedMessage id="CheckoutPage.BankTransfer" defaultMessage="Bank Transfer" />
              </Radio>
              {paymentOptionValue === "bank transfer" && <SlideFade in={true}>
                <AppToolTip
                  content={intl.formatMessage({ id: 'CheckoutPage.BankTransferDetails', defaultMessage: 'Make your payment directly to our bank account. Please use your order ID as proof of payment. Your order will not be shipped until the bank transfer.' })}
                />
              </SlideFade>}
            </Stack>

            {/* Pay on delivery */}
            {(shippingMethod !== "store" && calculatePrice() <= 500) && <Stack spacing="4">
              <Radio onChange={() => setPaymentOptionValue("pay on delivery")} value="pay on delivery">
                <FormattedMessage
                  id='CheckoutPage.COD'
                  defaultMessage="Pay on delivery"
                />
              </Radio>
              {paymentOptionValue === "pay on delivery" && <SlideFade in={true}>
                <AppToolTip
                  content={intl.formatMessage({ id: 'CheckoutPage.CODDetails', defaultMessage: 'Payment in cash upon delivery' })}
                />
              </SlideFade>}
            </Stack>}

            {/* Stripe card */}
            <Stack spacing="4">
              <Radio onChange={() => setPaymentOptionValue("card")} value="card">
                <FormattedMessage
                  id="CheckoutPage.StripePayment"
                  defaultMessage="Credit/Debit Card Payment"
                />
              </Radio>
              {paymentOptionValue === "card" && <SlideFade in={true}>
                <AppToolTip
                  // content="Payment via Alpha Bank: Mastercard, Visa, Diners American Express cards of all Banks are accepted"
                  content={
                    <Elements stripe={stripePromise}>
                      <ElementsConsumer>
                        {({ stripe, elements }) => (
                          <StripeForm 
                            shouldConfirm={shouldStripeConfirm} 
                            stripe={stripe} 
                            elements={elements} 
                            onPaymentConfirm={onPaymentConfirm}
                            setLoading={setLoading}
                            loading={loading}
                          />
                        )}
                      </ElementsConsumer>
                    </Elements>
                  }
                />
              </SlideFade>}
            </Stack>

            {/* Alpha bank */}
            <Stack spacing="4">
              <Radio onChange={() => setPaymentOptionValue("alpha bank")} value="alpha bank">
                <FormattedMessage
                  id='CheckoutPage.AlphaBankRadio'
                  defaultMessage="Payment by card through a secure environment of Alpha Bank"
                />
              </Radio>
              {paymentOptionValue === "alpha bank" && <SlideFade in={true}>
                <AppToolTip
                  // content={intl.formatMessage({ id: 'CheckoutPage.AlphaBank', defaultMessage: 'Payment via Alpha Bank: Mastercard, Visa, Diners American Express cards of all Banks are accepted' })}
                  content={<Stack spacing="8">
                    <Text color="white">
                      <FormattedMessage id='CheckoutPage.AlphaBank' defaultMessage='Payment via Alpha Bank: Mastercard, Visa, Diners American Express cards of all Banks are accepted' />
                    </Text>

                    {calculatePrice() >= 30 && <InputGroup>
                      <Stack spacing="0">
                        <FormLabel>Αριθμός δόσεων *</FormLabel>
                        <Select value={noOfInstallments} onChange={(e) => setNoOfInstallments(e.currentTarget.value)} size="sm" _focus={{ boxShadow: 'none' }} variant="solid" color="black">
                          <option value=''>{intl.formatMessage({ id: 'CheckoutPage.AlphaBankNoInstallments', defaultMessage: 'No installments' })}</option>
                          {installmentOptions.map(installment => (
                            <option key={installment} value={installment}>{installment}</option>
                          ))}
                        </Select>
                      </Stack>
                    </InputGroup>}
                  </Stack>}
                />
              </SlideFade>}
            </Stack>
          </Stack>
        </RadioGroup>

        <Stack spacing={4} w="full">
          <Checkbox colorScheme="primary" isChecked={isTermsAndConditionsAgree} onChange={(e) => setIsTermsAndConditionsAgree(e.currentTarget.checked)}>
            <Text fontSize="15" aria-required="true">Έχω διαβάσει και συμφωνώ με τους Όρους και Προϋποθέσεις του ιστότοπου</Text>
          </Checkbox>
          <Button
            isDisabled={!isTermsAndConditionsAgree}
            onClick={handleSubmitForm}
            colorScheme="primary"
            isLoading={loading || orderLoading}
          >
            <FormattedMessage id="CheckoutPage.Confirm" defaultMessage="Confirm" />
          </Button>
          <Button onClick={onBack} variant="ghost"><FormattedMessage id="CheckoutPage.GoBack" defaultMessage="Go Back" /></Button>
        </Stack>
      </Stack>
    </Box>
  )
}

interface AppToolTipProps {
  content: string | ReactNode
}
const AppToolTip: FC<AppToolTipProps> = ({ content }) => {
  const theme = useTheme();
  // const color = "#c5eafd"
  const color = "#e35453"

  // console.log({ theme });
  // const primaryColor = theme.colors.primary

  return (
    <Box position="relative" bg={color} rounded="md" w="100%" h="max" p="3">
      <Box transform="rotate(90deg)" border="solid 10px transparent" borderRightColor={color} position="absolute" top="-4" left="4" />
      <Text color="white" fontSize="14">{content}</Text>
    </Box>
  )
}

export default PaymentForm


// function CheckoutForm({ stripe, elements, shouldConfirm, onPaymentConfirm, setLoading, loading }) {
  //   const toast = useToast()
  //   const {
  //     items,
  //     coupon,
  //     addItem,
  //     removeItem,
  //     removeItemFromCart,
  //     cartItemsCount,
  //     calculatePrice
  //   } = useCart();
  //   const [cardHolderName, setCardHolderName] = useState("");
  
  //   // console.log({ items, calculatePrice: calculatePrice() });
  
  //   useEffect(() => {
  //     if (shouldConfirm) {
  //       // console.log({ cardHolderName });
  //       getAsync();
  //     }
  //   }, [shouldConfirm])
  
  //   const getAsync = async() => {
  //     event.preventDefault();
  
  //     // handle payment request
  //     if (!stripe || !elements) {
  //       return;
  //     }
    
  //       ////// If we have only built-in element //////
  //     // const card = elements.getElement(CardElement);
  //     // const { error, token } = await stripe.createToken(card, {
  //     //   name: cardHolderName,
  //     //   address_country: "PK",
  //     //   currency: "eur"
  //     // });
  
  //     //// With splitted elements ////
  //     const card = elements.getElement(CardNumberElement);
  //     const { error, token } = await stripe.createToken(card,{
  //       name: cardHolderName,
  //       address_country: "PK",
  //       currency: "eur",
  //     });
  
  //     if (error) return;
  
  //     try {
  //       setLoading(true)
  
  //       const { data } = await axios.post("/api/stripe", { token, data: { amount: parseFloat(calculatePrice()) * 100 } }); // Example: 30.50 * 100 --> 3050 (because stripe doesnot accept in decimals)
  
  //       setLoading(false)
  //       if (data.charges.status === "succeeded") {
  //         onPaymentConfirm({
  //           payment_method: "card",
  //           payment_method_title: "Credit / Debit Card",
  //           paid: true,
  //           order_status: "processing"
  //         });
  //       }
  //     } catch (error) {
  //       console.log({ error })
  //       toast({
  //         title: "Payment declined!",
  //         position: "top",
  //         isClosable: true,
  //         status: "error"
  //       })
  //       setLoading(false)
  //     }
  
  //   };
  
  //   return (
  //     <Box>
  //       <Stack pb="3">
  //         <FormControl>
  //           <FormLabel><FormattedMessage id="CheckoutPage.StripePaymentName" defaultMessage="Name" /></FormLabel>
  //           <Input
  //             mt="-2"  
  //             p="2"
  //             bg="white"
  //             fontSize="15"
  //             size="sm"
  //             rounded="md"
  //             color="gray.800"
  //             fontWeight="semibold"
  //             letterSpacing=".1rem"
  //             _placeholder={{
  //               fontSize: '20',
  //               color: "gray.200"
  //             }}
  //             value={cardHolderName}
  //             _focus={{ outline: 'none', borderColor: "transparent" }} 
  //             borderColor={"transparent"} 
  //             onChange={(e) => setCardHolderName(e.currentTarget.value)}
  //           />
  //         </FormControl>
  //         <FormControl>
  //           <FormLabel><FormattedMessage id="CheckoutPage.StripePaymentCard" defaultMessage="Card Number" /></FormLabel>
  //           <Input
  //             mt="-2"  
  //             p="2"
  //             bg="white"
  //             fontSize="20"
  //             size="sm"
  //             rounded="md"
  //             _placeholder={{
  //               fontSize: '20'
  //             }}
  //             options={{
  //               style: {
  //                 base: {
  //                   letterSpacing: '.1rem'
  //                 }
  //               }
  //             }}
  //             as={CardNumberElement}
  //           />
  //         </FormControl>
  //         <HStack>
  //         <FormControl flex="1">
  //           <FormLabel><FormattedMessage id="CheckoutPage.StripePaymentExpire" defaultMessage="Expiry Date" /></FormLabel>
  //           <Input
  //             mt="-2"  
  //             p="2"
  //             bg="white"
  //             fontSize="20"
  //             size="sm"
  //             rounded="md"
  //             _placeholder={{
  //               fontSize: '20'
  //             }}
  //             options={{
  //               style: {
  //                 base: {
  //                   letterSpacing: '.1rem'
  //                 }
  //               }
  //             }}
  //             as={CardExpiryElement}
  //           />
  //         </FormControl>
  //         <FormControl w="20%">
  //           <FormLabel><FormattedMessage id="CheckoutPage.StripePaymentCVC" defaultMessage="CVC" /></FormLabel>
  //           <Input
  //             mt="-2"  
  //             p="2"
  //             bg="white"
  //             fontSize="20"
  //             size="sm"
  //             rounded="md"
  //             _placeholder={{
  //               fontSize: '20'
  //             }}
  //             options={{
  //               style: {
  //                 base: {
  //                   letterSpacing: '.1rem'
  //                 }
  //               }
  //             }}
  //             as={CardCvcElement}
  //           />
  //         </FormControl>
  //         </HStack>
  //       </Stack>
  //     </Box>
  //   )
  // }