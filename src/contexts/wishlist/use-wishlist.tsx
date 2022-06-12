import axios from 'axios';
import { AuthContext } from 'contexts/auth/auth.context';
import React, { useReducer, useContext, createContext } from 'react';
import { useEffect } from 'react';
import { fetchWishlistProductsService } from 'services/whislist';
import { reducer } from './wishlist.reducer';
import store from 'store-js'
import _ from 'lodash'
import data from 'features/checkouts/data';

// import { useStorage } from 'utils/use-storage';
const WishlistContext = createContext({} as any);
const INITIAL_STATE = {
  items: [],
  loading: false
};

const useComparisonActions = (initialWishlist = INITIAL_STATE) => {
  // useStates and customHooks
  const [state, dispatch] = useReducer(reducer, initialWishlist);
  const { authState } = useContext<any>(AuthContext);

  // useEffect hooks
  useEffect(() => {
    // Fetch products from local storage
    let storedItems = [];
    const asyncData = async () => {
      const res = await fetchWishlistProductsService()
      storedItems = res.storedItems;
      dispatch({ type: 'SET_ITEMS', payload: storedItems })  
    };
    asyncData();
    
    // Fetch products from DB
    async function getDatabaseData() {
      try {
        // If there is customer then fetch wishlist products from DB
        const customer = await store.get('customer') || null;
        dispatch({ type: 'SET_LOADING', payload: true });
        if (customer) {
          const { data } = await axios.post("api/mongodb/wishlist/fetchProducts", customer);

          dispatch({ type: 'SET_ITEMS', payload: _.unionBy(storedItems, data.products, 'id' ) });
        }
        
        dispatch({ type: 'SET_LOADING', payload: false })
      } catch (error) {
        console.log({ error })
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    getDatabaseData();
  }, []);

  // Handlers
  const addItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
  };
  const removeItemHandler = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  const isInWishlistHandler = (id) => {
    return state.items?.some((item) => item.id === id);
  };
  const mergeProductsFromDb = async () => {
      try {
        const res = await fetchWishlistProductsService()
        const storedItems = res.storedItems;
        dispatch({ type: 'SET_ITEMS', payload: storedItems })  

        // If there is customer then fetch wishlist products from DB
        const customer = await store.get('customer') || null;
        dispatch({ type: 'SET_LOADING', payload: true });
        if (customer) {
          console.log({ customer })

          const { data } = await axios.post("/api/mongodb/wishlist/fetchProducts", customer)
         
          console.log({ data });

          dispatch({ type: 'SET_ITEMS', payload: _.unionBy(storedItems, data.products, 'id' ) });
        }

        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        console.log({ error })
        dispatch({ type: 'SET_LOADING', payload: false })
      }
  }

  // Returns
  return {
    state,
    addItemHandler,
    removeItemHandler,
    isInWishlistHandler,
    mergeProductsFromDb
  };
};

export const WishlistProvider = ({ children }) => {
  const {
    state,
    addItemHandler,
    removeItemHandler,
    isInWishlistHandler,
    mergeProductsFromDb
  } = useComparisonActions();

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        loading: state.loading,
        // loading: false,
        wishlistItemsCount: state.items?.length,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        isInWishlist: isInWishlistHandler,
        mergeProductsFromDb: mergeProductsFromDb
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
