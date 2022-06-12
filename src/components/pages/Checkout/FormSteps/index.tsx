import React from 'react'
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Flex } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

const content = (
  <Flex py={4}>
    Checking
  </Flex>
);

const FormSteps = ({ activeStep }) => {
  const intl = useIntl();

  const steps = [
    { label: intl.formatMessage({ id: 'CheckoutPage.AddressStep', defaultMessage: 'Address' })},
    { label: intl.formatMessage({ id: 'CheckoutPage.PaymentStep', defaultMessage: 'Payment' })},
    // { label: 'Step 3', content },
  ];

  return (
    <Steps colorScheme="primary" activeStep={activeStep}>
      {steps.map(({ label }) => (
        <Step label={label} key={label}>
          {/* {content} */}
        </Step>
      ))}
    </Steps>
  )
}

export default FormSteps
