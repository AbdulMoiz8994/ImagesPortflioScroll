import {
  Box,
  Container,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Center,
  Icon,
  Circle,
} from "@chakra-ui/react";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { GiReturnArrow, GiStorkDelivery } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import NextImage from "next/image";
import { Modal } from "@redq/reuse-modal";
import CloseModalOutsideClick from "utils/closeModalOutsideClick";
import CartPopUp from "features/carts/cart-popup";
import ComparisonFloatButton from "layouts/ComparisonFloatButton";
import Head from "next/head";
import { NextSeo } from "next-seo";
import WishlistFloatButton from "components/common/WishlistFloatButton";
import { FormattedMessage } from "react-intl";
import { siteURL } from "site-settings/site-credentials";

const ProductReturnPage = ({ deviceType }) => {
  return (
    <>
      <Head>
        <title>Επιστροφές Προϊόντων - SFKshop</title>
      </Head>
      <NextSeo
        description="Επιστροφές Προϊόντων Πολιτική Επιστροφών 7 Ημέρες Έχετε το δικαίωμα να επιστρέψετε τα προϊόντα που αγοράσατε εντός 7 ημερολογιακών ημερών από την ημερομηνία παραλαβής χωρίς αιτία με δική σας χρέωση. Προϋποθέσεις Συσκευασία & Απόδειξη Επιστροφές γίνονται δεκτές μόνο εφόσον τα προϊόντα που επιθυμείτε να επιστρέψετε βρίσκονται στην ίδια κατάσταση στην οποία τα παραλάβατε, μαζί με την απόδειξη λιανικής πώλησης […]"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large",
        }}
        canonical="https://sfkshop.gr/epistrofes-proionton/"
        openGraph={{
          locale: "el_GR",
          type: "article",
          title: "Επιστροφές Προϊόντων - SFKshop",
          description: "7",
          url: "https://sfkshop.gr/epistrofes-proionton/",
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
              alt: "Επιστροφές Προϊόντων",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <Modal>
        <WishlistFloatButton />
        <ComparisonFloatButton />
        <Box py="14" bg="white">
          <Container
            my="8"
            maxW="container.xl"
            width="97%"
            fontWeight="400"
            fontSize="18"
          >
            <Heading fontSize="30">
              <FormattedMessage
                id="ProductReturnsPage.Heading"
                defaultMessage="Return Procedure"
              />
            </Heading>

            <Stack py="10" spacing="10">
              <ReturnPolicySection />
              <ReturnProcedureSection />
            </Stack>
          </Container>
        </Box>
        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  );
};

