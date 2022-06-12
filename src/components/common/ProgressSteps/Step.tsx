import { Box, Circle, useColorModeValue, Text, Stack, CircularProgressProps, useBreakpointValue } from '@chakra-ui/react'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import * as React from 'react'
import { useRef } from 'react'

interface StepProps {
  state: 'active' | 'complete' | 'incomplete'
  label?: string
  children?: React.ReactNode
  onClick?: () => void
  index?: number
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>((props, ref) => {
  const { label, index, children, state, onClick } = props
  const isCompleted = state === 'complete'
  const isIncompleted = state === 'incomplete'
  const checkRef = useRef(null);

  const inCompletedColor = useColorModeValue('gray.600', 'gray.300')
  const defaultColor = useColorModeValue('white', 'gray.900')
  // const completedBg = useColorModeValue('blue.500', 'blue.300')
  const completedBg = useColorModeValue('primary.100', 'blue.300')
  const incompletedBg = useColorModeValue('white', 'gray.600')
  const screenSize = useBreakpointValue({ base: "mobile", md: "desktop" })

  return (
    <Stack>
      {/* {isCompleted ?
        <Text>{label}</Text> :
        <Text>{"che"}</Text>} */}
      {screenSize === "mobile" ? <Box>
        {index === 1 ? <Text h="1.5rem">Checking</Text> : <Text h="1.5rem">{""}</Text>}
      </Box> : <Box>
        <Text h="1.5rem">{label}</Text>  
      </Box>}
      <Box display="flex" position="relative"  justifyContent="center" alignItems="center">
        {index !== 2 ? <>
          {/* <Box w="30%" bg="white" zIndex={index !== 0 && index !== 2 ? 0 : 1} h={checkRef.current.offsetHeight}>{""}</Box> */}
          <Box w="30%" bg="#f7f7f7" zIndex={index !== 0 && index !== 2 ? 0 : 1} h={checkRef?.current?.offsetHeight}>{""}</Box>
          <Box w="70%" as="li" display="inline-flex">
            <Circle
              ref={checkRef}
              cursor="default"
              aria-hidden
              zIndex={1}
              position="relative"
              size="8"
              bg={isCompleted ? completedBg : incompletedBg}
              border="1px"
              borderColor="gray.300"
              >
                <Box as="span" color={isIncompleted ? inCompletedColor : defaultColor} fontWeight="bold">
                  {children}
                </Box>
            </Circle>
            <Box srOnly>{isCompleted ? `${label} - Completed` : label}</Box>
          </Box>
        </> : <>
          <Box w="70%" as="li" display="inline-flex" >
            <Circle
              ml="auto"
              ref={checkRef}
              cursor="default"
              aria-hidden
              zIndex={1}
              position="relative"
              size="8"
              bg={isCompleted ? completedBg : incompletedBg}
              border="1px"
              borderColor="gray.300"
              >
                <Box as="span" color={isIncompleted ? inCompletedColor : defaultColor} fontWeight="bold">
                  {children}
                </Box>
            </Circle>
            <Box srOnly>{isCompleted ? `${label} - Completed` : label}</Box>
          </Box>
          {/* <Box w="30%" bg="white"  zIndex={1} h={checkRef.current.offsetHeight}>{""}</Box> */}
          <Box w="30%" bg="#f7f7f7"  zIndex={1} h={checkRef?.current?.offsetHeight}>{""}</Box>
        </>}
      </Box>
    </Stack>
  )
})
