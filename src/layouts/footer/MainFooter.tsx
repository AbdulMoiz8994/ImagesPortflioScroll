import { Box, Container, Divider, Heading, Stack, Wrap, Text, HStack, Icon, SimpleGrid, Flex, Center, useColorModeValue as mode, Spacer, } from '@chakra-ui/react'
import React from 'react'
import { FaCalculator, FaHeart } from 'react-icons/fa'
import { IoCall } from 'react-icons/io5'
import { FcCallback } from 'react-icons/fc'
import { MdCall, MdEmail } from 'react-icons/md'
import { RiMapPinFill } from 'react-icons/ri'
import { useContext } from 'react';
import { BiGitCompare } from 'react-icons/bi';
import { FaShippingFast } from 'react-icons/fa';
import { GiReturnArrow } from 'react-icons/gi';
import { MdSecurity } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaTwitter, 
  FaPhoneAlt, 
  FaSpotify, 
  FaYoutube, 
  FaPinterest, 
  FaCcVisa,
  FaCcMastercard,
  FaCcStripe,
  FaApplePay
} from 'react-icons/fa';
import { SiAmericanexpress, SiGooglepay } from 'react-icons/si'
import { AiOutlineMail } from 'react-icons/ai';
import Link from 'next/link';

import { SHIPPING_METHODS_MENU_ITEM, PAYMENT_METHODS_MENU_ITEM, RETURNS_AND_GUARANTEES_MENU_ITEM, ORDER_PROCESS_MENU_ITEM, HELP_MENU_ITEM, SERVICES_MENU_ITEM, CONTACT_MENU_ITEM, FAQ_MENU_ITEM, ORDER_TRACKING_MENU_ITEM, TECHNICAL_ASSISTANCE_MENU_ITEM, SPARE_PARTS_MENU_ITEM, BRANDS_MENU_ITEM, BRANDS } from 'site-settings/site-navigation';
import SkroutzBadge from 'features/skroutz-badge/badge'
import { FormattedMessage } from 'react-intl'

interface PaymentLink {
  label: string
  icon: React.ReactElement
  href: string
}

export const paymentsLinks: PaymentLink[] = [
  { label: "Visa", icon: <FaCcVisa size="35" />, href: "#" },
  { label: "ApplePay", icon: <FaApplePay size="35" />, href: "#" },
  { label: "MasterCard", icon: <FaCcMastercard size="35" />, href: "#" },
  { label: "AmericanExpress", icon: <SiAmericanexpress size="28" height="10" />, href: "#" },
  { label: "GooglePay", icon: <SiGooglepay size="35" />, href: "#" },
  { label: "Stripe", icon: <FaCcStripe size="35" />, href: "#" },
]

