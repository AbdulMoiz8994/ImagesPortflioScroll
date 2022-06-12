import React from 'react'

import { Heading, Grid, Box, Wrap, WrapItem } from '@chakra-ui/layout'
import ReactImageGallery from 'layouts/ReactImageGallery'
import ShortDescriptionSection from './ShortDescriptionSection'
import DetailWidget from './DetailWidget'

const HeroSection = ({ product, onNameChange, productVariations, onChangeProductVariation, loading }) => {
  return (
    <Wrap spacing={{ base: "3", md: "6" }} py="4" px="4" w="full" direction={{ base: "column", md: "row"}}>
      <WrapItem w={{ base: "full", md: "30rem"}}>
        <ReactImageGallery loading={loading} product={product} />
      </WrapItem>
      <WrapItem flex="1" minW={{ base: "full", md: "20rem"}}>
        <ShortDescriptionSection 
          loading={loading}
          product={product}
          onNameChange={onNameChange}
          productVariations={productVariations} 
          onChangeProductVariation={onChangeProductVariation}
        />
      </WrapItem>
      <WrapItem w={{ base: "full", md: "18rem"}}>
        <DetailWidget product={product} />
      </WrapItem>
    </Wrap>
  )
}

export default HeroSection