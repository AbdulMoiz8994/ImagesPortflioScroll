import React, { useReducer, useContext, createContext, useEffect } from 'react';
import { reducer, cartItemsTotalPrice } from './cart.reducer';
import { useStorage } from 'utils/use-storage';
import { calculateVat } from 'utils/calculateVat';
import { totalmem } from 'os';
const CartContext = createContext({} as any);
const INITIAL_STATE = {
  isOpen: false,
  items: [],
  isRestaurant: false,
  coupon: {
    discountInAmount: "",
    discountInPercent: ""
  },
  discountedTotal: null,
  // vat: null,
  vat: {
    vatInPercent: "24.0000"
  },
  transport: {
    cost: 3.5,
    vatInPercent: "24.0000"
  },
  cashOnDelivery: {
    cost: 0,
    vatInPercent: "24.0000"
  },
  /**
   * ONLY 2 shipping methods
   * 1- acs_courier --> ACS Courier
   * 2- store --> Δωρεάν παράδοση μέχρι την μεταφορική
   */
  shippingMethod: "acs_courier"  
};

const useCartActions = (initialCart = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialCart);

  //IMP: useEffect to check either any product has special category or not, if yes then we have to change the cost of the transport
  useEffect(() => {
    const products = state.items;

    // If there is no product then just leave it
    if (products.length === 0) return;
    
    // If any of the product has special category then change the cost from 3.50€ to 16.00€ otherwise keep 3.5€
    const hasSpecialCategory = products.some(product => product?.categories?.some(category => category.slug === "moter-gkarazoportas"));
    if (!hasSpecialCategory) {
      dispatch({ type: 'APPLY_TRANSPORT_COST', payload: 3.50 })
      dispatch({ type: 'SHIPPING_METHOD', payload: "acs_courier" })
      return;
    }
    
    if (state.shippingMethod === "acs_courier") {
      dispatch({ type: 'APPLY_TRANSPORT_COST', payload: 17 })
      return;
    } 
    
    if (state.shippingMethod === "store") {
      dispatch({ type: 'APPLY_TRANSPORT_COST', payload: 0 })
    }
  }, [state.items, state.shippingMethod]);

  const calculateDiscountedTotalHandler = (total, discountPercentage) => {
    // dispatch({ type: 'DISCOUNT_TOTAL', payload: "333.33" })
  }

  const changeShippingMethod = (shippingMethod) => {
    dispatch({ type: 'SHIPPING_METHOD', payload: shippingMethod  })
  }

  const addItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
  };

  const removeItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { ...item, quantity } });
  };

  const clearItemFromCartHandler = (item) => {
    dispatch({ type: 'CLEAR_ITEM_FROM_CART', payload: item });
  };

  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const toggleCartHandler = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  const couponHandler = (coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
  };
  const transportHandler = (cost) => {
    dispatch({ type: 'APPLY_TRANSPORT_COST', payload: cost })
  }
  const vatHandler = (vat) => {
    dispatch({ type: 'APPLY_VAT', payload: vat })
  }
  const vatInPercentHandler = (vatInPercent) => {
    dispatch({ type: 'APPLY_VAT_IN_PERCENT', payload: vatInPercent })
  }
  const removeCouponHandler = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };
  const rehydrateLocalState = (payload) => {
    dispatch({ type: 'REHYDRATE', payload });
  };
  const toggleRestaurant = () => {
    dispatch({ type: 'TOGGLE_RESTAURANT' });
  };
  const updateCashOnDeliveryCost = (cost: number) => {
    dispatch({ type: 'CASH_ON_DELIVERY_COST', payload: cost })
  } 
  const isInCartHandler = (id) => {
    return state.items?.some((item) => item.id === id);
  };
  const getItemHandler = (id) => {
    return state.items?.find((item) => item.id === id);
  };
  const calculateCouponDiscount = (coupon, itemsCost) => {
    let discount = 0;
    
    if (coupon?.discountInAmount) {
      discount = Number(coupon.discountInAmount)
    }
    if (coupon?.discountInPercent) {
      discount = (itemsCost * Number(coupon.discountInPercent)) / 100
    }

    return (discount > itemsCost) ? itemsCost : discount 
  }
  const getCartItemsPrice = () => {
    const total = cartItemsTotalPrice(state.items);

    // If vat is 24% then priceIncludeVat will always has exact value as total price of all items...
    const { priceIncludeVat } = calculateVat({ price: total, vatInPercentage: Number(state.vat.vatInPercent) });
    const priceAfterDiscount = total - calculateCouponDiscount(state.coupon, priceIncludeVat);

    return priceAfterDiscount.toFixed(2);
  }
  const getCartItemsTotalPrice = () => {
    const total = cartItemsTotalPrice(state.items, state.vat, state.transport, state.cashOnDelivery) ;

    const priceAfterDiscount = total - calculateCouponDiscount(state.coupon, total);

    return priceAfterDiscount.toFixed(2);
  }

  const getDiscount = () => {
    const total = cartItemsTotalPrice(state.items, state.vat, state.transport, state.cashOnDelivery) ;

    const discount = calculateCouponDiscount(state.coupon, total);
    return discount.toFixed(2);
  };
  const getVat = () => {
    const total = cartItemsTotalPrice(state.items);

    const { vat, priceIncludeVat, priceExcludeVat } = calculateVat({ price: total, vatInPercentage: Number(state.vat.vatInPercent) });
    const { vat: transportVat, priceExcludeVat: TransportCostPriceExcludeVat } = calculateVat({ price: state.transport.cost, vatInPercentage: Number(state.transport.vatInPercent) });
    const { vat: cashOnDeliveryVat, priceExcludeVat: cashOnDeliveryCostPriceExcludeVat } = calculateVat({ price: state.cashOnDelivery.cost, vatInPercentage: Number(state.cashOnDelivery.vatInPercent) });

    return {
      priceVat: vat.toFixed(2),
      transportVat: transportVat.toFixed(2),
      TransportCostPriceExcludeVat,
      cashOnDeliveryCostPriceExcludeVat,
      cashOnDeliveryVat,
      totalVat: (vat + transportVat + cashOnDeliveryVat).toFixed(2)
    }
  }

  const getItemsCount = state.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return {
    state,
    getItemsCount,
    rehydrateLocalState,
    addItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    getCartItemsPrice,
    couponHandler,
    vatHandler,
    transportHandler,
    vatInPercentHandler,
    removeCouponHandler,
    getDiscount,
    getVat,
    toggleRestaurant,
    calculateDiscountedTotalHandler,
    updateCashOnDeliveryCost,
    changeShippingMethod
  };
};

