import axios from "axios";
import WooCommerce from "lib/woocommerce";
import algoliasearch from 'algoliasearch';
import { algoliaApiKey, algoliaAppId, consumerKey, consumerSecret, siteURL } from "site-settings/site-credentials";

const searchClient = algoliasearch(algoliaAppId,algoliaApiKey)
const index = searchClient.initIndex('products');

export async function fetchProductBySlug(productSlug) {
  try {
    const { data: products } = await axios.get(`${siteURL}/wp-json/wc/v3/products?slug=${productSlug}&consumer_secret=${consumerSecret}&consumer_key=${consumerKey}`)
    if (products.length === 0) return { product: null };
    return { product: products[0] }
  } catch (error) {
    console.log("/services/products/fetchProductBySlug :: ", { error });
    return { error: 'Something went wrong...' }
  }
}

export async function createProductReview(data) {
//   console.log({ data });

  try {
     const { data: responseData } = await axios.post(`${siteURL}/wc/v3/products/reviews?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`, data);

     return { data: responseData }
  } catch (error) {
     console.log("retrieveProduct :: ", error)
     return { error: 'Something went wrong!' };
  }
}
export async function getAllWCProducts({ shouldFilter }) {  
  const products = [];
  let page = 1;

  while (true) {
    const { data } = await axios.get(`${siteURL}/wp-json/wc/v3/products?per_page=100&page=${page}&status=publish&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
    const mappedData = data.map(item => ({ 
      id: item.id,
      name: item.name, 
      short_description: item.short_description,
      attributes: item.attributes,
      slug: item.slug,
      permalink: item.permalink,
      status: item.status,
      type: item.type,
      featured: item.featured,
      catalog_visibility: item.catalog_visibility,
      sku: item.sku,
      price: parseFloat(item.price),
      regular_price: item.regular_price,
      sale_price: item.sale_price,
      on_sale: item.on_sale,
      stock_quantity: item.stock_quantity,
      stock_status: item.stock_status,
      backorders: item.backorders,
      backorders_allowed: item.backorders_allowed,
      backordered: item.backordered,
      categories: item.categories,
      tags: item.tags,
      images: item.images,
      date_created: new Date(item.date_created).getTime()
    }));

    if (!!shouldFilter) {
      // Only the products that have images inside
      const filteredData = mappedData.filter(product => product.images.length > 0);
      products.push(...filteredData);
    } else {
      products.push(...mappedData);
    }


    if (mappedData.length < 100) {
      break;
    }

    console.log("Page no." + page + " of products created succesffuly")
    
    page++
  }

  return products;
}

export async function getAllWCProducts1() {
   const products = [];
   let page = 1;
 
   while (true) {
     const { data } = await axios.get(`${siteURL}/wp-json/wc/v3/products?per_page=100&page=${page}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
    //  const filteredData = data.map(item => ({ title: item.name ,attributes: item.attributes }))
     products.push(...data);
      
    //  index.saveObjects(filteredData, { autoGenerateObjectIDIfNotExist: true }).then(({ objectIDs }) => {
    //   console.log(objectIDs);
    // });

     if (data.length < 100) {
       break;
     }
 
     console.log("Page no." + page + " of products created succesffuly")
     
     page++
   }
 
   return products;
 }