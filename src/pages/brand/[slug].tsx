import React, { useEffect, useState } from 'react';
import { Container, Heading, Stack, Text, Wrap, Square, Img, Box, Flex, Spacer } from '@chakra-ui/react';
import PageGutter from 'components/common/PageGutter';
import { ProductGrid } from 'components/product-grid/product-grid-three';
import axios from 'axios';
import FilterBar from 'components/pages/ChildCategory/FilterBar';
import { InstantSearch } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch';
import { algoliaApiKey, algoliaAppId, consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import { CustomHits } from 'components/algolia/CustomHits';
import { CustomRefinementList } from 'components/algolia/CustomRefinementList';
import { CustomPagination } from 'components/algolia/CustomPagination';
import { useRouter } from 'next/router';
import { CustomStats } from 'components/algolia/CustomStats';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { Modal } from '@redq/reuse-modal';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton';
import CloseModalOutsideClick from 'utils/closeModalOutsideClick';
import CartPopUp from 'features/carts/cart-popup';
import { FaListUl } from 'react-icons/fa';
import { BsGrid } from 'react-icons/bs';

const searchClient = algoliasearch(algoliaAppId, algoliaApiKey)

// Main page
const BrandPage = ({ brand, deviceType }) => {
  const [view, setView] = useState<"list" | "grid">("grid");
  const router = useRouter();
  return (
    <>
      <SEO brand={brand} />
      <Modal>
        <ComparisonFloatButton />
        <InstantSearch searchClient={searchClient} indexName="wc_rest_products">
          <PageGutter />
          <Container minH="85vh" maxW="1520px">
            <Stack spacing="2">
              <Header view={view} onChangeView={(value) => setView(value)} brand={brand} />

              <CustomStats />
              <CustomRefinementList 
                defaultRefinement={[brand.name]}
                attribute="taxonomies.Εταιρεία"  
                hidden={true}
              />

              <CustomHits view={view} pageType={'grocery'} deviceType={deviceType} />
              <CustomPagination defaultRefinement={router.query?.page || 1} />
            </Stack>
          </Container>
        </InstantSearch>
        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  )
}

function Header({ brand, view, onChangeView }) {
  return (
    <Stack w="full">
      <Flex flexWrap={{ base: "wrap", md: "nowrap"}} rounded="md" spacing="6" bg="white" p="6">
        {(brand?.image && brand?.image?.src) && 
          <>
            <Square rounded="full" size="28" bg="#f7f7f7">
              <Img 
                src={brand?.image?.src}
                alt={brand?.image?.alt}
              />
            </Square>
            <Spacer ml="3"/>
          </>}
        <Stack py="2">
          <Heading>{brand.name}</Heading>
          <Text>{brand.description}</Text>
        </Stack>
      </Flex>

      <FilterBar 
        bg='white' 
        view={view}
        viewOptions={[
          {
            label: "grid",
            icon: BsGrid,
            aria_label: "Align right",
            value: "grid"
          },
          {
            label: "list",
            icon: FaListUl,
            aria_label: "Align left",
            value: "list"
          }
        ]} 
        onChangeView={(value: "list" | "grid") => onChangeView(value)}
      />
    </Stack>
  )
}

function SEO({ brand }) {
  const {yoast_head_json} = brand;

  return (
    <>
      <Head>
        <title>{yoast_head_json?.title || brand.name}</title>
      </Head>

      {yoast_head_json && <NextSeo 
        description={yoast_head_json.og_description}
        canonical={yoast_head_json.canonical}
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        openGraph={{
          title: yoast_head_json.og_title,
          locale: yoast_head_json.og_locale,
          type: yoast_head_json.og_type,
          site_name: yoast_head_json.og_site_name,
          description: yoast_head_json.og_description,
          images: [
            {
              url: brand?.image?.src || `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
              secureUrl: brand?.image?.src || `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
              width: 1200,
              height: 628,
              alt: brand?.image?.alt || 'fan page likes',
              type: "image/jpeg"
            }
          ]
        }}
      />}
    </>
  )
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { data: brands } = await axios.get(`${siteURL}/wp-json/wc/v3/products/brands?slug=${encodeURI(params.slug)}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)

  if (!brands || brands.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      brand: brands[0]
    }, // will be passed to the page component as props
  }
}

export default BrandPage
