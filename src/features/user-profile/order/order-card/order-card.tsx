import React from 'react';
import {
  SingleOrderList,
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
} from './order-card.style';
import { FormattedMessage } from 'react-intl';

import { CURRENCY } from 'utils/constant';
import { getOrderStatusLabel } from 'utils/getOrderStatusLabel';

type OrderCardProps = {
  orderId?: any;
  onClick?: (e: any) => void;
  className?: any;
  status?: any;
  date?: any;
  deliveryTime?: any;
  amount?: number;
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  onClick,
  className,
  status,
  date,
  deliveryTime,
  amount,
}) => {
  // console.log({ status })

  return (
    <>
      <SingleOrderList onClick={onClick} className={className}>
        <OrderListHeader>
          <TrackID>
            <FormattedMessage
              id="ordersPage.Order"
              defaultMessage="Order"
            />
            <span>#{orderId}</span>
          </TrackID>

          <RenderStatus status={status} />
        </OrderListHeader>

        <OrderMeta>
          <Meta>
            <FormattedMessage
              id="ordersPage.OrderDate"
              defaultMessage="Order Date"
            />
            : <span>{date}</span>
          </Meta>
          <Meta>
            <FormattedMessage
              id="ordersPage.DeliveryTime"
              defaultMessage="Delivery Time"
            />
            : <span>{deliveryTime}</span>
          </Meta>
          <Meta className="price">
            <FormattedMessage
              id="ordersPage.TotalPrice"
              defaultMessage="Total Price"
            />
            :
            <span>
              {CURRENCY}
              {amount}
            </span>
          </Meta>
        </OrderMeta>
      </SingleOrderList>
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

export default OrderCard;
