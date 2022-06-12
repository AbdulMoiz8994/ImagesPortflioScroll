
// Copied from myventema
import React, { useState, useEffect } from 'react';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import {
  DesktopView,
  MobileView,
  OrderBox,
  OrderListWrapper,
  OrderList,
  OrderDetailsWrapper,
  Title,
  ImageWrapper,
  ItemWrapper,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemPrice,
  NoOrderFound,
} from './order.style';

import OrderDetails from './order-details/order-details';
import OrderCard from './order-card/order-card';
import OrderCardMobile from './order-card/order-card-mobile';
import useComponentSize from 'utils/useComponentSize';
import { FormattedMessage } from 'react-intl';
import ErrorMessage from 'components/error-message/error-message';
import useSWR from 'swr';
import WooCommerce from 'lib/woocommerce';
import { Alert, AlertIcon, Container } from '@chakra-ui/react';
import Loader from 'components/loader/loader';
import axios from 'axios';
import dateFormat from 'dateformat';
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';
import Link from 'next/link'
import getProductURI from 'utils/getProductURI';
import currencyFormatter from 'currency-formatter'
import { getBillingTypeFromMetaData, getVoucherNumberFromMetaData } from 'utils/orders_utils';

const progressData = ['processing', 'apodoxi', 'to-ship', 'completed', 'deliverycompleted']

const orderTableColumns = [
  {
    title: <FormattedMessage id='ordersPage.items' defaultMessage='Items' />,
    dataIndex: '',
    key: 'items',
    width: 250,
    ellipsis: true,
    render: (text, record) => {
      return (
        <ItemWrapper>
          <ImageWrapper>
            <img src={record.image} />
          </ImageWrapper>

          <ItemDetails>
            <Link href={getProductURI(record.permalink)} passHref>
              <a>
                <ItemName>{record.title}</ItemName>
              </a>
            </Link>
            <ItemSize>{record.weight}</ItemSize>
            <ItemPrice>€ {currencyFormatter.format(record.price, {})}</ItemPrice>
          </ItemDetails>
        </ItemWrapper>
      );
    },
  },
  {
    title: (
      <FormattedMessage id='ordersPage.Quantity' defaultMessage='Quantity' />
    ),
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 100,
  },
  {
    title: <FormattedMessage id='ordersPage.Price' defaultMessage='Price' />,
    dataIndex: '',
    key: 'price',
    align: 'right',
    width: 100,
    render: (text, record) => {
      return <p style={{fontSize: '18px'}}>€ {record.total}</p>;
    },
  },
];

interface Props {
  customer: any
}
const OrdersContent: React.FC<Props> = ({ customer }) => {
  const [targetRef, size] = useComponentSize();
  const orderListHeight = size.height - 79;
  const { data, mutate, error } = useSWR(`${siteURL}/wp-json/wc/v3/orders?customer=${customer?.id}&per_page=50&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`, (url) => fetch(url).then((res) => res.json()));
  const [selection, setSelection] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderStatusIndex, setOrderStatusIndex] = useState(1);
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    if (data?.length) {
      setSelection(data[0]);
    }
  }, [data?.length]);
  
  useEffect(() => {
    if (!selection) return null;
    
    const products = selection.line_items;

    getOrderProductsAsync(products);
    getOrderStatus(selection);
    
    async function getOrderStatus(order) {
      const status = order.status;
  
      const index = progressData.findIndex(step => step === status);
      setOrderStatusIndex(index + 1);
      setOrderStatus(status);
    }
    async function getOrderProductsAsync(productsData) {
      let products = [];
      try {
        products = await Promise.all(productsData.map(async (productData) => {
          const { data: product } = await axios.get(`${siteURL}/wp-json/wc/v3/products/${productData.product_id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
          return product;
        }))  
      } catch (error) {
        console.log("/order -> getOrderProductsAsync :: ", { error })
        setOrderProducts([]);
        return;
      }
  
      const schemaProducts = await productsData.map((product: any) => {
        const targetProduct: any = products.find((prod: any) => prod.id === product.product_id);
        const imgURL = targetProduct?.images?.[0]?.src
        
        return { 
          id: product.id,
          permalink: targetProduct?.permalink || "",
          image: imgURL,
          price: product.price,
          title: product.name,
          total: product.total,
          quantity: product.quantity
        }
      })
  
      setOrderProducts(schemaProducts);
    }
  }, [selection]);

    if (!data) return <Container centerContent>
      <Loader />
    </Container>;
    
    return (
      <OrderBox>
      <DesktopView>
        <OrderListWrapper style={{ height: size.height }}>
          <Title style={{ padding: '0 20px' }}>
            <FormattedMessage
              id='ordersPage.myOrder'
              defaultMessage='My Order'
            />
          </Title>

          <Scrollbar className='order-scrollbar'>
            <OrderList>
              {data.length !== 0 ? (
                data.map((current: any) => (
                  <OrderCard
                    key={current.id}
                    orderId={current.id}
                    className={current.id === selection?.id ? 'active' : ''}
                    status={current.status}
                    date={dateFormat(current.date_created, "dd/mm/yyyy")}
                    deliveryTime="1-3 εργάσιμες"
                    amount={current.total}
                    onClick={() => setSelection(current)}
                  />
                ))
              ) : (
                <NoOrderFound>
                  <FormattedMessage
                    id='ordersPage.noOrder'
                    defaultMessage='No order found'
                  />
                </NoOrderFound>
              )}
            </OrderList>
          </Scrollbar>
        </OrderListWrapper>

        <OrderDetailsWrapper ref={targetRef}>
          <Title style={{ padding: '0 20px' }}>
            <FormattedMessage
              id='ordersPage.OrderDetails'
              defaultMessage='Order Details'
            />
          </Title>
          {selection && (
            <OrderDetails
              progressStatus={orderStatusIndex}
              progressData={progressData}
              orderStatus={orderStatus}
              phoneNumber={selection?.shipping?.phone || selection?.billing?.phone}
              fullName={`${selection?.billing.first_name} ${selection?.billing.last_name}`}
              address={`${selection.shipping?.address_1} ${selection.shipping?.city} ${selection.shipping?.postcode}`}
              subtotal={selection.line_items.map(product => product.total).reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue)).toString()}
              discount={0}
              deliveryFee={selection.shipping_total}
              grandTotal={selection.total}
              tableData={orderProducts}
              columns={orderTableColumns}
              taxTotal={selection.total_tax}
              paymentMethod={selection.payment_method_title}
              billingType={getBillingTypeFromMetaData(selection.meta_data)}
              invoiceVoucherNumber={getVoucherNumberFromMetaData(selection.meta_data)}
              shippingMethod={selection?.shipping_lines?.[0]?.method_title}
            />
          )}
        </OrderDetailsWrapper>
      </DesktopView>

      <MobileView>
        {data.length > 0 ? <OrderList>
          <OrderCardMobile
            orders={data}
            // className={order && order.id === active ? 'active' : ''}
            tableData={orderProducts}
            progressData={progressData}
            columns={orderTableColumns}
            onClick={setSelection}
          />
        </OrderList> : <Alert status='warning'>
          <AlertIcon />
          Δεν βρέθηκε καμία παραγγελία  
        </Alert>}
      </MobileView>
    </OrderBox>
  );
};

export default OrdersContent;