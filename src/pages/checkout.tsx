import { Container, Box, Stack, Text, Input, Checkbox, Divider, Wrap, MenuList, MenuItem, Menu, InputProps, MenuButton, Button, Select, chakra, ScaleFade, FormControl, FormLabel, Alert, AlertIcon, Link, useToast, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import AddressForm from 'components/pages/Checkout/AddressForm';
import FormSteps from 'components/pages/Checkout/FormSteps';
import { useSteps } from 'chakra-ui-steps';
import CartDetailSection from 'components/pages/Checkout/CartDetailSection';
import { createOrder } from 'services/orders';
import { useEffect } from 'react';
import PaymentForm from 'components/pages/Checkout/PaymentForm';
import { useCart } from 'contexts/cart/use-cart';
import router from 'next/router';
import { Modal, openModal } from '@redq/reuse-modal';
import { useContext } from 'react';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';
import Head from 'next/head';
import { NextSeo } from 'next-seo'
import CouponChakara from 'features/coupon/CouponChakra';
import crypto from "crypto";
import { alphaHost, siteURL } from 'site-settings/site-credentials';
import { getShippingMethod, getTranslatedPaymentMethod } from 'utils/orders_utils';
import { trackPlacedOrderActivity } from 'services/klaviyo';
// import uniqid from 'uniqid';
// import { Html } from 'next/document';

const Checkout = () => {
  const [loading, setLoading] = useState(false)
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [address, setAddress] = useState(null);
  const [items, setItems] = useState([]);
  const {
    shippingMethod,
    calculateVat,
    calculatePrice
  } = useCart();
  const { authState, authDispatch } = useContext<any>(AuthContext);
  const [orderLoading, setOrderLoading] = useState(false);
  const toast = useToast()
  const screenSize = useBreakpointValue({ base: "mobile", md: "desktop" });
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [viesVat, setViesVat] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [order, setOrder] = useState(null);

  const {
    items: data,
    clearCart
  } = useCart();

  useEffect(() => {
    setLoading(true)
    setItems(data);
     console.log(data);
      
    setTimeout(() => {
      setLoading(false)
      // setItems(data)
    }, 800);
  }, [data])

  const handleAddressSubmit = async (address) => {
    // console.log({ address });
    
    setLoading(true)
    setAddress(address);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(false)
    nextStep();
  }

  const handleBack = () => {
    prevStep();
  }

  const handlePaymentConfirm = async (data) => {
    // console.log("Yes! Payment is confirmed!", data);
    const isPaymentThroughAlpha = data.payment_method === "alphabank_gateway";
    const customerFromLocalStorage = JSON.parse(localStorage.getItem('customer'));

    const data2 = {
      status: data.order_status,
      customer_id: customerFromLocalStorage ? customerFromLocalStorage.id : 0,
      customer_note: address.phoneNumber?.number !== '' ? `Phone number: ${address.phoneNumber.code} ${address.phoneNumber.number}` : '',
      payment_method: data.payment_method,
      payment_method_title: getTranslatedPaymentMethod(data.payment_method_title),
      // set_paid: data.paid,  // If order_status is "processing" then it will be automatically paid on backend
      billing: {
        first_name: address.name,
        last_name: address.surname,
        address_1: address.address,
        address_2: "",
        city: address.city,
        state: address.state,
        postcode: address.postalCode,
        country: address.country,
        email: address.email,
        phone: `${address.cellPhoneNumber.code} ${address.cellPhoneNumber.number}`
      },
      shipping: {
        first_name: address.anotherAddress.name || address.name,
        last_name: address.anotherAddress.surname || address.surname,
        address_1: address.anotherAddress.address || address.address,
        address_2: "",
        city: address.anotherAddress.city || address.city,
        state: address.anotherAddress.state || address.state,
        postcode: address.anotherAddress.postalCode || address.postalCode,
        country: address.anotherAddress.country || address.country,
      },
      meta_data: [
        {
          key: "_billing_afm",
          value: address.invoice.afm,
        },
        {
          key: "_billing_vat",
          value: address.invoice.afm,
        },
        {
          key: "_billing_irs",
          value: address.invoice.doy_descr
        },
        {
          key: "_vatname",
          value: address.invoice.onomasia
        },
        {
          key: "_vataddress",
          value: `${address.invoice.postal_address_no} ${address.invoice.postal_address}`
        },
        {
          key: "_billing_store",
          value: address.invoice.Δραστηριότητα
        },
        {
          key: "_billing_timologio",
          value: address.invoice.is_invoice
        },
      ],
      line_items: items.map(item => (item.type === "variable" ? { variation_id: item.id, quantity: item.quantity } : { product_id: item.id, quantity: item.quantity })),
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: getShippingMethod(shippingMethod),
          total: calculateVat().TransportCostPriceExcludeVat.toString()
        },
      ],
      fee_lines: [
        // Adding conditional object in array
        ...(selectedPaymentMethod === 'pay on delivery' ? [{
          name: "Αντικαταβολή", // 'Αντικαταβολή' --> Cash on Delivery
          tax_status: 'taxable',
          total: calculateVat().cashOnDeliveryCostPriceExcludeVat.toString(),
        }] : []),
      ]
    };

    setOrderLoading(true);
    const res = await createOrder(data2);
    console.log({ res });

    setOrder(res.resData)
    setOrderLoading(false);
    
    if (res.status === 201 && isPaymentThroughAlpha) {
      localStorage.setItem("order", JSON.stringify(res.resData));
      await trackPlacedOrderActivity(address.email, res.resData.id, calculatePrice());

      setTimeout(() => {
        clearCart();
      }, 300);

      const mid = process.env.NEXT_PUBLIC_ALPHA_MERCHANT_ID;
      const lang = "gr";
      const orderId = res.resData.id; // e.g., "O2203271920545"
      // const orderId = uniqid();
      const orderDesc = `Order#${orderId} (${res?.resData?.date_created || ''})`; // e.g., "Test order" or anything;
      const orderAmount = calculatePrice();
      const currency = "EUR"
      const payerEmail = address.email;  // e.g, "demo@modirum.com"
      const billCountry = address.country.toUpperCase();  // Must be 2 uppercase letter e.g., "FI"
      const billState = address.state;  // e.g., "Harjumaa"
      const billZip = address.postalCode;  // e.g., "76543"
      const billCity = address.city;  // e.g., "Tallinn"
      const billAddress = address.address;  //e.g., "Billto tn 6-9"
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
    } else if (res.status === 201 && !isPaymentThroughAlpha) {
      localStorage.setItem("order", JSON.stringify(res.resData));
      await trackPlacedOrderActivity(address.email, res.resData.id, calculatePrice());

      setTimeout(() => {
        clearCart();
      }, 300);

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

  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  }

  // console.log({ selectedPaymentMethod })

  if (!loading && items?.length === 0) return (
    <>
      <SEOComponent />
      <Container maxW="container.lg" py="20" h="80vh">
        <Alert status="error" w="max" mx="auto" my="5">
          <AlertIcon />
          Ooops! Your basket is empty. <Link ml="2" onClick={() => router.replace("/")}> Go to homepage </Link>
        </Alert>
      </Container>
    </>
  )

  return (
    <>
      {!!order && <>
        <Head>
          <script 
            dangerouslySetInnerHTML={{
              __html: `
                skroutz_analytics('ecommerce', 'addOrder', {
                  order_id:      '${order?.id}',     // Order ID. Required.
                  revenue:       '${(order.line_items.reduce((acc, curr) => acc + (parseFloat(curr.price) + parseFloat(curr.total_tax)), 0) + order.shipping_lines.reduce((acc, curr) => acc + (parseFloat(curr.total) + parseFloat(curr.total_tax)), 0)).toFixed(1)}',   // Grand Total. Includes Tax and Shipping. Does not include payment costs.
                  shipping:      '${order.shipping_lines.reduce((acc, curr) => acc + (parseFloat(curr.total) + parseFloat(curr.total_tax)), 0)}',                  // Total Shipping Cost. Does not include payment costs.
                  tax:           '${order.total_tax}',  // Total Tax.
                  paid_by:       '${order.payment_method}',
                  paid_by_descr: '${getTranslatedPaymentMethod(order.payment_method_title)}'
                });
                
                ${order.line_items.map(item => {
                  return `skroutz_analytics('ecommerce', 'addItem', {
                    order_id:   '${order.id}',                                    // Order ID. Required.
                    product_id: '${item.product_id}',                                    // Product ID. Required.
                    name:       '${item.name}',  // Product Name. Required.
                    price:      '${parseFloat(item.price) + parseFloat(item.total_tax)}',                                    // Price per Unit. Required.
                    quantity:   '${item.quantity}'                                          // Quantity of Items. Required.
                  })
                  
                  `
                })}
                `
              }}
              />
        </Head>
      </>}

      <SEOComponent />
      <Modal>
      <Box pb="32" pt={{ base: "12" , md: "14", lg: "16"}}>
        <Container maxW="container.md" pt="6" pb={{ base: "2", md: "6"}}>
          <FormSteps 
            activeStep={activeStep}
          />
        </Container>
        {!authState.isAuthenticated && <Container maxW="container.lg" centerContent mt="5" pb="5">
          <Alert status="warning" w="full">
            <AlertIcon />
            <Text fontWeight="semibold">
              Έχεις ήδη λογαριασμό;
              <Text cursor="pointer" onClick={handleJoin} userSelect="none"  as="span" ml="2" align="center" textDecor="underline" fontStyle="italic">
                Πάτα εδώ για να συνδεθείς
              </Text>
            </Text>
          </Alert>
        </Container>}


        <Container maxW="container.xl">
          {/* Show Coupon code input field */}
          {screenSize === "mobile" && <Box pb="5">
            <CouponChakara mx="auto" />
          </Box>}
          <Wrap spacing="10" justify="center">
            {activeStep === 0 ? 
              <AddressForm 
                loading={loading} 
                onAddressSubmit={handleAddressSubmit} 
                onCountryChange={(country) => setCountry(country)}
                onPostalCodeChange={(postCode) => setPostalCode(postCode)} 
                onEmailChange={(email) => setEmail(email)}
                onViesChange={(viesData) => setViesVat(viesData)}
              /> : 
              <PaymentForm orderLoading={orderLoading} onBack={handleBack} onChangePaymentMethod={(value) => setSelectedPaymentMethod(value)} onPaymentConfirm={handlePaymentConfirm} />
            }
            <CartDetailSection paymentMethod={selectedPaymentMethod} address={{ email, postalCode, country, viesVat }} />
          </Wrap>
        </Container>
      </Box>
      </Modal>
    </>
  )
}

function SEOComponent() {
  return (
    <>
      <Head>
        <title>Ταμείο - SFKshop</title>
      </Head>
      <NextSeo 
        description="Κάνε την παραγγελία σου με άμεση παράδοση."
        canonical="https://sfkshop.gr/checkout/"
        openGraph={{
          locale: 'el_GR',
          type: 'article',
          title: 'Ταμείο - SFKshop',
          description: 'Κάνε την παραγγελία σου με άμεση παράδοση.',
          url: 'https://sfkshop.gr/checkout/',
          site_name: 'SFKshop',
          article: {
            authors: [
              'https://facebook.com/sfkshop.gr'
            ],
            modifiedTime: new Date().toISOString()
          },
          images: [
            {
              url: `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
              secureUrl: `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
              width: 1200,
              height: 628,
              alt: 'fan page likes',
              type: 'image/jpeg'
            }
          ]
        }}
        twitter={{
          cardType: 'summary_large_image'
        }}
      />
    </>
  )
}

export default Checkout