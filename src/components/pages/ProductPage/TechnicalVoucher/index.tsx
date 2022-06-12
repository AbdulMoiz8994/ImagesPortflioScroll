import React from 'react';
import { Box, Wrap, Stack, Heading, Text, HStack, Icon } from '@chakra-ui/react'
import { FaDownload } from 'react-icons/fa';
import AppDivider from 'components/common/AppDivider';

const TechnicalVoucher = ({ product }) => {
  return (
    <Box px={{base: "5", md: "16"}} rounded="md" shadow="md" border="1px" borderColor="gray.100" w="full" mx="2" mb={10} py={14}>
        <Wrap spacing={4} borderBottomWidth="1px" py="5" borderBottomColor="gray.300" justify="space-between">
          <Stack>
            <Heading size="sm" color="#51555a">Χρήσιμα Αρχεία</Heading>
          </Stack>

          <Stack w="full">
            {product.downloads.map((download: any, idx: number) => (
              <Stack spacing="4">
                <HStack justify="space-between" px="4">
                  <Heading size="sm" color="GrayText">{download.name}</Heading>
                  <HStack key={idx.toString()}  _hover={{ color: "white", bg:"black" }}  color="GrayText" align="center" justify="center" cursor="pointer" userSelect="none" px="5" py="2" border="1px" borderColor="gray.400">
                    <Icon mr="2" as={FaDownload} color="inherit" />
                    <Heading color="inherit" textTransform="uppercase" 
                      onClick={() => {
                        window.open(download.file)
                      }}  
                      size="sm">ΛΗΨΗ ΑΡΧΕΙΟΥ
                    </Heading>
                  </HStack>
                </HStack>
                {product.downloads.length !== idx + 1 && <AppDivider />}
              </Stack>
            ))}
          </Stack>
        </Wrap>
    </Box>
  )
}

export default TechnicalVoucher
