import React, { useEffect, useState } from 'react'
import { Alert, AlertIcon, Box, Container, Text } from '@chakra-ui/react';

import _ from 'lodash';
import { useRouter } from 'next/router';

// import { fetchCompareProductsService } from '../services/compareProducts';
import Table from 'components/pages/Comparison/Table';
import StarRating from 'react-star-ratings';
// import ComparisonContext from '../context/comparison/Context';
import { useComparison } from 'contexts/comparison/use-comparison';
// import Router from 'next/router'
import Link from 'next/link';
import { Modal } from '@redq/reuse-modal';
import CloseModalOutsideClick from '../utils/closeModalOutsideClick'
import dynamic from 'next/dynamic';
import Loader from 'components/loader/loader';
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});

import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { getBrandFromProdAttributes } from 'utils/products-utils';
import { siteURL } from 'site-settings/site-credentials';

const OVERVIEW = [
  {
    Header: 'Περιγραφή',
    accessor: 'short_description',
    Cell: function (value) {
      if (!value) return (
        <Box>
          -
        </Box>
      );

      return (
        <Box
          overflow="hidden"
          dangerouslySetInnerHTML={{
            __html: value
        }}
        />
      )
    }
  },
  {
    Header: 'Εταιρεία',
    accessor: 'attributes',
    Cell: function (attributes) {
      console.log({ attributes })

      const brand = getBrandFromProdAttributes(attributes);
      console.log({ brand })
      return (
        <Text>{brand?.options[0] || "-"}</Text>
      )
    }
  },
  {
    Header: 'Διαθεσιμότητα', // Διαθεσιμότητα --> Availability
    accessor: 'attributes',
    Cell: function (value) {
      if (value.length === 0) return <Text>{'-'}</Text>;

      const availability = value.find((attr: any) => attr.name === "Διαθεσιμότητα");

      return (
        <Text fontWeight="semibold">{availability?.options[0] || "-"}</Text>
      ) 
    }
  },
  {
    Header: 'Κριτικές',
    accessor: 'average_rating',
    Cell: function (value) {
      return (
        <StarRating 
         rating={parseFloat(value)}
         starRatedColor="orange"
         numberOfStars={5}
         name="rating"
         starDimension="15px"
         starSpacing="2px"
      />
      )
    }
  }
]

export default function Comparison({ deviceType }) {
  const router = useRouter();
  // const { products } = useContext(ComparisonContext);
  const [comparingProducts, setComparingProducts] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [characteristicsData, setCharacterisitcsData] = useState([]);
  const [CHARACTERISTICS_COLUMNS, SET_CHARACTERISTICS_COLUMNS] = useState([]);
  const [COMMON_CHARACTERISTICS_COLUMNS, SET_COMMON_CHARACTERISTICS_COLUMNS] = useState([]);
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const [isItemsEmpty, setIsItemsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  // NEW
  const { items } = useComparison();

  useEffect(() => {
    setLoading(true);
    setComparingProducts(items);
    
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [items])

  useEffect(() => {
    if (comparingProducts.length === 0) return;

    setMainData(comparingProducts);
  }, [comparingProducts])

  useEffect(() => {
    if (comparingProducts.length === 0) return;

    const attributes = comparingProducts.map(product => product.attributes);

    const allAttributes = [];
    for (const attribute of attributes) {
      allAttributes.push(...attribute)
    }

    const unique = _.uniqBy(allAttributes, 'id');

    // Removing Διαθεσιμότητα from the columns.  i.e., Διαθεσιμότητα ---> Availability
    const filteredUniques = unique.filter(el => el.name !== 'Διαθεσιμότητα');  

    const COLUMNS = filteredUniques.map(attribute => {
      return {
        Header: attribute.name,
        accessor: 'options'
      }
    })

    const commonAttributes = [];
    for (let i = 0; i < allAttributes.length; i++) {
      let count = 0;
      for (let j = 0; j < allAttributes.length; j++) {
        if (allAttributes[i].id === allAttributes[j].id) count++;
      }

      if (count === comparingProducts.length) commonAttributes.push(allAttributes[i]);
    } 

    const uniqueCommontAttributes = _.uniqBy(commonAttributes, 'id');
    const COMMON_COLUMNS = uniqueCommontAttributes.map(attribute => {
      return {
        Header: attribute.name,
        accessor: 'options'
      }
    })
    
    setCharacterisitcsData(unique);
    SET_CHARACTERISTICS_COLUMNS(COLUMNS);
    SET_COMMON_CHARACTERISTICS_COLUMNS(COMMON_COLUMNS)
  }, [comparingProducts])

  if (loading) return (
    <>
      <SEOComponent />
      <Container centerContent py="24" h="80vh">
        <Loader />
      </Container>
    </>
  )

  if (!loading && comparingProducts.length === 0) return (
    <>
      <SEOComponent />
      <Modal>
      <Container py="20" centerContent maxW="container.lg" h="80vh">
        <Alert status="error" w="max">
          <AlertIcon />
          <Text>
            Προσθέστε τουλάχιστον 2 προϊόντα στη σύγκριση!
            <Text as="span" ml="2" align="center" textDecor="underline" fontStyle="italic">
              <Link href="/"><a>Πίσω στην Αρχική</a></Link>
            </Text>
          </Text>
        </Alert>
      </Container>
      </Modal>
    </>
  )
  
  return (
    <>
      <SEOComponent />
      <Modal>
        <Table  
          mainData={mainData}
          OVERVIEW={OVERVIEW}
          CHARACTERISTICS_COLUMNS={showOnlyDifferences ? COMMON_CHARACTERISTICS_COLUMNS : CHARACTERISTICS_COLUMNS}
          onChangeOnlyDifferences={(isShowOnlyDifferences) => setShowOnlyDifferences(isShowOnlyDifferences)}
        />
        <CloseModalOutsideClick>
        <CartPopUp deviceType={deviceType} />
      </CloseModalOutsideClick>
      </Modal>
    </>
  )
}

function SEOComponent() {
  return (
    <>
      <Head>
        <title>Σύγκριση - SFKshop</title>
      </Head>
      <NextSeo 
        title='Σύγκριση - SFKshop'
        description="Σύγκριση Προϊόντων. Δεν έχετε επιλέξει προϊόντα προς σύγκριση. Συνέχεια. Άμεση παράδοση"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        canonical="https://sfkshop.gr/comparison/"
        openGraph={{
          locale: 'el_GR',
          type: 'article',
          title: 'Σύγκριση Προϊόντων - SFKshop',
          description: 'Σύγκριση Προϊόντων. Δεν έχετε επιλέξει προϊόντα προς σύγκριση. Συνέχεια. Άμεση παράδοση',
          url: 'https://sfkshop.gr/comparison/',
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