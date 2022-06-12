import React from "react";
import Router, { useRouter } from "next/router";
import { openModal } from "@redq/reuse-modal";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "features/authentication-form";
import { RightMenu } from "./menu/right-menu/right-menu";
import { LeftMenu } from "./menu/left-menu/left-menu";
import HeaderWrapper from "./header.style";
// import LogoImage from 'assets/images/logo.svg';
import LogoImage from "assets/images/myventema-logo.png";
import UserImage from "assets/images/avatar.jpg";
import { isCategoryPage } from "../is-home-page";
import Search from "features/search/search";
import { InstantSearch } from "react-instantsearch-dom";
import { searchClient } from "lib/algoliaSearch";
import { algolia_indexes } from "site-settings/site-algolia";
import CartCashSteps from "./cart-cash-steps";
import { frontendDomain } from "site-settings/site-credentials";

type Props = {
  categories?: any[];
  className?: string;
  hideSearch?: boolean;
  hideCanvasMenu?: boolean;
};

const Header: React.FC<Props> = ({
  className,
  categories,
  hideSearch,
  hideCanvasMenu,
}) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);
  const { pathname, query } = useRouter();
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("customer");
      authDispatch({ type: "SIGN_OUT" });
      // Router.push("/");
      window.open(frontendDomain,"_self")
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

  if (pathname === "/checkout")
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName={algolia_indexes.products}
      >
        <HeaderWrapper className={className} id="layout-header">
          <LeftMenu categories={categories} hideCanvas={hideCanvasMenu} />
          <CartCashSteps />
          <RightMenu
            showNavigationMenus={false}
            showBadgeIcons={false}
            showContinueShoppingBtn={true}
            isAuthenticated={isAuthenticated}
            onJoin={handleJoin}
            onLogout={handleLogout}
            avatar={UserImage}
          />
        </HeaderWrapper>
      </InstantSearch>
    );

  // For all common pages
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={algolia_indexes.products}
    >
      <HeaderWrapper className={className} id="layout-header">
        <LeftMenu categories={categories} />
        {!hideSearch && <Search />}
        <RightMenu
          isAuthenticated={isAuthenticated}
          onJoin={handleJoin}
          onLogout={handleLogout}
          avatar={UserImage}
        />
      </HeaderWrapper>
    </InstantSearch>
  );
};

export default Header;
