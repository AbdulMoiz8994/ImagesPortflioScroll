import { removeCompareProductService, setCompareProductsService } from "services/comparison";

// cartItems, cartItemToAdd
const addItemToComparison = (state, action) => {
  setCompareProductsService(action.payload);
  return [...state.items, action.payload];
};

const removeItemFromComparsion = (state, action) => {
  const filteredItems = state.items.filter(item => item.id !== action.payload);
  
  // Also remove from local storage
  removeCompareProductService(action.payload);

  return filteredItems;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS': 
      return { ...state, items: action.payload }
    case 'ADD_ITEM':
      return { ...state, items: addItemToComparison(state, action) };
    case 'REMOVE_ITEM':
      return { ...state, items: removeItemFromComparsion(state, action) };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
