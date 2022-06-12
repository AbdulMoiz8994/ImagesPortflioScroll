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
import { FormattedMessage } from "react-intl";

interface Props {
  totalItems?: number
  perPage: number
  onPageChange?: (nextPage) => void
  currentPage?: number
  noOfPages?: number
}

const Pagination2: FC<Props> = ({ noOfPages, currentPage, totalItems, perPage, onPageChange }) => {
  const router = useRouter();
  
  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  // console.log({ totalItems, perPage })

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
      pageSize: perPage,
      currentPage,
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
  };

  return (
    <ChakraProvider>
      <Paginator
        isDisabled={isDisabled}
        activeStyles={activeStyles}
        innerLimit={innerLimit}
        currentPage={currentPage}
        outerLimit={outerLimit}
        normalStyles={normalStyles}
        separatorStyles={separatorStyles}
        pagesQuantity={noOfPages || pagesQuantity}
        onPageChange={onPageChange}
      >
        <Container align="center" justify="space-between" w="full" p={4}>
          <Previous>
            <FormattedMessage 
              id="categoryPage.previous"
              defaultMessage="Previous"
            />
            {/* Or an icon from `react-icons` */}
          </Previous>
          <PageGroup isInline align="center" />
          <Next colorScheme="gray">
            <FormattedMessage 
              id="categoryPage.next"
              defaultMessage="Next"
            />
            {/* Or an icon from `react-icons` */}
          </Next>
        </Container>
      </Paginator>
    </ChakraProvider>
  );
};

export default Pagination2;