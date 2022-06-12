import React from "react";
import { useRouter } from "next/router";
import { openModal, closeModal } from "@redq/reuse-modal";
import MobileDrawer from "./mobile-drawer";
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  SearchWrapper,
  SearchModalWrapper,
  SearchModalClose,
} from "./header.style";
import Search from "features/search/search";
// import LogoImage from 'assets/images/logo.svg';
import LogoImage from 'assets/images/myventema-logo.png';
import { SearchIcon } from 'assets/icons/SearchIcon';
import { LongArrowLeft } from 'assets/icons/LongArrowLeft';
import Logo from 'layouts/logo/logo';
import MobileLogo from 'layouts/logo/mobileLogo';
import { isCategoryPage } from '../is-home-page';
import useDimensions from 'utils/useComponentSize';
import { BiMenu } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/hooks';
import { Icon, Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import OffCanvasSidebar from './OffCanvasSidebar';
import { FiSearch } from 'react-icons/fi'
import { searchClient } from 'lib/algoliaSearch';
import { InstantSearch } from 'react-instantsearch-core';
import MobileSearch from 'features/search/MobileSearch';
import Sticky from 'react-stickynode';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { Image, Square } from '@chakra-ui/react';
import CartCashSteps from './cart-cash-steps';
import AuthMenu from './menu/auth-menu';
import UserImage from "assets/images/avatar.jpg";
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from "features/authentication-form";
import Router from 'next/router'
import { RiMenuUnfoldFill } from "react-icons/ri";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { siteURL } from "site-settings/site-credentials";

type MobileHeaderProps = {
  className?: string;
  closeSearch?: any;
  categories?: any[];
  hideSearch?: boolean;
  hideCanvasMenu?: boolean;
};

const MobileHeader: React.FC<MobileHeaderProps> = ({
  hideSearch,
  categories,
  hideCanvasMenu,
  className,
}) => {
  const { pathname, query } = useRouter();
  const [mobileHeaderRef, dimensions] = useDimensions();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);
  
  const showLeftDrawer = "";
  const logoPosition = pathname === "/checkout" ? "left" : "center";
  const showCartCashSteps = pathname === "/checkout" ? true : false;
 
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("customer");
      authDispatch({ type: "SIGN_OUT" });
      Router.push("/");
    }
  };
  const handleJoin = () => {
    authDispatch({
      type: "SIGNIN",
    });

    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  return (
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
        {/* It open the left modal */}
        {showLeftDrawer && (
          <DrawerWrapper>
            <MobileDrawer />
          </DrawerWrapper>
        )}
        {/* For categories modal */}
        {!hideCanvasMenu && <CategoriesMenu categories={categories} />}

        {logoPosition === "center" && (
          <LogoWrapper>
            <MobileLogo
              imageUrl={
                `${siteURL}/wp-content/uploads/2021/04/sfkshop-animated-logo.gif`
              }
              alt="shop logo"
            />
          </LogoWrapper>
        )}
        {logoPosition === "left" && (
          <Box h={{ base: "2.1rem", md: "2.5rem"}} w={{ base: "6rem", md: "8rem" }}>
            <Image
              w="full"
              h="full"
              src={`${siteURL}/wp-content/uploads/2021/04/sfkshop-animated-logo.gif`}
            />
          </Box>
        )}

        {showCartCashSteps && <CartCashSteps />}

        {/* <Logo
          isDesktopView={true}
          imageUrl={"https://sfkshop.gr/wp-content/uploads/2021/04/sfkshop-animated-logo.gif"}
          alt={'Shop Logo'}
          onClick={() => console.log("Clicked")}
        /> */}

        {/*Future Note: Search with modal */}
        {/* <SearchWrapper
          onClick={handleSearchModal}
          className="searchIconWrapper"
        >
          <SearchIcon color="white" />
        </SearchWrapper> */}


        {/* <Link href="/profile">
          <a>
            <Icon fontSize="28" color="gray.300" as={CgProfile} />
          </a>
        </Link> */}

      <AuthMenu
        avatar={UserImage}
        onJoin={handleJoin}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        Icon={<Icon 
          fontSize="28" 
          color="gray.300" 
          as={CgProfile} 
        />}
      />

      </MobileHeaderInnerWrapper>
      {!hideSearch && (
        <InstantSearch searchClient={searchClient} indexName="wc_rest_products">
          <Sticky top={0}>
            <Box
              bg="white"
              display={{ base: "inherit", lg: "none" }}
              pt="20"
              px="3"
              // pb="2"
            >
              <MobileSearch />
            </Box>
          </Sticky>
        </InstantSearch>
      )}
      <Box mt={{ base: "0", lg: "46" }} />
    </MobileHeaderWrapper>
  );
};

function CategoriesMenu({ categories }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <OffCanvasSidebar
        onClose={onClose}
        isOpen={isOpen}
        categories={categories}
      />

      <Icon
        // as={BiMenu}
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
      />
    </>
  );
}

export default MobileHeader;
