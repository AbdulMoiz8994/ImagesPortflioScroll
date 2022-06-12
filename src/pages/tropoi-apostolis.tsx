import ImageNext from "next/image";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Wrap,
  Stack,
  OrderedList,
  ListItem,
} from "@chakra-ui/layout";
import React from "react";
import {
  Button,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  Icon,
  Th,
} from "@chakra-ui/react";
import { GiRayGun } from "react-icons/gi";
import {
  FaCreditCard,
  FaTruck,
  FaRegHandPeace,
  FaReply,
  FaRegQuestionCircle,
  FaShippingFast,
  FaRegFile,
} from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { Modal } from "@redq/reuse-modal";
import CloseModalOutsideClick from "utils/closeModalOutsideClick";
import CartPopUp from "features/carts/cart-popup";
import ComparisonFloatButton from "layouts/ComparisonFloatButton";
import Head from "next/head";
import { NextSeo } from "next-seo";
import WishlistFloatButton from "components/common/WishlistFloatButton";
import { FormattedMessage } from "react-intl";
import Router from "next/router";
import { ORDER_PROCESS, ORDER_TRACKING_MENU_ITEM, PAYMENT_METHODS_MENU_ITEM, RETURNS_AND_GUARANTEES_MENU_ITEM } from "site-settings/site-navigation";
import { siteURL } from "site-settings/site-credentials";

const DELIVERY_TIMES = [
  {
    area: "Ανατολική Μακεδονία και Θράκη",
    time: "3 Εργάσιμες",
  },
  {
    area: "Κεντρική & Δυτική Μακεδονία",
    time: "2 Εργάσιμες",
  },
  {
    area: "Ήπειρος & Θεσσαλία",
    time: "2 Εργάσιμες",
  },
  {
    area: "Δυτική & Στερεά Ελλάδα",
    time: "1 Εργάσιμη",
  },
  {
    area: "Αττική & Πελοπόννησος",
    time: "1 Εργάσιμη",
  },
  {
    area: "Βόρειο & Νότιο Αγαίο",
    time: "3 Εργάσιμη",
  },
  {
    area: "Ιόνιοι Νήσοι",
    time: "1 Εργάσιμη",
  },
];

