import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { handleModal } from 'features/checkouts/checkout-modal';
import { ProfileContext } from 'contexts/profile/profile.context';
import useUser from 'data/use-user';
import PaymentGroup from 'components/payment-group/payment-group';
import StripePaymentForm from './stripe-form';
import { useCart } from 'contexts/cart/use-cart';
import { CardHeader } from 'components/card-header/card-header';

import { Stack, Radio, RadioGroup, Text as ChakraText, Box as ChakraBox, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, SlideFade, Slide } from '@chakra-ui/react'
import { FC } from 'react';
import { useState } from 'react';

interface Props {
  deviceType: any;
  increment?: boolean;
}

const Payment = ({ deviceType, increment = false }: Props) => {
  const { deletePaymentCard } = useUser();
  const { calculatePrice } = useCart();
  const [paymentOptionValue, setPaymentOptionValue] = useState("bank transfer");

  const {
    state: { card },
    dispatch,
  } = useContext(ProfileContext);

  const handleOnDelete = async (item) => {
    dispatch({ type: 'DELETE_CARD', payload: item.id });
    await deletePaymentCard(item.id);
  };

  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage
          id="selectPaymentText"
          defaultMessage="Select Payment Option"
        />
      </CardHeader>
      <RadioGroup defaultValue="bank transfer">
        <Stack spacing="5">
          <Radio onChange={() => setPaymentOptionValue("bank transfer")} value="bank transfer">
            Bank Trasfer
          </Radio>
          {paymentOptionValue === "bank transfer" && <SlideFade  in={true}>
            <AppToolTip 
              content="Make your payment directly to our bank account. Please use your order ID as proof of payment. Your order will not be shipped until the bank transfer."
            />
          </SlideFade>}
          <Radio onChange={() => setPaymentOptionValue("pay on delivery")} value="pay on delivery">
            Pay on delivery
          </Radio>
          {paymentOptionValue === "pay on delivery" && <SlideFade  in={true}>
            <AppToolTip 
              content="Payment in cash upon delivery."
            />
          </SlideFade>}
          <Radio onChange={() => setPaymentOptionValue("payment on credit card")} value="payment on credit card">
            Payment by card through a secure environment of Alpha Bank
          </Radio>
          {paymentOptionValue === "payment on credit card" && <SlideFade  in={true}>
            <AppToolTip 
              content="Payment via Alpha Bank: Mastercard, Visa, Diners American Express cards of all Banks are accepted"
            />
          </SlideFade>}
        </Stack>
      </RadioGroup>
    </>
  );
};

interface AppToolTipProps {
  content: string
}
const AppToolTip: FC<AppToolTipProps> = ({ content }) => {
  const color = "#c5eafd"

  return (
    <ChakraBox position="relative" bg={color} rounded="md" w="100%" h="max" p="3">
      <ChakraBox transform="rotate(90deg)" border="solid 10px transparent" borderRightColor={color} position="absolute" top="-4" left="4" />
      <ChakraText>{content}</ChakraText>
    </ChakraBox>
  )
}

export default Payment;

// LEGACY
{/* <PaymentGroup
  name="payment"
  deviceType={deviceType}
  items={card}
  onDelete={(item) => handleOnDelete(item)}
  onChange={(item: any) =>
    dispatch({
      type: 'SET_PRIMARY_CARD',
      payload: item.id.toString(),
    })
  }
  handleAddNewCard={() => {
    handleModal(
      StripePaymentForm,
      { totalPrice: calculatePrice() },
      'add-address-modal stripe-modal'
    );
  }}
/> */}