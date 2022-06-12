import axios from "axios";
import { consumerKey, consumerSecret, siteURL } from "site-settings/site-credentials";

export async function createOrder(data) {
  try {
    const res = await axios.post(`${siteURL}/wp-json/wc/v3/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`, data)
    return {
      status: res.status,
      resData: res.data,
      // status: 201
    }  
  } catch (error) {
    console.log({ error });
    return {
      error: error.message
    }
  }
}

export function getOrderFromLocalStorage() {
  return JSON.parse(localStorage.getItem('order'));
};
export function removeOrderFromLocalStorage() {
  localStorage.removeItem('order')
};
export function storeOrderInLocalStorage(order) {
  localStorage.setItem('order', JSON.stringify(order));
}

export async function updateOrder(id, data) {
  try {
    const { data: order } = await axios.put(`${siteURL}/wp-json/wc/v3/orders/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`, data)

    return { order }
  } catch (error) {
    console.log('/services/order/updateOrder :: ', { error });
    return { error: 'Something went wrong...' }
  }
}