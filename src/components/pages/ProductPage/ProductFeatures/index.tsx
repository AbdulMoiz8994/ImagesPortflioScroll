import React from 'react';
import { Box, Heading, Wrap, HStack, Divider, Stack, Text } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

const ProductFeatures = ({ product }) => {
  return (
    <Box px={{base: "5", md: "16"}} rounded="md" shadow="md" border="1px" borderColor="gray.100" w="full" mx="2" mb={10} py={20}>
      <Heading my={5} display="inline-block" fontSize="20" fontWeight="bold" as="h3"><FormattedMessage id="ProductPage.Features" defaultMessage="Features" />:</Heading><span><Text marginLeft={2} fontSize="20" display="inline-block" color="gray.400">{product.name}</Text></span>
      <hr></hr>
      <Wrap spacing="0px" flex="2" mt={10} lineHeight={10}>
        {(product.attributes && product.attributes.length > 0) && product.attributes.map((attribute, idx) => (
            <HStack key={idx} borderWidth="1px" w="100%" fontSize="16">
              <Box w="35%" textAlign="right" fontWeight="700"><Text>{attribute.name}</Text></Box>
              <Divider orientation="vertical" />
              <Stack w="65%" spacing={0}>
                  {attribute.options && attribute.options.length > 0 && attribute.options.map((option, idx) => (
                    <Text key={idx} py="0" mb="-1">{option}</Text>
                  ))}
              </Stack>
            </HStack>
        ))}
      </Wrap>
      {(!!product.dimensions['length'] || !!product.dimensions.width || !!product.dimensions.height) || !!product.weight && <Wrap borderWidth="1px" spacing="0px" flex="1" mt={10} lineHeight={10} bgColor="#f2f2f2" py={1} px={8}>
        <HStack w="100%" fontSize="18">
          <Box>Διαστάσεις</Box>
        </HStack>
      </Wrap>}
      {!!product.weight && <Wrap borderWidth="1px" spacing="0px" flex="2" mt={10} lineHeight={10}>
        <HStack w="100%" fontSize="16">
            <Box w="35%" textAlign="right" fontWeight="700"><Text>Βάρος</Text></Box>
            <Divider orientation="vertical" />
            <Box w="65%"><Text>{`${product.weight}kg`}</Text></Box>
        </HStack>
      </Wrap>}
  {(!!product.dimensions['length'] || !!product.dimensions.width || !!product.dimensions.height) &&
        <Wrap borderWidth="1px" borderTop="none" spacing="0px" flex="2" lineHeight={10} >
        <HStack w="100%" fontSize="16">
            <Box w="35%" textAlign="right" fontWeight="700"><Text>Διαστάσεις</Text></Box>
            <Divider orientation="vertical" />
            <Box w="65%"><Text>{product.dimensions['length'] && `${product.dimensions['length']}cm ×`} {product.dimensions.width && `${product.dimensions.width}cm ×`} {product.dimensions.height && `${product.dimensions.height}cm`}</Text></Box>
        </HStack>
      </Wrap>}
  </Box>
  )
}

export default ProductFeatures
