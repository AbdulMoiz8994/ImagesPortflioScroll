import store from 'store-js';

const ITEMS = "compareProducts";

export async function fetchCompareProductsService() {
   try {
      let storedItems = await store.get(ITEMS) || [];

      return { storedItems };
   } catch (err) {
      console.log({ error: err });
      return { error: err.message };
   }
}

export async function setCompareProductsService(item) {  
   try {
      const items = await store.get(ITEMS) || [];
      items.push(item);

      const storedItems = await store.set(ITEMS, items);
      return { storedItems };
   } catch (err) {
      console.log({ error: err });
      return { error: err.message };
   }
}

export async function removeCompareProductService(id) {
   try {
      let storedItems = await store.get(ITEMS) || [];
      if (storedItems.length === 0) return { storedItems };

      const restItems = storedItems.filter(item => item.id !== id);
      storedItems = await store.set(ITEMS, restItems)

      return { storedItems };
   } catch (err) {
      console.log({ error: err });
      return { error: err.message };
   }
}
