import { Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl';
import { isProductOutOfStock } from 'utils/products-utils';

const StockStatus = ({ product }) => {
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const customerFromLocalStorage = localStorage.getItem('customer');
    if (customerFromLocalStorage) {
      setCustomer(JSON.parse(customerFromLocalStorage))
    }
  }, []);

  if (product.stock_quantity < 1) return null;

  return (
    <>{(!isProductOutOfStock(product) && (customer?.role === "administrator" || customer?.role === "shop_manager" || product.stock_quantity < 10)) && <Text 
    color="whatsapp.600" fontSize="17px" fontWeight="semibold">
      <FormattedMessage id="ProductPage.onlyleftinstock" defaultMessage="Only left in stock" values={{ productQuantity: product.stock_quantity }} />
    </Text>}</>
  )
}

export default StockStatus