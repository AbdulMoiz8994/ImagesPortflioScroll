import { Alert, AlertIcon, Box, Container, Heading, Link, Skeleton, Stack, Badge, HStack, Wrap } from '@chakra-ui/react'
import Card from 'components/pages/whishlist/Card'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Modal } from '@redq/reuse-modal';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton'
import CloseModalOutsideClick from 'utils/closeModalOutsideClick'
import CartPopUp from 'features/carts/cart-popup'
import { useWishlist } from 'contexts/wishlist/use-wishlist'
import { useRouter } from 'next/router'
import Loader from 'components/loader/loader'

import Head from 'next/head';
import { NextSeo } from 'next-seo'
import axios from 'axios'
import { FormattedMessage } from 'react-intl'
import { siteURL } from 'site-settings/site-credentials'

const WishlistPage = ({ deviceType }) => {
  const router = useRouter()
  const { items: data, loading: productsLoading, mergeProductsFromDb } = useWishlist();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    mergeProductsFromDb();
  }, []);

  useEffect(() => {
    setLoading(true)
    setItems(data);
    
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [data])

  if (!loading && items.length === 0 && !productsLoading) return (
    <>
      <SEOComponent />
      <Modal>
      <Container maxW="container.lg" py="16" h="80vh">
        <Wrap w="full" justify="center">
          <Alert status="error" w="max" mx="auto" my="5">
            <AlertIcon />
            Δεν έχεις προσθέσει κάνενα προϊόν στα αγαπημένα. <Link ml="2" onClick={() => router.replace("/")}> Πίσω στην Αρχική </Link>
          </Alert>
        </Wrap>
      </Container>
      </Modal>
    </>
  )

  if (items.length > 0) return (
    <>
      <SEOComponent />
      <Modal>
        <ComparisonFloatButton />
        <Container maxW="container.xl" py="16" px={{base: "5", md: "16"}} minH="86vh">
          <HStack >
            <Heading mb="5" fontWeight="semibold" fontSize='2xl' py="3" letterSpacing="wider">
              <FormattedMessage 
                id="wishlistPage.wishlistHeading"
                defaultMessage="Wishlist"
              />
            </Heading>
            <Badge colorScheme='red' justifySelf="center" alignSelf="flex-start">Beta</Badge>
          </HStack>
          {productsLoading ? <Stack>
              <Skeleton w="full" h="20" />
              <Skeleton w="full" h="20" />
              <Skeleton w="full" h="20" />
            </Stack> : items.map((item: any, idx: number) => (
            <Card 
              key={idx.toString()}
              product={item}
              isBordered={items.length > 1 && idx > 0 ? false : true}
            />
            ))}
        </Container>
        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  )

  return <>
    <SEOComponent />
    <Container centerContent py="24" h="80vh">
      <Loader />
    </Container>
  </>;
}

function SEOComponent() {
  return (
    <>
      <Head>
        <title>Ο λογαριασμός μου - SFKshop</title>
      </Head>
      <NextSeo 
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        canonical="https://sfkshop.gr/wishlist/"
        openGraph={{
          locale: 'el_GR',
          type: 'article',
          title: 'Λίστα Επιθυμιών - SFKshop',
          url: 'https://sfkshop.gr/wishlist/',
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
export default WishlistPage
