import React, { FC, useState } from 'react';
import { Box, Stack, Wrap, Heading, Text, Button } from '@chakra-ui/react';
import { BsGrid } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
import FilterBar from './FilterBar';
import useChakraScreenSize from 'hooks/useChakraScreenSize';

interface Props {
  title: string
  description: string
  count: number
  view: "list" | "grid"
  onChangeView?: (value: "list" | "grid") => void 
  onModal?: any
}
const CategoryPageHeader:FC<Props> = ({ title: categoryName, view, description, count, onChangeView, onModal }) => {
  const screenSize = useChakraScreenSize();
  // const { isOpen, onModalOpen, onModalClose} = useSpringModal();

  return (
    <Box bg="white" px="2" py="1" mb="2" pb="2">
      <Stack mx="2" pb="1" my="4">
        <Wrap justify="space-between">
          <Heading as="h1" fontSize="x-large" fontWeight="semibold">{categoryName}</Heading>
          
          {/* Translations:: 'Φίλτρα' --> 'Filter' */}
          {/* Note: Only show button in mobile view */}
          {screenSize === "mobile" && <Button 
            variant="outline"
            onClick={onModal}
          >Φίλτρα</Button>}
        </Wrap>
        <Text fontSize="16">{description}</Text>
      </Stack>
      <FilterBar 
        count={count}  
        view={view}
        viewOptions={[
          {
            label: "grid",
            icon: BsGrid,
            aria_label: "Align right",
            value: "grid"
          },
          {
            label: "list",
            icon: FaListUl,
            aria_label: "Align left",
            value: "list"
          }
        ]} 
        onChangeView={(value: "list" | "grid") => onChangeView(value)}
      />
    </Box>
  )
}

export default CategoryPageHeader
