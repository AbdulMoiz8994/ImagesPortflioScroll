export const HOME_PAGE = '/';
export const GROCERY_PAGE = '/grocery';
export const GROCERY_PAGE_TWO = '/grocery-two';
export const MAKEUP_PAGE = '/makeup';
export const CLOTHING_PAGE = '/clothing';
export const BAGS_PAGE = '/bags';
export const BAKERY_PAGE = '/bakery';
export const BOOK_PAGE = '/book';
export const FURNITURE_PAGE = '/furniture';
export const FURNITURE_PAGE_TWO = '/furniture-two';
export const MEDICINE_PAGE = '/medicine';
export const RESTAURANT_PAGE = '/restaurant';
export const REQUEST_MEDICINE_PAGE = '/request-medicine';
export const CHECKOUT_PAGE = '/checkout';
export const CHECKOUT_PAGE_TWO = '/checkout-alternative';
export const PROFILE_PAGE = '/profile';
export const YOUR_ORDER_PAGE = '/order';
export const ORDER_RECEIVED_PAGE = '/order-received';
export const OFFER_PAGE = '/offer';
export const TERMS_AND_SERVICES_PAGE = '/terms';
export const PRIVACY_POLICY_PAGE = '/privacy';

export const FAQ = "/sixnes-erwtiseis";
export const BRANDS = "/brand";
export const RETURNS_AND_GUARANTEES = "/epistrofes-proionton"
export const PAYMENT_METHODS = "/tropoi-plirwmis";
export const SHIPPING_METHODS = "/tropoi-apostolis"
export const ORDER_PROCESS = "/order"
export const HELP_PAGE = '/help';
export const SERVICES_PAGE = '/eggiisis-service'
export const CONTACT_PAGE = '/epikoinonia'
export const ORDER_TRACKING_PAGE = '/order-tracking'
export const TECHNICAL_ASSISTANCE_PAGE = '/texniki-ipostirixi'
export const SPARE_PARTS_PAGE = '/antallaktika'
export const PRODUCTS_ON_SALE_PAGE = '/products-on-sale'
export const GADGETS_PAGE = '/gadgets'
export const GIFT_IDEA_PAGE = '/products-for-gifts'
export const PRODUCTS_PURCHASING_ASSISTANT_PAGE = '/products-purchasing-assistant'
export const TERMS_AND_CONDITIONS_PAGE = '/oroi-xrisis'
export const GDPR_PAGE = '/prostasia-prosopikon-dedomenon-gdpr'

// Mobile Drawer Menus

export const HOME_MENU_ITEM = {
  id: 'nav.home',
  defaultMessage: 'Home',
  href: HOME_PAGE,
};

export const FAQ_MENU_ITEM = {
  id: 'nav.faq',
  defaultMessage: 'FAQ',
  href: FAQ,
};
export const BRANDS_MENU_ITEM = {
  id: 'nav.brands',
  defaultMessage: 'Brands',
  href: BRANDS,
};
export const RETURNS_AND_GUARANTEES_MENU_ITEM = {
  id: 'nav.returns',
  defaultMessage: 'Returns and Guarantees',
  href: RETURNS_AND_GUARANTEES,
};
export const PAYMENT_METHODS_MENU_ITEM = {
  id: 'nav.paymentMethods',
  defaultMessage: 'Payment Methods',
  href: PAYMENT_METHODS,
};
export const SHIPPING_METHODS_MENU_ITEM = {
  id: 'nav.shippingMethod',
  defaultMessage: 'Shipping Methods',
  href: SHIPPING_METHODS,
};
export const ORDER_PROCESS_MENU_ITEM = {
  id: 'nav.orderProcess',
  defaultMessage: 'Order Process',
  href: ORDER_PROCESS,
};
export const HELP_MENU_ITEM = {
  id: 'nav.help',
  defaultMessage: 'Help',
  href: HELP_PAGE,
};
export const SERVICES_MENU_ITEM = {
  id: 'nav.services',
  defaultMessage: 'Services',
  href: SERVICES_PAGE,
};
export const CONTACT_MENU_ITEM = {
  id: 'nav.contactUs',
  defaultMessage: 'Contact Us',
  href: CONTACT_PAGE,
};
export const ORDER_TRACKING_MENU_ITEM = {
  id: 'nav.orderTracking',
  defaultMessage: 'Order Tracking',
  href: ORDER_TRACKING_PAGE,
};
export const TECHNICAL_ASSISTANCE_MENU_ITEM = {
  id: 'nav.technicalAssistance',
  defaultMessage: 'Technical Assistance',
  href: TECHNICAL_ASSISTANCE_PAGE,
};
export const SPARE_PARTS_MENU_ITEM = {
  id: 'nav.spareParts',
  defaultMessage: 'Spare Parts',
  href: SPARE_PARTS_PAGE,
};
export const PRODUCTS_ON_SALE_ITEM = {
  id: 'drawer.offers',
  defaultMessage: 'Offers',
  href: PRODUCTS_ON_SALE_PAGE,
};
export const GADGETS_ITEM = {
  id: 'nav.gadgets',
  defaultMessage: 'Gadgets',
  href: GADGETS_PAGE,
};
export const GIFT_IDEA_ITEM = {
  id: 'drawer.giftIdeas',
  defaultMessage: 'Gift Idea',
  href: GIFT_IDEA_PAGE,
};
export const PRODUCTS_PURCHASING_ASSISTANTS_ITEM = {
  id: 'drawer.guides',
  defaultMessage: 'Products Purchasing Assistants',
  href: PRODUCTS_PURCHASING_ASSISTANT_PAGE,
};