export const CartProvider = ({ children }) => {
  const {
    state,
    rehydrateLocalState,
    getItemsCount,
    addItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    couponHandler,
    vatHandler,
    transportHandler,
    vatInPercentHandler,
    removeCouponHandler,
    getCartItemsPrice,
    getDiscount,
    getVat,
    toggleRestaurant,
    calculateDiscountedTotalHandler,
    updateCashOnDeliveryCost,
    changeShippingMethod
  } = useCartActions();
  return (
    <CartContext.Provider
      value={{
        isOpen: state.isOpen,
        items: state.items,
        coupon: state.coupon,
        isRestaurant: state.isRestaurant,
        cartItemsCount: state.items?.length,
        discountedTotal: state.discountedTotal,
        transport: state.transport,
        cashOnDelivery: state.cashOnDelivery,
        itemsCount: getItemsCount,
        vatInPercentage: state.vat.vatInPercent,
        shippingMethod: state.shippingMethod,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        removeItemFromCart: clearItemFromCartHandler,
        clearCart: clearCartHandler,
        isInCart: isInCartHandler,
        getItem: getItemHandler,
        toggleCart: toggleCartHandler,
        calculatePrice: getCartItemsTotalPrice,
        calculateSubTotalPrice: getCartItemsPrice,
        applyCoupon: couponHandler,
        applyVat: vatHandler,
        applyTransport: transportHandler,
        applyVatInPercent: vatInPercentHandler,
        removeCoupon: removeCouponHandler,
        calculateDiscount: getDiscount,
        calculateVat: getVat,
        toggleRestaurant,
        calculateDiscountedTotal: calculateDiscountedTotalHandler,
        updateCashOnDeliveryCost,
        onChangeShippingMethod: changeShippingMethod
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
