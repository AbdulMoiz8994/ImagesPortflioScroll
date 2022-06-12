import React from "react";
import dynamic from "next/dynamic";
import router, { useRouter } from "next/router";
import Sticky from "react-stickynode";
import { useAppDispatch, useAppState } from "contexts/app/app.provider";
import Header from "./header/header";
import { LayoutWrapper } from "./layout.style";
import { isCategoryPage } from "./is-home-page";
const MobileHeader = dynamic(() => import("./header/mobile-header"), {
  ssr: false,
});
import { Box, ChakraProvider } from "@chakra-ui/react";
import VisibilitySensor from "react-visibility-sensor";
import { useEffect } from "react";
import { useState } from "react";
import { getAllWCCategories } from "services/categoroies";
import MainFooter from "layouts/footer/MainFooter";
import CheckoutFooter from "./footer/CheckoutFooter";

type LayoutProps = {
  className?: string;
  token?: string;
};

const fetcher = async api => {
  const categories = await getAllWCCategories();
  return categories;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  token,
}) => {
  const { pathname, query } = useRouter();
  const isSticky =
    useAppState("isSticky") ||
    pathname === "/furniture-two" ||
    pathname === "/grocery-two";
  const dispatch = useAppDispatch();
  const [isFooter, setIsFooter] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);

  // variables
  const HIDE_SEARCH = pathname === "/checkout";
  const HIDE_CANVAS_MENU = pathname === "/checkout";

  useEffect(() => {
    async function getAsyncData() {
      const categories = await getAllWCCategories();
      const sortedMenuItems = categories.sort(
        (a, b) => a.menu_order - b.menu_order
      );
      // console.log({ categories1 })

      const filteredCategories = sortedMenuItems.filter(
        category =>
          category.name !== "Uncategorized" && category.name !== "sfkshop"
      );
      setCategories(filteredCategories);
    }
    getAsyncData();
  }, []);

  useEffect(() => {
    dispatch({ type: "IS_SIDEBAR_SHOW", payload: isFooter });
  }, [isFooter]);

  const isHomePage = isCategoryPage(query.type) || pathname === "/bakery";
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader
          hideSearch={HIDE_SEARCH}
          hideCanvasMenu={HIDE_CANVAS_MENU}
          categories={categories}
          className={`${isSticky ? "sticky" : "unSticky"} ${
            isHomePage ? "home" : ""
          } desktop`}
        />
        <Header
          hideSearch={HIDE_SEARCH}
          hideCanvasMenu={HIDE_CANVAS_MENU}
          categories={categories}
          className={`${isSticky ? "sticky" : "unSticky"} ${
            isHomePage ? "home" : ""
          }`}
        />
      </Sticky>
      {children}
      {pathname === "/checkout" ? (
        <CheckoutFooter />
      ) : (
        <VisibilitySensor
          partialVisibility={true}
          onChange={isVisible => setIsFooter(isVisible)}
        >
          <Box bg="inherit">
            <MainFooter />
          </Box>
        </VisibilitySensor>
      )}
    </LayoutWrapper>
  );
};

export default Layout;
