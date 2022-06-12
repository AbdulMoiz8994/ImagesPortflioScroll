import React, { useContext, useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'components/button/button';
import { CURRENCY } from 'utils/constant';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  CheckoutSubmit,
  HaveCoupon,
  CouponBoxWrapper,
  CouponInputBox,
  CouponCode,
  RemoveCoupon,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text,
  Bold,
  Small,
  NoProductMsg,
  NoProductImg,
} from './checkout-two.style';

import { NoCartBag } from 'assets/icons/NoCartBag';

import Sticky from 'react-stickynode';
import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import { useLocale } from 'contexts/language/language.provider';
import { useWindowSize } from 'utils/useWindowSize';
import Coupon from 'features/coupon/coupon';
import Schedules from 'features/schedule/schedule';
import Contact from 'features/contact/contact';
import Payment from 'features/payment/payment';
import Address from 'features/address/address';
import { 
  Checkbox, 
  Box as ChakraBox, 
  chakra, 
  Button as ChakraButton, 
  Container as ChakraContainer, 
  Alert as ChakraAlert, 
  AlertIcon as ChakraAlertIcon ,
  Link as ChakraLink
} from '@chakra-ui/react';
import CustomInputField from 'components/common/CustomInputField';
import { useRef } from 'react';
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { FaLock, FaUser } from 'react-icons/fa';

// The type of props Checkout Form receives
interface MyFormProps {
  token: string;
  deviceType: any;
}

type CartItemProps = {
  product: any;
};

const OrderItem: React.FC<CartItemProps> = ({ product }) => {
  const { id, quantity, title, name, unit, price, salePrice } = product;
  const displayPrice = salePrice ? salePrice : price;
  return (
    <Items key={id}>
      <Quantity>{quantity}</Quantity>
      <Multiplier>x</Multiplier>
      <ItemInfo>
        {name ? name : title} {unit ? `| ${unit}` : ''}
      </ItemInfo>
      <Price>
        {CURRENCY}
        {(displayPrice * quantity).toFixed(2)}
      </Price>
    </Items>
  );
};