const MainFooter = () => {
  return (
    <Box justify="center" mx="2" p="5">
      {/* Read only - Icons section  */}
      <Box w="full" mx="20" ml="auto" my="5" bg="white" rounded="xl">
        <Container maxW="container.xl" centerContent>
          <Wrap direction={{ base: "column", md: "row" }} align="center" justify="space-evenly" w="full" p="4" spacing={5}>
              <Stack justify="center" align="center">
                <Icon 
                    as={FaShippingFast} 
                    fontSize="2xl"
                    _hover={{
                      transform: 'skewX(-10deg)'
                    }}
                    transition="all .3s" 
                />
                <Text>
                  <FormattedMessage 
                    id="footer.shippingPrice"
                    defaultMessage="Shipping 3.5 €"
                  />
                </Text>
              </Stack>
              <Stack justify="center" align="center">
                <Icon 
                    as={GiReturnArrow} 
                    fontSize="2xl"
                    _hover={{
                      transform: 'rotate(20deg) scale(1.05)',
                    }}
                    transition="all .3s" 
                />
                <Text>
                  <FormattedMessage 
                    id="footer.doa"
                    defaultMessage="DOA Guarantee"
                  />
                </Text>
              </Stack>
              <Stack justify="center" align="center">
                <Icon 
                    as={RiCustomerService2Fill} 
                    fontSize="2xl" 
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                    transition="all .3s"   
                />
                <Text>
                  <FormattedMessage 
                    id="footer.freeSupport"
                    defaultMessage="Free Support"
                  />
                </Text>
              </Stack>
              <Stack justify="center" align="center">
                <Icon 
                    as={MdSecurity} 
                    fontSize="2xl"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                    transition="all .3s" 
                /> 
                <Text>
                  <FormattedMessage 
                    id="footer.secureTransactions"
                    defaultMessage="Secure Transactions"
                  />
                </Text>
              </Stack>
          </Wrap>
        </Container>
      </Box>

      {/* Navigation Section */}
      <Box mx="auto" w="full">
        <Box spacing="6" bg="white" p="5" rounded="xl" py={{ base: "8", md: "16" }}>
          <Wrap justify="center">
            <Box bg="primary.100" w={{ base: "full", md: "18rem" }} rounded="3xl">
              <OfficeInfoSection />
            </Box>
            <SimpleGrid columns={2}>
              <Box w={{ base: "full", md: "16rem" }}>
                <InformationSection />
              </Box>
              <Box w={{ base: "full", md: "16rem" }}>
                <SupportSection />
              </Box>
            </SimpleGrid>
            <Box w={{ base: "full", md: "16rem" }}>
              <SheduleSection />
            </Box>
          </Wrap>
        </Box>
          
        <Wrap my="4" w="max" mx='auto' justify="center" align="center" mb="2rem">
          <SkroutzBadge />
          <script src="https://scripts.bestprice.gr/badge.js" async></script><noscript><a href="https://www.bestprice.gr">BestPrice.gr</a></noscript>
          {/* <div className='bestprice__placeholder'>
            <div className='bestprice-badge bestprice-badge--partner'>
              <img width="144" height="64" src="https://scripts.bestprice.gr/4ecd5aabfa6031376bb519e0611cd60d.svg" alt="BestPrice Certification for undefined" />
            </div>
          </div> */}
        </Wrap>

        <SimpleGrid spacing="2" my="2" w="full" columns={{ base: 1, md: 2}} mb={{ base: "6rem", md: "0" }}>
          <Flex justify={{ base: "space-between", md: "inherit" }}>
            {paymentsLinks.map((link, idx) => (
              <Box color="gray.600" key={idx} cursor="pointer" _hover={{ transform: "scale(1.2)" }} transition="all .3s" my="auto" mx="2" >
                {link.icon}
              </Box>
            ))}
          </Flex>
          <Flex justify="flex-end" align="center">
            <Box>
              <Text>
                <Text as="span" mt="2">
                  Made with <Heart /> by SFKshop
                </Text> 
                &nbsp; // Copyright {new Date().getFullYear()} &copy; SFKshop
              </Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

const OfficeInfoSection = () => {
  return (
    <Stack px="6" py="10" spacing="8">
      <HStack w="full" justify="space-between">
        <Stack spacing="0">
          <Text color="white">
            <FormattedMessage 
              id="footer.callCenter"
              defaultMessage="Call Center"
            />  
          </Text>
          <Text color="black" fontWeight="semibold">
            <a href="tel:210 6421065">
              <FormattedMessage 
                id="footer.phoneNumber"
                defaultMessage="210 6421065"
              />
            </a>
          </Text>
        </Stack>
        <Icon color="white" fill="white" fontSize="24" as={IoCall} />
      </HStack>

      <HStack w="full" justify="space-between">
        <Stack spacing="0">
          <Text color="white">
            <FormattedMessage 
              id="footer.addressTitle"
              defaultMessage="Address"
            />
          </Text>
          <Text color="black" fontWeight="semibold">
            <FormattedMessage 
              id="footer.address"
              defaultMessage="Στεφ. Κουμανούδη 1, 11474"
            />  
          </Text>
        </Stack>
        <Icon color="white" fill="white" fontSize="24" as={RiMapPinFill} />
      </HStack>

      <HStack w="full" justify="space-between">
        <Stack spacing="0">
          <Text color="white">
            <FormattedMessage 
              id="footer.emailTitle"
              defaultMessage="E-mail"
            />  
          </Text>
          <Text color="black" fontWeight="semibold">
            <a href="mailto:info@bbshop.gr">
              <FormattedMessage 
                id="footer.emailAddress"
                defaultMessage="info@bbshop.gr"
              />  
            </a>
          </Text>
        </Stack>
        <Icon color="white" fill="white" fontSize="24" as={MdEmail} />
      </HStack>
    </Stack>
  )
}

const SheduleSection = () => {
  return (
    <Stack p="5">
      {/* <Text fontWeight="bold" fontSize="16" textTransform="uppercase" mb="2">Schedule</Text> */}
      <Text fontWeight="bold" fontSize="16" textTransform="uppercase" mb="2">
        <FormattedMessage 
          id="footer.ScheduleHeading"
          defaultMessage="Schedule"
        />  
      </Text>
      <Stack spacing="1">
        <HStack w="full" justify="space-between">
          <Text>
            <FormattedMessage 
              id="footer.Monday"
              defaultMessage="Monday"
            />
          </Text>
          <Text>10:00 - 17:00</Text>
        </HStack>
        <Divider />
        <HStack w="full" justify="space-between">
          <Text>
            <FormattedMessage 
              id="footer.Tuesday"
              defaultMessage="Tuesday"
            />
          </Text>
          <Text>10:00 - 17:00</Text>
        </HStack>
        <Divider />
        <HStack w="full" justify="space-between">
          <Text>
            <FormattedMessage 
              id="footer.Wednesday"
              defaultMessage="Wednesday"
            />
          </Text>
          <Text>10:00 - 17:00</Text>
        </HStack>
        <Divider />
        <HStack w="full" justify="space-between">
          <Text>
            <FormattedMessage 
              id="footer.Thursday"
              defaultMessage="Thursday"
            />
          </Text>
          <Text>10:00 - 17:00</Text>
        </HStack>
        <Divider />
        <HStack w="full" justify="space-between">
          <Text>
            <FormattedMessage 
              id="footer.Friday"
              defaultMessage="Friday"
            />  
          </Text>
          <Text>10:00 - 17:00</Text>
        </HStack>
        <Divider />
        <HStack color="primary.100" w="full" justify="space-between">
          <Text color="inherit">
            <FormattedMessage 
              id="footer.Saturday"
              defaultMessage="Saturday"
            />  
          </Text>
          <Text color="inherit">
            <FormattedMessage 
              id="footer.closed"
              defaultMessage="Closed"
            />  
          </Text>
        </HStack>
        <Divider />
        <HStack color="primary.100" w="full" justify="space-between">
          <Text color="inherit">
            <FormattedMessage 
              id="footer.Sunday"
              defaultMessage="Sunday"
            />    
          </Text>
          <Text color="inherit">
          <FormattedMessage 
              id="footer.closed"
              defaultMessage="Closed"
            />  </Text>
        </HStack>
      </Stack>
    </Stack>
  )
}

const InformationSection = () => {
  return (
    <Stack p="5">
      <Text fontWeight="bold" fontSize="16" textTransform="uppercase" mb="2" textAlign="left">
        <FormattedMessage 
          id="footer.InformationHeading"
          defaultMessage="Information"
        />
      </Text>
      <Stack spacing="2">
        <Text>
          <Link href={HELP_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={HELP_MENU_ITEM.id}
                defaultMessage={HELP_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href={FAQ_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={FAQ_MENU_ITEM.id}
                defaultMessage={FAQ_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href={BRANDS_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={BRANDS_MENU_ITEM.id}
                defaultMessage={BRANDS_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href={SERVICES_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={SERVICES_MENU_ITEM.id}
                defaultMessage={SERVICES_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        
        <Text>
          <Link href={ORDER_TRACKING_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={ORDER_TRACKING_MENU_ITEM.id}
                defaultMessage={ORDER_TRACKING_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href={SPARE_PARTS_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={SPARE_PARTS_MENU_ITEM.id}
                defaultMessage={SPARE_PARTS_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href="/prostasia-prosopikon-dedomenon-gdpr">
            <a>GDPR</a>
          </Link>
        </Text>
        <Text>
          <Link href="/oroi-xrisis">
            <a>
              <FormattedMessage 
                id="nav.terms"
                defaultMessage="Terms and Conditions"
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href="/theseis-ergasias">
            <a>
              Ευκαιρίες καριέρας
            </a>
          </Link>
        </Text>
      </Stack>
    </Stack>
  )
}

const SupportSection = () => {
  return (
    <Stack p="5">
      <Text fontWeight="bold" fontSize="16" textTransform="uppercase" mb="2">
        <FormattedMessage 
          id="footer.SupportHeading"
          defaultMessage="Support"
        />  
      </Text>
      <Stack spacing="2">
        <Text>
          <Link href={RETURNS_AND_GUARANTEES_MENU_ITEM.href}>
            {/* <a>{RETURNS_AND_GUARANTEES_MENU_ITEM.defaultMessage}</a> */}
            <a>
              <FormattedMessage 
                id={RETURNS_AND_GUARANTEES_MENU_ITEM.id}
                defaultMessage={RETURNS_AND_GUARANTEES_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href={PAYMENT_METHODS_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={PAYMENT_METHODS_MENU_ITEM.id}
                defaultMessage={PAYMENT_METHODS_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href={SHIPPING_METHODS_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={SHIPPING_METHODS_MENU_ITEM.id}
                defaultMessage={SHIPPING_METHODS_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href={ORDER_PROCESS_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={ORDER_PROCESS_MENU_ITEM.id}
                defaultMessage={ORDER_PROCESS_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href={TECHNICAL_ASSISTANCE_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={TECHNICAL_ASSISTANCE_MENU_ITEM.id}
                defaultMessage={TECHNICAL_ASSISTANCE_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href={CONTACT_MENU_ITEM.href}>
            <a>
              <FormattedMessage 
                id={CONTACT_MENU_ITEM.id}
                defaultMessage={CONTACT_MENU_ITEM.defaultMessage}
              />
            </a>
          </Link>
        </Text>
        <Text>
          <Link href="/asfaleia-agorwn">
            <a>
            Ασφάλεια Αγορών
            </a>
          </Link>
        </Text>
      </Stack>
    </Stack>
  )
}

const Heart = () => (
  <Box
    display="inline-block"
    mx="1"
    color={mode('primary.100', 'blue.300')}
    fontSize="xs"
    role="img"
    aria-label="Love"
    as={FaHeart}
  />
)

export default MainFooter
