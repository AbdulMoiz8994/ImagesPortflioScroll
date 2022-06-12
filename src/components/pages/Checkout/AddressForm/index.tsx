import { InputGroup, InputRightElement, Container, SimpleGrid, Box, Stack, Text, Input, Checkbox, Divider, Wrap, MenuList, MenuItem, Menu, InputProps, MenuButton, Button, Select, chakra, ScaleFade, FormControl, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { App as ProgressSteps } from 'components/common/ProgressSteps/App';
import { useState } from 'react';
import CustomFormInput from 'components/pages/Checkout/CustomFormInput';
import CustomFormSelect from 'components/pages/Checkout/CustomFormSelect';
import  {
  geocodeByAddress,
} from "react-places-autocomplete";
import Map from 'components/common/Map';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import PlacesAutoComplete from 'components/pages/Checkout/PlacesAutocomplete';
import getAddressData from 'utils/getAddressData';
import SectionHeading from './SectionHeading';
import { FC } from 'react';
import { useContext } from 'react';
import { AuthContext } from 'contexts/auth/auth.context';
import useViesVat from 'hooks/useViesVat';
import { CheckIcon } from '@chakra-ui/icons';
import CustomSelectField from 'components/common/CustomSelectField';
import CustomAreaText from '../CustomTextArea';
import { FormattedMessage, useIntl } from 'react-intl';
import { trackStartedCheckoutActivity } from 'services/klaviyo';
import { useCart } from 'contexts/cart/use-cart';

interface Props {
  onAddressSubmit?: any,
  loading?: boolean
  loadingText?: string,
  onCountryChange?: (value: string) => void
  onPostalCodeChange?: (value: string) => void
  onEmailChange?: (value: string) => void
  onViesChange?: (param: any) => void
}

const AddressForm:FC<Props> = ({ onAddressSubmit, loading, loadingText, onCountryChange, onPostalCodeChange, onEmailChange, onViesChange }) => {
  const [country, setCountry] = useState("gr");
  const [country2, setCountry2] = useState("gr");
  const [email, setEmail] = useState(null);
  const intl = useIntl();
  const [toggleAnotherAddress, setToggleAnotherAddress] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({ code: "+30" , number: "" })
  const [cellPhoneNumber, setCellPhoneNumber] = useState({ code: "+30", number: "" })
  const [cellPhoneNumber2, setCellPhoneNumber2] = useState({ code: "+30", number: "" })
  const schema = yup.object().shape({
    name: yup.string().required("Το Όνομα είναι υποχρεωτικό").label("Όνομα"),
    name2: toggleAnotherAddress ? yup.string().required("Name is required").label("Name") : null,
    surname: yup.string().required("Το Επώνυμο είναι υποχρεωτικό"),
    surname2: toggleAnotherAddress ? yup.string().required("Το Επώνυμο είναι υποχρεωτικό"): null,
    address: yup.string().required("Η Διεύθυνση είναι υποχρεωτικό πεδίο"),
    address2: toggleAnotherAddress ? yup.string().required("Η Διεύθυνση είναι υποχρεωτικό πεδίο") : null,
    city: yup.string().required("Η Πόλη είναι υποχρεωτικό πεδίο"),
    city2: toggleAnotherAddress ? yup.string().required("City is required") : null,
    postalCode: country === "gr" ?
       yup.string().length(5, "Ο Τ.Κ πρέπει να έχει 5 ψηφία").required("Ο Τ.Κ είναι υποχρεωτικό πεδίο") :
       yup.string().length(4, "Ο Τ.Κ πρέπει να έχει 4 ψηφία για Κύπρο").required("Ο Τ.Κ είναι υποχρεωτικό πεδίο"),
    postalCode2: toggleAnotherAddress ? yup.string().length(5, "Ο Τ.Κ πρέπει να έχει 5 ψηφία").required("Ο Τ.Κ είναι υποχρεωτικό πεδίο") : null,
    state: yup.string().required("Η Περιοχή είναι υποχρεωτικό πεδίο"),
    state2: toggleAnotherAddress ? yup.string().required("Η Περιοχή είναι υποχρεωτικό πεδίο") : null,
    phoneNumber: phoneNumber.code === "+30" ?  
      yup.string() : 
      yup.string(),
    cellPhoneNumber: cellPhoneNumber.code === "+1" ? 
      // yup.string().required("Cell phone number is required").length(12, "Must be exactly 11 digits (includes country code)") :
      yup.string().required("Το Κινητό Τηλέφωνο είναι υποχρεωτικό").length(12, "Ο αριθμός τηλεφώνου πρέπει να έχει 11 ψηφία (μαζί με τον κωδικό χώρας)") :
      cellPhoneNumber.code === "+30" ? yup.string().required("Το Κινητό Τηλέφωνο είναι υποχρεωτικό").length(13, "Ο αριθμός τηλεφώνου πρέπει να έχει 12 ψηφία (μαζί με τον κωδικό χώρας)") :
      yup.string().required("Το Κινητό Τηλέφωνο είναι υποχρεωτικό").length(14, "Ο αριθμός τηλεφώνου πρέπει να έχει 13 ψηφία (μαζί με τον κωδικό χώρας)"),
    email: yup.string().email("Το email δεν είναι έγκυρο").required("Η διεύθυνση email είναι υποχρεωτικό πεδίο"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, ...rest },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema)
  });
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("")
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [latLng2, setLatLng2] = useState({ lat: 0, lng: 0 });
  const { authState } = useContext<any>(AuthContext);
  const { loading: viesVatLoading, getViesData, viesData, error, setViesData } = useViesVat();
  const [vatNumber, setVatNumber] = useState("");
  const [showInvoiceField, setShowInvoiceField] = useState("no");
  const {
    calculatePrice
  } = useCart();

  {/** SECTION - (read-only): It will send the latest values to outside of the component via props function that being opted */}
  useEffect(() => {
    const postalCode = getValues('postalCode');
    const email = getValues('email');
    const country = getValues('country');


    onPostalCodeChange(postalCode);
    onEmailChange(email);
    onCountryChange(country);
  }, [getValues()])

  // SECTION - (state --> form): It will set values to form from local host of exist
  useEffect(() => {
    const addressDataFromLocalStorage = JSON.parse(localStorage.getItem("checkout-address"));
    const customerFromLocalStorage = JSON.parse(localStorage.getItem('customer'));
    const validation = { shouldValidate: true, shouldDirty: true };

    if (customerFromLocalStorage) {
      const { email: customerEmail } = customerFromLocalStorage;
      setValue("email", customerEmail, validation);
    } 

    if (!addressDataFromLocalStorage) return;

    const { 
      name, 
      surname, 
      address, 
      latLng, 
      latLng2,
      cellPhoneNumber, 
      city, 
      country, 
      email, 
      phoneNumber, 
      postalCode, 
      state,
      anotherAddress
    } = addressDataFromLocalStorage;

    // If 'Another Address' exists then open that form when component renders
    if (anotherAddress?.isAnotherAddress) {
      setToggleAnotherAddress(true);
    } else {
      setToggleAnotherAddress(false);
    }

    setCountry(country);
    setCountry2(country2);
    setAddress(address);
    setAddress2(address2);
    setLatLng({ lat: latLng?.lat|| 0, lng: latLng?.lng || 0 });
    setLatLng2({ lat: latLng2?.lat || 0, lng: latLng2?.lng || 0 });
    setCellPhoneNumber(cellPhoneNumber);
    setCellPhoneNumber2(anotherAddress?.cellPhoneNumber);
    setPhoneNumber(phoneNumber);
    setValue("name", name, validation);
    setValue("name2", anotherAddress?.name, validation);
    setValue("email", email, validation);
    setValue("postalCode", postalCode, validation);
    setValue("postalCode2", anotherAddress?.postalCode, validation);
    setValue("surname", surname, validation);
    setValue("surname2", anotherAddress?.surname, validation);
    setValue("city", city, validation);
    setValue("city2", anotherAddress?.city, validation);
    setValue("state", state, validation);
    setValue("state2", anotherAddress?.state, validation);
  }, [])

  // It should unfil the another form address
  useEffect(() => {
    const validation = { shouldValidate: true, shouldDirty: true };
    if (!toggleAnotherAddress) {
      setValue("name2", "", validation);
      setValue("postalCode2", "", validation);
      setValue("surname2", "", validation);
      setValue("city2", "", validation);
      setValue("state2", "", validation);

      setCountry2("");
      setAddress2("");
      setLatLng2({ lat: 0, lng: 0 });
    }
  }, [toggleAnotherAddress])


  // SECTION - (State-only): if "shouldInvoiceField" is "no" then make viesData state 'null'
  useEffect(() => {
    if (showInvoiceField === "no") {
      setViesData(null);
    };
  }, [showInvoiceField]);
  
  {/** SECTION - (state --> form): Grab postalCode and state from viesData */}
  useEffect(() => {
    if (!viesData) {
      onViesChange(null);
      return;
    };

    // console.log({ viesData })
    
    setValue("postalCode", viesData?.basicInfo?.postal_zip_code['_text'], {
      shouldValidate: true,
      shouldDirty: true
    });
    setValue("state", viesData?.basicInfo?.postal_area_description['_text'], {
      shouldValidate: true,
      shouldDirty: true
    });
    
    // Invoice details
    const invoice_afm = viesData?.basicInfo?.afm['_text'];
    const invoice_postal_address = viesData?.basicInfo?.postal_address['_text'];
    const invoice_postal_address_no = viesData?.basicInfo?.postal_address_no['_text'];
    const is_invoice = !viesData ? "no" : "yes";
    
    setValue("invoice_afm", invoice_afm);
    setValue("invoice_postal_address", invoice_postal_address);
    setValue("invoice_postal_address_no", invoice_postal_address_no);
    setValue("is_invoice", is_invoice);
    
    setValue("city", viesData?.basicInfo?.postal_area_description['_text'])
    setAddress(`${invoice_postal_address} ${invoice_postal_address_no}`)
    
    onViesChange(viesData);
  }, [viesData])

  {/* SECTION - (state --> form): It will set country to form  */}
  useEffect(() => {
    setValue("country", country, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [country]);
  {/* SECTION - (state --> form): It will set country2 to form  */}
  useEffect(() => {
    setValue("country2", country2, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [country2]);
  
  {/* SECTION - (state --> form): It will set phoneNumber to form with specific format  */}
  useEffect(() => {
    if (!phoneNumber.number) return;
    setValue("phoneNumber", `${phoneNumber.code}${phoneNumber.number}`, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [phoneNumber])
  {/* SECTION - (state --> form): It will set cellPhoneNumber to form with specific format  */}
  useEffect(() => {
    // setValue is the fmethod to set value explicitely in react-hook-form --> https://react-hook-form.com/api/useform/setvalue
    if (!cellPhoneNumber.number) return;
    setValue("cellPhoneNumber", `${cellPhoneNumber.code}${cellPhoneNumber.number}`, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [cellPhoneNumber]);  
  {/* SECTION - (state --> form): It will set cellPhoneNumber2 to form with specific format  */}
  useEffect(() => {
    // setValue is the fmethod to set value explicitely in react-hook-form --> https://react-hook-form.com/api/useform/setvalue
    if (!cellPhoneNumber2?.number) return;
    setValue("cellPhoneNumber2", `${cellPhoneNumber2.code}${cellPhoneNumber2.number}`, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [cellPhoneNumber2]);  
  {/* SECTION - (state --> form): It will set address to form with specific format  */}
  useEffect(() => {
    // setValue is the fmethod to set value explicitely in react-hook-form --> https://react-hook-form.com/api/useform/setvalue
    if (!address) return;
    setValue("address", address, {
      shouldValidate: true,
      shouldDirty: true
    })

  }, [address]);
  {/* SECTION - (state --> form): It will set address2 to form with specific format  */}
  useEffect(() => {
    if (!address2) return;
    setValue("address2", address2, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [address2]);

  {/* SECTION - (state --> form): 
    1- It will check if user is authenticated or not
    2- If authenticated then grab the email address and set to the form with specific format  
  */}
  useEffect(() => {
    const customerFromLocalStorage = JSON.parse(localStorage.getItem('customer'));
    const validation = { shouldValidate: true, shouldDirty: true };

    if (customerFromLocalStorage) {
      const { email: customerEmail } = customerFromLocalStorage;
      setValue("email", customerEmail, validation);
    } 
  }, [authState.isAuthenticated])

  {/**
    SECTION - handlers
  */}
  const handleAddressAutoComplete1 = async (address) => {
    const responseByAddress = await geocodeByAddress(address);
    const { state, city, postalCode, lat, lng } = getAddressData(responseByAddress);
    const validation = { shouldValidate: true, shouldDirty: true }
    
    setAddress(address);
    // setValue("country", country, validation);
    setValue("city", city, validation);
    setValue("postalCode", postalCode.replace(" ", ""), validation);
    setValue("state", state, validation)
    setLatLng({ lat, lng })
  };
  const handleAddressAutoComplete2 = async (address) => {
    const responseByAddress = await geocodeByAddress(address);
    const { state, city, postalCode, lat, lng } = getAddressData(responseByAddress);
    const validation = { shouldValidate: true, shouldDirty: true }

    setAddress2(address);
    // setValue("country2", country, validation)
    setValue("city2", city, validation);
    setValue("postalCode2", postalCode.replace(" ", ""), validation);
    setValue("state2", state, validation)
    setLatLng2({ lat, lng })
  }

  {/** It will be triggered form submitted (if there is no error) */}
  const onSubmit = async (data) => {
    // Track activity on Klaviyo
    // trackStartedCheckoutActivity(getValues('email'), calculatePrice())  // Nick don't want to track on form submit but he wants on email input field after leaving that field

    const preparedData = { 
      ...data, 
      latLng, 
      latLng2, 
      cellPhoneNumber, 
      phoneNumber: { ...phoneNumber, code: country === "gr" ? "+30" : "+357" },
      anotherAddress: {
        isAnotherAddress: toggleAnotherAddress,
        name: data.name2 || "",
        surname: data.surname2 || "",
        state: data.state2 || "",
        postalCode: data.postalCode2 || "",
        country: data.country2 || "",
        city: data.city2 || "",
        address: data.address2 || ""
      },
      invoice: {
        is_invoice: data.is_invoice ? "Y" : "N",
        afm: data.invoice_afm || "",
        doy_descr: data.invoice_doy_descr || "",
        onomasia: data.invoice_onomasia || "",
        postal_address: data.invoice_postal_address || "",
        postal_address_no: data.invoice_postal_address_no || "",
        Δραστηριότητα: data.invoice_Δραστηριότητα || "",
      }
    };
    localStorage.setItem("checkout-address", JSON.stringify(preparedData));
    onAddressSubmit(preparedData);
  };

  return (
    <Box shadow="sm" border="1px" borderColor="gray.200" pt="2" pb="10" w="40rem" bg="white">
      <chakra.form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing="8" mx="10"  py="5">
          <SectionHeading text={intl.formatMessage({ id: 'CheckoutPage.Heading', defaultMessage: 'Do you want a receipt or invoice?' })} />

          {/* VAT Number, D.O.Y input fields */}
          <CustomFormSelect 
            label="Τύπος Παραστατικού"
            options={[
              { label: intl.formatMessage({ id: 'CheckoutPage.InvoiceNo', defaultMessage: 'No' }), value: 'no' },
              { label: intl.formatMessage({ id: 'CheckoutPage.InvoiceYes', defaultMessage: 'Yes' }), value: 'yes' },
            ]}
            onChange={(e) => setShowInvoiceField(e.currentTarget.value)}
          />

          {showInvoiceField === "yes" && <InputGroup size="lg">
            <CustomFormInput 
              value={vatNumber} 
              onChange={(e) => setVatNumber(e.currentTarget.value)}
              errorMessage={error} 
              // placeholder="VAT NUMBER" 
              placeholder="ΑΦΜ" 
            />
            <InputRightElement 
              width="4.5rem"
              px="1" 
            >
              {viesData && !error ? <InputRightElement children={<CheckIcon color="green.500" />} /> :  <Button 
                size="sm"
                isLoading={viesVatLoading}
                onClick={async () => await getViesData({ vatNumber })}
              >
                {/* Submit */}
                ΕΥΡΕΣΗ
              </Button>}
            </InputRightElement>
          </InputGroup>}

          {viesData && (
            <ScaleFade initialScale={0.9} in={true}>
              <SimpleGrid columns={1} spacing="2">
                <CustomFormInput value={viesData.basicInfo.doy_descr['_text']} {...register("invoice_doy_descr")} label="Δ.Ο.Υ" placeholder="Δ.Ο.Υ" />
                <CustomFormInput value={viesData.basicInfo.onomasia['_text']} {...register("invoice_onomasia")} label="ΕΠΩΝΥΜΙΑ" placeholder="ΕΠΩΝΥΜΙΑ" />
                {(viesData.firmInfo.item.length > 0 && viesData.firmInfo.item[0].firm_act_descr['_text']) && 
                  <CustomFormInput value={viesData.firmInfo.item[0].firm_act_descr['_text']} {...register("invoice_Δραστηριότητα")} label="Δραστηριότητα" placeholder="Δραστηριότητα" />}
              </SimpleGrid>
            </ScaleFade>
          )}

          {/* Name and Adjective/surname fields */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">  
            <CustomFormInput label={intl.formatMessage({ id: 'CheckoutPage.NameField', defaultMessage: 'Name' })} isRequired fieldName="name" errors={errors} {...register("name")} placeholder={intl.formatMessage({ id: 'CheckoutPage.NameField', defaultMessage: 'Name' })} />
            <CustomFormInput label={intl.formatMessage({ id: 'CheckoutPage.SurnameField', defaultMessage: 'Surname' })} isRequired fieldName="surname" errors={errors} {...register("surname")} placeholder={intl.formatMessage({ id: 'CheckoutPage.SurnameField', defaultMessage: 'Surname' })} />
          </SimpleGrid>

          {/* Email */}
          <CustomFormInput 
            label={intl.formatMessage({ id: 'footer.emailTitle', defaultMessage: 'Email' })} 
            isRequired 
            type="email" 
            fieldName="email" 
            errors={errors} 
            placeholder={intl.formatMessage({ id: 'popup.emailField', defaultMessage: 'Email Address' })}
            {...register("email")} 
            onBlur={() => getValues('email').length > 0 && trackStartedCheckoutActivity(getValues('email'), calculatePrice())}
          />

          {/* Address field */}
            <PlacesAutoComplete 
              value={address}
              onChange={(value) => setAddress(value)}
              onSelect={handleAddressAutoComplete1}
              registerProps={{...register("address")}}
              errors={errors}
              label={intl.formatMessage({ id: 'CheckoutPage.AddressField', defaultMessage: 'Address' })}
              placeholder={intl.formatMessage({ id: 'CheckoutPage.AutomaticAddress', defaultMessage: 'Automatic Address Filling' })}
              fieldName="address"
              country={country}
            />

          {/* City and postal-code input fields */}
          <SimpleGrid columns={{ base: 0, md: 2 }} spacing="6">
            <CustomFormInput label={intl.formatMessage({ id: 'CheckoutPage.cityField', defaultMessage: 'City' })} isRequired fieldName="city" errors={errors} {...register("city")} placeholder={intl.formatMessage({ id: 'CheckoutPage.cityField', defaultMessage: 'City' })} />
            <CustomFormInput 
              label={intl.formatMessage({ id: 'CheckoutPage.PostalCodeField', defaultMessage: 'Postal Code' })}
              type="number" 
              isRequired 
              fieldName="postalCode" 
              errors={errors} 
              placeholder={intl.formatMessage({ id: 'CheckoutPage.PostalCodeField', defaultMessage: 'Postal Code' })}
              {...register("postalCode")}
              // onChange={(e) => setPostalCode(e.currentTarget.value)}  // It was creating problem while update the state because {...register('postalCode')} handles everything I think so
            />
          </SimpleGrid>

          {/* Law or state input field */}
          <CustomFormInput label={intl.formatMessage({ id: 'CheckoutPage.StateField', defaultMessage: 'State' })} isRequired fieldName="state" errors={errors} {...register("state")} placeholder={intl.formatMessage({ id: 'CheckoutPage.StateField', defaultMessage: 'State' })} />

          <CustomFormSelect 
            value={country}
            label={intl.formatMessage({ id: 'CheckoutPage.CountryField', defaultMessage: 'Country' })}
            isRequired 
            options={[
              { label: intl.formatMessage({ id: 'CheckoutPage.Greece', defaultMessage: 'Greece' }), value: "gr" },
              { label: intl.formatMessage({ id: 'CheckoutPage.Cyprus', defaultMessage: 'Cyprus' }), value: "cy" },
            ]}  
            onChange={(e) => {
              setCountry(e.currentTarget.value);
              setAddress("");
            }}
          />

          {/* Read only */}
          <Box w="full" h="40vh">
            <Map 
              lat={latLng.lat}
              lng={latLng.lng}
            />
          </Box>                            

          {/* Phone and cell phone number input fields */}
         
          <CustomFormInput LeftAddon={<SelectCountryCode value={cellPhoneNumber.code} onSelect={(value: string) => setCellPhoneNumber({ code: value, number: "" })} />} value={cellPhoneNumber.number} onChange={(e) => setCellPhoneNumber({ ...cellPhoneNumber, number: e.currentTarget.value })} type="number" label={intl.formatMessage({ id: 'CheckoutPage.CellPhoneField', defaultMessage: 'Cell Phone Number' })} isRequired fieldName="cellPhoneNumber" errors={errors} placeholder={intl.formatMessage({ id: 'CheckoutPage.CellPhoneField', defaultMessage: 'Cell Phone Number' })} />
          <CustomFormInput LeftAddon={country === "gr" ? "+30" : "+357"} type="number" label={intl.formatMessage({ id: 'CheckoutPage.PhoneNumberField', defaultMessage: 'Phone Number' })} fieldName="phoneNumber" errors={errors} value={phoneNumber.number} onChange={(e) => setPhoneNumber({ code: phoneNumber.code, number: e.currentTarget.value })} placeholder={intl.formatMessage({ id: 'CheckoutPage.PhoneNumberField', defaultMessage: 'Phone Number' })} />

          {/* TODO: Has to work on another address */}
          <Checkbox isChecked={toggleAnotherAddress} size="lg" colorScheme="primary" onChange={(e) => setToggleAnotherAddress(e.currentTarget.checked)}><FormattedMessage id="CheckoutPage.DifferentAddressCheckbox" defaultMessage="I want to pick up at another address" /></Checkbox>
        </Stack>

        {/* <Divider my="6" borderColor="gray.400" /> */}
        
        {/* TODO: Has to work on another address */}
        {toggleAnotherAddress && <ScaleFade initialScale={0.9} in={true}>
          <Stack spacing="6" mx="10" py="5">
            {/* <SectionHeading text="Your data" /> */}
            
            {/* INFO: Name2 and Surname2 */}
            <SimpleGrid columns={2} spacing="6">
              <CustomFormInput label={intl.formatMessage({ id: 'CheckoutPage.NameField', defaultMessage: 'Name' })} isRequired fieldName="name2" errors={errors} {...register("name2")} placeholder={intl.formatMessage({ id: 'CheckoutPage.NameField', defaultMessage: 'Name' })}/>
              <CustomFormInput label={intl.formatMessage({ id: 'CheckoutPage.SurnameField', defaultMessage: 'Surname' })} isRequired fieldName="surname2" errors={errors} {...register("surname2")} placeholder={intl.formatMessage({ id: 'CheckoutPage.SurnameField', defaultMessage: 'Surname' })} />
            </SimpleGrid >

            {/* INFO: Address2  */}
            <PlacesAutoComplete 
              value={address2}
              onChange={(value) => setAddress2(value)}
              onSelect={handleAddressAutoComplete2}
              registerProps={{...register("address2")}}
              errors={errors}
              label={intl.formatMessage({ id: 'CheckoutPage.AddressField', defaultMessage: 'Address' })}
              placeholder={intl.formatMessage({ id: 'CheckoutPage.AutomaticAddress', defaultMessage: 'Automatic Address Filling' })}
              fieldName="address2"
              country={country2}
            />

            {/* City2 and postal-code2 */}
            <SimpleGrid columns={2} spacing="6">
              <CustomFormInput 
                label={intl.formatMessage({ id: 'CheckoutPage.cityField', defaultMessage: 'City' })}
                isRequired 
                fieldName="city2" 
                errors={errors} 
                {...register("city2")} 
                placeholder={intl.formatMessage({ id: 'CheckoutPage.cityField', defaultMessage: 'City' })} 
              />
              <CustomFormInput 
                label={intl.formatMessage({ id: 'CheckoutPage.PostalCodeField', defaultMessage: 'Postal Code' })}
                type="number" 
                isRequired 
                fieldName="postalCode2" 
                errors={errors} 
                {...register("postalCode2")} 
                placeholder={intl.formatMessage({ id: 'CheckoutPage.PostalCodeField', defaultMessage: 'Postal Code' })}
              />
            </SimpleGrid>

            {/* State2 */}
            <CustomFormInput 
              label={intl.formatMessage({ id: 'CheckoutPage.StateField', defaultMessage: 'State' })} 
              isRequired 
              fieldName="state2" 
              errors={errors} 
              {...register("state2")} 
              placeholder={intl.formatMessage({ id: 'CheckoutPage.StateField', defaultMessage: 'State' })}
            />

            {/* INFO: Country2 */}
            <CustomFormSelect 
              label={intl.formatMessage({ id: 'CheckoutPage.CountryField', defaultMessage: 'Country' })}
              isRequired 
              options={[
                { label: intl.formatMessage({ id: 'CheckoutPage.Greece', defaultMessage: 'Greece' }), value: "gr" },
              { label: intl.formatMessage({ id: 'CheckoutPage.Cyprus', defaultMessage: 'Cyprus' }), value: "cy" },
              ]}  
              onChange={(e) => {
                setCountry2(e.currentTarget.value);
                setAddress2("");
              }}
            />

            {/* READ-ONLY: It will render map according to address2 */}
            <Box w="full" h="40vh">
              <Map 
                lat={latLng2.lat}
                lng={latLng2.lng}
              />
            </Box> 
          </Stack>
          

          {/* <Divider my="6" borderColor="gray.400" /> */}
        </ScaleFade>}

        <Box mx="10" mt="10" mb="2">
          <Button 
            type="submit" 
            w="full" 
            colorScheme="primary"
            isLoading={loading}
          >Επόμενο</Button>
        </Box>
      </chakra.form>
    </Box>
  )
}

function SelectCountryCode({ value, onSelect }) {
  return (
    <Select value={value} onChange={(e) => onSelect(e.currentTarget.value)} mx="-4" w="max" border="none" _focus={{ outline: 'none' }}>
      <option value="+30">GR (+30)</option>
      <option value="+357">CY (+357)</option>
      <option value="+1">US (+1)</option>
    </Select>
  )
}

export default AddressForm
