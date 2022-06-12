import React, { useState } from 'react';
import Link from 'next/link';
import {
  CartPopupBody,
  PopupHeader,
  PopupItemCount,
  CloseButton,
  PromoCode,
  CheckoutButtonWrapper,
  CheckoutButton,
  Title,
  PriceBox,
  NoProductMsg,
  NoProductImg,
  ItemWrapper,
  CouponBoxWrapper,
  CouponCode,
} from './cart.style';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { ShoppingBagLarge } from 'assets/icons/ShoppingBagLarge';
import { NoCartBag } from 'assets/icons/NoCartBag';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';

import { Scrollbar } from 'components/scrollbar/scrollbar';
import { useCart } from 'contexts/cart/use-cart';
import { CartItem } from 'components/cart-item/cart-item';
import Coupon from 'features/coupon/coupon';
import { useToast } from '@chakra-ui/react';
import { isProductAbleToIncrement } from 'utils/products-utils';
import CouponChakara from 'features/coupon/CouponChakra';

type CartPropsType = {
  style?: any;
  className?: string;
  scrollbarHeight?: string;
  onCloseBtnClick?: (e: any) => void;
};

const Cart: React.FC<CartPropsType> = ({
  style,
  className,
  onCloseBtnClick,
  scrollbarHeight,
}) => {
  const {
    items,
    coupon,
    addItem,
    getItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice,
    calculateSubTotalPrice,
    calculateDiscount
  } = useCart();
  const [hasCoupon, setCoupon] = useState(false);
  const intl = useIntl()
  const toast = useToast();

  return (
    <CartPopupBody className={className} style={style}>
      <PopupHeader>
        <PopupItemCount>
          <ShoppingBagLarge width='19px' height='24px' />
          <span>
            {cartItemsCount}
            &nbsp;
            {cartItemsCount > 1 ? (
              <FormattedMessage id='cartDrawer.items' defaultMessage='items' />
            ) : (
              <FormattedMessage id='cartDrawer.item' defaultMessage='item' />
            )}
          </span>
        </PopupItemCount>

        <CloseButton onClick={onCloseBtnClick}>
          <CloseIcon />
        </CloseButton>
      </PopupHeader>

      <Scrollbar className='cart-scrollbar'>
        <ItemWrapper className='items-wrapper'>
          {!!cartItemsCount ? (
            items.map((item) => (
              <CartItem
                key={`cartItem-${item.id}`}
                // onIncrement={() => addItem(item)}
                onIncrement={() => {
                  const prevQuantity = getItem(item.id)?.quantity || 0;
                  if (isProductAbleToIncrement(item, prevQuantity)) {
                    addItem(item);                      
                  } else {
                    toast({
                      // title: `This product has limited stock.`,
                      title: intl.formatMessage({ id: 'toast.productLimitedStockPhrase', defaultMessage: 'This product has limited stock.' }),
                      position: "top",
                      isClosable: true,
                      status: 'warning',
                    })
                  }
                }}
                onDecrement={() => removeItem(item)}
                onRemove={() => removeItemFromCart(item)}
                data={item}
              />
            ))
          ) : (
            <>
              <NoProductImg>
                <NoCartBag />
              </NoProductImg>
              <NoProductMsg>
                <FormattedMessage
                  id='cartDrawer.noProductsFound'
                  defaultMessage='No products found'
                />
              </NoProductMsg>
            </>
          )}
        </ItemWrapper>
      </Scrollbar>

      <CheckoutButtonWrapper>
        <PromoCode style={{ padding: '0 20px' }}>
          <CouponChakara />
        </PromoCode>

        {cartItemsCount !== 0 ? (
          <>
            <Link href='/cart'>
              <CheckoutButton onClick={onCloseBtnClick}>
                <>
                  <Title>
                    <FormattedMessage
                      id='cartDrawer.cart'
                      defaultMessage='Cart'
                    />
                  </Title>
                  <PriceBox>
                    {CURRENCY}
                    {/* {calculatePrice()} */}
                    {calculateSubTotalPrice()}
                  </PriceBox>
                </>
              </CheckoutButton>
            </Link>
            <Link href='/checkout'>
              <CheckoutButton onClick={onCloseBtnClick}>
                <>
                  <Title>
                    <FormattedMessage
                      id='cartDrawer.checkout'
                      defaultMessage='Checkout'
                    />
                  </Title>
                  <PriceBox>
                    {CURRENCY}
                    {/* {calculatePrice()} */}
                    {calculateSubTotalPrice()}
                  </PriceBox>
                </>
              </CheckoutButton>
            </Link>
          </>
        ) : null}
      </CheckoutButtonWrapper>
    </CartPopupBody>
  );
};

export default Cart;
