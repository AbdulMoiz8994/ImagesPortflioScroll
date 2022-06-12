import React, { useEffect, useState } from 'react'
import { getProductCostFromMetaData } from 'utils/products-utils'
import { Stack, Text , Wrap, HStack, Input, Icon, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaEquals, FaPercentage, FaTimes } from 'react-icons/fa';
import currencyFormatter from 'currency-formatter';
import { FormattedMessage } from 'react-intl';

const CostOfGood = ({ product }) => {
  const [percentage, setPercentage] = useState("30")
  const [cost, setCost] = useState("");
  const [minSellingPrice, setMinSellingPrice] = useState("");

  useEffect(() => { 
    const metaItem = getProductCostFromMetaData(product.meta_data, product.type);
    setCost(metaItem?.value || "");
  }, [product]);

  useEffect(() => {
    if (percentage && cost) {
      const calculatePercentage = parseFloat(percentage) / 100;
      const multiple = parseFloat(cost) * calculatePercentage;
      setMinSellingPrice(currencyFormatter.format(parseFloat(cost) + multiple, {}));
    }
  }, [percentage, cost])

  if (!cost) return null;
  return (
    <Stack fontSize="lg">
      <Text fontSize="inherit" fontWeight="bold">
        <FormattedMessage id="ProductPage.costofGoodsTitle" defaultMessage="Cost of Goods Calculator" />  
      </Text>
      <Stack>
        <Wrap>
          <Text fontSize="inherit"><FormattedMessage id="ProductPage.costofGoods" defaultMessage="Cost of Goods" /> = </Text>
          <Text fontSize="inherit" fontWeight="semibold" color="green">{cost} €</Text>
        </Wrap>
        <Wrap align="center">
          <Text fontSize="inherit"><FormattedMessage id="ProductPage.lowestPrice" defaultMessage="Lowest Price" /></Text>
          <HStack>
            <Icon color="blue.500" as={FaTimes} />
            <HStack spacing="0">
              <InputGroup size="md">
                <Input type="number" value={percentage} textAlign="center" onChange={(e) => setPercentage(e.currentTarget.value)} variant="filled" fontSize="inherit" fontWeight="semibold" color="blue.500" maxW="24" />
                <InputRightElement alignItems="center" children={<Icon size="2xl" color="blue.500" as={FaPercentage} />} />
              </InputGroup>
            </HStack>
            <HStack>
              <Icon color="blue.500" as={FaEquals} />
              <Text fontSize="2xl" fontWeight="semibold" color="blue.500">{minSellingPrice} €</Text>
            </HStack>
          </HStack>
        </Wrap>
      </Stack>
    </Stack>
  )
}

export default CostOfGood