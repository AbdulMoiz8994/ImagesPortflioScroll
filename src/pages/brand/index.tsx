import React, { Fragment } from 'react';
import { Container, Heading, Stack, Text, Wrap, Img, SimpleGrid, HStack, Box, Square } from '@chakra-ui/react';
import axios from 'axios';
import { algoliaApiKey, algoliaAppId, consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import Link from 'next/link';
import Image from 'next/image';
import { Modal } from '@redq/reuse-modal';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton';
import CloseModalOutsideClick from 'utils/closeModalOutsideClick';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});

// Main page
const BrandsPage = ({ brands, deviceType }) => {
  return (
    <>
      <SEO />
      <Modal>
        <ComparisonFloatButton />
        <Container minH="85vh" py={{ base: "10", lg: "24" }} maxW="1520px" centerContent>
          <Stack w="full" align="center">
            <Heading as="h1">All brands</Heading>
            <SimpleGrid py="6" w="full" justifyContent="space-between" columns={{ base: 1, md: 2, lg: 3}} spacing="4">
              {brands.map((brand: any) => {
                // console.log({ brand })
                return (
                  <Card key={brand.id} brand={brand} />
                )
              })}
            </SimpleGrid>
          </Stack>
          <CloseModalOutsideClick>
            <CartPopUp deviceType={deviceType} />
          </CloseModalOutsideClick>
        </Container>
      </Modal>
    </>
  )
}

function Card({ brand }) {
  return (
    <Link href={`/brand/${brand.slug}`} passHref>
      <HStack as="a" bg="#f9f9f9" spacing="4" p="5" rounded="md" border="1px" borderColor="#E4E7EB">
        <Square position="relative" size="20" bg="white" rounded="full">
          <Image 
            src={brand?.image?.src || `${siteURL}/wp-content/uploads/2021/05/cropped-sfkshop-favicon-new-512-1-192x192.png`} 
            alt={brand.name}
            objectFit='contain'
            width={100}
            height={100} 
          />
        </Square>
        <Box>
          <Stack spacing="2">
            <Heading as="h3" fontSize="20px">{brand.name}</Heading>
            {/* <Text noOfLines={2}>This is the description for handling short description of each brand</Text> */}
            <Text noOfLines={2}>{brand.description || '...'}</Text>
          </Stack>
        </Box>
      </HStack>
    </Link>
  )
}

function SEO() {
  return <>
    <Head>
      <title>Εταιρείες - SFKshop</title>
    </Head>

    <NextSeo 
      description="Μπες και βρες όλες τις συνεργαζόμενες εταιρείες και το ξεχωριστό κατάλογο προϊόντων της κάθε εταιρείας."
      canonical="https://sfkshop.gr/brand/"
      robotsProps={{
        maxSnippet: -1,
        maxVideoPreview: -1,
        maxImagePreview: "large"
      }}
      openGraph={{
        title: 'Εταιρείες - SFKshop',
        description: 'Μπες και βρες όλες τις συνεργαζόμενες εταιρείες και το ξεχωριστό κατάλογο προϊόντων της κάθε εταιρείας.',
        locale: 'el_GR',
        type: 'website',
        site_name: 'SFKshop',
        images: [
          {
            url: `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
            secureUrl: `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
            width: 1200,
            height: 628,
            alt: 'fan page likes',
            type: "image/jpeg"
          }
        ]
      }}
      // NOTE: No need to override the title, description for twitter because 'next-seo' mentioned that twitter copies from open graph. Just provice card type. that's it
      twitter={{
        cardType: "summary_large_image",
        // Title: Title will be picked from OpenGraph automatically
        // Description: It will also be copied from OpenGraph automatically
        // image: It will also be copied from OpenGraph automatically
      }}
    />
  </>
}

export async function getStaticProps() {
  const { data: brands } = await axios.get(`${siteURL}/wp-json/wc/v3/products/brands?per_page=100&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)

  return {
    props: {
      brands
    }
  }
}

export default BrandsPage
