import { IconButton } from '@chakra-ui/button'
import { IconButtonProps } from '@chakra-ui/react';
import { useComparison } from 'contexts/comparison/use-comparison';
import React, { useContext } from 'react'
import { BiGitCompare } from 'react-icons/bi'
// import ComparisonContext from '../../context/comparison/Context'
import BadgeButton from './BadgeIcon';

// export default function FloatButton({ children, ...restProps }) {
export default function FloatButton({ onHandleClick, ...restProps }) {
    // const { productIDs } = useContext(ComparisonContext)
    const { comparisonItemsCount } = useComparison();
    return (
        <IconButton
          onClick={onHandleClick}
          colorScheme="white" 
          shadow="base"
          position="fixed" 
          top="35%"
          border="1px"
          borderColor="gray.200"
          right="-1" 
          zIndex={20}
          size="lg"
          // icon={children} 
          icon={<BadgeButton Icon={BiGitCompare} count={comparisonItemsCount} />} 
          color="black"
          bg="white"
          aria-label="Compare Products"
          p="2"
          _hover={{
          transform: 'scale(1.02) translateX(-5%)'
          }}
          _active={{
          shadow: "dark-lg"
          }}
          {...restProps}
        />
    )
}