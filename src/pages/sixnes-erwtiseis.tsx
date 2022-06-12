import { Box, Heading, Text, Link, Spacer } from "@chakra-ui/layout";
import React, { useContext, useEffect } from "react";
import { Container } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Modal } from "@redq/reuse-modal";
import CloseModalOutsideClick from "utils/closeModalOutsideClick";
import CartPopUp from "features/carts/cart-popup";
import ComparisonFloatButton from "layouts/ComparisonFloatButton";
import Head from "next/head";
import { NextSeo } from "next-seo";
import WishlistFloatButton from "components/common/WishlistFloatButton";
import { FormattedMessage } from "react-intl";
import { siteURL } from "site-settings/site-credentials";

export default function FrequentQuestions({ deviceType }) {
  return (
    <>
      {/* SEO Imrovments (Start) */}
      <Head>
        <title>Συχνές Ερωτήσεις - SFKshop</title>
      </Head>

      <NextSeo
        description="EΞΥΠΗΡΕΤΗΣΗ ΜΕΣΩ FACEBOOK"
        canonical="https://sfkshop.gr/sixnes-erwtiseis/"
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large",
        }}
        openGraph={{
          locale: "el_GR",
          type: "article",
          title: "Συχνές Ερωτήσεις - SFKshop",
          description: "EΞΥΠΗΡΕΤΗΣΗ ΜΕΣΩ FACEBOOK",
          url: "https://sfkshop.gr/sixnes-erwtiseis/",
          site_name: "SFKshop",
          article: {
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
      {/* SEO Imrovments (End) */}

      <Modal>
        <WishlistFloatButton />
        <ComparisonFloatButton />
        <Box py={{ base: "0", lg: "20" }}>
          <Container
            mb="5"
            px={{ base: "2", md: "10" }}
            maxW={{ base: "container.md", lg: "container.xl" }}
            centerContent
          >
            <Heading my="8">
              <FormattedMessage
                id="FrequentlyAskedQuestionsPage.Heading"
                defaultMessage="Frequent questions"
              />
            </Heading>
            <Box w="full">
              {/*//////////////////// card 1 //////////////////////*/}
              <Text fontSize="xl" my="3" color="primary.100">
                <FormattedMessage
                  id="FrequentlyAskedQuestionsPage.Section1"
                  defaultMessage="General information"
                />
              </Text>

              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton _expanded={{ color: "primary.100" }} my="1">
                    <AccordionIcon />
                    <Heading
                      ml="3"
                      flex="1"
                      textAlign="left"
                      as="h5"
                      size="sm"
                      textColor="inherit"
                    >
                      <FormattedMessage
                        id="FrequentlyAskedQuestionsPage.Section1.Question1"
                        defaultMessage="SERVICE THROUGH FACEBOOK"
                      />
                    </Heading>
                  </AccordionButton>
                  <AccordionPanel pb={5} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section1.Ans1"
                      defaultMessage="If you are a Facebook user, you can be served immediately,
                    for any question you have , for our orders, products or
                    services, through our Facebook page."
                    />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton _expanded={{ color: "primary.100" }} my="1">
                    <AccordionIcon />
                    <Heading
                      ml="3"
                      flex="1"
                      textAlign="left"
                      as="h5"
                      size="sm"
                      textColor="inherit"
                    >
                      <FormattedMessage
                        id="FrequentlyAskedQuestionsPage.Section1.Question2"
                        defaultMessage="HOW CAN I COMMUNICATE WITH YOU?"
                      />
                    </Heading>
                  </AccordionButton>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section1.Ans2.Line1"
                      defaultMessage="The team of SFKshop.gr is by your side for everything you
                    need."
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section1.Ans2.Line2"
                      defaultMessage="Contact us daily in 3 different ways:"
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section1.Ans2.Line3"
                      defaultMessage="Filling in your details and request in the contact form you
                    find here."
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section1.Ans2.Line4"
                      defaultMessage="Calling us at telephone 21064 21065 (mobile and fixed) with
                    local charge, from Monday to Friday 10am - 5pm. "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section1.Ans2.Line5"
                      defaultMessage="Chatting with us live through the live chat service from
                    Monday - Friday 10: 00-17: 00."
                    />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton _expanded={{ color: "primary.100" }} my="1">
                    <AccordionIcon />
                    <Heading
                      ml="3"
                      flex="1"
                      textAlign="left"
                      as="h5"
                      size="sm"
                      textColor="inherit"
                    >
                      <FormattedMessage
                        id="FrequentlyAskedQuestionsPage.Section1.Question3"
                        defaultMessage="HOW DO I MONITOR THE PROGRESS OF MY ORDER?"
                      />
                    </Heading>
                  </AccordionButton>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section1.Ans3.Line2"
                      defaultMessage={`Alternatively, you can see the stage of your order through
                    the ACS Courier website here , the Elta Courier website here
                    or ask us about the progress of your order in Live chat, by
                    phone, on facebook or send us an`}
                    />{" "}
                    <a color="black" href="#">
                      <FormattedMessage
                        id="FrequentlyAskedQuestionsPage.Section1.Ans3.Link"
                        defaultMessage={`email here`}
                      />
                    </a>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/*//////////////////// card 2 //////////////////////*/}
              <Text fontSize="xl" my="3" color="primary.100">
                <FormattedMessage
                  id="FrequentlyAskedQuestionsPage.Section2"
                  defaultMessage="Information for orders"
                />
              </Text>

              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ color: "primary.100" }}
                      my="1"
                    >
                      <AccordionIcon />
                      <Heading
                        ml="3"
                        flex="1"
                        textAlign="left"
                        as="h5"
                        size="sm"
                        color="inherit"
                      >
                        <FormattedMessage
                          id="FrequentlyAskedQuestionsPage.Section2.Question1"
                          defaultMessage="WHAT DO PRODUCT AVAILABILITY MEAN?"
                        />
                      </Heading>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans1.Line1"
                      defaultMessage="Product availability is displayed on the product page."
                    />{" "}
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans1.Line2"
                      defaultMessage="The product can be: "
                    />
                    <br></br>
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans1.Line3"
                      defaultMessage="Immediately available: Available for online purchase."
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans1.Line4"
                      defaultMessage=" Delivery 1-3 working days: The product is available in our
                    central warehouses and will be available for shipment within
                    3 working days. "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans1.Line5"
                      defaultMessage="Delivery 4-10 working days : The product will be available
                    for shipment in 4-10 working days."
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans1.Line6"
                      defaultMessage="Upon Order : It is available for pre-order and the delivery
                    date depends on the official delivery day from the official
                    dealership. Priority order is observed. "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans1.Line7"
                      defaultMessage="Out of stock : Not available for order at this time."
                    />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ color: "primary.100" }}
                      my="1"
                    >
                      <AccordionIcon />
                      <Heading
                        ml="3"
                        flex="1"
                        textAlign="left"
                        as="h5"
                        size="sm"
                        color="inherit"
                      >
                        <FormattedMessage
                          id="FrequentlyAskedQuestionsPage.Section2.Question2"
                          defaultMessage="HOW CAN I STORE PRODUCTS IN MY PROFILE?"
                        />
                      </Heading>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans2.Line1"
                      defaultMessage="You can keep products on your wish list so that you can find
                    them easily and regardless of when and if you intend to get
                    them. The wish list is displayed to users "
                    />
                    <br></br>{" "}
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans2.Line2"
                      defaultMessage="connected to the profile on all product pages marked
                    'favorites' and in the shopping cart."
                    />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      my="1"
                      _expanded={{ color: "primary.100" }}
                    >
                      <AccordionIcon />
                      <Heading
                        ml="3"
                        flex="1"
                        textAlign="left"
                        as="h5"
                        size="sm"
                        color="inherit"
                      >
                        <FormattedMessage
                          id="FrequentlyAskedQuestionsPage.Section2.Question3"
                          defaultMessage="HOW CAN I REGISTER MY ORDER?"
                        />
                      </Heading>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans3.Line1"
                      defaultMessage="You can keep products on your wish list so that you can find
                    them easily and regardless of when and if you intend to get
                    them. The wish list is displayed to users "
                    />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans3.Line2"
                      defaultMessage="You can order the products you want in 3 simple ways!"
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans3.Line3"
                      defaultMessage="1. By registering an online order 24 hours a day at
                    SFKshop.gr "
                    />
                    <br />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans3.Line4"
                      defaultMessage="2. Through the live chat that appears at the top of any
                    page!  "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans3.Line5"
                      defaultMessage="Monday to Friday from 10:00 to 17:00 "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans3.Line6"
                      defaultMessage="3. By phone order at 21064 21065 (from mobile * and
                    landline) "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans3.Line7"
                      defaultMessage="Monday to Friday from 10:00 to 17:00 * (local charge)  "
                    />
                    <br />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      my="1"
                      _expanded={{ color: "primary.100" }}
                    >
                      <AccordionIcon />
                      <Heading
                        ml="3"
                        flex="1"
                        textAlign="left"
                        as="h5"
                        size="sm"
                        color="inherit"
                      >
                        <FormattedMessage
                          id="FrequentlyAskedQuestionsPage.Section2.Question4"
                          defaultMessage="HOW DO I KNOW IF MY ORDER HAS BEEN REGISTERED?"
                        />
                      </Heading>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans4.Line1"
                      defaultMessage=" Upon successful completion of your order you will receive a
                    confirmation email with the summary of your purchase as well
                    as the order code. "
                    />{" "}
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans4.Line2"
                      defaultMessage="In case you do not receive the confirmation email, most
                    likely:"
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans4.Line3"
                      defaultMessage="• you have not completed your order "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans4.Line4"
                      defaultMessage="• you have entered the email incorrectly "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans4.Line5"
                      defaultMessage="• it has been transferred to spam"
                    />
                    <br />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      my="1"
                      _expanded={{ color: "primary.100" }}
                    >
                      <AccordionIcon />
                      <Heading
                        ml="3"
                        flex="1"
                        textAlign="left"
                        as="h5"
                        size="sm"
                        color="inherit"
                      >
                        <FormattedMessage
                          id="FrequentlyAskedQuestionsPage.Section2.Question5"
                          defaultMessage="ORDER STAGES"
                        />
                      </Heading>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans5.Line1"
                      defaultMessage="Your order has been registered ! You have received an email
                    with the confirmation "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans5.Line2"
                      defaultMessage="Your order is being processed and soon you will be informed
                    by email / sms about its progress!"
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans5.Line3"
                      defaultMessage="Your order has been shipped . Your order has been sent via
                    ACS Courier or Elta Courier to be shipped to your place
                    within 3 working days! Your order has been invoiced and has
                    been delivered to the company ACS Courier or Elta Courier
                    which will launch its shipment to your place! "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans5.Line4"
                      defaultMessage="Your order has arrived. Your order has been delivered to
                    your place. "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans5.Line5"
                      defaultMessage="Your order has been canceled . The order was canceled "
                    />
                    <br />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      my="1"
                      _expanded={{ color: "primary.100" }}
                    >
                      <AccordionIcon />
                      <Heading
                        ml="3"
                        flex="1"
                        textAlign="left"
                        as="h5"
                        size="sm"
                        color="inherit"
                      >
                        <FormattedMessage
                          id="FrequentlyAskedQuestionsPage.Section2.Question6"
                          defaultMessage="CAN I CHANGE / MODIFY / CANCEL MY ORDER?"
                        />
                      </Heading>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans6.Line1"
                      defaultMessage="Yes, by contacting us in one of the following ways"
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans6.Line2"
                      defaultMessage=". Through the live chat that appears at the bottom of
                    SFKshop.gr! "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans6.Line3"
                      defaultMessage="Monday to Friday from 10:00 to 17:00 "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans6.Line4"
                      defaultMessage="2. By phone at 21064 21065 (from mobile * and landline)"
                    />{" "}
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans6.Line5"
                      defaultMessage="Monday to Friday from 10:00 to 17:00 * (local charge) "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section2.Ans6.Line6"
                      defaultMessage="3. By email by filling out the contact form here "
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/*//////////////////// card 3 //////////////////////*/}
              <Text fontSize="xl" my="3" color="primary.100">
                <FormattedMessage
                  id="FrequentlyAskedQuestionsPage.Section3"
                  defaultMessage=" General information"
                />
              </Text>

              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ color: "primary.100" }}
                      my="1"
                    >
                      <AccordionIcon />
                      <Heading
                        ml="3"
                        flex="1"
                        textAlign="left"
                        as="h5"
                        size="sm"
                        color="inherit"
                      >
                        <FormattedMessage
                          id="FrequentlyAskedQuestionsPage.Section3.Question1"
                          defaultMessage="WHAT IS THE COST OF SHIPPING?"
                        />
                      </Heading>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans1.Line1"
                      defaultMessage=" Home deliveries are made by the Courier company in the areas
                    that have an office / s at the place of shipment.  "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans1.Line2"
                      defaultMessage="Shipping Cost by Courier is: For all shipments we offer the
                    special price of 3.5 € for weight up to 3 kg. For each
                    subsequent kilo the charge is € 1 ."
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans1.Line3"
                      defaultMessage="In cases of COD shipments, the charge at the basic price
                    amounts to € 2.90 . "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans1.Line4"
                      defaultMessage="By transport "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans1.Line5"
                      defaultMessage=" Bulk parcels are sent by transport company by arrangement.
                    Cash on delivery is not valid for this shipping method.
                    There will be telephone contact with you before shipment. "
                    />{" "}
                    <br />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      my="1"
                      _expanded={{ color: "primary.100" }}
                    >
                      <AccordionIcon />
                      <Heading
                        ml="3"
                        flex="1"
                        textAlign="left"
                        as="h5"
                        size="sm"
                        color="inherit"
                      >
                        <FormattedMessage
                          id="FrequentlyAskedQuestionsPage.Section3.Question2"
                          defaultMessage="SHIPPING TIME?"
                        />
                      </Heading>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans2"
                      defaultMessage=" Orders placed by 14:00 (on business days) are shipped the
                    same day and delivered in one to three business days
                    (usually 1 to 3 business days Monday - Friday)."
                    />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      my="1"
                      _expanded={{ color: "primary.100" }}
                    >
                      <AccordionIcon />
                      <Heading
                        ml="3"
                        flex="1"
                        textAlign="left"
                        as="h5"
                        size="sm"
                        color="inherit"
                      >
                        <FormattedMessage
                          id="FrequentlyAskedQuestionsPage.Section3.Question3"
                          defaultMessage="HOW TO CHANGE SHIPMENT DETAILS?"
                        />
                      </Heading>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans3.Line1"
                      defaultMessage="You can order the products you want in 3 simple ways!  "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans3.Line2"
                      defaultMessage="1. By registering an online order 24 hours a day at
                    SFKshop.gr  "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans3.Line3"
                      defaultMessage="2. Through the live chat that appears at the top of any
                    page! "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans3.Line4"
                      defaultMessage="Monday to Friday from 10:00 to 17:00"
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans3.Line5"
                      defaultMessage="3. By phone order at 21064 21065 (from mobile * and
                    landline)  "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans3.Line6"
                      defaultMessage="Monday to Friday from 10:00 to 17:00 * (local charge) "
                    />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      my="1"
                      _expanded={{ color: "primary.100" }}
                    >
                      <AccordionIcon />
                      <Heading
                        ml="3"
                        flex="1"
                        textAlign="left"
                        as="h5"
                        size="sm"
                        color="inherit"
                      >
                        <FormattedMessage
                          id="FrequentlyAskedQuestionsPage.Section3.Question4"
                          defaultMessage="HOW DO I RETURN PRODUCTS?"
                        />
                      </Heading>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans4.Line1"
                      defaultMessage="In case you want to return the product you bought, you have
                    the opportunity to do it in 2 ways within 7 calendar days
                    from the day you received it! (Prerequisite  "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans4.Line2"
                      defaultMessage="that the product is in its sealed commercial package and is
                    accompanied by proof of purchase).   "
                    />
                    <br />
                    <FormattedMessage
                      id="FrequentlyAskedQuestionsPage.Section3.Ans4.Line3"
                      defaultMessage="Sending it / s at your own expense, in its original
                    condition and packaging, to SFKshop.gr enclosing the
                    purchase receipt. more here "
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Container>
        </Box>

        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  );
}
