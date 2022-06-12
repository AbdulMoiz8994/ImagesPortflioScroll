import { useBreakpointValue } from "@chakra-ui/react";

const useChakraScreenSize = () => {
  const screenSize = useBreakpointValue({ base: 'mobile', lg: 'desktop' });

  return screenSize
}

export default useChakraScreenSize
