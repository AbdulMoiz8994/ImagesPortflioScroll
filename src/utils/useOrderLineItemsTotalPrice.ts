import { useState, useEffect } from 'react'

const useOrderLineItemsTotalPrice = (line_items) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (line_items.length === 0) {
      setTotalPrice(0);
      return;
    }

    const total = line_items.map(item => parseFloat(item.total)).reduce((acc, curr) => acc + curr);
    setTotalPrice(total);
  }, [line_items]);

  return totalPrice
}

export default useOrderLineItemsTotalPrice