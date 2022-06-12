import React, { useEffect, useState, FC } from "react";
import {
  Box,
  InputGroup,
  InputRightElement,
  Icon,
  Input,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { connectSearchBox } from "react-instantsearch-dom";
import { SearchResultHits } from "./SearchResultHits";
import Router from "next/router";

const Search: FC<any> = ({ currentRefinement, isSearchStalled, refine }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    refine(query);
  }, [query]);

  return (
    <Box position="relative">
      <InputGroup>
        <Input
          borderColor="gray.200"
          bg="#F9F9F9"
          rounded="full"
          type="text"
          placeholder="Αναζήτηση Προϊόντων" // Translations:: 'Αναζήτηση Προϊόντων' --> Search...
          value={query}
          onChange={e => setQuery(e.currentTarget.value)}
        />
        {query ? (
          <InputRightElement
            h="full"
            children={
              <Icon
                cursor="pointer"
                userSelect="none"
                onClick={() => setQuery("")}
                as={MdOutlineClose}
                fontSize="20"
                mr="6"
                color="gray"
              />
            }
          />
        ) : (
          <InputRightElement
            h="full"
            children={<Icon as={FaSearch} fontSize="16" mr="6" color="gray" />}
          />
        )}
      </InputGroup>

      {query && (
        <Box
          maxH="85vh"
          h="max"
          overflowY="auto"
          mt="1"
          w="full"
          bg="#f9f9f9"
          border="0.5px"
          rounded="md"
          shadow="base"
          p="2"
        >
          <Box>
            <SearchResultHits
              onSubmit={(link: string) => {
                setQuery("");
                Router.replace(link);
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default connectSearchBox(Search);
