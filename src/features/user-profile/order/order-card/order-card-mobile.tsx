import React from 'react';
import Table from 'rc-table';
import Collapse, { Panel } from 'rc-collapse';
import Progress from 'components/progress-box/progress-box';

import {
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
  CardWrapper,
  OrderDetail,
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTable,
  OrderTableMobile,
} from './order-card.style';
import { CURRENCY } from 'utils/constant';
import { getOrderStatusLabel } from 'utils/getOrderStatusLabel';
import dateFormat from 'dateformat';
import { Alert, AlertIcon, HStack } from '@chakra-ui/react';
import { getBillingTypeFromMetaData, getVoucherNumberFromMetaData } from 'utils/orders_utils';

type MobileOrderCardProps = {
  orderId?: any;
  onClick?: (e: any) => void;
  className?: any;
  status?: any;
  date?: any;
  deliveryTime?: any;
  amount?: number;
  tableData?: any;
  columns?: any;
  progressData?: any;
  progressStatus?: any;
  address?: string;
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  grandTotal?: number;
  orders?: any;
};

const components = {
  table: OrderTable,
};

const OrderCard: React.FC<MobileOrderCardProps> = ({
  onClick,
  className,
  columns,
  progressData,
  orders,
  tableData
}) => {
  return (
    <>
      <Collapse
        accordion={true}
        className={`accordion ${className}`}
        defaultActiveKey="active"
      >
        {orders.map((order: any) => {
          const subTotal = order.line_items.map(product => product.total).reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue)).toString();
          const progressStatus = progressData.findIndex(step => step === order.status) + 1;
          const orderStatus = order.status;

          return (
            <Panel
              header={
                <CardWrapper onClick={() => onClick(order)}>
                  <OrderListHeader>
                    <TrackID>
                      Order <span>#{order.id}</span>
                    </TrackID>

                    <RenderStatus status={order.status} />
                  </OrderListHeader>
  
                  <OrderMeta>
                    <Meta>
                      Order Date: <span>{dateFormat(order.date_created, "ddd mmm dd, yyyy")}</span>
                    </Meta>
                    <Meta>
                      Delivery Time: <span>1-3 εργάσιμες</span>
                    </Meta>
                    <Meta className="price">
                      Total Price:
                      <span>
                        {CURRENCY}
                        {order.total}
                      </span>
                    </Meta>
                  </OrderMeta>
                </CardWrapper>
              }
              headerClass="accordion-title"
              key={order.id}
            >
              <OrderDetail>
                <DeliveryInfo>
                  <DeliveryAddress>
                    <h3>Delivery Address</h3>
                    <Address>{`${order?.billing.first_name} ${order?.billing.last_name}`}</Address>
                    <Address>{`${order.shipping?.address_1} ${order.shipping?.city} ${order.shipping?.postcode}`}</Address>
                    <Address>{order?.shipping?.phone || order?.billing?.phone}</Address>
                    <HStack>
                      <Address style={{ fontWeight: 'bold' }}>Μέθοδος Πληρωμής: </Address>
                      <Address>{order?.payment_method_title}</Address>
                    </HStack>
                    <HStack>
                      <Address style={{ fontWeight: 'bold' }}>Τύπος Παραστατικού: </Address>
                      <Address>{getBillingTypeFromMetaData(order.meta_data)}</Address>
                    </HStack>
                    {getVoucherNumberFromMetaData(order.meta_data) && <HStack>
                      <Address style={{ fontWeight: 'bold' }}>Voucher No: </Address>
                      <Address>{getVoucherNumberFromMetaData(order.meta_data)}</Address>
                    </HStack>}
                    {order?.shipping_lines?.[0]?.method_title && <HStack>
                      <Address style={{ fontWeight: 'bold' }}>Shipping: </Address>
                      <Address>{order?.shipping_lines?.[0]?.method_title}</Address>
                    </HStack>}
                  </DeliveryAddress>
  
                  <CostCalculation>
                    <PriceRow>
                      Subtotal
                      <Price>
                        {CURRENCY}
                        {parseFloat(subTotal).toFixed(2)}
                      </Price>
                    </PriceRow>
                    <PriceRow>
                      Tax Total
                      <Price>
                        {CURRENCY}
                        {order.total_tax}
                      </Price>
                    </PriceRow>
                    <PriceRow>
                      Delivery Fee
                      <Price>
                        {CURRENCY}
                        {order.shipping_total}
                      </Price>
                    </PriceRow>
                    <PriceRow className="grandTotal">
                      Total
                      <Price>
                        {CURRENCY}
                        {order.total}
                      </Price>
                    </PriceRow>
                  </CostCalculation>
                </DeliveryInfo>
  
                <ProgressWrapper>
                  {/* <Progress data={progressData} status={order.status} /> */}
                  <RenderProgressSection progressData={progressData} progressStatus={progressStatus} orderStatus={orderStatus} />
                </ProgressWrapper>
  
                <OrderTableMobile>
                  <Table
                    columns={columns}
                    data={tableData}
                    rowKey={(record) => record.id}
                    components={components}
                    scroll={{ x: 450 }}
                    // scroll={{ y: 250 }}
                  />
                </OrderTableMobile>
              </OrderDetail>
            </Panel>
          )
        })}
      </Collapse>
    </>
  );
};

function RenderStatus({ status }) {
  if (status === "refunded" || status === "cancelled" || status === "failed") return (
    // Red
    <Status style={{ backgroundColor: '#e35453', color: 'white', fontWeight: 500 }}>{getOrderStatusLabel(status).label}</Status>
  )
  if (status === "apodoxi") return (
    // Black
    <Status style={{ backgroundColor: '#1B1B1B', color: 'white', fontWeight: 500 }}>{getOrderStatusLabel(status).label}</Status>
  )
  if (status === "completed") return (
    // Dark blue
    <Status style={{ backgroundColor: '#2a52be', color: 'white', fontWeight: 500 }}>{getOrderStatusLabel(status).label}</Status>
  )
  if (status === "deliverycompleted") return (
    // Green
    <Status style={{ backgroundColor: '#00AB66', color: 'white', fontWeight: 500 }}>{getOrderStatusLabel(status).label}</Status>
  )

  return <Status>{getOrderStatusLabel(status).label}</Status>
}

function RenderProgressSection({ progressData, progressStatus, orderStatus }) {
  if (orderStatus === "on-hold") return (
    <Alert colorScheme="orange">
      <AlertIcon />
      Your order is on hold
    </Alert>
  )

  if (orderStatus === "paralavi") return (
    <Alert status="warning">
      <AlertIcon />
      Your order is on Paralavi
    </Alert>
  )

  if (orderStatus === "refunded") return (
    <Alert status="error">
      <AlertIcon />
      Order has been refunded
    </Alert>
  )

  if (orderStatus === "cancelled") return (
    <Alert status="error">
      <AlertIcon />
      Order has been cancelled
    </Alert>
  )
  if (orderStatus === "failed") return (
    <Alert status="error">
      <AlertIcon />
      Order has been failed
    </Alert>
  )

  return <Progress data={progressData} status={progressStatus} />
}

export default OrderCard;
