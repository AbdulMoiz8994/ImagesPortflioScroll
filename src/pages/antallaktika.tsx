import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import ComparisonFloatButton from 'layouts/ComparisonFloatButton'
import { Modal } from '@redq/reuse-modal';
import CloseModalOutsideClick from 'utils/closeModalOutsideClick'
import CartPopUp from 'features/carts/cart-popup';

import Head from 'next/head';
import { NextSeo } from 'next-seo'
import { FormattedMessage } from 'react-intl';
import WishlistFloatButton from 'components/common/WishlistFloatButton';
import { siteURL } from 'site-settings/site-credentials';

const SparePartsPage = ({ deviceType }) => {
  return (
    <>
      <Head>
        <title>Spare parts - SFKshop</title>
      </Head>
      <NextSeo
        description="Το sfkshop.gr σας παρέχει αυθεντικά ανταλλακτικά σε ασυναγώνιστες τιμές, γρήγορες και αξιόπιστες υπηρεσίες επισκευής και τεχνική υποστήριξης σε μεγάλο"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        canonical="https://sfkshop.gr/antallaktika/"
        openGraph={{
          locale: 'el_GR',
          type: 'article',
          title: 'Ανταλλακτικά - SFKshop',
          description: 'Το sfkshop.gr σας παρέχει αυθεντικά ανταλλακτικά σε ασυναγώνιστες τιμές, γρήγορες και αξιόπιστες υπηρεσίες επισκευής και τεχνική υποστήριξης σε μεγάλο',
          url: 'https://sfkshop.gr/antallaktika/',
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

      <Modal>
        <WishlistFloatButton />
        <ComparisonFloatButton />
        <Box py="16" minH="80vh">
          <Container my="8" maxW="container.xl" width="97%" fontWeight="400" fontSize="18">
            <Stack spacing="4">
              <Heading fontSize="30">
                {/* Spare parts */}
                <FormattedMessage 
                  id="SparePartPage.Heading"
                  defaultMessage="Spare parts"
                />
              </Heading>
              {/* <Text><FormattedMessage defaultMessage={"The"} id="the" /> */}
                {/* <Text fontSize="18" fontWeight="bold" as="span"> */}
                {/* <FormattedMessage defaultMessage={"sfkshop.gr"} id="sfkshop.gr" /> */}
                {/* </Text>  */}
                <Text fontSize="18">
                  <FormattedMessage 
                    id="SparePartPage.Description" 
                    defaultMessage={"The sfkshop.gr provides you with original spare parts at unbeatable prices, fast and reliable repair and technical support services to a large number of IT products."} 
                  /> 
                </Text>
                {/* </Text> */}
            </Stack>
          </Container>
        </Box>

        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  )
}

export default SparePartsPage
