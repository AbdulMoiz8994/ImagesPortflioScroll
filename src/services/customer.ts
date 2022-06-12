import axios from "axios";
import WooCommerce from "lib/woocommerce";
import jwt from 'jwt-decode'
import { consumerKey, consumerSecret, siteURL } from "site-settings/site-credentials";

interface UpdateProps {
  id: number
  name: string
  surname: string
  email: string
  primaryPhone: string
  secondaryPhone: string
  address: string
  city: string
  postalCode: string
  region: string
}
export async function updateCustomer(data: UpdateProps) {
  const _data = {
    first_name: data.name,
    last_name: data.surname,
    billing: {
      first_name: data.name,
      last_name: data.surname,
      address_1: data.address,
      city: data.city,
      email: data.email,
      phone: data.primaryPhone,
      postcode: data.postalCode,
      state: data.region
    },
    shipping: {
      first_name: data.name,
      last_name: data.surname,
      address_1: data.address,
      city: data.city,
      email: data.email,
      phone: data.primaryPhone,
      postcode: data.postalCode,
      state: data.region
    }
  }
  
  try {
    const res = await axios.put(`${siteURL}/wp-json/wc/v3/customers/${data.id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`, _data);
    console.log({ res });

    if (res.status !== 200) throw new Error("Not success")

    localStorage.setItem("customer", JSON.stringify(res.data));

    return {
      customer: res.data
    }
  } catch (error) {
    console.log("/customers -> createCustomer :: ", { error });
    return { error: "Something went wrong!" };
  } 
}

export async function createCustomer(data) {
  try {
    const res = await 
      axios.post(`${siteURL}/wp-json/wc/v3/customers?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`, data);
    console.log({ res });


    if (res.status !== 201) throw new Error("Not success")

    // if (res.status === 201 || res.status === 200) {
      localStorage.setItem("customer", JSON.stringify(res.data));

      return {
        customer: res.data
      }
    // }

    // throw new Error("Not success");
  } catch (error) {
    console.log("/customers -> createCustomer :: ", { error });
    return { error: "Something went wrong!", status: error.response.status };
  }
}

export async function loginCustomer({ email, password }) {
  try {
    const { data } = await axios.post(`${siteURL}/wp-json/jwt-auth/v1/token`, { username: email, password });
    const user: any = jwt(data.token);
    const id = user?.data?.user?.id

    const { data: customer } = await axios.get(`${siteURL}/wp-json/wc/v3/customers/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);

    return { customer };
  } catch (error) {
    console.log("/customers -> loginCustomer :: ", { error })
    return { error: "Invalid credentials!" }
  }
}

export async function resetCustomerCode({email}) {
  try {
    const { data } = await axios.post(`${siteURL}/wp-json/bdpwr/v1/reset-password`, { email });
    
    return { data };
  } catch (error) {
    console.log("/customer/resetCustomerCode :: ", { error });
    return { error: 'Invalid email!'}
  }
}

export async function resetCustomerPasswordWithCode({email, code, newPassword}) {
  try {
    const { data } = await axios.post(`${siteURL}/wp-json/bdpwr/v1/set-password`, { email, password: newPassword, code });
    
    return { data };
  } catch (error) {
    console.log("/customer/resetCustomerCode :: ", { error });
    return { error: 'Something went wrong...'}
  }
}

export function getCustomerFromLocalStorage() {
  const stringifyCustomer = localStorage.getItem('customer');

  if (!stringifyCustomer) return null;

  return JSON.parse(stringifyCustomer);
}
