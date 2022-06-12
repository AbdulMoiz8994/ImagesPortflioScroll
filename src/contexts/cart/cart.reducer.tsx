import { calculateVat } from "utils/calculateVat";

export function cartItemsTotalPrice(items: any[], vat?: { vatInPercent: string }, transport?: { cost: number }, cashOnDelivery?: { cost: number }){
  if (items === null || items.length === 0) return 0;

  const itemCost = items.reduce((total, item) => {
    if (item.salePrice) {
      return total + item.salePrice * item.quantity;
    }
    return total + item.price * item.quantity;
  }, 0);

  const transportCost = transport ? transport.cost : 0;
  const cashOnDeliveryCost = cashOnDelivery ? cashOnDelivery.cost : 0;
  const { vat: calculatedVat, priceIncludeVat } = vat 
    ? calculateVat({ price: itemCost, vatInPercentage: Number(vat.vatInPercent) })
    : { vat: 0, priceIncludeVat: 0 }

  // If vat is being used 
  const totalItemsCost = priceIncludeVat || itemCost;

  return (totalItemsCost + transportCost + cashOnDeliveryCost);
};
// cartItems, cartItemToAdd
const addItemToCart = (state, action) => {
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingCartItemIndex > -1) {
    const newState = [...state.items];
    newState[existingCartItemIndex].quantity += action.payload.quantity;
    return newState;
  }
  return [...state.items, action.payload];
};

// cartItems, cartItemToRemove
const removeItemFromCart = (state, action) => {
  return state.items.reduce((acc, item) => {
    if (item.id === action.payload.id) {
      const newQuantity = item.quantity - action.payload.quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
};

const clearItemFromCart = (state, action) => {
  return state.items.filter((item) => item.id !== action.payload.id);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'REHYDRATE':
      return { ...state, ...action.payload };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'ADD_ITEM':
      return { ...state, items: addItemToCart(state, action) };
    case 'REMOVE_ITEM':
      return { ...state, items: removeItemFromCart(state, action) };
    case 'CLEAR_ITEM_FROM_CART':
      return { ...state, items: clearItemFromCart(state, action) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'APPLY_VAT':
      return { ...state, vat: action.payload };
    case 'APPLY_TRANSPORT_COST':
      return { ...state, transport: { ...state.transport, cost: action.payload } };
    case 'SHIPPING_METHOD':
      return { ...state, shippingMethod: action.payload };
    case 'APPLY_VAT_IN_PERCENT':
      return { ...state, vat: { ...state.vat, vatInPercent: action.payload} };
    case 'CASH_ON_DELIVERY_COST':
      return { ...state, cashOnDelivery: { ...state.cashOnDelivery, cost: action.payload } };
    case 'REMOVE_COUPON':
      return { ...state, coupon: {
          discountInAmount: "",
          discountInPercent: ""
        } 
      };
    case 'TOGGLE_RESTAURANT':
      return { ...state, isRestaurant: !state.isRestaurant };
    case 'DISCOUNT_TOTAL': 
      return { ...state, discountedTotal: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
