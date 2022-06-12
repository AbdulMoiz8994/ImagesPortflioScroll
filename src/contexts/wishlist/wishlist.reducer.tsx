import { removeWishlistProductsService, setWishlistProductsService } from "services/whislist";

// cartItems, cartItemToAdd
const addItemToWishlist = (state, action) => {
  setWishlistProductsService(action.payload);
  return [...state.items, action.payload];
};

const removeItemFromWishlist = (state, action) => {
  const filteredItems = state.items.filter(item => item.id !== action.payload);
  
  // Also remove from local storage
  removeWishlistProductsService(action.payload);

  return filteredItems;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS': 
      return { ...state, items: action.payload }
    case 'ADD_ITEM':
      return { ...state, items: addItemToWishlist(state, action) };
    case 'REMOVE_ITEM':
      return { ...state, items: removeItemFromWishlist(state, action) };
    case 'SET_LOADING': 
      return { ...state, loading: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