const CheckoutWithSidebar: React.FC<MyFormProps> = ({ token, deviceType }) => {
  const router = useRouter();
  const [hasCoupon, setHasCoupon] = useState(false);
  const { state } = useContext(ProfileContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  // const regionRef = useRef<HTMLInputElement>(null);

  const { isRtl } = useLocale();
  const {
    items,
    removeCoupon,
    coupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
    isRestaurant,
    toggleRestaurant,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showOtherAddressSection, setShowOtherAddressSection] = useState(false);
  const [agreedOnTermsAndCondtions, setAgreedOnTermsAndCondtions] = useState(false);
  const [isSubmitTriggered, setIsSubmitTriggered] = useState(false);
  const { address, contact, card, schedules } = state;
  const [isSuccess, setIsSuccess] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if (
      calculatePrice() > 0 &&
      cartItemsCount > 0 &&
      address.length &&
      contact.length &&
      card.length &&
      schedules.length
    ) {
      setIsValid(true);
    }
  }, [state]);
  useEffect(() => {

    return () => {
      // if (isRestaurant) {
        // toggleRestaurant();
        if (isSuccess) {
          clearCart();
        }
      // }
    };
  }, [isSuccess]);

  if (cartItemsCount === 0) return <ChakraContainer maxW="container.lg" mt="20" mb="10" py="8"> 
    <ChakraAlert status="error">
      <ChakraAlertIcon />
      You haven't add any products in your cart yet. <ChakraLink ml="2" onClick={() => router.replace("/")}> Please add some products from here </ChakraLink>
    </ChakraAlert>
  </ChakraContainer>

  return (
    <Formik 
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        surname: "",
        address: "",
        city: "",
        region: "",
        postalCode: "",
        phoneNumber: "",
        name_2: "",
        surname_2: "",
        companyName_2: "",
        address_2: "",
        pinAddress_2: "",
        city_2: "",
        postalCode_2: "",
      }}
      onSubmit={(values) => {
        console.log("Form submitted by formik! :: ", { values });
          setIsSuccess(true)
          setLoading(true);
          // if (isValid) {
          Router.push('/order-received');
            // clearCart();
          // }
          setLoading(false);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required().label("Email"),
        password: showPasswordFields ? Yup.string().required().min(4).max(6).label("Password") : null,
        confirmPassword: showPasswordFields ? Yup.string().required().min(4).max(6).label("Confirm password") : null,
        name: Yup.string().required().min(4).label("Name"),
        surname: Yup.string().required().min(4).label("Surname"),
        address: Yup.string().required().min(4).label("Address"),
        city: Yup.string().required().min(4).label("City"),
        region: Yup.string().required().min(4).label("Region"),
        postalCode: Yup.string().required().length(5, "Postal code must be exactly 5 digits").label("Postal code"),
        phoneNumber: Yup.string().required().length(10).label("Phone number"),
        name_2: showOtherAddressSection ? Yup.string().required().label("Name") : null,
        surname_2: showOtherAddressSection ? Yup.string().required().label("Surname") : null,
        companyName_2: showOtherAddressSection ? Yup.string().label("Company name") : null,
        address_2: showOtherAddressSection ? Yup.string().required().label("Address / Region") : null,
        pinAddress_2: showOtherAddressSection ? Yup.string().label("Pin address") : null,
        city_2: showOtherAddressSection ? Yup.string().required().label("City / Town") : null,
        postalCode_2: showOtherAddressSection ? Yup.string().required().length(5, "Postal code must be exactly 5 digits").label("Postal code") : null,
      })}
    >
      {props => {
        return (
          <chakra.form 
            onSubmit={(e) => {
              e.preventDefault();

              props.handleSubmit();
              setIsSubmitTriggered(true);
            }}
          >
            <CheckoutWrapper>
              <CheckoutContainer>
                <CheckoutInformation>
                  {/* DeliveryAddress */}
                  <InformationBox>
                    <Address
                      formik={props}
                      submitTriggered={isSubmitTriggered}
                      setIsSubmitTriggered={setIsSubmitTriggered}
                      increment={true}
                      flexStart={true}
                      buttonProps={{
                        variant: 'text',
                        type: 'button',
                        className: 'addButton',
                      }}
                      icon={true}
                      onCreateAccountCheck={(isChecked) => setShowPasswordFields(isChecked)}
                    />
                  </InformationBox>

                  {/* DeliverySchedule */}
                  <InformationBox>
                    <DeliverySchedule>
                      <Schedules 
                        formik={props} 
                        submitTriggered={isSubmitTriggered}
                        setIsSubmitTriggered={setIsSubmitTriggered}
                        increment={true} 
                        onShowAddressSection={(isChecked) => setShowOtherAddressSection(isChecked)}
                      />
                    </DeliverySchedule>
                  </InformationBox>

                  {/* PaymentOption */}
                  <InformationBox
                    className='paymentBox'
                    style={{ paddingBottom: 30 }}
                  >
                    <Payment deviceType={deviceType} increment={true} />

                    <TermConditionText>
                      <Checkbox onChange={(e) => setAgreedOnTermsAndCondtions(e.currentTarget.checked)}>I have read and agree to the terms and conditions of the site <ChakraBox as="span" color="red" fontWeight="bold">*</ChakraBox></Checkbox>
                    </TermConditionText>

                    {/* CheckoutSubmit */}
                    <CheckoutSubmit>
                      <Button
                        // type='button'
                        // onClick={handleSubmit}
                        type="submit"
                        // disabled={!isValid}
                        disabled={!agreedOnTermsAndCondtions}
                        size='big'
                        loading={loading}
                        style={{ width: '100%' }}
                      >
                        <FormattedMessage
                          id='processCheckout'
                          defaultMessage='Proceed to Checkout'
                        />
                      </Button>
                    </CheckoutSubmit>
                  </InformationBox>
                </CheckoutInformation>

                <CartWrapper>
                  <Sticky
                    enabled={size.width >= 768 ? true : false}
                    top={120}
                    innerZ={999}
                  >
                    <OrderInfo>
                      <Title>
                        <FormattedMessage
                          id='cartTitle'
                          defaultMessage='Your Order'
                        />
                      </Title>

                      <Scrollbar className='checkout-scrollbar'>
                        <ItemsWrapper>
                          {cartItemsCount > 0 ? (
                            items.map((item) => (
                              <OrderItem key={`cartItem-${item.id}`} product={item} />
                            ))
                          ) : (
                            <>
                              <NoProductImg>
                                <NoCartBag />
                              </NoProductImg>

                              <NoProductMsg>
                                <FormattedMessage
                                  id='noProductFound'
                                  defaultMessage='No products found'
                                />
                              </NoProductMsg>
                            </>
                          )}
                        </ItemsWrapper>
                      </Scrollbar>

                      <CalculationWrapper>
                        <TextWrapper>
                          <Text>
                            <FormattedMessage
                              id='subTotal'
                              defaultMessage='Subtotal'
                            />
                          </Text>
                          <Text>
                            {CURRENCY}
                            {calculateSubTotalPrice()}
                          </Text>
                        </TextWrapper>

                        <TextWrapper>
                          <Text>
                            <FormattedMessage
                              id='intlOrderDetailsDelivery'
                              defaultMessage='Delivery Fee'
                            />
                          </Text>
                          <Text>{CURRENCY}0.00</Text>
                        </TextWrapper>

                        <TextWrapper>
                          <Text>
                            <FormattedMessage
                              id='discountText'
                              defaultMessage='Discount'
                            />
                          </Text>
                          <Text>
                            {CURRENCY}
                            {calculateDiscount()}
                          </Text>
                        </TextWrapper>

                        <TextWrapper style={{ marginTop: 20 }}>
                          <Bold>
                            <FormattedMessage id='totalText' defaultMessage='Total' />{' '}
                            <Small>
                              (
                              <FormattedMessage
                                id='vatText'
                                defaultMessage='Incl. VAT'
                              />
                              )
                            </Small>
                          </Bold>
                          <Bold>
                            {CURRENCY}
                            {calculatePrice()}
                          </Bold>
                        </TextWrapper>
                      </CalculationWrapper>
                    </OrderInfo>
                  </Sticky>
                </CartWrapper>
              </CheckoutContainer>
            </CheckoutWrapper>
          </chakra.form>
        )
      }}
    </Formik>
  );
};

export default CheckoutWithSidebar;
