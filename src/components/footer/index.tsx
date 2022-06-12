import {
  Box,
  BoxProps,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
  Wrap,
} from '@chakra-ui/react'
import ImageNext from 'next/image';
import * as React from 'react'
import { FaHeart } from 'react-icons/fa'
import { SocialLink } from './SocialLink'
import { links, paymentsLinks, socialLinks } from './_data'
import { LinkGroup } from './LinkGroup'
import { useRef } from 'react';
import { useEffect } from 'react';
import store from 'store-js'
import Image from 'next/image';

import masterCartLogo from '../../assets/images/logo/mastercard-logo.png'
import visaLogo from '../../assets/images/logo/visa-logo.png'
import paypalLogo from '../../assets/images/logo/paypal-logo.jpg'
import skrillLogo from '../../assets/images/logo/skrill-logo.png'

interface Props extends BoxProps {}

const Footer = ({ ...restProps }: Props) => {
  // const footerRef = useRef(null);

  
  // useEffect(() => {
  //   console.log({ footerRef, check: footerRef.current.offsetTop });
  //   store.set("footer", footerRef.current.offsetTop );
  //   // localStorage.setItem("footer", { el: footerRef.current });
  // }, [])

  return (
    // <Box ref={footerRef} as="footer" color="white" px="10" bg={mode('secondary', 'gray.800')}>
    <Box position="relative" as="footer" color="black" px="10" bg={mode('#ffffff', 'gray.800')} {...restProps}>
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '16' }}
        pb={{ base: "44", md: "16"}}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
          // mb={{ base: '10', lg: '16' }}
          align="flex-start"
          id="top"
        >
          <SimpleGrid
            flex="1"
            w={{ base: 'full', lg: 'auto' }}
            maxW={{ lg: '8xl' }}
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: '12', md: '10' }}
            fontSize="sm"
          >
            {links.map((group, idx) => (
              <LinkGroup key={idx} data={group} />
            ))}
          </SimpleGrid>

        </Flex>

        <Box mt="10" px="12" borderTop="1px" borderColor="gray.200" bottom="0" left="0" right="0" position="absolute">
          <Wrap justify="space-between" w="full" align="center">
            <Text>Copyright &copy; {new Date().getFullYear()} <strong>RedQ.</strong> Inc ALl rights reserved</Text>
            <Wrap spacing="5" justify="center" align="center">
              <Image 
                src={masterCartLogo}
                width={40}
                height={25}
                layout="fixed"
              />
              <Image 
                src={visaLogo}
                width={40}
                height={20}
                layout="fixed"
              />
              <Image 
                src={paypalLogo}
                width={50}
                height={40}
                layout="fixed"
              />
              <Image 
                src={skrillLogo}
                width={50}
                height={25}
                layout="fixed"
              />
            </Wrap>
          </Wrap> 
        </Box>
      </Box>
    </Box>
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

export default Footer;
