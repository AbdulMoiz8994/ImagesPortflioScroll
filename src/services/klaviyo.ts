import axios from "axios";
import { alphaHost, frontendDomain, klaviyoToken } from "site-settings/site-credentials";
import getProductURI from "utils/getProductURI";

const TRACK_URL = 'https://a.klaviyo.com/api/track';

export async function trackStartedCartActivity(email, product) {
  console.log({ email, product, url: `${frontendDomain}/${getProductURI(product.permalink)}` })

  const data = {
    token: "QTWded", 
    event: "Started Cart", 
    customer_properties: {
      "$email": email
    }, 
    properties: {
      "ProductName": product.name,
      "ProductID": product.id,
      "Price": product.price,
      "ProductURL": `${frontendDomain}/${getProductURI(product.permalink)}`
    }
  };

  const encodedParams = new URLSearchParams();
  encodedParams.set('data', JSON.stringify(data));

  const url = TRACK_URL;
  const options = {
    method: 'POST',
    headers: {Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded'},
    body: encodedParams
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));


  // ❌ It doesn't work, gives cors error 
  // try {
  //   const res = await axios.post(`${URL}/track`, data, { headers: { 
  //     'Access-Control-Allow-Origin': 'http://localhost:3000/',
  //     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  //   } });

  //   console.log("Started Checkout Works :: ", { res }); 
  //   return { res }
  // } catch (error) {
  //   console.log("Started Checkout Not Works :: ", { error });
  // }
} 


export async function trackStartedCheckoutActivity(email, cartPrice) {
  const data = {
    token: "QTWded", 
    event: "Started Checkout", 
    customer_properties: {
      "$email": email
    }, 
    properties: {
      "Price": cartPrice,
    }
  };

  const encodedParams = new URLSearchParams();
  encodedParams.set('data', JSON.stringify(data));

  const url = TRACK_URL;
  const options = {
    method: 'POST',
    headers: {Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded'},
    body: encodedParams
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));


  // ❌ It doesn't work, gives cors error 
  // try {
  //   const res = await axios.post(`${URL}/track`, data, { headers: { 
  //     'Access-Control-Allow-Origin': 'http://localhost:3000/',
  //     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  //   } });

  //   console.log("Started Checkout Works :: ", { res }); 
  //   return { res }
  // } catch (error) {
  //   console.log("Started Checkout Not Works :: ", { error });
  // }
} 

export async function trackPlacedOrderActivity(email, orderId, cartPrice) {
  const data = {
    token: "QTWded", 
    event: "Placed Order", 
    customer_properties: {
      "$email": email
    }, 
    properties: {
      "orderId": orderId,
      "Price": cartPrice,
    }
  };

  const encodedParams = new URLSearchParams();
  encodedParams.set('data', JSON.stringify(data));

  const url = TRACK_URL;
  const options = {
    method: 'POST',
    headers: {Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded'},
    body: encodedParams
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));


  // ❌ It doesn't work, gives cors error 
  // try {
  //   const res = await axios.post(`${URL}/track`, data, { headers: { 
  //     'Access-Control-Allow-Origin': 'http://localhost:3000/',
  //     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  //   } });

  //   console.log("Started Checkout Works :: ", { res }); 
  //   return { res }
  // } catch (error) {
  //   console.log("Started Checkout Not Works :: ", { error });
  // }
} 

export async function trackViewedProductActivity(email, product) {
  console.log({ email, product, url: `${frontendDomain}/${getProductURI(product.permalink)}` })

  const data = {
    token: klaviyoToken, 
    event: "Viewed Product", 
    customer_properties: {
      "$email": email
    }, 
    properties: {
      "ProductName": product.name,
      "ProductID": product.id,
      "Price": product.price,
      "ProductURL": `${frontendDomain}/${getProductURI(product.permalink)}`
    }
  };

  const encodedParams = new URLSearchParams();
  encodedParams.set('data', JSON.stringify(data));

  const url = TRACK_URL;
  const options = {
    method: 'POST',
    headers: {Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded'},
    body: encodedParams
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));

  // ❌ It doesn't work, gives cors error 
  // try {
  //   const res = await axios.post(`${URL}/track`, data);

  //   console.log("Started Checkout Works :: ", { res }); 
  //   return { res }
  // } catch (error) {
  //   console.log("Started Checkout Not Works :: ", { error });
  // }
} 