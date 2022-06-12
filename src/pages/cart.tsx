import { useCart } from 'contexts/cart/use-cart';
import React from 'react'
import { Container, Heading, Box, useBreakpointValue, Alert, AlertIcon, Link, WrapItem, Wrap, Text, Divider, Stack, Button } from '@chakra-ui/react';
import Card from 'components/pages/Cart/Card';
import EmptyCart from 'assets/animations/lotties/empty-card3.json';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import currencyFormatter from 'currency-formatter';
import { useState } from 'react';
import { useEffect } from 'react';
import Router from 'next/router'
import Loader from 'components/loader/loader';
import { Modal } from '@redq/reuse-modal';

import Head from 'next/head';
import { NextSeo } from 'next-seo'
import CouponChakara from 'features/coupon/CouponChakra';
import WishlistFloatButton from 'components/common/WishlistFloatButton';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton';
import { FormattedMessage } from 'react-intl';
import { siteURL } from 'site-settings/site-credentials';

const Lottie = dynamic(() => import('react-lottie'), {
  ssr: false,
});
 
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: EmptyCart,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const CartPage = () => {
  const router = useRouter();
  const screenSize = useBreakpointValue({ base: "mobile", sm: "desktop" });
  const [items, setItems] = useState([]);

  const {
    items: data,
    transport,
    calculatePrice,
    calculateVat,
    vatInPercentage,
    calculateSubTotalPrice
  } = useCart();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setItems(data);
    
    setTimeout(() => {
      setLoading(false)
    }, 800);
  }, [data])


  if (!loading && items.length === 0) return (
    <>
      <SEOComponent />
      <Modal>
      <Container maxW="container.lg" py="32">
        <Alert status="error" w="max" mx="auto" my="5">
          <AlertIcon />
          Ooops! Your basket is empty. <Link ml="2" onClick={() => router.replace("/")}> Go to homepage </Link>
        </Alert>

        <Lottie 
          style={{
            backgroundColor: "transparent"
          }}
          options={defaultOptions}
          height={screenSize === "mobile" ? "30%" : "20rem"}
          width={screenSize === "mobile" ? "70%" : "30%"}
          speed={2}
        />
      </Container>
      </Modal>
    </>
  )

  // Constant variables
  const priceExcludeShippingCost = calculatePrice() - transport.cost

  return (
    <>
      <SEOComponent />
      <WishlistFloatButton />
      <ComparisonFloatButton />
      <Modal>
      <Box py={{ base: "0", sm: "0", md: "4"}}>
        <Container maxW="container.xl" py="10"> 
          <Heading fontWeight="semibold" my="5" fontSize='2xl' py="3">
            <FormattedMessage 
              id="CartPage.Heading"
              defaultMessage="Shopping Cart"
            />  
          </Heading>
          <Wrap spacing="10">
            <Stack flex="1" px="5">
              {items.map((product: any, idx: number) => (
                <Card 
                  key={idx}
                  product={product}
                  isBordered={items.length > 1 && idx > 0 ? false : true}
                />
              ))}
            </Stack>
            <WrapItem p="4" border="1px" borderColor="gray.200" rounded="md" shadow="base" w={{ base: "full", md: "20rem"}} >
              <Stack w="full">
                <Text fontSize="20" fontWeight="bold" mb="2">
                  <FormattedMessage 
                    id="CartPage.Cart"
                    defaultMessage="Cart"
                  />
                </Text>
                {/* <Divider w="full" /> */}
                <Stack py="2" spacing="5">
                  <Wrap justify="space-between" >
                    <Text>
                      <FormattedMessage 
                        id="CartPage.subset"
                        defaultMessage="Subset"
                      />  
                    </Text> 
                    <Text>&euro; {currencyFormatter.format(calculateSubTotalPrice(), {})}</Text> 
                  </Wrap>  
                  <Divider />
                  {/* <Wrap justify="space-between" >
                    <Text><FormattedMessage id="CartPage.Mission" defaultMessage="Mission" /></Text> 
                    <Text fontSize="16">ACS Courier: <Text as="span" fontWeight="bold">€ {Number(transport.cost).toFixed(2)}</Text></Text> 
                  </Wrap>  
                  <Divider /> */}
                  <Wrap justify="space-between" >
                    <Text><FormattedMessage id='CartPage.Total' defaultMessage="CartPage.Total"  /></Text> 
                    <Stack align="flex-end">
                      {/* <Text fontSize="20" fontWeight="bold">&euro; {currencyFormatter.format(calculatePrice(), {})}</Text>  */}
                      <Text fontSize="20" fontWeight="bold">&euro; {currencyFormatter.format(priceExcludeShippingCost, {})}</Text> 
                      <Text fontSize="14" color="GrayText">(<FormattedMessage id="CartPage.includesText" defaultMessage="includes" /> €{calculateVat().totalVat} <FormattedMessage id="CartPage.Vat" defaultMessage="VAT" /> {Number(vatInPercentage)}%)</Text>
                    </Stack>
                  </Wrap> 

                  <CouponChakara />

                  <Button colorScheme="primary" onClick={() => Router.push("/checkout")}><FormattedMessage id="CartPage.Checkoutbutton" defaultMessage="Checkout" /></Button>
                </Stack>
              </Stack>
            </WrapItem>
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
        <title>Καλάθι - SFKshop</title>
      </Head>
      <NextSeo 
        canonical="https://sfkshop.gr/cart/"
        openGraph={{
          locale: 'el_GR',
          type: 'article',
          title: 'Καλάθι - SFKshop',
          url: 'https://sfkshop.gr/cart/',
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

export default CartPage
