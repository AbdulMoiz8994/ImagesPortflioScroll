import React, { useReducer, useContext, createContext } from 'react';
import { useEffect } from 'react';
import { fetchCompareProductsService } from 'services/comparison';
import { reducer } from './cart.reducer';
// import { useStorage } from 'utils/use-storage';
const ComparisonContext = createContext({} as any);
const INITIAL_STATE = {
  items: [],
};

const useComparisonActions = (initialCart = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialCart);
  
  useEffect(() => {
    asyncData();
  }, []);
  
  const asyncData = async () => {
    const { storedItems } = await fetchCompareProductsService()
  
    dispatch({ type: 'SET_ITEMS', payload: storedItems })  
  }

  const addItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
  };

  const removeItemHandler = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  const isInComparisonHandler = (id) => {
    return state.items?.some((item) => item.id === id);
  };
  return {
    state,
    addItemHandler,
    removeItemHandler,
    isInComparisonHandler,
  };
};

export const ComparisonProvider = ({ children }) => {
  const {
    state,
    addItemHandler,
    removeItemHandler,
    isInComparisonHandler,
  } = useComparisonActions();

  return (
    <ComparisonContext.Provider
      value={{
        items: state.items,
        comparisonItemsCount: state.items?.length,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        isInComparison: isInComparisonHandler
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
