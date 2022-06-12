import React, { useReducer, useContext, createContext, useState } from 'react';
import { useEffect } from 'react';
import { reducer } from './category.reducer';

// 1- Context intialization
const CategoryContext = createContext({} as any);

// 2- Custom hook for state management
const useComparisonActions = () => {
  const [noOfProducts, setNoOfProducts] = useState(100);
  const [noOfPages, setNoOfPages] = useState(2);
  const [productsPerPage, setProductsPerPage] = useState(36);
  const [totalProducts, setTotalProducts] = useState(0);

  const handleChangeNoOfProducts = (noOfItems) => {
    // dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
    console.log("No Of Items: ", { noOfItems })
  };

  const handleChangeProductsPerPage = (noOfItems) => {
    setProductsPerPage(noOfItems)
  };

  const handleChangeNoOfPages = (noOfItems) => {
    setNoOfPages(noOfItems);
  }

  const handleChangeTotalProducts = (totalProducts) => {
    setTotalProducts(totalProducts);
  }

  return {
    state: { noOfProducts, noOfPages, productsPerPage, totalProducts },
    handleChangeNoOfProducts,
    handleChangeProductsPerPage,
    handleChangeNoOfPages,
    handleChangeTotalProducts
  };
};

// 3- Actual provider that will pass values publicaly
export const CategoryPageProvider = ({ children }) => {
  const {
    state,
    handleChangeNoOfProducts,
    handleChangeProductsPerPage,
    handleChangeNoOfPages,
    handleChangeTotalProducts
  } = useComparisonActions();

  return (
    <CategoryContext.Provider
      value={{
        noOfProducts: state.noOfProducts,
        noOfPages: state.noOfPages,
        productsPerPage: state.productsPerPage,
        totalProducts: state.totalProducts,
        onChangeNoOfProducts: handleChangeNoOfProducts,
        onChangeProductsPerPage: handleChangeProductsPerPage,
        onChangeNoOfPages: handleChangeNoOfPages,
        onChangeTotalProducts: handleChangeTotalProducts,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryPage = () => useContext(CategoryContext);
