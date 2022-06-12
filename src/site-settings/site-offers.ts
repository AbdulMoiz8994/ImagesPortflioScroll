import ShippingMethodBanner from 'assets/images/promotion/τρόποι αποστολής.jpg';
import GadgetsBanner from 'assets/images/promotion/smart home banner.jpg';
import OffersBanner from 'assets/images/promotion/offers banner.jpg';

import { GADGETS_ITEM, PRODUCTS_ON_SALE_ITEM, SHIPPING_METHODS_MENU_ITEM } from './site-navigation';

export const siteOffers = [
  {
    id: '1',
    imgSrc: ShippingMethodBanner,
    alt: 'Shipping Methods',
    href: SHIPPING_METHODS_MENU_ITEM.href
  },
  {
    id: '2',
    imgSrc: GadgetsBanner,
    alt: 'Gadgets',
    href: "/smarthome"
  },
  {
    id: '3',
    imgSrc: OffersBanner,
    alt: 'Offers',
    href: PRODUCTS_ON_SALE_ITEM.href
  },
];
