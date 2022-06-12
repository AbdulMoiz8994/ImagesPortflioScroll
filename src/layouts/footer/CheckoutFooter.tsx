import React from 'react';
import { Box, Stack, Container, Wrap, Square, Text, HStack } from '@chakra-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import { GDPR, HELP_MENU_ITEM, TERMS_AND_CONDITIONS, TERMS_AND_CONDITIONS_PAGE } from 'site-settings/site-navigation';
import { FormattedMessage } from 'react-intl';
import { siteURL } from 'site-settings/site-credentials';

const CheckoutFooter = () => {
  return (
    // <Stack w="full">
      <Box w="full" color="white" bg="#292929">
        <Container px={{ base: "16", sm: "14" }} maxW="1220px">
          <Wrap justify={{ base: 'center', md: 'inherit' }} spacing={{ base: "6", md:"16"}}>
            <Logo />
            <NavItems />
          </Wrap>
        </Container>
      </Box>
    // </Stack>
  )
};

function Logo() {
  return (
    <Box position="relative" w="32" h="16">
      <Image 
        src={`${siteURL}/wp-content/uploads/2020/11/sfkshop-logo-half-white-reduced.png`}
        layout="fill"
        objectFit='contain'
      />
    </Box>
  )
}

function NavItems() {
  return (
    <Stack spacing="4">
      <Text color="white" fontWeight="bold" letterSpacing="wider">Copyright {new Date().getFullYear()} © Made with ❤️ by SFKshop</Text>
      <HStack spacing="6">
        <Link href={TERMS_AND_CONDITIONS.href} passHref>
          {/* <Text as="a" color="inherit">{TERMS_AND_CONDITIONS.defaultMessage}</Text>             */}
          <Text as="a" color="inherit">
            <FormattedMessage 
              id="nav.terms"
              defaultMessage="Terms and Conditions"
            />
          </Text>            
        </Link>
        <Link href={GDPR.href} passHref>
          <Text as="a" color="inherit">{GDPR.defaultMessage}</Text>
        </Link>
        <Link href={HELP_MENU_ITEM.href} passHref>
          <Text as="a" color="inherit">
            <FormattedMessage 
              id={HELP_MENU_ITEM.id}
              defaultMessage={HELP_MENU_ITEM.defaultMessage}
            />
          </Text>
        </Link>
      </HStack>
    </Stack>
  )
}

export default CheckoutFooter;