function StepCard({ step, RenderIcon, label, description }) {
  return (
    <Box rounded="3xl" w="full" bg="#F8F8F8">
      <Stack
        w="full"
        p="5"
        justifyContent="center"
        pb="10"
        align="center"
        spacing="8"
      >
        <Heading fontSize="26">
          {" "}
          <FormattedMessage
            id="ProductReturnsPage.Step"
            defaultMessage="Step"
          />
          {step}
        </Heading>

        <Stack align="center" spacing="4">
          <Circle w="max" p="5" bg="white">
            <Icon as={RenderIcon} fontSize="5xl" />
          </Circle>
          <Heading fontSize="22">{label}</Heading>
          <Text align="center">{description}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}

function ReturnProcedureSection() {
  return (
    <Stack>
      <Heading fontSize="28">
        <FormattedMessage
          id="ProductReturnsPage.Heading"
          defaultMessage="Return Procedure"
        />
      </Heading>
      <Divider borderColor="gray.500" />

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="5">
        <StepCard
          step="1"
          RenderIcon={FaPhoneAlt}
          label={
            <FormattedMessage
              id="ProductReturnsPage.ReturnProcedure.Step1.Label"
              defaultMessage="Contact us"
            />
          }
          description={
            <FormattedMessage
              id="ProductReturnsPage.ReturnProcedure.Step1.Desc"
              defaultMessage="Send an email to info@sfkshop.gr or call 2106421065 to inform us about the problem you are facing in the product."
            />
          }
        />
        <StepCard
          step="2"
          RenderIcon={GiReturnArrow}
          label={
            <FormattedMessage
              id="ProductReturnsPage.ReturnProcedure.Step2.Label"
              defaultMessage="Return at your own expense"
            />
          }
          description={
            <FormattedMessage
              id="ProductReturnsPage.ReturnProcedure.Step2.Desc"
              defaultMessage="Go to the nearest Courier store of your choice or call them to pick up your parcel. The return is at your own expense."
            />
          }
        />
        <StepCard
          step="3"
          RenderIcon={GrDeliver}
          label={"Άφιξη στο κατάστημα μας"}
          description={
            <FormattedMessage
              id="ProductReturnsPage.ReturnProcedure.Step3.Desc"
              defaultMessage="Once the product is returned to our store and the appropriate check is made that the product is complete then you will be changed or a full refund of the cost of your order."
            />
          }
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="5" py="4">
        <Box rounded="3xl" w="full" bg="#F8F8F8" py="4">
          <Stack w="full" p="5" justifyContent="center" pb="10" spacing="8">
            <Heading fontSize="24">
              <FormattedMessage
                id="ProductReturnsPage.ShippingInfo.Heading"
                defaultMessage="Shipping Information"
              />
            </Heading>

            <Stack>
              <Text>SFKshop Παναγιώτα Νικολαΐδου</Text>
              <Text>Στεφ. Κουμανούδη 1, Αθήνα</Text>
              <Text>Τ.Κ 11474</Text>
            </Stack>

            <Stack>
              <Text>
                <FormattedMessage
                  id="ProductReturnsPage.ShippingInfo.Term1"
                  defaultMessage="* Our store does not bear any responsibility for how you will
                deliver the product to Courier"
                />
              </Text>
              <Text>
                <FormattedMessage
                  id="ProductReturnsPage.ShippingInfo.Term2"
                  defaultMessage="** Our store does not accept charge of ours in case you return a
                product without cause or it is not problematic"
                />
              </Text>
            </Stack>
          </Stack>
        </Box>
        <Box rounded="3xl" w="full" bg="#F8F8F8" py="4">
          <Stack w="full" p="5" justifyContent="center" pb="10" spacing="8">
            <Heading fontSize="24">
              <FormattedMessage
                id="ProductReturnsPage.MoneyBack.Heading"
                defaultMessage="Money back time"
              />
            </Heading>

            <Stack>
              <Text>
                <FormattedMessage
                  id="ProductReturnsPage.MoneyBack.Desc"
                  defaultMessage="Our store will refund the entire amount to you within 3 working days."
                />
              </Text>
              <Text>
                <FormattedMessage
                  id="ProductReturnsPage.MoneyBack.Term1"
                  defaultMessage="* Note in your package the IBAN and in which bank you want the refund to be made"
                />
              </Text>
            </Stack>
          </Stack>
        </Box>
      </SimpleGrid>
    </Stack>
  );
}

const days = '7';

function ReturnPolicySection() {
  return (
    <Stack>
      <Heading fontSize="28">
        <FormattedMessage
          id="ProductReturnsPage.SubHeading"
          defaultMessage="Return Policy"
        />
      </Heading>
      <Divider borderColor="gray.500" />

      <SimpleGrid spacing="5" columns={{ base: 1, md: 2 }}>
        {/* <Box rounded="3xl" w="full" bg="#ADF4FF" h="20rem"> */}
        <Box rounded="3xl" w="full" bg="#ADF4FF">
          <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Stack p="8" justifyContent="center" align="flex-start">
              <Stack spacing="0">
                <Text
                  p="0"
                  m="0"
                  fontSize="5rem"
                  display="inline-block"
                  lineHeight="4rem"
                >
                  7
                </Text>
                <Text>
                  <FormattedMessage
                    id="ProductReturnsPage.ReturnPolicy.Card1.Heading"
                    defaultMessage="Days"
                  />
                </Text>
              </Stack>
              <Text>
                <FormattedMessage
                  id="ProductReturnsPage.ReturnPolicy.Card1.Desc.Light1"
                  defaultMessage="You have the right to return the products you bought within"
                />
                <Text as="span" fontWeight="bold" fontSize="18">
                  <FormattedMessage
                    id="ProductReturnsPage.ReturnPolicy.Card1.Desc.Bold1"
                    defaultMessage="7 calendar days"
                  />
                </Text>
                <FormattedMessage
                  id="ProductReturnsPage.ReturnPolicy.Card1.Desc.Light2"
                  defaultMessage="from the date of receipt without cause"
                />
                <Text as="span" fontWeight="bold" fontSize="18">
                  <FormattedMessage
                    id="ProductReturnsPage.ReturnPolicy.Card1.Desc.Bold2"
                    defaultMessage="at your own expense."
                  />
                </Text>
              </Text>
            </Stack>
            <Box p="5">
              <NextImage
                src={
                  `${siteURL}/wp-content/uploads/2021/05/%CE%B2%CE%BF%CE%B7%CE%B8%CE%BF%CC%81%CF%82-%CE%B1%CE%B3%CE%BF%CF%81%CE%B1%CC%81%CF%82-%CE%B3%CE%B9%CE%B1-%CE%BA%CE%B1%CC%81%CE%BC%CE%B5%CF%81%CE%B5%CF%82-%CE%B1%CF%83%CF%86%CE%B1%CE%BB%CE%B5%CE%B9%CE%B1%CF%82-1536x1536.png`
                }
                layout="responsive"
                width={30}
                height={30}
                // w="full
                // h="full"
              />
            </Box>
          </SimpleGrid>
        </Box>
        <Box rounded="3xl" w="full" bg="#F9E9EF">
          <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Stack p="8" justifyContent="center" align="flex-start">
              <Heading fontSize="20" pb="5">
                <FormattedMessage
                  id="ProductReturnsPage.ReturnPolicy.Card2.Heading"
                  defaultMessage="Packaging & Proof"
                />
              </Heading>
              <Text>
                {/* Returns are only accepted if the products you wish to return are in the same condition in which you received them, along with the retail receipt or invoice. */}
                <FormattedMessage
                  id="ProductReturnsPage.ReturnPolicy.Card2.Desc.Light1"
                  defaultMessage="Returns are only accepted if the products you wish to return are in the"
                />
                <Text as="span" fontWeight="bold" fontSize="18">
                  {" "}
                  <FormattedMessage
                    id="ProductReturnsPage.ReturnPolicy.Card2.Desc.Bold1"
                    defaultMessage="same condition"
                  />{" "}
                </Text>
                <FormattedMessage
                  id="ProductReturnsPage.ReturnPolicy.Card2.Desc.Light2"
                  defaultMessage="in which you received them, along with the retail"
                />
                <Text as="span" fontWeight="bold" fontSize="18">
                  {" "}
                  <FormattedMessage
                    id="ProductReturnsPage.ReturnPolicy.Card2.Desc.Bold2"
                    defaultMessage="receipt or invoice."
                  />
                </Text>
              </Text>
            </Stack>
            <Box p="5">
              {/* <Image 
                src={"https://sfkshop.gr/wp-content/uploads/2021/05/packaging-epistrofes-page-1536x1536.png"}
                w="full"
                h="full"
              /> */}
              <NextImage
                src={
                  `${siteURL}/wp-content/uploads/2021/05/packaging-epistrofes-page-1536x1536.png`
                }
                layout="responsive"
                width={30}
                height={30}
                // w="full"
                // h="full"
              />
            </Box>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Stack>
  );
}

export default ProductReturnPage;
