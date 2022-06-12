import React, { useEffect, useState, FC, useRef } from 'react';
import { Input as ChakraInput, Box, HStack, Button, InputGroup, InputRightElement, Icon } from '@chakra-ui/react'
import { FaCross, FaSearch } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri'
import { MdOutlineClose } from 'react-icons/md'
import { connectSearchBox } from 'react-instantsearch-dom';
import { SearchResultHits } from './SearchResultHits';
import Router from 'next/router';

const Search: FC<any> = ({ currentRefinement, isSearchStalled, refine }) => {
  const [query, setQuery] = useState('');
  const searchBoxRef = useRef<any>()
  useEffect(() => {
    refine(query);
  }, [query])
  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (query && searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setQuery('')
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [query])            
  return (
    <Box ml="3" flex="1" mr="8" position="relative">
      <InputGroup>
        <ChakraInput
          bg="#f9f9f9"
          placeholder="Αναζήση προϊόντων"
          _placeholder={{ fontSize: { base: "14", md: "16" } }}
          rounded="md"
          _focus={{ borderColor: "#FD5A89", outline: "none" }}
          size="lg"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        {query ? <InputRightElement
          h="full"
          children={
            <Icon cursor="pointer" userSelect="none" onClick={() => setQuery('')} as={MdOutlineClose} fontSize="20" mr="6" color="gray" />
          }
        /> : <InputRightElement
          h="full"
          children={
            <Icon as={FaSearch} fontSize="20" mr="6" color="gray" />
          }
        />}
      </InputGroup>
      <div ref={searchBoxRef}>
        {query &&
          <Box position="absolute" mt="1" w="full" bg="#f9f9f9" border="0.5px" rounded="md" shadow="base" p="2">
            <SearchResultHits
              onSubmit={(link: string) => {
                setQuery('')
                // Router.push(link);
              }}
            />
          </Box>
        }
      </div>
    </Box>
  );
};

export default connectSearchBox(Search);
