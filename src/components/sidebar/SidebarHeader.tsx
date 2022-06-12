import React, { FC } from 'react';
import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import Router from 'next/router';
import { HiChevronLeft } from 'react-icons/hi';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link'

interface Props {
  categoryName: string
}
const SidebarHeader:FC<Props> = ({ categoryName }) => {
  const handleBack = () => {
    // Router.back();
  };

  return (
    <Box fontSize="sm" w="full" bg="white" px="2" py="4" rounded="lg">
      <HStack justify="space-between" w="full">
        {/* <HStack cursor="pointer" userSelect="none" spacing={0} onClick={() => router.replace("/")} > */}
        {categoryName && <Link href={"/"} passHref>
          <HStack as="a" cursor="pointer" userSelect="none" spacing={0} onClick={handleBack} >
            <Icon fontSize="20" as={HiChevronLeft} />
            <Text fontSize="inherit" color="black" >
              <FormattedMessage 
                id="categoryPage.back"
                defaultMessage="Back"
              />
            </Text>
          </HStack>
        </Link>}
        {categoryName && <HStack pr="5">
          <Text color="black" fontSize="sm">{categoryName}</Text>
        </HStack>}
      </HStack>
    </Box>
  )
}

export default SidebarHeader
