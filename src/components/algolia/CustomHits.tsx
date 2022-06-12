import Loader from 'components/loader/loader';
import { ProductGrid } from 'components/product-grid/product-grid-three';
import { FC, useEffect, useState } from 'react';
import { Hit } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';
import { Container, Heading, Box, HStack, Image, Square, Stack, Text, Wrap, Button } from '@chakra-ui/react'
import NextImage from "next/image"
import ProductListCard from 'components/product-card/product-card-seven-list';

interface Props {
  hits: any
  pageType: any
  deviceType: any
  view?: "grid" | "list"
}

const Hits:FC<Props> = (props) => {
  const { hits, pageType, deviceType, view } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (hits.length > 0) {
      setLoading(false)
    }

    setTimeout(() => {
      setLoading(false)
    }, 10000);
  }, [hits])

  if (loading) return <Container centerContent w="full">
    <Loader />
  </Container>

  if (view === "list") return (
    <Stack>
      {hits.map((hit: any) => (
        <ProductListCard key={hit.id} data={hit} deviceType={deviceType} />
      ))}
    </Stack>
  )

  return (
    <ProductGrid 
      productsDataType="restapi" 
      data={hits} 
      type={pageType}
      deviceType={deviceType} 
    />
  );
}

export const CustomHits = connectHits(Hits);