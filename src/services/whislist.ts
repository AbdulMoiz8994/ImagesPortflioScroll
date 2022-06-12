import axios from 'axios';
import store from 'store-js';

const ITEMS = "wishlistProducts";

export async function fetchWishlistProductsService() {
   try {
      let storedItems = await store.get(ITEMS) || [];

      return { storedItems };
   } catch (err) {
      console.log({ error: err });
      return { error: err.message };
   }
}

export async function setWishlistProductsService(item) {  
   try {
      // Storing products in localStorage
      const items = await store.get(ITEMS) || [];
      items.push(item);
      const storedItems = await store.set(ITEMS, items);

      //If user is customer then store product in DB
      const customer = await store.get('customer') || null;
      if (customer) {
         await axios.post("api/mongodb/wishlist/insertProduct", {...item, customerId: customer.id});
      }  

      return { storedItems };
   } catch (err) {
      console.log({ error: err });
      return { error: err.message };
   }
}

export async function removeWishlistProductsService(id) {
   try {
      let storedItems = await store.get(ITEMS) || [];
      if (storedItems.length === 0) return { storedItems };
      const restItems = storedItems.filter(item => item.id !== id);
      storedItems = await store.set(ITEMS, restItems);

      const customer = await store.get('customer') || null;
      if (customer) {
         await axios.post("api/mongodb/wishlist/deleteProduct", {productId: id, customerId: customer.id});
      }

      return { storedItems };
   } catch (err) {
      console.log({ error: err });
      return { error: err.message };
   }
}
