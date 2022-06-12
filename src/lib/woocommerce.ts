import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';

const WooCommerce = new WooCommerceRestApi({
  url: siteURL,
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  version: 'wc/v3',
  axiosConfig: {
	  headers: {}
	}
  // version: 'wc/v2'
});



export default WooCommerce;