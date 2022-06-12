// DRY ---> Dont repeat yourself

import React, { FC, useEffect, useState } from "react";
import Head from 'next/head'
import {
  Heading,
  Text,
  Container,
  Stack,
  HStack,
  Box,
  Button,
  Icon,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Accordion,
} from "@chakra-ui/react";
import useOrderLineItemsTotalPrice from "utils/useOrderLineItemsTotalPrice";
import dateFormat from "dateformat";
import { getBillingTypeFromMetaData, getShippingMethodCustom, getTranslatedPaymentMethod } from "utils/orders_utils";
import router from "next/router";
import { alphaMerchantId } from "site-settings/site-credentials";
import { storeOrderInLocalStorage, updateOrder } from "services/orders";

type OrderReceivedProps = {
  order?: any;
  alphaBankData?: any
};

export default function OrderReceived({ order, alphaBankData }: OrderReceivedProps) {
  const productsTotalPrice = useOrderLineItemsTotalPrice(order?.line_items || []);
  
  // Only for alpha bank, if payment through alpha bank is successful then update the order status to 'paid';
  useEffect(() => {
    if (!alphaBankData.mid || !alphaBankData.orderid) return;

    updateOrderAsync();
    async function updateOrderAsync() {
      if (alphaBankData.mid === alphaMerchantId && alphaBankData.orderid === order.number) {
        const { order: orderData, error } = await updateOrder(order.id, { status: "processing" });

        if (!error) {
          storeOrderInLocalStorage(orderData);
        }
      }
    };
  }, []);

  console.log({ order })

  return (
    <>
      <Heading pt={{ base: "6", sm: "8", md: "14", lg: "20" }} textAlign={"center"}>
        {/* Order Complete! */}
        Λάβαμε την παραγγελία σου!
      </Heading>
      <Text textAlign={"center"} fontWeight={"bold"}>
        {/* All set! Thankyou for your purchase. */}
        Ευχαριστούμε για την παραγγελία!
      </Text>

      <Stack py="8" spacing={4} justify="center" align="center">
        <Container
          bg={"white"}
          // h={"50vh"}
          py={"8"}
          px="8"
          mt="8"
          border={"solid 1px #EEEDE7"}
          borderRadius={"5px"}
          maxW="container.md"
        >
          <Stack spacing="4">
            <HStack>
              <Text fontWeight={"bold"}>Παραγγελία #{order.id}</Text>
              <Box
                bg={"green"}
                color={"white"}
                px="3"
                // h={"10%"}
                py="1"
                textAlign={"center"}
              >
                ΝΕΑ ΠΑΡΑΓΓΕΛΙΑ
              </Box>
            </HStack>

            <Stack>
              <HStack justify="space-between" align="center">
                <Accordion allowToggle w="full">
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        px="1"
                        variant="ghost"
                        _focus={{ outline: "none", boxShadow: "none" }}
                      >
                        <HStack flex="1" textAlign="left">
                          {/* <Text>Items ({order.line_items.length})</Text> */}
                          <Text>Προϊόντα ({order.line_items.length})</Text>
                          <AccordionIcon />
                        </HStack>
                        <Box>
                          <Text textAlign={"right"}>€ {productsTotalPrice}</Text>
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Stack spacing="4" py="2">
                        {order.line_items.map(item => (
                          <DetailCard key={item.name} title={item.name} value={`€ ${item.total}`} description={`${item.quantity} × ${item.subtotal} €`} />
                        ))}
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

              </HStack>

              <DetailCard title="Τύπος Παραστατικού" value={getBillingTypeFromMetaData(order.meta_data)} />
              <DetailCard title="Σύνολο ΦΠΑ" value={`€ ${order.total_tax}`} />
              <DetailCard title="Έκπτωση" value="€ 0.00" /> 
              {/* <DetailCard title="Τρόπος Αποστολής" value={order?.shipping_lines?.[0]?.method_title} />  */}
              <DetailCard title="Τρόπος Αποστολής" value={getShippingMethodCustom(order?.shipping_lines?.[0]?.method_title)} /> 
             
              <hr />
              <DetailCard title="Σύνολο" value={`€ ${order.total}`} variant="bold" />
              
            </Stack>
          </Stack>
        </Container>

        {/* Bank Information */}
        {order.payment_method === "bacs" && <Container
          bg={"white"}
          // h={"50vh"}
          py={"8"}
          px="8"
          mt="8"
          border={"solid 1px #EEEDE7"}
          borderRadius={"5px"}
          maxW="container.md"
        >
          <Stack spacing="4">
            <HStack>
              {/* <Text fontWeight={"bold"}>Bank Details</Text> */}
              <Text fontWeight={"bold"}>Στοιχεία Τραπεζών</Text>
            </HStack>

            {/* Accordions for banks */}
            <Accordion allowToggle w="full">
              {/* Accordion 1 */}
              <AccordionItemWrapper title="Εθνική Τράπεζα">
                <Stack spacing="2" py="2">
                  <DetailCard title="Αριθμός Λογαριασμού" value="132 / 002966-17" />  
                  <DetailCard title="ΙΒΑΝ" value="GR52 0110 1320 0000 1320 0296 617" />  
                  <DetailCard title="Όνομα Κατόχου Λογαριασμού" value="Panagiota Nikolaidou" />  
                </Stack>
              </AccordionItemWrapper>
              {/* Accordion 2 */}
              <AccordionItemWrapper title="Alpha Bank">
                <Stack spacing="4" py="2">
                  <DetailCard title="Αριθμός Λογαριασμού" value="216 00 2002 004807" />  
                  <DetailCard title="ΙΒΑΝ" value="GR36 0140 2160 2160 0200 2004 807" />  
                  <DetailCard title="Όνομα Κατόχου Λογαριασμού" value="Panagiota Nikolaidou" />  
                </Stack>
              </AccordionItemWrapper>
              {/* Accordion 3 */}
              <AccordionItemWrapper title="Τράπεζα Πειραιώς">
                <Stack spacing="4" py="2">
                  <DetailCard title="Αριθμός Λογαριασμού" value="5091-093761-336" />  
                  <DetailCard title="ΙΒΑΝ" value="GR32 0172 0910 0050 9109 3761 336" />  
                  <DetailCard title="Όνομα Κατόχου Λογαριασμού" value="Panagiota Nikolaidou" />  
                </Stack>
              </AccordionItemWrapper>
              {/* Accordion 4 */}
              <AccordionItemWrapper title="Eurobank">
                <Stack spacing="4" py="2">
                  <DetailCard title="Αριθμός Λογαριασμού" value="0026009937370200740534" />  
                  <DetailCard title="ΙΒΑΝ" value="GR10 0260 0990 0003 7020 0740 534" />  
                  <DetailCard title="Όνομα Κατόχου Λογαριασμού" value="Panagiota Nikolaidou" />  
                </Stack>
              </AccordionItemWrapper>
            </Accordion>

            <Stack spacing="1">
              <Text fontStyle="italic">Χρησιμοποιήστε ως αιτιολογία οπωσδήποτε τον αριθμό της παραγγελίας σας και το ονοματεπώνυμο που καταχωρήσατε στην παραγγελία</Text>
              <Text fontStyle="italic" fontWeight="semibold">
                Παρακαλούμε να μας στείλετε το αποδεικτικό στο email:
                <Text as="span" color="blue.600" textDecor="underline">
                  <a href="mailto:info@sfkshop.gr">info@sfkshop.gr</a>
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Container>}

        <Container
          bg={"white"}
          // h={"50vh"}
          py={"8"}
          px="8"
          mt="8"
          border={"solid 1px #EEEDE7"}
          borderRadius={"5px"}
          maxW="container.md"
        >
          <Stack spacing="4">
            <HStack>
              <Text fontWeight={"bold"}>Τόπος Αποστολής</Text>
            </HStack>
            <hr />

            <Stack>              
              <DetailCard title="Τρόπος Πληρωμής" value={getTranslatedPaymentMethod(order.payment_method_title)} />              
              <DetailCard title="Ημερομηνία Παραγγελίας" value={dateFormat(order.date_created, "fullDate")} />
              <DetailCard title=" Διεύθυνση Αποστολής" value={`${order.shipping.address_1} ${order.shipping.postcode}`} />              
            </Stack>
          </Stack>
        </Container>

        <Container
          bg={"white"}
          py={"8"}
          px="8"
          border={"solid 1px #EEEDE7"}
          borderRadius={"5px"}
          maxW="container.md"
        >
          <Heading>Ευχαριστούμε για την παραγγελία!</Heading>
          <Text mt={"6"}>
            Σύντομα θα λάβεις ένα email και SMS με την επιβεβαίωση της παραγγελίας σου. Θα έχεις ενημέρωση για όλη την πορεία της παραγγελίας σου.
          </Text>
          <Button
            // variant={"outline"}
            w={"100%"}
            mt={"10"}
            colorScheme="primary"
            onClick={() => {
              router.push(`/order-tracking?orderId=${order.id}&email=${order.billing.email}`)
            }}
          >
            Πορεία Παραγγελίας
          </Button>
        </Container>
      </Stack>
    </>
  );
};

interface DetailCardProps {
 title: string
 value: string
 variant?: "normal" | "bold" 
 description?: string
}
const DetailCard:FC<DetailCardProps> = ({ title, value, variant="normal", description }) => {
  return (
    <Stack spacing="1">
      <HStack justify={"space-between"}>
        <Text
          flex="1"
          noOfLines={1} 
          fontWeight={variant === "bold" ? "bold" : "normal"}
        >{title}</Text>
        <Text fontWeight={variant === "bold" ? "bold" : "normal"} textAlign={"right"}>{value}</Text>
      </HStack>
      {description && <Text color="GrayText" fontSize={14}>{description}</Text>}
    </Stack>
  )
}

interface AccordionItemWrapperProps {
  title: string
  value?: string
} 
const AccordionItemWrapper:FC<AccordionItemWrapperProps> = ({ title, value, children }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          px="1"
          variant="ghost"
          _focus={{ outline: "none", boxShadow: "none" }}
        >
          <HStack flex="1" textAlign="left">
            <Text>{title}</Text>
            <AccordionIcon />
          </HStack>
          {!!value && <Box>
            <Text textAlign={"right"}>{value}</Text>
          </Box>}
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}
