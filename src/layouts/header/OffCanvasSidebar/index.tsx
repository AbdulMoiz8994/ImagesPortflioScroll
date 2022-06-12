import React, { FC, useEffect } from 'react'
import Router, { useRouter } from 'next/router';
import { CATEGORY_MENU_ITEMS, GADGETS_ITEM, GIFT_IDEA_ITEM, PRODUCTS_ON_SALE_ITEM, PRODUCTS_PURCHASING_ASSISTANTS_ITEM } from 'site-settings/site-navigation';
import { Icon, Box as ChakraBox, HStack, SimpleGrid, Text, Stack, Image } from '@chakra-ui/react';
import ChakraDrawer from 'layouts/ChakraDrawer';
import { HiOutlineHome } from 'react-icons/hi';
import { FaAward, FaHome, FaGift, FaGamepad } from 'react-icons/fa';
import {
  TreeWrapper,
} from 'layouts/sidebar/sidebar.style';
import { TreeMenu } from 'components/tree-menu/tree-menu';
import useCategory from 'data/use-category';
import useFormatCategories from 'hooks/useFormatCategories';
import Link from 'next/link';
import useRouteTriggers from 'hooks/uesRouteTriggers';

// LOGOS
import OffersLogo from 'assets/images/logo/offers.png'
import GadgetLogo from 'assets/images/logo/gadgets.png'
import GiftIdeasLogo from 'assets/images/logo/gift-ideas.png'
import BuyingGuideLogo from 'assets/images/logo/buying-guides.png'
import { MdLocalOffer } from 'react-icons/md';
import { IoMdGift } from 'react-icons/io';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';

interface Props {
  categories: any[]
  isOpen?: boolean
  onClose?: () => void
}
const OffCanvasSidebar:FC<Props> = ({ categories, isOpen, onClose }) => {
  const router = useRouter();
  const formattedCategories = useFormatCategories(categories);
  const initialMenu = CATEGORY_MENU_ITEMS.find(
    (item) => item.href === router.asPath
  );
  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? CATEGORY_MENU_ITEMS[0]
  );

  // Close offcanvasSidebar when route changes
  const routeTriggers = useRouteTriggers();
  useEffect(() => {
    onClose();
  }, [routeTriggers.isRouteChanging])

  const selectedQueries = router.query.category; 
  return (
    <ChakraDrawer 
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* Top navigations */}
      <Stack>
        <SimpleGrid columns={3} spacing={{ base: "1", md: "3"}}>
          <Link href={PRODUCTS_ON_SALE_ITEM.href} passHref>
            <Stack as="a" bg="white" spacing={{ base: "1", md: "3"}} justify="center" align="center" p={{ base: "2", md: "4"}} rounded="md">
              <Icon as={MdLocalOffer} fontSize={{ base: "20", md: "30"}} />
              {/* <Text fontWeight="semibold">{PRODUCTS_ON_SALE_ITEM.defaultMessage}</Text> */}
              <Text fontWeight="semibold">
                <FormattedMessage 
                  id="drawer.offers"
                  defaultMessage="Offers"
                />
              </Text>
            </Stack>
          </Link>
          <Link href={GADGETS_ITEM.href} passHref>
            <Stack as="a" bg="white" spacing={{ base: "1", md: "3"}} justify="center" align="center" p={{ base: "2", md: "4"}} rounded="md">
              <Icon as={FaGamepad} fontSize={{ base: "20", md: "30"}} />
              <Text fontWeight="semibold">{GADGETS_ITEM.defaultMessage}</Text>
            </Stack>
          </Link>
          <Link href={GIFT_IDEA_ITEM.href} passHref>
            <Stack as="a" bg="white" spacing={{ base: "1", md: "3"}} justify="center" align="center" p={{ base: "2", md: "4"}} rounded="md">
              <Icon as={IoMdGift} fontSize={{ base: "20", md: "30"}} />
              <Text fontWeight="semibold" align="center">
                <FormattedMessage 
                  id={GIFT_IDEA_ITEM.id}
                  defaultMessage={GIFT_IDEA_ITEM.defaultMessage}
                />
              </Text>
            </Stack>
          </Link>
        </SimpleGrid>
        <Link href={PRODUCTS_PURCHASING_ASSISTANTS_ITEM.href} passHref>
          <HStack as="a" justify="center" align="center" bg="white" rounded="md" p={{ base: "2", md: "4"}}>
            <Icon fontSize={{ base: "18", md: "25"}} as={BsFillInfoSquareFill} />
            <Text fontWeight="semibold">
              <FormattedMessage 
                id={PRODUCTS_PURCHASING_ASSISTANTS_ITEM.id}
                defaultMessage={PRODUCTS_PURCHASING_ASSISTANTS_ITEM.defaultMessage}
              />
            </Text>
          </HStack>
        </Link>
      </Stack>

      {/* Actual nav items */}
      <TreeWrapper>
        <TreeMenu
          // data={data}
          data={formattedCategories}
          // onClick={(params) => console.log("Category clicked!", { params })}
          onClick={(slug) => {
            onClose()
            router.replace(`/${slug}`)
          }}
          active={selectedQueries}
        />
      </TreeWrapper>

      {/* Navigation for homepage */}
      <ChakraBox rounded="md" bg="white" w="full" py="2">
        <HStack cursor="pointer" userSelect="none" onClick={() => {
          router.push("/");
          onClose()
        }} justify="center">
        <Icon fontSize="22" as={HiOutlineHome} />
        <Text fontSize="18" fontWeight="medium">Αρχική Σελίδα</Text>
        </HStack>
      </ChakraBox>

      {/* Info section */}
      <Stack py="6" px="2">
        <Text fontSize="19" fontWeight="bold">Επικοινωνία</Text>
        <Stack spacing="0">
          <a href="tel:2106421065">
            <Text color="facebook.500" textDecor="underline">2106421065</Text>
          </a>
          <a href="mailto:info@sfkshop.gr">
            <Text color="facebook.500" textDecor="underline">info@sfkshop.gr</Text>
          </a>
        </Stack>
      </Stack>
      <Stack pb="6" px="2">
        <Text fontSize="19" fontWeight="bold">Ωράριο λειτουργίας</Text>
        <Stack spacing="0">
          <Text>Δευτ - Παρ: 10:00 - 17:00</Text>
        </Stack>
      </Stack>

    </ChakraDrawer>
  )
}

export default OffCanvasSidebar