export default function ShippingMethods({ deviceType }) {
  return (
    <>
      {/* SEO Imrovments (Start) */}
      <Head>
        <title>Τρόποι Αποστολής - SFKshop</title>
      </Head>

      <NextSeo
        // title="Τρόποι Αποστολής"
        description="Τρόποι Αποστολής Μάθε τους τρόπους αποστολής μας Επιλογές Courier Κόστος ACS3,50€ Κόστος Αντικαταβολής2,90€ Επιλογές αποστολής για προϊόντα από τις κατηγορίες Μοτέρ Γκαραζόπορτας & Μπάρες Parking Κόστος ACS Courier για βαριά δέματα17,00€  Κόστος Αντικαταβολής2,90€ Μεταφορά μέχρι την μεταφορική0,00€ Αποστολή στην Αθήνα από εμάς Παράδοση στο χώρο σαςΤο κατάστημα μας μπορεί να κάνει αποστολή της παραγγελίας σας, […]"
        canonical="https://sfkshop.gr/tropoi-apostolis/"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large",
        }}
        openGraph={{
          locale: "el_GR",
          type: "article",
          title: "Τρόποι Αποστολής - SFKshop",
          description: "Τρόποι Αποστολής Μάθε τους τρόπους αποστολής μας Επιλογές Courier Κόστος ACS3,50€ Κόστος Αντικαταβολής2,90€ Επιλογές αποστολής για προϊόντα από τις κατηγορίες Μοτέρ Γκαραζόπορτας & Μπάρες Parking Κόστος ACS Courier για βαριά δέματα17,00€  Κόστος Αντικαταβολής2,90€ Μεταφορά μέχρι την μεταφορική0,00€ Αποστολή στην Αθήνα από εμάς Παράδοση στο χώρο σαςΤο κατάστημα μας μπορεί να κάνει αποστολή της παραγγελίας σας, […]",
          url: "https://sfkshop.gr/tropoi-apostolis/",
          site_name: "SFKshop",
          article: {
            modifiedTime: new Date().toISOString(),
          },
          images: [
            {
              url: `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
              secureUrl:
                `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
              alt: "τρόποι αποστολής",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      {/* SEO Imrovments (End) */}

      <Modal>
        <WishlistFloatButton />
        <ComparisonFloatButton />
        <Box py={{ base: "0", lg: "16" }}>
          <Container
            my="8"
            maxW="container.xl"
            width="97%"
            fontWeight="400"
            fontSize="18"
          >
            <Heading fontSize={29}>
              <FormattedMessage 
                id="ShippingMethodsPage.Heading"
                defaultMessage="Shipping Methods"
              />  
            </Heading>
            <Text my={1}>
              <FormattedMessage 
                id="ShippingMethodsPage.HeadingDetails"
                defaultMessage="Learn how to send us"
              />  
            </Text>
            <Heading fontSize={20} my={2} pb={2}>
              <FormattedMessage 
                id="ShippingMethodsPage.CourierOptions"
                defaultMessage="Courier Options"
              />
            </Heading>
            <hr></hr>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2} pt={3}>
              <Box
                py="8"
                px="10"
                borderRadius={20}
                w="100%"
                h="auto"
                bgGradient="linear(to-tr, #fff 5%, #ecbcbe 30%)"
              >
                <Stack spacing={5}>
                  <Box w="40" h="14" position="relative">
                    <ImageNext
                      src={`${siteURL}/wp-content/uploads/2021/05/acs-logobg-1260x350.png`}
                      layout="fill"
                    />
                  </Box>
                  <Stack spacing={0}>
                    <Text lineHeight={8}>
                      <FormattedMessage 
                        id="ShippingMethodsPage.CostACS"
                        defaultMessage="Cost ACS"
                      />  
                    </Text>
                    <Heading fontSize={24} fontWeight={100}>
                      <strong>€ 3.50</strong>
                    </Heading>
                  </Stack>
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
                <Stack spacing={5}>
                  <Icon fontSize="6xl" as={FaCreditCard} color="gray" />
                  <Stack spacing={0} pb="4">
                    <Text>
                      <FormattedMessage 
                        id="ShippingMethodsPage.CODcost"
                        defaultMessage="Cash on Delivery Cost"
                      />
                    </Text>
                    <Heading fontSize={24} fontWeight={100}>
                      <strong>€ 2.90</strong>
                    </Heading>
                  </Stack>
                </Stack>
              </Box>
            </SimpleGrid>

            <Heading fontSize={22} my={2} pb={3}>
               <FormattedMessage 
                  id="ShippingMethodsPage.Heading2"
                  defaultMessage="Shipping options for products from the categories Garage Door Motor & Parking Bars"
               />
            </Heading>
            <hr></hr>
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={2} pt={3} >
              <Box py="8" px="10" borderRadius={20} w="100%" h="220" bgGradient="linear(to-tr, #fff, #d7676c)" >
                <Stack spacing={5}>
                  <Box w="40" h="16" position="relative">
                      <ImageNext 
                        src={`${siteURL}/wp-content/uploads/2021/05/acs-logobg-1260x350.png`}
                        layout="fill"
                      />
                    </Box>
                    <Stack spacing={0} pt="2">
                        <Text >Κόστος ACS Courier για βαριά δέματα</Text>
                        <Heading  fontSize={24} fontWeight={100}><strong>€ 17.00€ </strong></Heading>
                    </Stack>
                  </Stack>
              </Box>

              <Box py="8" px="10" borderRadius={20} w="100%" h="220" bgGradient="linear(to-tr, #fff, #e0e0e0 )" >
                     <Stack  spacing={5}>
                        <Icon fontSize="7xl" as={FaCreditCard} color="gray" />
                        <Stack spacing={0}>
                           <Text>
                           Κόστος Αντικαταβολής
                           </Text>
                           <Heading  fontSize={24} fontWeight={100}><strong>€ 2.90</strong></Heading>
                        </Stack>
                     </Stack>
                  </Box>

                  <Box py="8" px="10" borderRadius={20} w="100%" h="220" bgGradient="linear(to-tr, #80b0f0 , #c1efff)" >
                     <Stack  spacing={5}>
                        <Icon fontSize="7xl" as={FaTruck} color="#050387" />
                        <Stack spacing={0}>
                           <Text>
                             <FormattedMessage 
                                id="ShippingMethodsPage.Transferup"
                                defaultMessage="Transfer up to"
                             />
                           </Text>
                           <Heading  fontSize={24} fontWeight={100}><strong>€ 0.00</strong></Heading>
                        </Stack>
                     </Stack>
                  </Box>
            </SimpleGrid>
            <Heading fontSize={22} my={2} pb={3}>
              <FormattedMessage 
                id="ShippingMethodsPage.Heading3"
                defaultMessage="Shipping to Athens by us"
              />
            </Heading>
            <hr></hr>
            <Wrap columns={{ base: 1, sm: 2 }} pt={3} flexWrap="wrap">
              <Box
                py="8"
                px="10"
                pb="10"
                borderRadius={22}
                flex="3"
                h="auto"
                bgGradient="linear(to-tl, #e5f3fc , #c1eae0  )"
              >
                <Stack spacing={5}>
                  <Icon fontSize="6xl" as={FaShippingFast} color="#0b09b3" />
                  <Stack spacing={0}>
                    <Heading fontSize={18} fontWeight={100}>
                      <strong>
                        <FormattedMessage 
                          id="ShippingMethodsPage.Delivery"
                          defaultMessage="Delivery"
                        />
                      </strong>
                    </Heading>
                    <Text>
                      Το κατάστημα μας μπορεί να κάνει αποστολή της παραγγελίας σας, εντός 3 ωρών, εφόσον βρίσκεται στην Αθήνα με κόστος 7,00€. (Κατόπιν Συνεννόησης για παραγγελίες πριν τη 13:00)
                    </Text>
                  </Stack>
                </Stack>
              </Box>
              <Box
                py="8"
                px="10"
                pb="10"
                borderRadius={22}
                flex="7"
                h="auto"
                bgGradient="linear(to-tr, #fff, #e0e0e0 )"
              >
                <Stack spacing={5}>
                  <Icon fontSize="6xl" as={FaRegFile} color="#9391fd" />
                  <Stack spacing={0}>
                    <Heading fontSize={18} fontWeight={100}>
                      <strong><FormattedMessage id="ShippingMethodsPage.Prerequisites" defaultMessage="Prerequisites" /></strong>
                    </Heading>
                    <OrderedList>
                      <ListItem>
                        Παραδόσεις γίνονται μόνο εντός ορίων της Αθήνας και όχι εκτός Αθηνών
                      </ListItem>
                      <ListItem>
                        Οι αποστολές γίνονται κάθε Δευτέρα, Τετάρτη & Παρασκευή
                      </ListItem>
                    </OrderedList>
                  </Stack>
                </Stack>
              </Box>
            </Wrap>
            <Heading fontSize={22} my={2} pb={3}>
              <FormattedMessage 
                id="ShippingMethodsPage.Heading4"
                defaultMessage="Mission to Cyprus"
              />
            </Heading>
            <hr></hr>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2} pt={3}>
              <Box
                py="8"
                px="10"
                borderRadius={20}
                w="100%"
                h="auto"
                bgGradient="linear(to-tr, #fff 5%, #ecbcbe 30%)"
              >
                <Stack spacing={5}>
                  <Box w="40" h="14" position="relative">
                    <ImageNext
                      // src="https://nitrocdn.com/upCupBGtQyrvhTpNnNSdTAjLUiPDEwtd/assets/static/optimized/rev-c7b3506/wp-content/uploads/2021/05/acs-logobg-1260x350.png"
                      src={`${siteURL}/wp-content/uploads/2021/05/acs-logobg-1260x350.png`}
                      layout="fill"
                    />
                  </Box>
                  <Stack spacing={0}>
                    <Text lineHeight={8}><FormattedMessage id="ShippingMethodsPage.CostACS" defaultMessage="Cost ACS" /></Text>
                    <Heading fontSize={24} fontWeight={100}>
                      <strong>€ 7.50</strong>
                    </Heading>
                  </Stack>
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
                <Stack spacing={5}>
                  <Icon fontSize="6xl" as={FaCreditCard} color="gray" />
                  <Stack spacing={0} pb="4">
                    <Text><FormattedMessage id="ShippingMethodsPage.CODcost" /></Text>
                    <Heading fontSize={24} fontWeight={100}>
                      <strong>€ 2.90</strong>
                    </Heading>
                  </Stack>
                </Stack>
              </Box>
            </SimpleGrid>
            <Heading fontSize={22} my={2} pb={3}>
              <FormattedMessage 
                id="ShippingMethodsPage.Heading5"
                defaultMessage="Information"
              />
            </Heading>
            <hr></hr>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2} pt={3}>
              <Box
                py="8"
                px="10"
                borderRadius={20}
                w="100%"
                h="auto"
                bgGradient="linear(to-b, #fff, #cbf6fd )"
              >
                <Stack spacing={5}>
                  <Icon fontSize="6xl" as={FaRegHandPeace} color="#9391fd" />
                  <Stack spacing={2}>
                    <Heading fontSize={18} fontWeight={100}>
                      <strong><FormattedMessage id="ShippingMethodsPage.Delivery" defaultMessage="Delivery" /></strong>
                    </Heading>
                    <Text>
                    Το κατάστημα μας συνεργάζεται με την ACS Courier. Όλες οι παραγγελίες που έχουν ολοκληρωθεί έως τις 15:00 αποστέλλονται την ίδια ημέρα. Οι παραδόσεις των παραγγελιών γίνονται εργάσιμες ημέρες από τις 10:00 έως 16:00. Αποστολές προς Κύπρο ενδέχεται να διαρκέσουν εώς και 7 εργάσιμες.
                    </Text>
                  </Stack>
                  <Icon fontSize="6xl" as={FiClock} color="#9391fd" />
                  <Stack spacing={2}>
                    <Heading fontSize={18} fontWeight={100}>
                      <strong>Δυσπρόσιτες Περιοχές</strong>
                    </Heading>
                    <Text>
                    Αν το σημείο αποστολής είναι σε δυσπρόσιτο σημείο ενδέχεται να διαρκέσει η παράδοση έως και 7 εργάσιμες ημέρες
                    </Text>
                  </Stack>
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
                <Stack spacing={5}>
                  <Heading fontSize={18} fontWeight={100}>
                    <strong>Χρόνοι Παράδοσης</strong>
                  </Heading>
                  <Stack spacing={0}>
                    <Table size="sm" variant="unstyled" mt={3}>
                      <Thead>
                        <Tr>
                          <Th>Περιοχή</Th>
                          <Th isNumeric>Χρόνος Παράδοσης</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {DELIVERY_TIMES.map((item, index) => (
                          <Tr key={index} py="0">
                            <Td fontSize="16">{item.area}</Td>
                            <Td fontSize="16" m="0" isNumeric>
                              {item.time}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Stack>
                  <Stack>
                    <Text fontSize={18} mt={3}>
                    Ενδέχεται να υπάρχει καθυστέρηση στους χρόνους παράδοσης από της εταιρείες courier.
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </SimpleGrid>

            <Heading fontSize={22} my={2} pb={3}>
              <FormattedMessage 
                id="ShippingMethodsPage.Heading6"
                defaultMessage="Useful Links"
              />
            </Heading>
            <hr></hr>
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={2} pt={3}>
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
                    Δες τους τρόπους πληρωμής
                    </Text>
                  </Stack>
                  <Button
                    size="sm"
                    mb={4}
                    colorScheme="black"
                    _hover={{ bg: "#292929", color: "white" }}
                    variant="outline"
                    onClick={() => Router.push(PAYMENT_METHODS_MENU_ITEM.href)}
                  >
                    <FormattedMessage 
                      id="nav.paymentMethods"
                      defaultMessage="Payment Methods"
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
                      Επιστροφή προϊόντων
                    </Text>
                  </Stack>
                  <Button
                    size="sm"
                    mb={4}
                    colorScheme="black"
                    _hover={{ bg: "#292929", color: "white" }}
                    variant="outline"
                    onClick={() => Router.push(RETURNS_AND_GUARANTEES_MENU_ITEM.href)}
                  >
                    Επιστροφές
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
                      <Icon
                        fontSize="6xl"
                        as={FaRegQuestionCircle}
                        color="##050387"
                      />
                    </Box>
                  </Stack>
                  <Stack spacing={0}>
                    <Text textAlign="center" lineHeight={8}>
                    Δες που είναι το δέμα σου
                    </Text>
                  </Stack>
                  <Button
                    size="sm"
                    mb={4}
                    colorScheme="black"
                    _hover={{ bg: "#292929", color: "white" }}
                    variant="outline"
                    onClick={() => Router.push(ORDER_TRACKING_MENU_ITEM.href)}
                  >
                    Πορεία Παραγγελίας
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
}
