import React, { FC, useEffect, useState } from 'react'
import { InputGroup, InputRightElement, Input, Button, InputProps, Text, Alert, AlertIcon, CloseButton } from '@chakra-ui/react'
import { defaultTheme } from 'site-settings/site-theme/default';
import { useCart } from 'contexts/cart/use-cart';
import { chakra } from '@chakra-ui/system'
import axios from 'axios'
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import { FormattedMessage, useIntl } from 'react-intl';
// import CouponAlert from './CouponAlert';

interface Props extends InputProps {
  onCouponApply?: (value: string) => void
  customerAddress?: {
    country?: string,
    postalCode?: string
    email?: string
  }
}
const CouponChakara:FC<Props> = ({ onCouponApply, customerAddress, ...restProps }) => {
  const [coupon, setCoupon] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);
  const { calculateDiscount, applyCoupon, coupon: couponInCart } = useCart();
  const [_isCouponInvalid, setIsCouponInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const intl = useIntl()

  useEffect(() => {
    if (calculateDiscount() > 0) {
      setShowCoupon(true)
    } else {
      setShowCoupon(false)
    }
  }, [calculateDiscount]);

  if (!showCoupon) return (
    <Text 
      textColor={defaultTheme.colors.blue.link}
      textDecor="underline"
      cursor="pointer"
      userSelect="none"  
      onClick={() => {
        setShowCoupon(true);
        setIsCouponInvalid(false)
      }}
    ><FormattedMessage id="CartPage.CouponCodequestion" defaultMessage="Do you have voucher code?" /></Text>
  );

  // If coupon is applied ✅
  if (calculateDiscount() > 0) return (
    <CouponAlert
      status="success"
      onClose={() => {
        applyCoupon({
          discountInAmount: "",
          discountInPercent: ""
        });
        setCoupon('');
      }}
    >
      You saved {calculateDiscount()} €
    </CouponAlert>
  );

  // INFO: If coupon is invalid and some different message
  if (_isCouponInvalid && errorMessage) return (
    <CouponAlert 
      status="error" 
      onClose={() => {
        applyCoupon({
          discountInAmount: "",
          discountInPercent: ""
        });
        setCoupon('');
      }} 
    >
      {errorMessage}
    </CouponAlert>
  )

  // If coupon is invalid ❌
  if (_isCouponInvalid) return (
    <CouponAlert 
      status="error" 
      onClose={() => {
        applyCoupon({
          discountInAmount: "",
          discountInPercent: ""
        });
        setCoupon('');
      }} 
    >
      Invalid coupon code!
    </CouponAlert>
  );

  // Main Component
  return (
    <chakra.form 
      w="full"
      onSubmit={async (e) => {
        e.preventDefault();

        if (!coupon) return;

        // In Cart, there is not email field and skip this verification
        if (customerAddress && !customerAddress.email) {
          setIsCouponInvalid(true)
          setErrorMessage("Please enter email in address!")
          return;
        }

        // INFO: Connect with backend
        setLoading(true)
        const { data: codes } = await axios.get(`${siteURL}/wp-json/wc/v3/coupons?code=${coupon}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)
        const targetCode = codes[0];
        setLoading(false);

        // INFO: If there is nothing then return
        if (!targetCode) {
          setIsCouponInvalid(true)
          return;
        }

        // INFO: If Email is restricted then say invalid
        const customerEmail = customerAddress?.email;
        const restrictedEmail = customerEmail ? targetCode.email_restrictions.includes(customerEmail) : false;  // If email is provided then check otherwise set false to skip this verification
        
        if (restrictedEmail) {
          setIsCouponInvalid(true);
          setErrorMessage("You are not eligible!")
          return;
        }

        // INFO: Logic to find if coupon is expired or not
        const { amount, date_expires } = targetCode;
        const expireTime = new Date(date_expires).getTime();
        const currentTime = new Date().getTime();
        const couponExpired = expireTime >= currentTime ? false : true;

        // If coupon is expired then show "Invalid coupon code"
        if (couponExpired) {
          setIsCouponInvalid(true)
          return;
        } 

        // If coupon discount type is percent.
        if (targetCode.discount_type === "percent") {
          applyCoupon({ ...couponInCart, discountInPercent: amount })
        } else {
          applyCoupon({ ...couponInCart, discountInAmount: amount })
        }
      }}
    >
      <InputGroup {...restProps}>
        <Input 
          placeholder={intl.formatMessage({ id: 'CartPage.CouponCodefield', defaultMessage: 'Coupon Code' })}
          pr="2rem"
          value={coupon}
          onChange={(e) => setCoupon(e.currentTarget.value)}
        />
        <InputRightElement w="6rem">
          <Button 
            size='sm' 
            isLoading={loading}
            colorScheme="primary"
            type='submit'
          ><FormattedMessage id="CartPage.CouponCodeApply" defaultMessage="Apply" /></Button>
        </InputRightElement>
      </InputGroup>
    </chakra.form>
  );
}

function CouponAlert({ status, onClose, children }) {
  return (
    <Alert status={status}>
    <AlertIcon />
    {children}
    <CloseButton 
      _focus={{ outline: 'none' }} 
      position='absolute' right='6px' size="sm" 
      onClick={onClose} 
    />
    </Alert>
  )
}

export default CouponChakara
