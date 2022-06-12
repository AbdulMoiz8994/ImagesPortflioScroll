import React, { useEffect } from 'react';
import { ProductGrid } from 'components/product-grid/product-grid-three';
import { Modal } from '@redq/reuse-modal';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import css from '@styled-system/css';
import { SidebarWithCardMenu } from 'layouts/sidebar/sidebar-with-card-menu';
import CloseModalOutsideClick from '../utils/closeModalOutsideClick'
import { Router, useRouter } from 'next/router';
import Loading from 'components/common/Loading';
import ComparisonFloatButton from 'layouts/ComparisonFloatButton';
import useSortCategories from 'hooks/useSortCategories';
import Carousel from 'components/carousel/carousel';
import { siteOffers } from 'site-settings/site-offers';
import {
  OfferSection,
} from '../assets/styles/pages.style';
import { Box } from '@chakra-ui/react'
import axios from 'axios';
import Head from 'next/head'
import { NextSeo } from 'next-seo';
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import WishlistFloatButton from 'components/common/WishlistFloatButton';

const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});

const PAGE_TYPE = 'grocery';

export default function GroceryTwoPage({ products, categories, deviceType }) {
  const router = useRouter();
  const sortedCategories = useSortCategories(categories);

  // useEffect(() => {
  //   var _learnq = _learnq || [];

  //   _learnq.push(['identify', {
  //     '$email' : 'george.washington@example.com',
  //     '$first_name' : 'George',
  //     '$last_name' : 'Washington',
  //     'Birth Year' : 1732
  //   }]);
  
  //   _learnq.push(['track', 'Elected President', {
  //     'Country' : 'United States'
  //   }]);
  // }, [])

  // useEffect(() => {
  //   var _learnq = _learnq || [];

  //   var cart = {
  //     total_price: "100",
  //     $value: "100",
  //     total_discount: "100",
  //     original_total_price: "200",
  //     items: "Testing"
  //   }

  //   _learnq.push(['track', 'Added to Cart', cart]);

  //   _learnq.push(["trackViewedItem", {
  //     "Title": "Testing",
  //     "ItemId": "123",
  //     "Categories": "Test",
  //     "ImageUrl": "1234",
  //     "Url": "234"
  //     }
  //   ])

  //   _learnq.push(['track', 'Added Like', { "Title": "Testing" }]);

  //   console.log({ window })
  // }, [])

  if (router.isFallback) return <Loading />
  const filteredCategories = sortedCategories.filter(category => category.slug !== "sfkshop");
  
  return (
    <>
      {/* SEO Improvements (Start) */}
      {/* INFO: Better to add title like this (Inspired by sfkshop that is being integrated with rank math) */}
      <Head>
        <title>Μοτέρ Γκαραζόπορτας, smart Home και Αξεσουάρ Κινητών</title>
      </Head>

      <NextSeo 
        title='Μοτέρ Γκαραζόπορτας, smart Home και Αξεσουάρ Κινητών'
        description="Για Μοτέρ Γκαραζόπορτας, Κάμερες Ασφαλείας, Συναγερμούς, είδη parking και αξεσουάρ κινητών. Βρες αυτό που ψάχνεις! Πλήρωσε εώς και 4 άτοκες δόσεις!"
        canonical="https://sfkshop.gr/"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        openGraph={{
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
      {/* SEO Improvements (End) */}


      <Modal>
        <WishlistFloatButton />
        <ComparisonFloatButton />
        <Box mt={{ base: "4", lg: "16"}} />
        <OfferSection>
          <div style={{ margin: '0 -10px' }}>
            <Carousel deviceType={deviceType} data={siteOffers} />
          </div>
        </OfferSection>
        <ContentArea style={{ paddingTop: 20 }}>
          <SidebarWithCardMenu  
            sidebarLayout="parentCategory"
            categories={filteredCategories}
            categoryName='Κατηγορίες Προϊόντων'
          />
          <main>
            <ProductGrid productsDataType="restapi" data={products} type={PAGE_TYPE} deviceType={deviceType} />
          </main>
        </ContentArea>
        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  );
}

const ContentArea = styled.div<any>(
  css({
    overflow: 'hidden',
    padding: ['68px 0 100px', '68px 0 50px', '110px 2rem 50px'],
    display: 'grid',
    minHeight: '100vh',
    gridColumnGap: '30px',
    gridRowGap: ['15px', '20px', '0'],
    gridTemplateColumns: [
      'minmax(0, 1fr)',
      'minmax(0, 1fr)',
      '320px minmax(0, 1fr)',
    ],
    backgroundColor: '#f9f9f9',
  })
);


export async function getStaticProps() {
  try {
    const categoriesPromise = axios.get(`${siteURL}/wp-json/wc/v3/products/categories?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&parent=0&per_page=20`);
    const productsPromise = await axios.get(`${siteURL}/wp-json/wc/v3/products?per_page=16&orderby=popularity&order=desc&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)
   
    const [{data: categories}, { data: products }] = await Promise.all([categoriesPromise, productsPromise]);
  
    return {
      props: {
        products: products,
        categories: categories,
      },
      revalidate: 30,
    };
  } catch (error) {
    console.log({ error });
    return { notFound: true };
  }
}
