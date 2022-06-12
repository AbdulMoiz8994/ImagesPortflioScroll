import React from 'react';
import { HStack, Icon, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsBagCheckFill } from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';

const CartCashSteps = () => {
  const router = useRouter();

  return (
    <HStack>
      <Icon 
        as={BsBagCheckFill} 
        color="white" 
        fontSize="30px"
        cursor="pointer"
        userSelect="none" 
        onClick={() => router.push("/cart")} 
      />
      <Divider orientation='horizontal' w={{ base: "5", sm: "16", md: "28" }} variant="solid" />
      <Icon 
        as={FaClipboardList} 
        color="primary.100" 
        fontSize="32px" 
        cursor="pointer"
        userSelect="none"
      />
    </HStack>
  )
}

export default CartCashSteps
