import React, { useRef } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Icon,
  HStack,
  Image,
  Square,
  useBreakpointValue
} from "@chakra-ui/react"
import { MdClose } from 'react-icons/md';
import Logo from 'layouts/logo/logo';
// import LogoImage from 'assets/images/logo/logo-transparent.png.png';
import LogoImage from 'assets/images/logo/logo-transparent.png';

const ChakraDrawer = ({ isOpen, onClose, children }) => {
  const btnRef = useRef()
  const screenSize = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={screenSize === "mobile" ? "xs" : "sm"}
      >
        <DrawerOverlay />
        <DrawerContent bg="#f9f9f9">
          <DrawerHeader position="relative">
            <HStack align="center" justify="flex-start" pt="6">
              <Image
                w="8rem"
                src={LogoImage}
                alt={'Shop Logo'}
              />
              <Icon position="absolute" right="10" cursor="pointer" userSelect="none" onClick={() => onClose()} as={MdClose} fontSize="24" />
            </HStack>
          </DrawerHeader>

          {/* <DrawerBody my="4"> */}
          <DrawerBody>
            <div>
              {children}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ChakraDrawer