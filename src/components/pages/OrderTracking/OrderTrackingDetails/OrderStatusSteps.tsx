import React from 'react'
import { Step, Steps } from 'chakra-ui-steps';
import { getOrderStatusLabel } from 'utils/getOrderStatusLabel';

// const steps = [
//   {label: getOrderStatusLabel(), value: 'processing'}, 
//   {label: 'Έφυγε', value: 'apodoxi'}, 
//   {label: 'Έφτασε', value: 'to-ship'},
//   {label: 'Έφτασε', value: 'completed'},
//   {label: 'Έφτασε', value: 'deliverycompleted'},
// ]

const OrderStatusSteps = ({ activeStep, progressData }) => {
  // console.log({ progressData })
  const steps = progressData.map(stepValue => ({ label: getOrderStatusLabel(stepValue).label, value: stepValue }))

  // console.log({ steps })

  // return null;
  return (
    <Steps colorScheme="primary" activeStep={activeStep}>
      {steps.map(({ label }) => (
        <Step label={label} key={label} />
      ))}
    </Steps>
  )
}

export default OrderStatusSteps
