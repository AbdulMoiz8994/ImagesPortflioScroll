import React from 'react';
import Table from 'rc-table';
import {
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTableWrapper,
  OrderTable,
} from './order-details.style';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import { Box, Container, Stack, Wrap, Alert, AlertIcon } from '@chakra-ui/react';
import RenderProgressStatus from '../RenderProgressStatus';
import { HStack } from '@chakra-ui/react'

type OrderDetailsProps = {
  tableData?: any;
  columns?: any;
  progressData?: any;
  progressStatus?: any;
  address?: string;
  subtotal?: string;
  discount?: number;
  deliveryFee?: number;
  grandTotal?: number;
  orderStatus?: string;
  taxTotal?: string
  phoneNumber?: string
  fullName?: string
  paymentMethod?: string
  billingType?: string
  invoiceVoucherNumber?: string
  shippingMethod?: string
}; 

const components = {
  table: OrderTable,
};

const OrderDetails: React.FC<OrderDetailsProps> = ({
  tableData,
  columns,
  address,
  progressStatus,
  progressData,
  subtotal,
  discount,
  deliveryFee,
  grandTotal,
  orderStatus,
  taxTotal,
  phoneNumber,
  fullName,
  paymentMethod,
  billingType,
  invoiceVoucherNumber,
  shippingMethod
}) => {
  return (
    <>
      <DeliveryInfo>
        <DeliveryAddress>
          <h3>
            <FormattedMessage
              id="ordersPage.DeliveryAdress"
              defaultMessage="Delivery Address"
            />
          </h3>
          <Address>{fullName}</Address>
          <Address>{address}</Address>
          <Address>{phoneNumber}</Address>
          <HStack>
            <Address style={{ fontWeight: 'bold' }}>Μέθοδος Πληρωμής: </Address>
            <Address>{paymentMethod}</Address>
          </HStack>
          <HStack>
            <Address style={{ fontWeight: 'bold' }}>Τύπος Παραστατικού: </Address>
            <Address>{billingType}</Address>
          </HStack>
          {invoiceVoucherNumber && <HStack>
            <Address style={{ fontWeight: 'bold' }}>Voucher No: </Address>
            <Address>{invoiceVoucherNumber}</Address>
          </HStack>}
          {shippingMethod && <HStack>
            <Address style={{ fontWeight: 'bold' }}>Shipping: </Address>
            <Address>{shippingMethod}</Address>
          </HStack>}
        </DeliveryAddress>

        <CostCalculation>
          <PriceRow>
            <FormattedMessage id="ordersPage.SubTotal" defaultMessage="Sub total" />
            <Price>
              {CURRENCY}
              {parseFloat(subtotal).toFixed(2)}
            </Price>
          </PriceRow>
          <PriceRow>
            <FormattedMessage
              id="ordersPage.TaxTotal"
              defaultMessage="Tax Total"
            />
            <Price>
              {CURRENCY}
              {taxTotal}
            </Price>
          </PriceRow>
          <PriceRow>
            <FormattedMessage
              id="ordersPage.DeliveryFee"
              defaultMessage="Delivery Fee"
            />
            <Price>
              {CURRENCY}
              {deliveryFee}
            </Price>
          </PriceRow>
          <PriceRow className="grandTotal">
            <FormattedMessage id="ordersPage.Total" defaultMessage="Total" />
            <Price>
              {CURRENCY}
              {grandTotal}
            </Price>
          </PriceRow>
        </CostCalculation>
      </DeliveryInfo>

      <ProgressWrapper>
        <RenderProgressStatus progressData={progressData} progressStatus={progressStatus} orderStatus={orderStatus} />
      </ProgressWrapper> 

      <OrderTableWrapper>
        <Table
          columns={columns}
          data={tableData}
          rowKey={(record) => record.id}
          components={components}
          className="orderDetailsTable"
        />
      </OrderTableWrapper>
    </>
  );
};

export default OrderDetails;
