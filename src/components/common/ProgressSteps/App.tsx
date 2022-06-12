import { Box, Flex, Text, Stack, useBreakpoint, useBreakpointValue } from '@chakra-ui/react'
import * as React from 'react'
import { Progressbar } from './ProgressBar'
import { Step } from './Step'
import { useProgressState } from './useProgressState'
import steps from './data.json'
import StepLabel from './StepLabel'
import { useEffect } from 'react'
import { useState } from 'react'

export const App = () => {
  const { value, getState, onClick } = useProgressState(steps);
  // const [progressbarWidth, setProgressbarWidth] = useState(0);
  const breakpoints = useBreakpoint();
  // const [clientSide, setClientSide] = useState(false)


  // const sectionRefs = React.useMemo(
  //   () => steps.map(()=> React.createRef<HTMLDivElement>()),
  // []);

  // console.log({ sectionRefs, runing: 'runing' });

  // useEffect(() => {
  //   console.log("checing")
  // }, [breakpoints])
    // useEffect(() => {
    //   if (typeof window !== undefined) {
    //     setClientSide(true);
    //   }
    // }, [])
    // console.log(typeof window !== undefined);

  // useEffect(() => {
  //   let start: number = 0;
  //   let end: number = 0;
  //   if (sectionRefs?.[0]?.current) {
  //     const distance = sectionRefs[0].current.getBoundingClientRect();
  //     // console.log({ distance });
  //     start = distance.left;
  //   }
  //   if (sectionRefs?.[2]?.current) {
  //     const distance = sectionRefs[2].current.getBoundingClientRect();
  //     // console.log({ distance });
  //     end = distance.left;
  //   }

  //   console.log({ start, end })
  //   setProgressbarWidth(end - start);
  // // }, [breakpoints])
  // // }, [window.innerWidth])
  // }, [clientSide && window.innerWidth])
    
  return (
    <Box mx="auto" maxW="4xl" py="10" px={{ base: '6', md: '8' }}>
      <Box as="nav" aria-label="Steps" position="relative">
        <Flex justify="space-between" align="center" as="ol" listStyleType="none" zIndex={1}>
          {steps.map((step, index) => (
            // <Step ref={sectionRefs[index]} label={step.label} key={index} index={index} state={getState(index)} onClick={onClick(index)}>
            <Step label={step.label} key={index} index={index} state={getState(index)} onClick={onClick(index)}>
              {index + 1}
            </Step>
          ))}
        </Flex>
        <Progressbar value={value} width={"98%"} />
      </Box>
    </Box>
  )
}
