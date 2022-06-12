import React, { useContext } from 'react';

import { ProfileContext } from 'contexts/profile/profile.context';
import { CardHeader } from 'components/card-header/card-header';

import { Box as ChakraBox, Checkbox, Textarea, Stack, FormControl, FormLabel, Divider, Wrap, Heading, Text, SimpleGrid, ScaleFade, RadioGroup, Radio, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { FC } from 'react';
import CustomSelectField from 'components/common/CustomSelectField';
import FormikInputField from 'components/common/FormikInputField';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { useRef } from 'react';

interface Props {
  increment?: boolean
  formik?: FormikProps<any>
  submitTriggered?: boolean
  setIsSubmitTriggered?: (e) => void
  onShowAddressSection?: (e) => void;
}

const Schedules = ({ submitTriggered, setIsSubmitTriggered, increment = false, formik, onShowAddressSection }: Props) => {
  const {
    state: { schedules },
    dispatch,
  } = useContext(ProfileContext);
  const [showAddressSection, setShowAddressSection] = useState(false);
  // Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!submitTriggered) return;

    if (formik.errors.name_2 && formik.touched.name_2) {
      nameRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.surname_2 && formik.touched.surname_2) {
      surnameRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.address_2 && formik.touched.address_2) {
      addressRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.city_2 && formik.touched.city_2) {
      cityRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.postalCode_2 && formik.touched.postalCode_2) {
      postalCodeRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
  }, [formik, submitTriggered])

  return (
    <>
      <CardHeader increment={increment}>
        <ChakraBox display="flex" justifyContent="center" alignItems="center">
          <Checkbox 
            onChange={(e) => {
              setShowAddressSection(e.currentTarget.checked);
              onShowAddressSection(e.currentTarget.checked);
            }} 
            fontWeight="bold"
          >Send to a different address?</Checkbox>
        </ChakraBox>
      </CardHeader>

      {showAddressSection && 
        <ScaleFade unmountOnExit in={true}>
          {/* <AddressSection 
            formik={formik}
          /> */}
          <Stack spacing="3">
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="5">
              <FormikInputField 
                ref={nameRef}
                label="Name"
                name="name_2"
                formik={formik}
                isRequired
              />
              <FormikInputField
                ref={surnameRef}
                label="Surname"
                name="surname_2"
                isRequired
                formik={formik}
              />
            </SimpleGrid>
            <FormikInputField 
              label="Company name (optional)"
              name="companyName_2"
              formik={formik}
            />
            <Stack spacing="3">
              <FormikInputField 
                ref={addressRef}
                label="Address"
                name="address_2"
                placeholder="Address and number"
                isRequired
                formik={formik}
              />
              <FormikInputField 
                name="pinAddress_2"
                placeholder="Apartment, suit, unit, etc. (optional)"
                formik={formik}
              />
            </Stack>
            <CustomSelectField 
              label="Country / Region"
              isRequired
              options={["Helas", "Greek", "Canada"]}
            />
            <FormikInputField 
              ref={cityRef}
              label="City / Town"
              name="city_2"
              isRequired
              formik={formik}
            />
            <CustomSelectField 
              label="Prefecture"
              isRequired
              options={["Attica", "Option 2", "Option 3"]}
            />
            <FormikInputField 
              ref={postalCodeRef}
              type='number'
              label="Postal code"
              name="postalCode_2"
              isRequired
              formik={formik}
            />
            <FormControl>
              <FormLabel>Order notes (optional)</FormLabel>
              <Textarea 
                placeholder="Notes on your order, e.g., special delivery notes"
              />
            </FormControl>
          </Stack>
        </ScaleFade>
      }
      <DeliverySection />
    </>
  );
};

const DeliverySection: FC = () => {
  return (
    <ChakraBox mt="8" py="2" borderTop="1px" borderBottom="1px" borderColor="gray.200">
      <Wrap justify="space-between" align="center">
        <Text fontSize="md" fontWeight="bold">Delivery</Text>

        <RadioGroup defaultValue="1">
          <Stack fontWeight="bold" fontSize="sm" align="flex-end">
            <Radio value="1">
              <Text align="right">ELTA COURIER: 16.00&euro;</Text>
            </Radio>
            <Radio value="2">
              <Text align="right">Delivery 1</Text>
            </Radio>
            <Radio value="3">
              <Text align="right">Delivery 2</Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </Wrap>
    </ChakraBox>
  )
}

export default Schedules;
