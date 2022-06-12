import { NextPage } from 'next';
import { Modal } from '@redq/reuse-modal';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import SettingsContent from 'features/user-profile/settings/settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'features/user-profile/user-profile.style';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import ErrorMessage from 'components/error-message/error-message';
import useUser from 'data/use-user';
import { useContext } from 'react';
import { AuthContext } from 'contexts/auth/auth.context';
import { Alert, AlertIcon, Box, Container, Text, Wrap } from '@chakra-ui/react';
import Link from 'next/link';
import { openModal } from '@redq/reuse-modal';
import AuthenticationForm from 'features/authentication-form';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from 'components/loader/loader';

import Head from 'next/head';
import { NextSeo } from 'next-seo'
import LoginAlert from 'components/alerts/LoginAlert';
import { siteURL } from 'site-settings/site-credentials';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const { authState, authDispatch } = useContext<any>(AuthContext);
  const { user, error } = useUser();
  const [loading, setLoading] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

  if (error) return <ErrorMessage message={error.message} />;
  if (!user) return <div>loading...</div>;

  if (!authState.isAuthenticated) return (
    <SEOWrapper>
      <Modal>
        <Box py="24" h="80vh">
          <LoginAlert />
        </Box>
      </Modal>
    </SEOWrapper>
  )


  if (authState.isAuthenticated) return (
    <SEOWrapper>
      <ProfileProvider initData={user}>
        <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
            <ContentBox>
              <SettingsContent deviceType={deviceType} />
            </ContentBox>
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </SEOWrapper>
  );

  return <SEOWrapper>
    <Container py="24" h="80vh" centerContent>
      <Loader />
    </Container>
  </SEOWrapper>
};

function SEOWrapper({ children }) {
  return (
    <>
      <Head>
        <title>Profile - SFKshop</title>
      </Head>
      <NextSeo 
        description="Μπες SFKshop.gr και βρες μοτέρ γκαραζόπορτας, μπάρες parking, συναγερμούς ασφαλείας, κάμερες ασφαλείας και είδη smart home. Άμεση παράδοση - Τεχνική Υποστήριξη."
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        canonical="https://sfkshop.gr/profile/"
        openGraph={{
          locale: 'el_GR',
          type: 'article',
          title: 'Ο λογαριασμός μου - SFKshop',
          description: 'Μπες SFKshop.gr και βρες μοτέρ γκαραζόπορτας, μπάρες parking, συναγερμούς ασφαλείας, κάμερες ασφαλείας και είδη smart home. Άμεση παράδοση - Τεχνική Υποστήριξη.',
          url: 'https://sfkshop.gr/profile/',
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
      />

      {children}
    </>
  )
}

export default ProfilePage;
