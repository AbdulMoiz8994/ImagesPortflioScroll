import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import Progress from 'components/progress-box/progress-box';
import { FormattedMessage } from 'react-intl';

const RenderProgressStatus = ({ progressData, progressStatus, orderStatus }) => {
  console.log({ orderStatus })

  if (orderStatus === "trash") return (
    <Alert status='error'>
      <AlertIcon />
      Η παραγγελία σου έχει διαγραφεί
    </Alert>
  )
  if (orderStatus === "on-hold") return (
    <Alert colorScheme="orange">
      <AlertIcon />
      <FormattedMessage 
        id="ordersPage.onhold"
        defaultMessage="Your order in on hold"
      />
    </Alert>
  )

  if (orderStatus === "paralavi") return (
    <Alert status="warning">
      <AlertIcon />
      <FormattedMessage 
        id="ordersPage.paralavi"
        defaultMessage="Your order in on Paralavi"
      />
    </Alert>
  )
  
  if (orderStatus === "refunded") return (
    <Alert status="error">
      <AlertIcon />
      <FormattedMessage 
        id="ordersPage.refunded"
        defaultMessage="Order has been refunded"
      />
    </Alert>
  )
  
  if (orderStatus === "cancelled") return (
    <Alert status="error">
      <AlertIcon />
      <FormattedMessage 
        id="ordersPage.cancelled"
        defaultMessage="Order has been cancelled"
      />
    </Alert>
  )
  if (orderStatus === "failed") return (
    <Alert status="error">
      <AlertIcon />
      <FormattedMessage 
        id="ordersPage.failed"
        defaultMessage="Order has been failed"
      />
    </Alert>
  )

  return <Progress data={progressData} status={progressStatus} />
}

export default RenderProgressStatus
