import React, { forwardRef, useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ProfileContext } from 'contexts/profile/profile.context';
import useUser from 'data/use-user';
import { CardHeader } from 'components/card-header/card-header';
import { 
  SimpleGrid, 
  Stack, 
  Wrap,
  Checkbox,
  Box as ChakraBox,
  ScaleFade,
  Button as ChakraButton,
  FormControl,
  Input,
  chakra,
  InputProps
} from '@chakra-ui/react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FormikProps } from 'formik';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import FormikInputField from 'components/common/FormikInputField';

interface Props {
  increment?: boolean;
  icon?: boolean;
  buttonProps?: any;
  flexStart?: boolean;
  formik?: FormikProps<any>
  submitTriggered?: boolean
  setIsSubmitTriggered?: (e) => void
  onCreateAccountCheck?: (e) => void;
}

const Address: FC<Props> = ({
  increment = false,
  submitTriggered,
  setIsSubmitTriggered,
  flexStart = false,
  icon = false,
  buttonProps = {
    size: 'big',
    variant: 'outlined',
    type: 'button',
    className: 'add-button',
  },
  onCreateAccountCheck,
  formik,
  children
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  // const passwordRef = useRef<HTMLInputElement>(null);
  const { deleteAddress } = useUser();
  const {
    state: { address },
    dispatch,
  } = useContext(ProfileContext);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleOnDelete = async (item) => {
    dispatch({ type: 'DELETE_ADDRESS', payload: item.id });
    await deleteAddress(item.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (!submitTriggered) return;

    if (formik.errors.email && formik.touched.email) {
      emailRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    }; 
    if (formik.errors.password && formik.touched.password) {
      passwordRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    }; 
    if (formik.errors.confirmPassword && formik.touched.confirmPassword) {
      confirmPasswordRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    }; 
    if (formik.errors.name && formik.touched.name) {
      nameRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.surname && formik.touched.surname) {
      surnameRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.address && formik.touched.address) {
      addressRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.city && formik.touched.city) {
      cityRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.address && formik.touched.address) {
      addressRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.city && formik.touched.city) {
      cityRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.region && formik.touched.region) {
      regionRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.postalCode && formik.touched.postalCode) {
      postalCodeRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.phoneNumber && formik.touched.phoneNumber) {
      phoneNumberRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    // setIsSubmitTriggered(false)
  }, [formik, submitTriggered])

  return (
    <>
      <Wrap justify="space-between">
        <CardHeader increment={increment}>
          <FormattedMessage
            id='checkoutDeliveryAddress'
            defaultMessage='Select Your Delivery Address'
          />
        </CardHeader>
        <ChakraBox display="flex" justifyContent="center" alignItems="center">
          {/* <Checkbox onChange={(e) => setShowPasswordFields(e.currentTarget.checked)}>Creat an account</Checkbox> */}
          <Checkbox 
            onChange={(e) => {
              setShowPasswordFields(e.currentTarget.checked);
              onCreateAccountCheck(e.currentTarget.checked);
            }}
          >
            Creat an account
          </Checkbox>
        </ChakraBox>
      </Wrap>
      <Stack spacing='3'>
        {children}
      </Stack>
      <Stack spacing="3">
        <FormikInputField 
          ref={emailRef}
          label="Email"
          name="email"
          formik={formik}
          placeholder="example1@gmail.com"
          isRequired
        />
        {showPasswordFields && <ScaleFade unmountOnExit in={true}>
          <FormikInputField 
            ref={passwordRef}
            type="password"
            name="password"
            label="Password"
            IconRight={FaLock}
            formik={formik}
            isRequired
          />
          <FormikInputField 
            ref={confirmPasswordRef}
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            IconRight={FaLock}
            formik={formik}
            isRequired
          />
        </ScaleFade>}
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="5">
          <FormikInputField 
            ref={nameRef}
            label="Name"
            name="name"
            IconRight={FaUser}
            formik={formik}
            isRequired
          />
          <FormikInputField 
            ref={surnameRef}
            label="Surname"
            name="surname"
            formik={formik}
            isRequired
          />
        </SimpleGrid>
        <FormikInputField 
          ref={addressRef}
          label="Address"
          name="address"
          formik={formik}
          isRequired
        />
        <FormikInputField 
          ref={cityRef}
          name="city"
          label="City"
          formik={formik}
          isRequired
        />
        <FormikInputField 
          ref={regionRef}
          name="region"
          label="Region"
          formik={formik}
          isRequired
        />
        <FormikInputField 
          ref={postalCodeRef}
          type="number"
          name="postalCode"
          label="Postal code"
          formik={formik}
          isRequired
        />
        <FormikInputField 
          ref={phoneNumberRef}
          name="phoneNumber"
          label="Phone number"
          formik={formik}
          isRequired
        />
      </Stack>
    </>
  );
};

export default Address;