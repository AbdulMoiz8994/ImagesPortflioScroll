/**
 * -----> /app-layout/header
 *
 **/

import React, { useContext } from "react";
import dynamic from "next/dynamic";
import NavLink from "components/nav-link/nav-link";
import {
  FAQ_MENU_ITEM,
  SHIPPING_METHODS_MENU_ITEM,
} from "site-settings/site-navigation";
import { RightMenuBox, Select } from "./right-menu.style";
import { Wrap, Button, Box } from "@chakra-ui/react";
import { FaRegHeart, FaCartArrowDown, FaShoppingBasket } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
import BadgeIcon from "components/common/BadgeIcon";
import { useCart } from "contexts/cart/use-cart";
import { useComparison } from "contexts/comparison/use-comparison";
import { useWishlist } from "contexts/wishlist/use-wishlist";
import { useRouter } from "next/router";
import { LanguageContext } from "contexts/language/language.provider";
import { locales } from "contexts/language/language.config";
import { FormattedMessage } from "react-intl";
const AuthMenu = dynamic(() => import("../auth-menu"), { ssr: false });

type Props = {
  onLogout: () => void;
  onJoin: () => void;
  avatar: string;
  isAuthenticated: boolean;
  showBadgeIcons?: boolean;
  showNavigationMenus?: boolean;
  showContinueShoppingBtn?: boolean;
};

export const RightMenu: React.FC<Props> = ({
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
  showBadgeIcons = true,
  showNavigationMenus = true,
  showContinueShoppingBtn = false,
}) => {
  const { cartItemsCount } = useCart();
  const { comparisonItemsCount } = useComparison();
  const { wishlistItemsCount } = useWishlist();
  const router = useRouter();
  const language = useContext(LanguageContext);
  function handleChange(e) {
    language.changeLanguage(e.target.value);
  }

  return (
    <RightMenuBox>
      {showNavigationMenus && (
        <>
          <NavLink
            className="menu-item"
            href={FAQ_MENU_ITEM.href}
            label={FAQ_MENU_ITEM.defaultMessage}
            intlId={FAQ_MENU_ITEM.id}
            iconClass="menu-icon"
          />

          {process.env.NODE_ENV === "development" && <Select onChange={handleChange}>
            {locales.map((item) => {
              return (
                <option key={item} style={{ textTransform: "capitalize" }} value={item}>
                  {item}
                </option>
              );
            })}
          </Select>}
          <NavLink
            className="menu-item"
            href={SHIPPING_METHODS_MENU_ITEM.href}
            label={SHIPPING_METHODS_MENU_ITEM.defaultMessage}
            intlId={SHIPPING_METHODS_MENU_ITEM.id}
            iconClass="menu-icon"
          />
        </>
      )}
      {showBadgeIcons && (
        <Wrap pr="8" color="white">
          <BadgeIcon
            name="addToWhishlist"
            Icon={FaRegHeart}
            count={wishlistItemsCount}
            link="/wishlist"
          />
          <BadgeIcon
            name="addToWhishlist"
            Icon={IoIosGitCompare}
            count={comparisonItemsCount}
            link="/comparison"
          />
          <BadgeIcon
            name="addToWhishlist"
            Icon={FaCartArrowDown}
            count={cartItemsCount}
            link={"/cart"}
          />
        </Wrap>
      )}

      {showContinueShoppingBtn && (
        <Box px="4">
          <Button
            leftIcon={<FaShoppingBasket size={20} />}
            size="lg"
            transition="linear"
            transitionDuration="0.2s"
            _hover={{
              colorScheme: "primary",
            }}
            onClick={() => router.replace("/")}
          >
            <FormattedMessage 
              id="CheckoutPage.ContinueShopping"
              defaultMessage="Continue Shopping"
            />
          </Button>
        </Box>
      )}

      <AuthMenu
        avatar={avatar}
        onJoin={onJoin}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />
    </RightMenuBox>
  );
};
