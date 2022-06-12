import React, { Fragment } from 'react'
import { Button, Heading, Icon, Input, Stack, Wrap } from '@chakra-ui/react'

import { Box as ChakraBox, HStack, Text, Checkbox } from '@chakra-ui/react'
import { FC } from 'react';
import Link from 'next/link';

import { CustomRefinementList } from 'components/algolia/CustomRefinementList';
import SubCategories from './SubCategories';
import AttributeFilters from './AttributeFilters';
import SidebarHeader from './SidebarHeader';
import { AlgoliaProps } from './props';

interface Props {
  subCategories?: any
  categoryName?: string
  category: any
  algolia: AlgoliaProps
}

const ChildCategory:FC<Props> = ({ categoryName, subCategories, algolia }) => {
  return (
    <ChakraBox color="black" w="100%">
      {/* Header */}
      {categoryName && <SidebarHeader categoryName={categoryName} />}

      <Stack spacing="4" bg="white" py="4" px="3" minH="75vh">
        <SubCategories 
          subCategories={subCategories}
        />

        <CustomRefinementList 
          defaultRefinement={algolia.defaultRefinement}
          attribute={algolia.attribute}  
          hidden={true}
        />


        {/* <CustomRefinementList 
          defaultRefinement={['true']}
          attribute="on_sale"  
          hidden={true}
        /> */}

        {/* INFO: If it is category page or has any category in its slug then use it otherwise not */}
        {/* {category?.slug && <CustomRefinementList 
          defaultRefinement={[category.slug]}
          attribute="categories.slug"  
          hidden={true}
        />} */}

        <AttributeFilters />
      </Stack>
    </ChakraBox>
  )
}

export default ChildCategory
