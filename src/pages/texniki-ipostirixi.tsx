import {
  Container,
  Heading,
  Text,
  Box,
  Grid,
  Stack,
  OrderedList,
  ListItem,
} from "@chakra-ui/layout";
import React from "react";
import { Modal } from "@redq/reuse-modal";
import CloseModalOutsideClick from "utils/closeModalOutsideClick";
import CartPopUp from "features/carts/cart-popup";
import ComparisonFloatButton from "layouts/ComparisonFloatButton";
import Head from "next/head";
import { NextSeo } from "next-seo";
import Link from 'next/link'
import { siteURL } from "site-settings/site-credentials";

export default function TechincalAssistance({ deviceType }) {
  return (
    <SEOWrapper>
      <Modal>
        <ComparisonFloatButton />
        <Box py={{ base: "0", lg: "20" }}>
          <Container
            my="8"
            maxW={{ base: "container.lg", md: "container.xl" }}
            centerContent
            px="5"
            minH="60vh"
          >
            <Heading as="h3" size="lg">
              Τεχνική Υποστήριξη
            </Heading>

            <Stack w="full" mt="10">
              <Heading textAlign="left" as="h5" size="sm">
              Το τεχνικό Τμήμα του SFKshop:
              </Heading>

              <OrderedList pl="5">
                <ListItem>
                  – Διαθέτει άρτια καταρτισμένους μηχανικούς, οι οποίοι εκπαιδεύονται συστηματικά και πιστοποιούνται από τους κορυφαίους κατασκευαστές, ώστε να εφαρμόζουν τις πλέον σύγχρονες γνώσεις, τεχνικές και μεθόδους στην παροχή υπηρεσιών.
                </ListItem>
                <ListItem>
                  – Είναι
                  <strong> εξουσιοδοτημένο κέντρο τεχνικής υποστήριξης </strong>
                  των κορυφαίων κατασκευαστών συστημάτων, όπως Η/Υ
                  <strong> Somfy, Dahua, BFT, Hikvision, Ajax κλπ. </strong>
                </ListItem>
                <ListItem>
                  - Διαθέτει
                  <strong> προηγμένα συστήματα αυτοματοποίησης και πρόσβαση σε διεθνείς βιβλιοθήκες γνώσης, </strong>
                  εξασφαλίζοντας την ποιότητα, αποτελεσματικότητα και ταχύτατους χρόνους απόκρισης στα αιτήματα των πελατών.
                </ListItem>
              </OrderedList>
            </Stack>

            <Stack
              w="full"
              spacing={1}
              color="DimGrey"
              my="2"
              fontWeight="semibold"
            >
              <Text mt="5">
                Για πληροφορίες σχετικά με τις υπηρεσίες του Τεχνικού Τμήματος επικοινωνήστε μαζί μας: SFKshop-Service Αθήνα:
              </Text>
              <Text>Τηλ: 
                <a href="tel:(+30) 210 2204203">(+30) 210 2204203</a>
              </Text>
              <Text>E-mail: 
                <a href="mailto:customersupport@sfkshop.gr">customersupport@sfkshop.gr</a> , 
                <Link href="/">
                <a>
                  sfkshop.gr
                </a>
                </Link>
              </Text>
            </Stack>
          </Container>
        </Box>

        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </SEOWrapper>
  );
}

function SEOWrapper({ children }) {
  return (
    <>
      <NextSeo
        description="Τεχνική Υποστήριξη Το τεχνικό Τμήμα του SFKshop: – Διαθέτει άρτια καταρτισμένους μηχανικούς, οι οποίοι εκπαιδεύονται συστηματικά και πιστοποιούνται από τους κορυφαίους κατασκευαστές, ώστε να εφαρμόζουν τις πλέον σύγχρονες γνώσεις, τεχνικές και μεθόδους στην παροχή υπηρεσιών.– Είναι εξουσιοδοτημένο κέντρο τεχνικής υποστήριξης των κορυφαίων κατασκευαστών συστημάτων, όπως Η/Υ Somfy, Dahua, BFT, Hikvision, Ajax κλπ.– Διαθέτει προηγμένα συστήματα αυτοματοποίησης και πρόσβαση σε […]"
        canonical="https://sfkshop.gr/texniki-ipostirixi/"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large",
        }}
        openGraph={{
          locale: "el_GR",
          type: "article",
          title: "Τεχνική Υποστήριξη - SFKshop",
          description: "Το τεχνικό Τμήμα του SFKshop:",
          url: "https://sfkshop.gr/texniki-ipostirixi/",
          site_name: "SFKshop",
          article: {
            authors: ["https://facebook.com/sfkshop.gr"],
            modifiedTime: new Date().toISOString(),
          },
          images: [
            {
              url: `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
              secureUrl:
                `${siteURL}/wp-content/uploads/2020/05/fan-page-likes.jpg`,
              width: 1200,
              height: 628,
              alt: "fan page likes",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <Head>
        <title>Τεχνική Υποστήριξη - SFKshop</title>
      </Head>

      {children}
    </>
  );
}
