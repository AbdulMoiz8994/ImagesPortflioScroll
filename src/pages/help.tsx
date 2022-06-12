import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Icon,
  SimpleGrid,
  Square,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React, { Children } from "react";
import Image from "next/image";
import { FaCreditCard, FaRegQuestionCircle, FaReply } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CONTACT_MENU_ITEM,
  FAQ_MENU_ITEM,
  ORDER_MENU_ITEM,
  ORDER_PROCESS_MENU_ITEM,
  ORDER_TRACKING_MENU_ITEM,
  PAYMENT_METHODS_MENU_ITEM,
  RETURNS_AND_GUARANTEES_MENU_ITEM,
  SERVICES_MENU_ITEM,
  SHIPPING_METHODS_MENU_ITEM,
  SPARE_PARTS_MENU_ITEM,
  TECHNICAL_ASSISTANCE_MENU_ITEM,
  TERMS_AND_CONDITIONS,
} from "site-settings/site-navigation";
import { Modal } from "@redq/reuse-modal";
import CloseModalOutsideClick from "utils/closeModalOutsideClick";
import CartPopUp from "features/carts/cart-popup";
import ComparisonFloatButton from "layouts/ComparisonFloatButton";

import Head from "next/head";
import { NextSeo } from "next-seo";
import WishlistFloatButton from "components/common/WishlistFloatButton";
import { FormattedMessage } from "react-intl";
import { siteURL } from "site-settings/site-credentials";

