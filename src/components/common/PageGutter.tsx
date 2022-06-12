import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {}
const PageGutter = ({ ...restProps }) => {
  return (
    <Box pt={{ base: "3", md: "20"}} {...restProps} />
  )
}

export default PageGutter
