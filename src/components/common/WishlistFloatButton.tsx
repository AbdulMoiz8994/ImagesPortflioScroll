import { IconButton } from '@chakra-ui/button'
import { IconButtonProps } from '@chakra-ui/react';
import { useComparison } from 'contexts/comparison/use-comparison';
import { useWishlist } from 'contexts/wishlist/use-wishlist';
import router from 'next/router';
import React, { useContext } from 'react'
import { BiGitCompare } from 'react-icons/bi'
import { BsFillHeartFill } from 'react-icons/bs';
// import ComparisonContext from '../../context/comparison/Context'
import BadgeButton from './BadgeIcon';

// export default function FloatButton({ children, ...restProps }) {
export default function WishlistFloatButton({ ...restProps }) {
    // const { productIDs } = useContext(ComparisonContext)
    const { wishlistItemsCount } = useWishlist();

    if (wishlistItemsCount === 0) return null;
    return (
        <IconButton
          onClick={() => router.push("/wishlist")}
          colorScheme="white" 
          shadow="base"
          position="fixed" 
          top="28%"
          border="1px"
          borderColor="gray.200"
          right="-1" 
          zIndex={20}
          size="lg"
          icon={<BadgeButton Icon={BsFillHeartFill} count={wishlistItemsCount} />} 
          color="black"
          bg="white"
          aria-label="Wishlist Products"
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