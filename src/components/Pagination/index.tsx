import React, { FC, ChangeEvent, useEffect, useState } from "react";
import {
  Grid,
  Center,
  Select,
  ButtonProps,
  Text,
  Button,
  ChakraProvider
} from "@chakra-ui/react";
import {
  Paginator,
  Container,
  Previous,
  usePaginator,
  Next,
  PageGroup
} from "chakra-paginator";
import { useRouter } from "next/router";

const fetchPokemons = (pageSize: number, offset: number) => {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
  ).then((res) => res.json());
};

interface Props {
  totalItems: number
}

const Pagination: FC<Props> = ({ totalItems }) => {
  const router = useRouter();
  
  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    isDisabled,
    pagesQuantity,
    // currentPage,
    // setCurrentPage,
    pageSize,
    offset // you may not need this most of the times, but it's returned for you anyway
  } = usePaginator({
    total: totalItems,
    initialState: {
      pageSize: 36,
      currentPage: 1,
      isDisabled: false
    }
  });

  // styles
  const baseStyles: ButtonProps = {
    w: 7,
    fontSize: "sm"
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: "gray.200"
    },
    // bg: "gray.300",
    bg: "white",
    color: '#292929'
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: "#f35c75"
    },
    // bg: "#e35453", // ---> myventema
    bg: "#e25452", // ---> sfkshop
    color: "white",
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    // bg: "green.200"
    // bg: "#e35453"
  };

  // handlers
  const handlePageChange = (nextPage: number) => {
    // -> request new data using the page number
    // setCurrentPage(nextPage);
    if (nextPage === 1) {
        router.push({
          pathname: "/[category]",
          query: { category: router.query.category }
        })
  
        return;
      }
      router.push({
        pathname: "/[category]/page/[pageNumber]",
        query: {
          ...router.query,
          pageNumber: nextPage
        }
      })
  };

  return (
    <ChakraProvider>
      <Paginator
        isDisabled={isDisabled}
        activeStyles={activeStyles}
        innerLimit={innerLimit}
        currentPage={Number(router.query?.pageNumber) || 1}
        outerLimit={outerLimit}
        normalStyles={normalStyles}
        separatorStyles={separatorStyles}
        pagesQuantity={pagesQuantity}
        onPageChange={handlePageChange}
      >
        <Container align="center" justify="space-between" w="full" p={4}>
          <Previous>
            Previous
            {/* Or an icon from `react-icons` */}
          </Previous>
          <PageGroup isInline align="center" />
          <Next colorScheme="gray">
            Next
            {/* Or an icon from `react-icons` */}
          </Next>
        </Container>
      </Paginator>
    </ChakraProvider>
  );
};

export default Pagination;