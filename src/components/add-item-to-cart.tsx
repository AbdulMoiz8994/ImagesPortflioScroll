import React, { useContext } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from './counter/counter';
import { variant as _variant } from 'styled-system';
import { cartAnimation } from 'utils/cart-animation';

import { openModal, closeModal } from '@redq/reuse-modal';
import Cart from 'features/carts/cart';
import { useToast, Text, Box } from '@chakra-ui/react';
import { defaultTheme } from 'site-settings/site-theme/default';
import { isProductAbleToAddToCart, isProductOutOfStock } from 'utils/products-utils';
import { useIntl } from 'react-intl';
import { trackStartedCheckoutActivity } from 'services/klaviyo';
import { AuthContext } from 'contexts/auth/auth.context';

const Icon = styled.span<any>(
  _variant({
    variants: {
      full: {
        px: 3,
        height: 36,
        backgroundColor: '#bf4b49',
        transition: '0.35s ease-in-out',
        display: 'flex',
        alignItems: 'center',
      },
    },
  })
);

const Button = styled.button<any>(
  css({
    width: 36,
    height: 36,
    borderRadius: 6,
    transition: '0.35s ease-in-out',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#e6e6e6',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'primary.regular',
      borderColor: 'primary.regular',
      color: '#fff',
    },
  }),
  _variant({
    variants: {
      full: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e35452',
        color: '#fff',
        padding: 0,
        border: 'none',
        overflow: 'hidden',
        ':hover': {
          backgroundColor: 'primary.hover',
          borderColor: 'primary.hover',
          color: '#fff',
          [Icon]: {
            backgroundColor: 'primary.regular',
            color: '#fff',
          },
        },
      },
    },
  })
);

interface Props {
  data: any;
  variant?: string;
  buttonText?: string | any;
  deviceType?: any
}

export const AddItemToCart = ({ data, variant, buttonText, deviceType: { mobile, tablet, desktop } }: Props) => {
  const { addItem, removeItem, getItem, isInCart, toggleCart } = useCart();
  const toast = useToast();
  const intl = useIntl()
  const { customer } = useContext<any>(AuthContext);

  // Handlers
  const handleAddClick = async (e) => {
    e.stopPropagation();

    // Animation from product to cart
    if (!isInCart(data.id)) {
      cartAnimation(e);
    }
  
    const prevQuantity = getItem(data.id)?.quantity || 0;
    // if (data.backorders_allowed || prevQuantity < data.stock_quantity) {
    if (isProductAbleToAddToCart(data, 1, prevQuantity)) {
      addItem(data);                      

      if (!!customer) {
        await trackStartedCheckoutActivity(customer.email, data)
      }
    } else {
      toast({
        title: intl.formatMessage({ id: 'toast.productLimitedStockPhrase', defaultMessage: 'This product has limited stock.' }),
        position: "top",
        isClosable: true,
        status: 'warning',
      })
    }
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  const handleMobileClick = () => {
    openModal({
      show: true,
      config: {
        className: 'cartPopup',
        width: 'auto',
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        transition: {
          tension: 360,
          friction: 40,
        },
      },
      closeOnClickOutside: true,
      component: Cart,
      closeComponent: () => <div />,
      componentProps: { onCloseBtnClick: closeModal, scrollbarHeight: 330 },
    });
  }

  // if (!data.backorders_allowed && (!data.stock_quantity || data.stock_quantity === 0) ) return (
  if (isProductOutOfStock(data)) return (
    <Box rounded="md" w="full" py="2">
      {/* <Text textAlign="center" color="red.500" fontWeight="bold">Out of stock</Text> */}
      <Text textAlign="center" color="red.500" fontWeight="bold">Μη Διαθέσιμο</Text>
    </Box>
  )

  return !isInCart(data.id) ? (
    <Button
      aria-label="add item to cart"
      onClick={handleAddClick}
      variant={variant}
    >
      {!!buttonText && <Box onClick={mobile ? handleMobileClick :  toggleCart} flexGrow={1}>{buttonText}</Box>}
      <Icon variant={variant}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
        >
          <path
            data-name="Path 9"
            d="M143.407,137.783h-1.25v4.375h-4.375v1.25h4.375v4.375h1.25v-4.375h4.375v-1.25h-4.375Z"
            transform="translate(-137.782 -137.783)"
            fill="currentColor"
          />
        </svg>
      </Icon>
    </Button>
  ) : (
    <Counter
      value={getItem(data.id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      className="card-counter"
      variant={variant || 'altHorizontal'}
    />
  );
};
