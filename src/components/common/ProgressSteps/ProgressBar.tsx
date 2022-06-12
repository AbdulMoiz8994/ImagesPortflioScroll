import { AbsoluteCenter, AbsoluteCenterProps, Box, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

interface ProgressbarProps extends AbsoluteCenterProps {
  value: number
}

export const Progressbar = (props: ProgressbarProps) => {
  const { value, ...rest } = props
  return (
    <AbsoluteCenter
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-valuetext={`Progress: ${value}%`}
      position="absolute"
      top="75%"
      height="2"
      axis="vertical"
      bg={useColorModeValue('white', 'gray.700')}
      // width="85%"
      // width="83%"
      // width="75%"
      // width="667.1875px"
      mx="auto"
      right="-3"
      left="0"
      {...rest}
    >
      {/* <Box bg={useColorModeValue('blue.500', 'blue.300')} height="inherit" width={`${value}%`} /> */}
      <Box bg={useColorModeValue('blue.500', 'blue.300')} height="inherit" width={`${value}%`} />
    </AbsoluteCenter>
  )
}
