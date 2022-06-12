import axios from "axios";
import { consumerKey, consumerSecret, siteURL } from "site-settings/site-credentials";

export function hasProductSpecialCategory(products: any[], categorySlug: string) {
  const product: boolean = products.some(product => product?.categories?.some(category => category.slug === categorySlug));

  return product;
}

export function getVariationCodesFromProdAttributes(attributes: any[]): any[] {
  const variations = attributes.find(attr => attr.name === "κωδικός-προϊόντος");

  if (!variations) return [];

  return variations.options
}

export function getWarrantyFromProdAttributes(attributes: any[]) {
  if (!attributes || attributes.length === 0) return null;

  const warranty = attributes.find(attr => attr.name === "Εγγύηση");
  if (!warranty) return null;

  return warranty
}

export function getBrandFromProdAttributes(attributes: any[]) {
  if (attributes.length === 0) return null;
  
  const brand = attributes.find(att => att.name === "Εταιρεία");
  return brand
}
export function getAvailabilityFromProdAttributes(attributes: any[]) {
  const attribute = attributes.find(attr => attr.name === "Διαθεσιμότητα");
		if (!attribute) return 'Διαθεσιμότητα';
		
		return attribute.options[0];
}

export async function getProductsByIds(ids: any[]) {
  let products = [];
  try {
    products = await Promise.all(ids.map(async (id) => {
      const { data: product } = await axios.get(`${siteURL}/wp-json/wc/v3/products/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
      return product;
    }))  
  } catch (error) {
    console.log("/order -> getOrderProductsAsync :: ", { error })
    return;
  }

  return products
}
export function getProductCostFromMetaData(metaData: any[], productType: "simple" | "variable") {
  if (productType === "variable") {
    const costData = metaData.find(data => data.key === "_wc_cog_cost_variable");
    return costData
  } 
  const costData = metaData.find(data => data.key === "_wc_cog_cost");
  return costData;
}

export function isProductOutOfStock(product) {
  // Nick: If there is not attribute 'Διαθεσιμότητα' then consider it as a out-of-stock
  const availabilityAttribute = product.attributes.find(attr => attr.name === "Διαθεσιμότητα");
  if (!availabilityAttribute) return true;

  // If backorder is allowed or quantity is more than 0 than consider in in-stock
  if (product.stock_status === "instock" || product.backorders_allowed || (product?.stock_quantity > 0)) return false;

  return true
}

export function isProductAbleToAddToCart(product, currQuantity, prevQuantity) {
  if (product.backorders_allowed || product.stock_quantity === null || (prevQuantity < product.stock_quantity && (currQuantity + prevQuantity) <= product.stock_quantity)) return true;

  return false;
}

export function isProductAbleToIncrement(product, quantity) {
  if (product.backorders_allowed || product.stock_quantity === null || quantity < product.stock_quantity) return true;
  
  return false
}