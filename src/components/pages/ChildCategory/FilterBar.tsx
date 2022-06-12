import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import { Box, Wrap, Text, TextProps, HStack, InputGroup, InputLeftElement, Icon, Input, Select } from '@chakra-ui/react'
import { BsGrid } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
import { CustomHitsPerPage } from 'components/algolia/CustomHitsPerPage'
import { CustomSortBy } from 'components/algolia/CustomSortBy'
import { useCategoryPage } from 'contexts/categoryPage/use-category'
import { ViewSwitch } from 'features/view-switch'
import { FormattedMessage, useIntl } from 'react-intl'

interface Props {
  count?: number
  bg?: string
  view?: string
  viewOptions?: any[]
  onChangeView?: (value: string) => void
}
const FilterBar:FC<Props> = ({ count, bg, onChangeView, view, viewOptions }) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(24)
  const { totalProducts } = useCategoryPage();
  const intl = useIntl();

  return (
    <Box bg={bg || "#f9f9f9"} as="section" w="full" py="3" px="5"  shadow="sm" rounded="md">
      <Wrap justify="space-between">
        <Wrap spacing="4" justify="space-between">
          <HStack>
            <TextWrapper fontWeight="bold">{totalProducts}</TextWrapper>
            <TextWrapper>
              <FormattedMessage 
                id="categoryPage.productsFound"
                defaultMessage="Products found"
              />
            </TextWrapper>
          </HStack>
        
          {/* INFO: Always provide number type values in items rather than string because algolia expects numbers */}
          <CustomHitsPerPage 
            defaultRefinement={itemsPerPage}
            items={[
              { value: totalProducts, label: `${intl.formatMessage({ id: 'categoryPage.all', defaultMessage: 'All' })} ${intl.formatMessage({ id: 'categoryPage.products', defaultMessage: 'products' })}` },
              { value: 24, label: `${intl.formatMessage({ id: 'categoryPage.show', defaultMessage: 'Show' })} 24 ${intl.formatMessage({ id: 'categoryPage.products', defaultMessage: 'products' })}` },
              { value: 48, label: `${intl.formatMessage({ id: 'categoryPage.show', defaultMessage: 'Show' })} 48 ${intl.formatMessage({ id: 'categoryPage.products', defaultMessage: 'products' })}` },
            ]}
            onChangeValue={(value: number) => setItemsPerPage(value)}
          />
        </Wrap>
        <Wrap>
          <CustomSortBy
            defaultRefinement="wc_rest_products"
            items={[
              { value: 'wc_rest_products', label: intl.formatMessage({ id: 'categoryPage.sortLatest', defaultMessage: 'Sort by Latest' }) },
              { value: 'wc_rest_products_price_asc', label: intl.formatMessage({ id: 'categoryPage.sortLowHighPrice', defaultMessage: 'Sort by price: Low to high' }) },
              { value: 'wc_rest_products_price_desc', label: intl.formatMessage({ id: 'categoryPage.sortHighLowPrice', defaultMessage: 'Sort by price: Hight to Low' }) },
            ]}
          />
          {viewOptions.length > 0 && <HStack pl="4" spacing="4">
            <Text fontSize="16" color="black">
              <FormattedMessage 
                id="categoryPage.view"
                defaultMessage="View"
              />  
            </Text>
            <ViewSwitch
              value={view} 
              onChange={(value) => onChangeView(value)}
              items={viewOptions}
            />
          </HStack>}
        </Wrap>
      </Wrap>
    </Box>
  )
}

interface TextWrapperProps extends TextProps {}
const TextWrapper:FC<TextWrapperProps> = ({ children, ...restProps}) => {
  return (
    <Text fontSize="md" color="black" {...restProps}>{children}</Text>
  )
}

export default FilterBar