export const OFFER_MENU_ITEM = {
  id: 'nav.offer',
  href: OFFER_PAGE,
  defaultMessage: 'Offer',
};
export const ORDER_MENU_ITEM = {
  // id: 'nav.order',
  id: 'nav.authMenu.order',
  href: YOUR_ORDER_PAGE,
  defaultMessage: 'Order',
};
export const REQUEST_MEDICINE_MENU_ITEM = {
  id: 'nav.request_medicine',
  defaultMessage: 'Request Medicine',
  href: REQUEST_MEDICINE_PAGE,
};
export const PROFILE_MENU_ITEM = {
  // id: 'nav.profile',
  id: 'nav.authMenu.profile',
  defaultMessage: 'Profile',
  href: PROFILE_PAGE,
};
export const TERMS_AND_CONDITIONS = {
  id: 'nav.terms',
  defaultMessage: 'Terms and Conditions',
  href: TERMS_AND_CONDITIONS_PAGE
}
export const GDPR = {
  id: 'nav.GDPR',
  defaultMessage: 'GDPR',
  href: GDPR_PAGE
}

export const AUTHORIZED_MENU_ITEMS = [
  PROFILE_MENU_ITEM,
  ORDER_MENU_ITEM
  // {
  //   id: 'nav.checkout',
  //   defaultMessage: 'Checkout',
  //   href: CHECKOUT_PAGE,
  // },
  // {
  //   id: 'alternativeCheckout',
  //   href: CHECKOUT_PAGE_TWO,
  //   defaultMessage: 'Checkout Alternative',
  // },
  // ORDER_MENU_ITEM,
  // {
  //   id: 'nav.order_received',
  //   href: ORDER_RECEIVED_PAGE,
  //   defaultMessage: 'Order invoice',
  // },
  // {
  //   id: 'nav.terms_and_services',
  //   defaultMessage: 'Terms and Services',
  //   href: TERMS_AND_SERVICES_PAGE,
  // },
  // {
  //   id: 'nav.privacy_policy',
  //   defaultMessage: 'Privacy Policy',
  //   href: PRIVACY_POLICY_PAGE,
  // },
];


// category menu items for header navigation
export const CATEGORY_MENU_ITEMS = [
  {
    id: 'nav.grocery',
    href: GROCERY_PAGE,
    defaultMessage: 'Grocery',
    icon: 'FruitsVegetable',
    dynamic: true,
  },
  {
    id: 'nav.grocery-two',
    href: GROCERY_PAGE_TWO,
    defaultMessage: 'Grocery Two',
    icon: 'FruitsVegetable',
    dynamic: false,
  },
  {
    id: 'nav.bakery',
    href: BAKERY_PAGE,
    defaultMessage: 'Bakery',
    icon: 'Bakery',
    dynamic: false,
  },
  {
    id: 'nav.makeup',
    defaultMessage: 'Makeup',
    href: MAKEUP_PAGE,
    icon: 'FacialCare',
    dynamic: true,
  },
  {
    id: 'nav.bags',
    defaultMessage: 'Bags',
    href: BAGS_PAGE,
    icon: 'Handbag',
    dynamic: true,
  },
  {
    id: 'nav.clothing',
    defaultMessage: 'Clothing',
    href: CLOTHING_PAGE,
    icon: 'DressIcon',
    dynamic: true,
  },
  {
    id: 'nav.furniture',
    defaultMessage: 'Furniture',
    href: FURNITURE_PAGE,
    icon: 'FurnitureIcon',
    dynamic: true,
  },
  {
    id: 'nav.furniture-two',
    defaultMessage: 'Furniture Two',
    href: FURNITURE_PAGE_TWO,
    icon: 'FurnitureIcon',
    dynamic: false,
  },
  {
    id: 'nav.book',
    defaultMessage: 'Book',
    href: BOOK_PAGE,
    icon: 'BookIcon',
    dynamic: true,
  },
  {
    id: 'nav.medicine',
    defaultMessage: 'Medicine',
    href: MEDICINE_PAGE,
    icon: 'MedicineIcon',
    dynamic: true,
  },
];

export const MOBILE_DRAWER_MENU = [
  ...AUTHORIZED_MENU_ITEMS,
];

export const PROFILE_SIDEBAR_TOP_MENU = [ORDER_MENU_ITEM, HELP_MENU_ITEM];
export const PROFILE_SIDEBAR_BOTTOM_MENU = [PROFILE_MENU_ITEM];

export const LANGUAGE_MENU = [
  {
    id: 'ar',
    defaultMessage: 'Arabic',
    icon: 'SAFlag',
  },
  {
    id: 'zh',
    defaultMessage: 'Chinese',
    icon: 'CNFlag',
  },
  {
    id: 'en',
    defaultMessage: 'English',
    icon: 'USFlag',
  },
  {
    id: 'de',
    defaultMessage: 'German',
    icon: 'DEFlag',
  },
  {
    id: 'he',
    defaultMessage: 'Hebrew',
    icon: 'ILFlag',
  },
  {
    id: 'es',
    defaultMessage: 'Spanish',
    icon: 'ESFlag',
  },
];
