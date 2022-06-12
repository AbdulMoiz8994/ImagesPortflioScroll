// import client from "GraphQL/apollo-client";
// import { GET_CATEGORYDATA_FROM_CATEGORY } from "GraphQL/Queries";
import axios from 'axios';
import WooCommerce from "lib/woocommerce";
import { consumerKey, consumerSecret, siteURL } from "site-settings/site-credentials";

// export async function getCategoryData({ uri }) {
//   const { data } = await client.query(({
//     query: GET_CATEGORYDATA_FROM_CATEGORY,
//     variables: { id: uri }
//   }))

//   return data;
// }

export async function getAllWCCategories() {
  const categories = [];
  let page = 1;

  while (true) {
    const { data } = await axios.get(`${siteURL}/wp-json/wc/v3/products/categories?per_page=100&page=${page}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
    categories.push(...data);
    
    if (data.length < 100) {
      break;
    }

    console.log("Page no." + page + " of categories created succesffuly")
    
    page++
  }

  return categories;
}