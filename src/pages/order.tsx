import React from 'react';
import { NextPage } from 'next';
import { SEO } from 'components/seo';
import Order from 'features/user-profile/order/order';
import {
  PageWrapper,
  SidebarSection,
} from 'features/user-profile/user-profile.style';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import { Modal } from '@redq/reuse-modal';
import { useContext } from 'react';
import { AuthContext } from 'contexts/auth/auth.context';
import { Alert, AlertIcon, Box, Container, Text } from '@chakra-ui/react';
import { openModal } from '@redq/reuse-modal';
import AuthenticationForm from 'features/authentication-form';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from 'components/loader/loader';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import LoginAlert from 'components/alerts/LoginAlert';
import { siteURL } from 'site-settings/site-credentials';

const OrderPage: NextPage = () => {
  const { authState, authDispatch, customer } = useContext<any>(AuthContext);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    setShow(authState.isAuthenticated);

    setTimeout(() => {
      setLoading(false)
    }, 800);
  }, [authState.isAuthenticated]);

  if (!loading && !show) return (
    <SEOWrapper>
      <Modal>
        <Box pt="24" h="80vh">
          <LoginAlert />
        </Box>
      </Modal>
    </SEOWrapper>
  )
  
  if (!loading && show) return <Main />

  return <SEOWrapper>
    <Container py="24" h="80vh" centerContent>
      <Loader />
    </Container>;
  </SEOWrapper>
};

function Main() {
  const { customer } = useContext<any>(AuthContext);

  return (
    <SEOWrapper>
      <Modal>
        <PageWrapper>
          <SidebarSection>
            <Sidebar />
          </SidebarSection>
          <Order customer={customer} />
        </PageWrapper>
      </Modal>
    </SEOWrapper>
  )
} 

function SEOWrapper({ children }) {
  return (
    <>
      <Head>
        <title>Ο λογαριασμός μου - SFKshop</title>
      </Head>
      
      <NextSeo 
        openGraph={{
          locale: 'el_GR',
          type: 'article',
          title: 'Ο λογαριασμός μου - SFKshop',
          url: 'https://sfkshop.gr/my-account/',
          site_name: 'SFKshop',
          images: [
            {
              url: `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
              secureUrl: `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
              width: 1200,
              height: 628,
              alt: 'fan page likes',
              type: 'image/jpeg'
            }
          ],
          article: {
            modifiedTime: new Date().toISOString()
          }
        }}
        twitter={{
          cardType: 'summary_large_image'
        }}
      />

      {children}
    </>
  )
}

export default OrderPage;
