import { ThemeProvider } from "styled-components";
import { defaultTheme } from "site-settings/site-theme/default";
import { AppProvider } from "contexts/app/app.provider";
import { AuthProvider } from "contexts/auth/auth.provider";
import { LanguageProvider } from "contexts/language/language.provider";
import { CartProvider } from "contexts/cart/use-cart";
import { ComparisonProvider } from "contexts/comparison/use-comparison";
import { useMedia } from "utils/use-media";
import AppLayout from "layouts/app-layout";
import { ChakraProvider } from "@chakra-ui/react";
// import { ApolloProvider } from "@apollo/client";
import NProgressbar from "components/common/NProgressbar";
import { SpringModalProvider } from "contexts/spring-modal/use-spring-modal";
import Head from "next/head";

// import '../scss/style.scss';

// External CSS import here
import "swiper/swiper-bundle.min.css";
import "rc-drawer/assets/index.css";
import "rc-table/assets/index.css";
import "rc-collapse/assets/index.css";
import "react-multi-carousel/lib/styles.css";
import "components/multi-carousel/multi-carousel.style.css";
import "react-spring-modal/dist/index.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
import "components/scrollbar/scrollbar.css";
import "@redq/reuse-modal/lib/index.css";

import "slick-carousel/slick/slick.css";

import { GlobalStyle } from "assets/styles/global.style";
import "../styles/index.css";

// Language translation messages
import { messages } from "site-settings/site-translation/messages";
import "typeface-lato";
import "typeface-poppins";
// import client from "GraphQL/apollo-client";
import customTheme from "styles/chakraCustomTheme";
import { WishlistProvider } from "contexts/wishlist/use-wishlist";
import { CategoryPageProvider } from "contexts/categoryPage/use-category";
import useRouteTriggers from "hooks/uesRouteTriggers";
// import useTagManager from "hooks/useTagManager";
import CookiesPopup from "features/cookies/cookies-popup";
// import NotificationModal from "features/notification-modal";
// import { useState } from "react";

export default function ExtendedApp({ Component, pageProps }) {
  const mobile = useMedia("(max-width: 580px)");
  const tablet = useMedia("(max-width: 991px)");
  const desktop = useMedia("(min-width: 992px)");
  // INFO: For progressbar on top of the page on every route change (page change)
  const routeState = useRouteTriggers();
  // Google Tag Manager
  // useTagManager();  // It is being used inside of CookiesPopup component

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        <LanguageProvider messages={messages}>
          <SpringModalProvider>
            <CartProvider>
              <AppProvider>
                <AuthProvider>
                  <ComparisonProvider>
                    <WishlistProvider>
                      {/* <ApolloProvider client={client}> */}
                        <ChakraProvider theme={customTheme}>
                          <AppLayout>
                            <CategoryPageProvider>
                              <NProgressbar
                                isRouteChanging={routeState.isRouteChanging}
                                key={routeState.loadingKey}
                              />
                              <Component
                                {...pageProps}
                                deviceType={{ mobile, tablet, desktop }}
                              />
                              <CookiesPopup onAccept={() => {}} onDecline={() => {}}/>
                              {/* <NotificationModal /> */}
                            </CategoryPageProvider>
                          </AppLayout>
                        </ChakraProvider>
                      {/* </ApolloProvider> */}
                      <GlobalStyle />
                    </WishlistProvider>
                  </ComparisonProvider>
                </AuthProvider>
              </AppProvider>
            </CartProvider>
          </SpringModalProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
