import axios from 'axios';
import React, { ReactNode } from 'react'
import { alphaHost, consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import { Box, Button, Checkbox, FormControl, FormLabel, HStack, Input, InputGroup, Radio, RadioGroup, Select, SlideFade, Stack, Text, useToast, Container, AlertIcon, Alert } from '@chakra-ui/react'
import { useState } from 'react';
import { FC } from 'react';
import { useTheme } from 'styled-components';
import { CardExpiryElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from 'react';
import { useCart } from 'contexts/cart/use-cart';
import { CardCvcElement, CardNumberElement } from '@stripe/react-stripe-js'
import { FormattedMessage, useIntl } from 'react-intl'; 
import { stripePrimaryKey } from 'site-settings/site-credentials';
import SectionHeading from 'components/pages/Checkout/AddressForm/SectionHeading';
import StripeForm from 'components/pages/Checkout/PaymentForm/StripeForm';
import { getTranslatedPaymentMethod } from 'utils/orders_utils';
import { updateOrder } from 'services/orders';
import crypto from "crypto";
import { useRouter } from 'next/router';
import { ALPHA_BANK, BANK_TRANSFER, CARD, PAY_ON_DELIVERY } from 'components/pages/Checkout/PaymentForm/constants';

const OrderNumber = ({ order: _order }) => {
  const stripePromise = loadStripe(stripePrimaryKey) 
  const [paymentOptionValue, setPaymentOptionValue] = useState("bank transfer");
  const [shouldStripeConfirm, setShouldStripeConfirm] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const { calculatePrice, shippingMethod } = useCart();
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [noOfInstallments, setNoOfInstallments] = useState('');
  const [isTermsAndConditionsAgree, setIsTermsAndConditionsAgree] = useState(false);
  const router = useRouter()
  const toast = useToast()
  
  useEffect(() => {
    const allOptions = [ALPHA_BANK, CARD];
    const paymentOption = allOptions.find(o => o.payment_method === _order.payment_method);    
    
    setPaymentOptionValue(paymentOption?.value || CARD.value)
  }, [_order])

  // NEW STATE
  const [orderLoading, setOrderLoading] = useState(false);

  console.log({ _order })

  const onPaymentConfirm = async (data) => {
    const isPaymentThroughAlpha = data.payment_method === "alphabank_gateway";

    setOrderLoading(true);
    const orderData = {
      status: data.order_status,
      payment_method: data.payment_method,
      payment_method_title: getTranslatedPaymentMethod(data.payment_method_title)
    }
    
    const { order, error } = await updateOrder(_order.id, orderData);
    console.log({ order, error });
    setOrderLoading(false);

    if (!error && isPaymentThroughAlpha) {
      localStorage.setItem("order", JSON.stringify(order));

      const mid = process.env.NEXT_PUBLIC_ALPHA_MERCHANT_ID;
      const lang = "gr";
      const orderId = order.id; // e.g., "O2203271920545"
      const orderDesc = `Order#${orderId} (${order?.date_created || ''})`; // e.g., "Test order" or anything;
      const orderAmount = _order.total;
      const currency = "EUR"
      const payerEmail = order.billing.email;  // e.g, "demo@modirum.com"
      const billCountry = order.billing.country.toUpperCase();  // Must be 2 uppercase letter e.g., "FI"
      const billState = order.billing.state;  // e.g., "Harjumaa"
      const billZip = order.billing.postcode;  // e.g., "76543"
      const billCity = order.billing.city;  // e.g., "Tallinn"
      const billAddress = order.billing.address_1;  //e.g., "Billto tn 6-9"
      const successURL = `${alphaHost}/order-received`;  // Testing Link: `https://eurocommerce-test.cardlink.gr/vpostestsv4/shops/shopdemo.jsp?cmd=confirm`;
      const failedURL = `${alphaHost}/order-failed`;  // Testing Link: `https://eurocommerce-test.cardlink.gr/vpostestsv4/shops/shopdemo.jsp?cmd=cancel`
      const sharedSecret = process.env.NEXT_PUBLIC_ALPHA_SHARED_SECRET;

      const installmentOffset = !data.installments ? '' : '0'; // if there is not installments then don't pass 0 but empty string
      const noOfInstallments = data.installments;

      // Calculating Digest
      let hash = crypto.createHash("sha1");
      const digestVariables = `${mid}${lang}${orderId}${orderDesc}${orderAmount}${currency}${payerEmail}${billCountry}${billState}${billZip}${billCity}${billAddress}${installmentOffset}${noOfInstallments}${successURL}${failedURL}${sharedSecret}`;
      hash.update(digestVariables);
      let digest = encodeURIComponent(hash.digest("base64"));

      // Redirect To Alpha
      router.push(
        `https://www.alphaecommerce.gr/vpos/shophandlermpi?mid=${mid}&lang=${lang}&orderid=${orderId}&orderDesc=${encodeURIComponent(orderDesc)}&orderAmount=${orderAmount}&currency=${currency}&payerEmail=${payerEmail}&billCountry=${billCountry}&billState=${billState}&billZip=${billZip}&billCity=${billCity}&billAddress=${billAddress}&extInstallmentoffset=${installmentOffset}&extInstallmentperiod=${noOfInstallments}&confirmUrl=${encodeURIComponent(successURL)}&cancelUrl=${encodeURIComponent(failedURL)}&digest=${digest}`
      );
    } else if (!error && !isPaymentThroughAlpha) {
      localStorage.setItem("order", JSON.stringify(order));

      router.replace('/order-received');
    } else {
      toast({
        title: "Oops! Something went wrong...",
        position: "top",
        isClosable: true,
        status: "error"
      })
    }
  }

  useEffect(() => {
    if (!paymentDone) return;

    // logic here on payment confirm
  }, [paymentDone])

  const handleSubmitForm = () => {
    if (paymentOptionValue === CARD.value) {
      console.log("Hey, card is triggered!");
      setShouldStripeConfirm(true);

      setTimeout(() => {
        setShouldStripeConfirm(false);
      }, 3000);
    }

    if (paymentOptionValue === BANK_TRANSFER.value) {
      onPaymentConfirm({
        payment_method: BANK_TRANSFER.payment_method,
        payment_method_title: BANK_TRANSFER.payment_method_title,
        paid: BANK_TRANSFER.paid,
        order_status: BANK_TRANSFER.order_status
      });
    }

    if (paymentOptionValue === PAY_ON_DELIVERY.value) {
      onPaymentConfirm({
        payment_method: PAY_ON_DELIVERY.payment_method,
        payment_method_title: PAY_ON_DELIVERY.payment_method_title,
        paid: PAY_ON_DELIVERY.paid,
        order_status: PAY_ON_DELIVERY.order_status
      });
    }

    if (paymentOptionValue === ALPHA_BANK.value) {
      onPaymentConfirm({
        payment_method: ALPHA_BANK.payment_method,
        payment_method_title: ALPHA_BANK.payment_method_title,
        paid: ALPHA_BANK.paid,
        order_status: ALPHA_BANK.order_status,
        installments: noOfInstallments
      })
      
    }
  }

  if (_order.status !== "selfcheckout") return (
    <Container pb="32" pt={{ base: "12" , md: "14", lg: "16"}} maxW="container.md" centerContent minH="40vh">
      <Alert status="error" w="full">
        <AlertIcon />
        <Text fontWeight="semibold">
          Η σελίδα δεν υπάρχει
        </Text>
      </Alert>
    </Container>
  )

  return (
    <Container pb="32" pt={{ base: "12" , md: "14", lg: "16"}} maxW="container.md" centerContent minH="60vh">
      <Box shadow="sm" border="1px" borderColor="gray.200" pt="2" pb="10" bg="white">
        <Stack spacing="10" mx="10" py="5">
          <SectionHeading text="Τρόποι Πληρωμής" />

          <RadioGroup colorScheme="primary" value={paymentOptionValue}>
            <Stack spacing="7">
              {/* Stripe card */}
              <Stack spacing="4">
                <Radio onChange={() => setPaymentOptionValue("card")} value="card">
                  <FormattedMessage 
                    id="CheckoutPage.StripePayment"
                    defaultMessage="Credit/Debit Card Payment"
                  />
                </Radio>
                {paymentOptionValue === "card" && <SlideFade  in={true}>
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
                              orderAmount={_order.total}
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
                {paymentOptionValue === "alpha bank" && <SlideFade  in={true}>
                  <AppToolTip 
                    // content={intl.formatMessage({ id: 'CheckoutPage.AlphaBank', defaultMessage: 'Payment via Alpha Bank: Mastercard, Visa, Diners American Express cards of all Banks are accepted' })}
                    content={<Stack spacing="8">
                      <Text color="white">
                        <FormattedMessage id='CheckoutPage.AlphaBank' defaultMessage='Payment via Alpha Bank: Mastercard, Visa, Diners American Express cards of all Banks are accepted' />
                      </Text>

                      {_order.total >= 30 && <InputGroup>
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
            <HStack>
              <Text fontSize="20" fontWeight="bold">Συνολικό Ποσό: </Text>
              <Text fontSize="20">€ {_order.total}</Text>
            </HStack>
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
          </Stack>
        </Stack>
      </Box>
    </Container>
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

export async function getServerSideProps(context) {
  const { params } = context;

  try {
    const { data: order } = await axios.get(`${siteURL}/wp-json/wc/v3/orders/${params.orderNo}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)
    if (!order) throw new Error("Page not found!");

    return {
      props: {
        order: order
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
}
}

export default OrderNumber