import React, { useEffect, useState } from 'react'
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
import Link from 'next/link'
import { HStack, Icon, Text, useBreakpointValue } from '@chakra-ui/react';
import { cookiesPopupZIndex } from 'site-settings/site-zIndexes';
import { Heading, Stack } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md';
import { GDPR } from 'site-settings/site-navigation';
import { gdprCookiesName, googleTagManagerKey } from 'site-settings/site-credentials';
import TagManager from "react-gtm-module"

const CookiesPopup = ({ onAccept, onDecline }) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const isAlreadyAvailable = getCookieConsentValue(gdprCookiesName);
    if (!isAlreadyAvailable) {
      setShow(true) 
      return;
    }
    
    setShow(false);
    TagManager.initialize({ gtmId: googleTagManagerKey });
  }, []);


  const mainStyle = {
    background: "#FFF", 
    color: '#2E343E', 
    padding: isMobile ? '6px' : '10px',
    width: isMobile ? '100%' : '26rem',
    right: "0",
    left: "100",
    zIndex: cookiesPopupZIndex,
    border: '1px solid black',
    borderRadius: '10px',
    margin: isMobile ? '0px' : '8px',
    boxShadow: '0 0 5px gray'
  }
  const acceptButtonStyle = {
    fontSize: isMobile ? "17px" : "20px", 
    borderRadius: '4px', 
    color: 'white', 
    backgroundColor: '#292929', 
    fontWeight: 'bold',
    order: 1
  }
  const declineButtonStyle = {
    fontSize: isMobile ? '17px' : '20px', 
    borderRadius: '4px', 
    backgroundColor: '#E6E6E6', 
    color: '#2E343E',
    order: 2
  }

  return (
    <CookieConsent
      visible={show ? "show" : "hidden"}
      location="bottom"
      enableDeclineButton
      buttonText="Αποδοχή"
      declineButtonText="Απόρριψη"
      cookieName={gdprCookiesName}
      style={mainStyle}
      buttonStyle={acceptButtonStyle}
      declineButtonStyle={declineButtonStyle}
      flipButtons
      expires={150}
      onAccept={() => {
        setShow(false)
        // onAccept();
        TagManager.initialize({ gtmId: googleTagManagerKey });
      }}
      onDecline={onDecline}
      debug={true}
    >
      <Stack>
        <HStack justify="space-between">
          <Stack flex="1">
            <Heading fontSize="20">Χρησιμοποιούμε cookies!</Heading>
            <Text fontSize="14">Για να σου προσφέρουμε προσωποποιημένη εμπειρία περιήγησης.
              <Link href={GDPR.href}>
                <a>
                  <Text ml="2" as="span">Περισσότερα</Text>
                </a>
              </Link>
            </Text>
          </Stack>
          <Icon cursor="pointer" userSelect="none" onClick={() => setShow(false)} alignSelf="flex-start" fontSize="26" w="10%" as={MdClose} />
        </HStack>
      </Stack>
    </CookieConsent>
  )
}

export default CookiesPopup