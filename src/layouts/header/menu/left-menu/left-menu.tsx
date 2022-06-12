import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import Popover from 'components/popover/popover';
import Logo from 'layouts/logo/logo';
import { MenuDown } from 'assets/icons/MenuDown';
import { CATEGORY_MENU_ITEMS } from 'site-settings/site-navigation';
import * as categoryMenuIcons from 'assets/icons/category-menu-icons';
import {
  MainMenu,
  MenuItem,
  IconWrapper,
  SelectedItem,
  // Icon,
  Arrow,
  LeftMenuBox,
} from './left-menu.style';
import { BiMenu } from 'react-icons/bi';
import { Icon, useDisclosure, Box as ChakraBox, HStack, SimpleGrid, Text, Stack } from '@chakra-ui/react';
import ChakraDrawer from 'layouts/ChakraDrawer';
import { CardMenu } from 'components/card-menu';
import styled from 'styled-components';
import { HiOutlineHome, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FaAward, FaHome, FaGift } from 'react-icons/fa';
import {
  CategoryWrapper,
  TreeWrapper,
  PopoverHandler,
  PopoverWrapper,
  SidebarWrapper,
  RequestMedicine,
// } from './sidebar.style';
} from 'layouts/sidebar/sidebar.style';
import { TreeMenu } from 'components/tree-menu/tree-menu';
import useCategory from 'data/use-category';
import useFormatCategories from 'hooks/useFormatCategories';
import OffCanvasSidebar from 'layouts/header/OffCanvasSidebar';
import { RiMenuUnfoldFill } from 'react-icons/ri';
import { siteURL } from 'site-settings/site-credentials';

const CardMenuWrapper = styled.div({
  display: 'grid',
  gridGap: '10px',
  gridTemplateColumns: '1fr 1fr',
  gridAutoRows: 'max-content',
  paddingBottom: 20,

  '@media (min-width: 550px) and (max-width: 990px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
};

const CategoryMenu = (props: any) => {
  const handleOnClick = (item) => {
    if (item.dynamic) {
      Router.push('/[type]', `${item.href}`);
      props.onClick(item);
      return;
    }
    Router.push(`${item.href}`);
    props.onClick(item);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'pink', padding: '20px' }}>
      {CATEGORY_MENU_ITEMS.map((item) => (
        <MenuItem key={item.id} {...props} onClick={() => handleOnClick(item)}>
          <IconWrapper>
            <CategoryIcon name={item.icon} />
          </IconWrapper>
          <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
        </MenuItem>
      ))}
    </div>
  );
};

type Props = {
  logo?: string;
  categories?: any[]
  hideCanvas?: boolean
};

export const LeftMenu: React.FC<Props> = ({ logo, categories, hideCanvas }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, error } = useCategory({ type: 'grocery' });
  const formattedCategories = useFormatCategories(categories);
  const initialMenu = CATEGORY_MENU_ITEMS.find(
    (item) => item.href === router.asPath
  );
  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? CATEGORY_MENU_ITEMS[0]
  );

  return (
    <LeftMenuBox>
      {/* Sidebar drawer for categories */}
      <OffCanvasSidebar onClose={onClose} isOpen={isOpen} categories={categories} />

      {/* UI Sequence */}
      <HStack>
        {!hideCanvas && <Icon 
          // as={RiMenuUnfoldFill} 
          as={HiOutlineMenuAlt2} 
          fontSize="28"
          mr="3" 
          cursor="pointer" 
          userSelect="none"
          color="white"
          transition="all .1s"
          _hover={{ transform: 'scale(1.1)' }}
          onClick={() => onOpen()} 
        />}

        <Logo
          isDesktopView={true}
          imageUrl={`${siteURL}/wp-content/uploads/2021/04/sfkshop-animated-logo.gif`}
          alt={'Shop Logo'}
          onClick={() => setActiveMenu(CATEGORY_MENU_ITEMS[0])}
        />
      </HStack>
    </LeftMenuBox>
  );
};
