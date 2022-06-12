import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';

const WooCommerce_v2 = new WooCommerceRestApi({
  url: siteURL,
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  // version: 'wc/v3'
  version: 'wc/v2',
  axiosConfig: {
	  headers: {}
	}
});

export default WooCommerce_v2;