const HelpPage = ({ deviceType }) => {
  const router = useRouter();
  return (
    <>
      {/* SEO section */}
      <Head>
        <title>Βοήθεια - SFKshop</title>
      </Head>
      <NextSeo
        description="Βοήθεια Αγορά & Εργαλεία Τρόποι Παραγγελίας Τρόποι Πληρωμής Τρόποι Αποστολής Χρήση Κουπονιού-Δωροεπιταγής Επιστροφές Προϊόντων Παρακολούθηση Παραγγελίας Υπηρεσίες & Υποστήριξη Τεχνική Υποστήριξη Εγγυήσεις-Service Για την ΕταιρείαΑνταλλακτικά Επικοινωνία Θέσεις Εργασίας Όροι Χρήσης & Ασφάλεια Ασφάλεια Αγορών Όροι ΧρήσηςΠροστασία Προσωπικών Δεδομένων (GDPR)Συχνές Ερωτήσεις Χρήσιμοι Σύνδεσμοι Δες τους τρόπους πληρωμής Τρόποι Πληρωμής Επιστροφή προϊόντων Επιστροφές Δες που είναι το […]"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large",
        }}
        canonical="https://sfkshop.gr/help/"
        openGraph={{
          locale: "el_GR",
          type: "article",
          title: "Βοήθεια - SFKshop",
          description:
            "Βοήθεια Αγορά & Εργαλεία Τρόποι Παραγγελίας Τρόποι Πληρωμής Τρόποι Αποστολής Χρήση Κουπονιού-Δωροεπιταγής Επιστροφές Προϊόντων Παρακολούθηση Παραγγελίας Υπηρεσίες & Υποστήριξη Τεχνική Υποστήριξη Εγγυήσεις-Service Για την ΕταιρείαΑνταλλακτικά Επικοινωνία Θέσεις Εργασίας Όροι Χρήσης & Ασφάλεια Ασφάλεια Αγορών Όροι ΧρήσηςΠροστασία Προσωπικών Δεδομένων (GDPR)Συχνές Ερωτήσεις Χρήσιμοι Σύνδεσμοι Δες τους τρόπους πληρωμής Τρόποι Πληρωμής Επιστροφή προϊόντων Επιστροφές Δες που είναι το […]",
          url: "https://sfkshop.gr/help/",
          site_name: "SFKshop",
          article: {
            authors: ["https://facebook.com/sfkshop.gr"],
            modifiedTime: new Date().toISOString(),
          },
          images: [
            {
              url: `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
              secureUrl:
                `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
              alt: "Βοήθεια",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      {/* Main section */}
      <Modal>
        <WishlistFloatButton />
        <ComparisonFloatButton />
        <Box py="28" minH="80vh">
          <Container
            mb="5"
            px={{ base: "2", md: "6" }}
            maxW={{ base: "container.md", lg: "container.xl" }}
            centerContent
          >
            <Stack>
              <Heading>
                <FormattedMessage id="HelpPage.Heading" defaultMessage="Aid" />
              </Heading>
            </Stack>

            <SimpleGrid
              my="10"
              columns={{ base: 1, sm: 2, md: 3 }}
              spacing="10"
              w="full"
              justify="center"
            >
              <Box
                bg="white"
                border="1px"
                borderColor="gray.300"
                px="4"
                py="10"
              >
                <Stack spacing="4" align="center">
                  <Square size="6rem" position="relative">
                    <Image
                      src={`${siteURL}/wp-content/uploads//2020/04/support.svg`}
                      layout="fill"
                      // width={50}
                      // height={12}
                    />
                  </Square>
                  <Heading fontSize="20" pt="3">
                    <FormattedMessage
                      id="HelpPage.Card1.Heading"
                      defaultMessage="Purchase & Tools"
                    />
                  </Heading>
                  <Stack spacing="0" align="center">
                    <RenderLink href={ORDER_MENU_ITEM.href}>
                      <FormattedMessage
                        id="HelpPage.Card1.Desc.Line1"
                        defaultMessage="Order"
                      />
                    </RenderLink>

                    <RenderLink href={PAYMENT_METHODS_MENU_ITEM.href}>
                      <FormattedMessage
                        id="HelpPage.Card1.Desc.Line2"
                        defaultMessage="Methods Payment"
                      />
                    </RenderLink>
                    
                    <RenderLink href={SHIPPING_METHODS_MENU_ITEM.href}>
                      <FormattedMessage
                        id="HelpPage.Card1.Desc.Line3"
                        defaultMessage="Methods Shipping Methods"
                      />
                    </RenderLink>
                    
                    {/* <Text fontSize="14">
                      {" "}
                      <FormattedMessage
                        id="HelpPage.Card1.Desc.Line4"
                        defaultMessage="Use of Voucher-Gift Voucher"
                      />
                    </Text> */}

                    <RenderLink href={RETURNS_AND_GUARANTEES_MENU_ITEM.href}>
                      <FormattedMessage
                        id="HelpPage.Card1.Desc.Line5"
                        defaultMessage="Product Returns"
                      />
                    </RenderLink>

                    <RenderLink href={ORDER_TRACKING_MENU_ITEM.href}>
                      <FormattedMessage
                        id="HelpPage.Card1.Desc.Line6"
                        defaultMessage="Order Tracking"
                      />
                    </RenderLink>
                  </Stack>
                </Stack>
              </Box>

              <Box
                bg="white"
                border="1px"
                borderColor="gray.300"
                px="4"
                py="10"
              >
                <Stack spacing="4" align="center">
                  <Square size="6rem" position="relative">
                    <Image
                      src={`${siteURL}/wp-content/uploads//2020/04/label.svg`}
                      layout="fill"
                      // width={50}
                      // height={12}
                    />
                  </Square>
                  <Heading fontSize="20" pt="3">
                    {" "}
                    <FormattedMessage
                      id="HelpPage.Card2.Heading"
                      defaultMessage="Services & Support"
                    />
                  </Heading>
                  <Stack spacing="0" align="center">

                    <RenderLink href={TECHNICAL_ASSISTANCE_MENU_ITEM.href}>
                      <FormattedMessage
                        id="HelpPage.Card2.Desc.Line1"
                        defaultMessage="Technical Support"
                      />
                    </RenderLink>
                    
                    <RenderLink href={SERVICES_MENU_ITEM.href}>
                      <FormattedMessage
                        id="HelpPage.Card2.Desc.Line2"
                        defaultMessage="Guarantees-Service"
                      />
                    </RenderLink>

                    {/* <RenderLink href={"/"}>
                      <FormattedMessage
                        id="HelpPage.Card2.Desc.Line3"
                        defaultMessage="For the Company"
                      />
                    </RenderLink> */}

                    <RenderLink href={SPARE_PARTS_MENU_ITEM.href}>
                      <FormattedMessage
                        id="HelpPage.Card2.Desc.Line4"
                        defaultMessage="Spare Parts"
                      />
                    </RenderLink>

                    <RenderLink href={CONTACT_MENU_ITEM.href}>
                      <FormattedMessage
                        id="HelpPage.Card2.Desc.Line5"
                        defaultMessage="Contact"
                      />
                    </RenderLink>

                    <RenderLink href={"/theseis-ergasias"}>
                      <FormattedMessage
                        id="HelpPage.Card2.Desc.Line6"
                        defaultMessage="Jobs"
                      />
                    </RenderLink>

                  </Stack>
                </Stack>
              </Box>

              <Box
                bg="white"
                border="1px"
                borderColor="gray.300"
                px="4"
                py="10"
              >
                <Stack spacing="4" align="center">
                  <Square size="6rem" position="relative">
                    <Image
                      src={`${siteURL}/wp-content/uploads//2020/04/like-1.svg`}
                      layout="fill"
                      // width={50}
                      // height={12}
                    />
                  </Square>
                  <Heading fontSize="20" pt="3">
                    <FormattedMessage
                      id="HelpPage.Card3.Heading"
                      defaultMessage="Terms of Use & Safety"
                    />
                  </Heading>
                  <Stack spacing="0" align="center">

                    <RenderLink href="/asfaleia-agorwn">
                      <FormattedMessage
                        id="HelpPage.Card3.Desc.Line1"
                        defaultMessage="Market Security"
                      />
                    </RenderLink>
                    
                    <RenderLink href={TERMS_AND_CONDITIONS.href}>
                      <FormattedMessage
                        id="HelpPage.Card3.Desc.Line2"
                        defaultMessage="Terms of Use"
                      />
                    </RenderLink>
                    
                    <RenderLink href={"/prostasia-prosopikon-dedomenon-gdpr"}>
                      <FormattedMessage
                        id="HelpPage.Card3.Desc.Line3"
                        defaultMessage="Privacy Policy (GDPR)"
                      />
                    </RenderLink>

                    <RenderLink href={FAQ_MENU_ITEM.href}>
                      <FormattedMessage
                        id="HelpPage.Card3.Desc.Line4"
                        defaultMessage="Frequently Asked Questions"
                      />
                    </RenderLink>
                  </Stack>
                </Stack>
              </Box>
            </SimpleGrid>

            <Heading fontSize={22} my={2} pb={3} alignSelf="flex-start">
              <FormattedMessage
                id="HelpPage.SubHeading"
                defaultMessage="Useful links"
              />
            </Heading>
            <Divider borderColor="gray.500" />
            <SimpleGrid
              w="full"
              columns={{ base: 1, sm: 3 }}
              spacing="6"
              pt={3}
            >
              <Box
                py="8"
                px="10"
                borderRadius={20}
                w="100%"
                h="auto"
                bgGradient="linear(to-l, #bfd5f3 , #c6d6eb )"
              >
                <Stack spacing={3}>
                  <Stack>
                    <Box textAlign="center">
                      <Icon fontSize="6xl" as={FaCreditCard} color="#fff49b" />
                    </Box>
                  </Stack>
                  <Stack spacing={0}>
                    <Text textAlign="center" lineHeight={8}>
                      <FormattedMessage
                        id="HelpPage.UsefulLinks.Card1.Heading"
                        defaultMessage="See payment methods"
                      />
                    </Text>
                  </Stack>
                  <Button
                    onClick={() => router.push(PAYMENT_METHODS_MENU_ITEM.href)}
                    size="sm"
                    mb={4}
                    colorScheme="black"
                    _hover={{ bg: "#292929", color: "white" }}
                    variant="outline"
                  >
                    <FormattedMessage
                      id="HelpPage.UsefulLinks.Card1.Btn"
                      defaultMessage="Payment methods"
                    />
                  </Button>
                </Stack>
              </Box>
              <Box
                py="8"
                px="10"
                borderRadius={20}
                w="100%"
                h="auto"
                bgGradient="linear(to-tr, #fff, #e0e0e0 )"
              >
                <Stack spacing={3}>
                  <Stack>
                    <Box textAlign="center">
                      <Icon fontSize="6xl" as={FaReply} color="##727272" />
                    </Box>
                  </Stack>
                  <Stack spacing={0}>
                    <Text textAlign="center" lineHeight={8}>
                      {" "}
                      <FormattedMessage
                        id="HelpPage.UsefulLinks.Card2.Heading"
                        defaultMessage="Return products"
                      />
                    </Text>
                  </Stack>
                  <Button
                    onClick={() =>
                      router.push(RETURNS_AND_GUARANTEES_MENU_ITEM.href)
                    }
                    size="sm"
                    mb={4}
                    colorScheme="black"
                    _hover={{ bg: "#292929", color: "white" }}
                    variant="outline"
                  >
                    <FormattedMessage
                      id="HelpPage.UsefulLinks.Card2.Btn"
                      defaultMessage="Return"
                    />
                  </Button>
                </Stack>
              </Box>
              <Box
                py="8"
                px="10"
                borderRadius={20}
                w="100%"
                h="auto"
                bgGradient="linear(to-l, #c1efff  , #b4f4ff  )"
              >
                <Stack spacing={3}>
                  <Stack>
                    <Box textAlign="center">
                      {/* <Icon  fontSize="6xl" as={FaRegQuestionCircle} color="##050387" /> */}
                      <Icon
                        fontSize="6xl"
                        as={FaRegQuestionCircle}
                        color="##050387"
                      />
                    </Box>
                  </Stack>
                  <Stack spacing={0}>
                    <Text textAlign="center" lineHeight={8}>
                      <FormattedMessage
                        id="HelpPage.UsefulLinks.Card3.Heading"
                        defaultMessage="See where your package is"
                      />
                    </Text>
                  </Stack>
                  <Button
                    onClick={() => router.push(ORDER_TRACKING_MENU_ITEM.href)}
                    size="sm"
                    mb={4}
                    colorScheme="black"
                    _hover={{ bg: "#292929", color: "white" }}
                    variant="outline"
                  >
                    {" "}
                    <FormattedMessage
                      id="HelpPage.UsefulLinks.Card3.Btn"
                      defaultMessage="Order process"
                    />
                  </Button>
                </Stack>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  );
};

function RenderLink({ href, children }) {
  return (
    <Link href={href}>
      <a>
        <Text fontSize="14">{children}</Text>
      </a>
    </Link>
  )
}

const Card = () => {
  return (
    <Box bg="white" border="1px" borderColor="gray.300" px="4" py="6">
      <Stack spacing="4" align="center">
        <Square size="6rem" position="relative">
          <Image
            src={`${siteURL}/wp-content/uploads//2020/04/support.svg`}
            layout="fill"
            // width={50}
            // height={12}
          />
        </Square>
        <Heading fontSize="20">Purchase & Tools</Heading>
        <Stack spacing="0" align="center">
          <Text fontSize="14">Order</Text>
          <Text fontSize="14">Methods Payment</Text>
          <Text fontSize="14">Methods Shipping Methods</Text>
          <Text fontSize="14">Use of Voucher-Gift Voucher</Text>
          <Text fontSize="14">Product Returns</Text>
          <Text fontSize="14">Order Tracking</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HelpPage;
